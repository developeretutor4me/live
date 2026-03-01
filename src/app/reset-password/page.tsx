'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/auth/Layout';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Alert from '../../../public/alertOrange.svg';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { sendGAEvent } from '@next/third-parties/google';

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');

    if (session) {
      if (session.user?.role === 'parent') {
        sendGAEvent('event', 'parent', {
          value: 'parent',
          role: 'parent',
          userId: session.user.id,
        });
        router.push('/parent');
      } else if (session?.user?.role === 'teacher') {
        sendGAEvent('event', 'teacher', { value: 'teacher' });
        router.push('/etutor');
      } else if (session?.user?.role === 'student') {
        sendGAEvent('event', 'student', { value: 'student' });
        router.push('/studentdashboard');
      }
    }

    if (!token) {
      router.push('/');
      return;
    }
  }, [searchParams, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsPasswordMatch(false);
    setIsLoading(true);

    if (!password.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Password is required',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      toast({
        title: 'Validation Error',
        description: 'Password must be at least 8 characters long',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Validation Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      setIsPasswordMatch(true);
      setIsLoading(false);
      return;
    }

    try {
      const token = searchParams.get('token');

      const response = await fetch('/api/auth/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred during password reset');
      }

      toast({
        title: 'Success',
        description: 'Password has been reset successfully',
        variant: 'default',
      });

      setPassword('');
      setConfirmPassword('');

      router.push('/signin');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Unable to connect to server. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-xl">
        <div className="bg-[#EDE8FA] rounded-[32px] shadow-lg p-10">
          <div className="">
            <h1 className="text-[25px] md:text-[34px] lg:text-[45px] xl:text-[55px] 2xl:text-[#68.23] font-bold text-[#534988]">
              Reset Password
            </h1>

            <p className="text-[#9B85C8] text-[18px] md:text-[20px] lg:text-[20px] xl:text-[23px] 2xl:text-[26.84px] leading-6 mb-10">
              Enter your new password below and confirm it to complete the reset.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full h-14 bg-[#DBCAFF] border border-[#9184F0]/40 rounded-full px-6 pr-12 text-[#4A376F] placeholder-[#A095B3] focus:outline-none focus:ring-2 focus:ring-[#7B42F6] focus:ring-opacity-50 transition-all duration-200"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#A095B3] hover:text-[#4A376F] transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  className="w-full h-14 bg-[#DBCAFF] border border-[#9184F0]/40 rounded-full px-6 pr-12 text-[#4A376F] placeholder-[#A095B3] focus:outline-none focus:ring-2 focus:ring-[#7B42F6] focus:ring-opacity-50 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#A095B3] hover:text-[#4A376F] transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {isPasswordMatch && (
                <div className="flex justify-center items-center gap-3 p-4">
                  <Image src={Alert} alt="alert" className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="text-[#FC7777] text-sm font-medium">Passwords do not match.</p>
                    <p className="text-[#FC7777] text-sm">Please try again.</p>
                  </div>
                </div>
              )}

              <div className="w-full flex justify-center items-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-[70%] h-14 bg-[#8653FF] text-[18px] md:text-[19px] lg:text-[22px] xl:text-[22px] 2xl:text-[27.07px] hover:bg-[#6A3FE5] disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white font-bold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
