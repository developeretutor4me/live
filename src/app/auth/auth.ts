import UserModel from '@/app/api/models/User';
import Admin from '@/app/api/models/Admin';
import { sendVerificationEmail } from '@/app/api/utils/sendEmail';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { connectMongoDB } from '@/app/api/connection/connection';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'your-email@example.com',
        },
        password: { label: 'Password', type: 'password' },
        role: {
          label: 'Role',
          type: 'select',
          options: ['parent', 'teacher', 'student', 'admin'],
        },
      },
      //@ts-ignore
      async authorize(credentials: Credentials | any, req) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        await connectMongoDB();

        // Handle admin authentication
        if (credentials.role === 'admin') {
          const admin = await Admin.findOne({ email: credentials.email.toLowerCase() });

          if (!admin) {
            throw new Error('Invalid admin credentials');
          }

          const isValidPassword = await compare(credentials.password, admin.password);
          if (!isValidPassword) {
            throw new Error('Invalid admin credentials');
          }

          return {
            email: admin.email,
            name: admin.name,
            role: 'admin',
            id: admin._id.toString(),
            isAdmin: true,
            firstName: admin.name.split(' ')[0] || admin.name,
            lastName: admin.name.split(' ').slice(1).join(' ') || '',
            accessToken: jwt.sign(
              { userId: admin._id, email: admin.email, role: 'admin' },
              process.env.JWT_SECRET!,
              { expiresIn: '24h' }
            ),
          };
        }

        // Legacy admin check (for backward compatibility)
        if (credentials.email === 'admin@gmail.com' && credentials.password === '12345678') {
          return {
            email: 'admin@gmail.com',
            role: 'admin',
            id: 'admin',
            isAdmin: true,
            name: 'Admin User',
            firstName: 'Admin',
            lastName: 'User',
            accessToken: jwt.sign(
              { userId: 'admin', email: 'admin@gmail.com', role: 'admin' },
              process.env.JWT_SECRET!,
              { expiresIn: '1h' }
            ),
          };
        }

        const user = await UserModel.findOne({ email: credentials.email });

        if (!user || typeof user.role !== 'string') {
          throw new Error('User not found');
        }

        if (user.role !== credentials.role) {
          throw new Error(
            `You are trying to log in as a ${credentials.role}, but your account is for a ${user.role}.`
          );
        }

        if (!user.verified) {
          const secret = process.env.JWT_SECRET;
          if (!secret) {
            throw new Error('Internal server error');
          }

          const token = jwt.sign({ userId: user._id, email: user.email }, secret, {
            expiresIn: '1h',
          });

          await sendVerificationEmail(user.email, token).catch(error => {
            throw new Error('Error sending verification email. Please try again later.');
          });

          throw new Error(
            'Email not verified. A verification email has been sent to your email address. Please verify your email before logging in.'
          );
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
          expiresIn: '1h',
        });

        return {
          email: user.email,
          role: user.role,
          id: user._id.toString(),
          isAdmin: false,
          isParent: false,
          accessToken,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        let existingUser = await UserModel.findOne({ email: profile?.email });

        if (!existingUser) {
          existingUser = await UserModel.create({
            email: profile?.email,
            name: profile?.name,
            role: 'student',
            verified: true,
          });
        }

        user.id = existingUser._id.toString(); // Assign DB user ID to the user object
        user.role = existingUser.role;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Handle relative URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // Handle URLs from the same origin
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      // Default to the base URL
      return baseUrl;
    },
    async jwt({ token, user, session, trigger }: any) {
      if (
        (trigger === 'update' &&
          session?.user?.role &&
          session?.user?.id &&
          session?.user?.email) ||
        session?.user?.isAdmin ||
        session?.user?.isParent
      ) {
        token.role = session.user.role;
        token.id = session.user.id;
        token.email = session.user.email;
        token.isAdmin = session?.user?.isAdmin === false ? false : true;
        token.isParent = session?.user?.isParent === false ? false : true;
      }

      if (user) {
        token.role = user.role;
        token.id = user.id;
        ((token.isAdmin = user.isAdmin),
          (token.isParent = user.isParent),
          (token.accessToken = user.accessToken)); // Store access token in JWT token
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
        session.user.isParent = token.isParent;
        session.accessToken = token.accessToken; // Add access token to session
      } else {
        session.user = { role: token.role, id: token.id };
        session.accessToken = token.accessToken; // Add access token to session
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };
