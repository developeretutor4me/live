// // pages/api/google/authorize.ts
// import { google } from 'googleapis';
// import { NextResponse } from 'next/server';

// const { OAuth2 } = google.auth;
// const oAuth2Client = new OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI
// );

// // Redirect users to authorize
// export async function GET() {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: ['https://www.googleapis.com/auth/calendar'],
//   });

//   return NextResponse.redirect(authUrl);
// }

// // Handle the OAuth callback
// export async function POST(req: Request) {
//   const { code } = await req.json();

//   if (!code) {
//     return NextResponse.json({ message: 'No authorization code provided' }, { status: 400 });
//   }

//   try {
//     // Exchange the code for access and refresh tokens
//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);

//     // Save the refresh token securely (e.g., in your database)


//     // Example: Save refresh token to an environment variable (not recommended for production)
//     process.env.GOOGLE_REFRESH_TOKEN = tokens.refresh_token; // Replace this with your database save logic

//     return NextResponse.json({ message: 'Authorization successful!', tokens }, { status: 200 });
//   } catch (error) {
//     console.error('Error retrieving access token', error);
//     return NextResponse.json({ message: 'Error retrieving access token' }, { status: 500 });
//   }
// }
