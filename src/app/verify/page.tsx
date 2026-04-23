'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/auth/Layout';
import { useSession, signOut } from 'next-auth/react';

const VerifyPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const verifyToken = async (token: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/auth/verify?token=${token}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (response.ok) {
        setVerified(true);
      } else {
        throw new Error(result.message || 'Verification failed');
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'Verification failed. Please try again.');
      toast({
        title: 'Verification Failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = searchParams.get('token');

    if (session) {
      setLoading(false);
      setErrorMsg(
        'You are logged in and have an active session. First logout then you can activate the account.'
      );
      return;
    }

    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
      setErrorMsg('No verification token found in URL.');
    }
  }, [searchParams, session]);

  // Loading state
  if (loading) {
    return (
      <Layout hideSignUp>
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-[#8653FF] rounded-full animate-spin"></div>
          </div>
          <p className="text-[#473171] text-lg">Verifying your account...</p>
        </div>
      </Layout>
    );
  }

  // Error / active session state
  if (!verified) {
    return (
      <Layout hideSignUp>
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#473171] italic">
            Verification Failed
          </h1>
          <p className="text-[#473171] text-lg">{errorMsg}</p>

          {session && (
            <button
              onClick={async () => {
                await signOut({ redirect: false });
                toast({
                  title: 'Logged Out',
                  description: 'You have been logged out. The page will refresh.',
                  variant: 'default',
                });
                setTimeout(() => window.location.reload(), 1000);
              }}
              className="bg-[#8653FF] hover:bg-[#534988] text-white font-extrabold text-lg py-4 px-12 rounded-full transition-colors duration-300"
            >
              Logout and Verify Account
            </button>
          )}
        </div>
      </Layout>
    );
  }

  // Success state
  return (
    <Layout hideSignUp>
      <div className="text-center space-y-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#473171] leading-tight italic">
          You&apos;re all set to start exploring your
          <br />
          account.
        </h1>

        <button
          onClick={() => router.push('/signin')}
          className="bg-[#8653FF] hover:bg-[#534988] text-white font-extrabold text-[16px] xl:text-[20px] py-3 md:py-4 px-10 md:px-14 rounded-full transition-colors duration-300"
        >
          Sign In to Continue
        </button>
      </div>
    </Layout>
  );
};

export default VerifyPage;
