'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/auth/Layout';
import { useSession, signOut } from 'next-auth/react';

const VerifyPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const verifyToken = async (token: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/auth/verify?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        setVerificationMessage('Account verified successfully! Redirecting to sign in...');
        toast({
          title: 'Success!',
          description: 'Your account has been verified successfully.',
          variant: 'default',
        });

        router.push('/signin');

        toast({
          title: 'Success!',
          description: 'Your account has been verified successfully.',
          variant: 'default',
        });
      } else {
        throw new Error(result.message || 'Verification failed');
      }
    } catch (error: any) {
      setVerificationMessage('Verification failed. Please try again.');
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

    // Check if user is already logged in
    if (session) {
      setVerificationMessage(
        'You are logged in and have an active session. First logout then you can activate the account.'
      );
      toast({
        title: 'Already Logged In',
        description: 'You need to logout first before verifying a new account.',
        variant: 'destructive',
      });
      return;
    }

    if (token) {
      verifyToken(token);
    } else {
      setVerificationMessage('No verification token found in URL.');
      toast({
        title: 'Invalid Link',
        description: 'No verification token found. Please check your email for the correct link.',
        variant: 'destructive',
      });
    }
  }, [searchParams, session, router]);

  return (
    <Layout>
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Account Verification</h1>
          </div>

          {loading ? (
            <div className="flex flex-col items-center space-y-6">
              {/* Stunning Loading Spinner */}
              <div className="relative">
                <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin">
                  <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
                </div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-blue-500 rounded-full animate-spin animation-delay-150"></div>
                <div className="absolute inset-2 w-16 h-16 border-4 border-transparent border-b-pink-500 rounded-full animate-spin animation-delay-300"></div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500">This may take a few moments</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {verificationMessage && (
                <div
                  className={`p-4 rounded-lg ${
                    verificationMessage.includes('successfully')
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : verificationMessage.includes('active session')
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  <p className="font-medium">{verificationMessage}</p>
                </div>
              )}

              {/* Show logout button if user is already logged in */}
              {session && verificationMessage.includes('active session') && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-amber-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <span className="font-medium">Active Session Detected</span>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-amber-800 text-sm mb-3">
                      Logged in as: <strong>{session.user?.email}</strong>
                    </p>
                    <button
                      onClick={async () => {
                        await signOut({ redirect: false });
                        toast({
                          title: 'Logged Out',
                          description:
                            'You have been logged out. The page will refresh to continue verification.',
                          variant: 'default',
                        });
                        // Refresh the page after logout to restart verification process
                        setTimeout(() => {
                          window.location.reload();
                        }, 1000);
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Logout and Verify Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <style jsx>{`
          .animation-delay-100 {
            animation-delay: 0.1s;
          }
          .animation-delay-150 {
            animation-delay: 0.15s;
          }
          .animation-delay-200 {
            animation-delay: 0.2s;
          }
          .animation-delay-300 {
            animation-delay: 0.3s;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default VerifyPage;
