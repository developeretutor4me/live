'use client';
import React, { useState } from 'react';
import Layout from '@/components/auth/Layout';
import { useToast } from '@/hooks/use-toast';

const Page = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);

    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Email is required',
        variant: 'destructive',
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('/api/auth/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: 'Signup Failed',
          description: data.message || 'An error occurred during signup',
          variant: 'destructive',
        });
        return;
      }

      setIsEmailSent(true);
    } catch (error: any) {
      toast({
        title: 'Network Error',
        description: 'Unable to connect to server. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-2xl">
        <div className="bg-[#EDE8FA] rounded-[32px] shadow-lg p-[50px]">
          {!isEmailSent && (
            <div className="">
              <h1 className="text-[32px] md:text-[32px] lg:text-[42px] xl:text-[55px] 2xl:text-[68.23px] font-bold text-[#534988]">
                Let&apos;s Get You Back In
              </h1>

              <p className="text-left text-[#9B85C8] text-[20px] md:text-[22px] lg:text-[14px] xl:text-[25px] 2xl:text-[26px] leading-6 mb-14 lg:mt-[-10px]">
                Enter the email linked to your account, and we&apos;ll send you a secure link to
                reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 w-full flex flex-col items-center">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full h-14 bg-[#DBCAFF] rounded-full px-6 text-[#4A376F] placeholder-[#A095B3] focus:outline-none focus:ring-2 focus:ring-[#7B42F6] focus:ring-opacity-50 transition-all duration-200 mb-5 border border-[#9184F0]/40"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-[70%] h-14 bg-[#8653FF] hover:bg-[#6A3FE5] disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
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
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            </div>
          )}
          {isEmailSent && (
            <div className="space-y-6">
              <h1 className="text-[32px] md:text-[32px] lg:text-[42px] xl:text-[55px] 2xl:text-[68.23px] font-bold text-[#534988]">
                Check Your Inbox
              </h1>

              <p className="text-left text-[#9B85C8] text-[20px] md:text-[22px] lg:text-[14px] xl:text-[25px] 2xl:text-[26px] leading-6 mb-14 lg:mt-[-10px]">
                We&apos;ve sent a password reset link to your email.
              </p>

              <p className="text-left text-[#9B85C8] text-[20px] md:text-[22px] lg:text-[14px] xl:text-[25px] 2xl:text-[26px] leading-relaxed mb-14 lg:mt-[-10px]">
                Don&apos;t see it? Be sure to check your spam or promotions folder.
              </p>
              <div className="w-full flex justify-center">
                <button
                  onClick={() => window.open('https://mail.google.com', '_blank')}
                  className="w-[70%] h-14 text:[29.09px] bg-[#8653FF] hover:bg-[#6A3FE5] disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white font-bold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center mb-5"
                >
                  Open Gmail
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
