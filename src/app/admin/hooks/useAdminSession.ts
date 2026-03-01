import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

export const useAdminSession = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true);
      return;
    }

    if (status === 'unauthenticated') {
      router.push('/admin/signin');
      return;
    }

    if (session?.user?.role !== 'admin') {
      router.push('/admin/signin');
      return;
    }

    // Set admin user data
    setAdminUser({
      id: session.user.id || '',
      name: session.user.name || '',
      email: session.user.email || '',
      role: session.user.role,
      firstName: session.user.firstName || session.user.name?.split(' ')[0] || '',
      lastName: session.user.lastName || session.user.name?.split(' ').slice(1).join(' ') || '',
    });

    setIsLoading(false);
  }, [session, status, router]);

  const signOutAdmin = async () => {
    try {
      await signOut({
        callbackUrl: '/admin/signin',
        redirect: true,
      });
    } catch (error) {
      console.error('Error signing out admin:', error);
      // Fallback - force navigation
      router.push('/admin/signin');
    }
  };

  const refreshSession = async () => {
    try {
      await update();
    } catch (error) {
      console.error('Error refreshing session:', error);
    }
  };

  return {
    adminUser,
    session,
    isLoading,
    isAuthenticated: !!adminUser && status === 'authenticated',
    signOut: signOutAdmin,
    refreshSession,
    status,
  };
};
