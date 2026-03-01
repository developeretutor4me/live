'use client';
import Layout from '@/components/auth/Layout';
import { useToast } from '@/hooks/use-toast';
import { sendGAEvent } from '@next/third-parties/google';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import google from '../../../../public/googleicon.svg';
import line from '../../../../public/line.svg';

function Page() {
  const { toast } = useToast();
  const { data: session, status, update } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, [router, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      role: 'student',
      redirect: false,
    });

    if (result?.error) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: result.error,
      });
    } else {
      setLoading(false);
      sendGAEvent('event', 'studentlogin', { value: 'success' });
      router.push('/studentdashboard');
    }
  };

  const handleSignIn = async () => {
    await signIn('google');
  };

  return (
    <Layout>
      <div className="rounded-3xl md:rounded-[3rem] bg-[#EDE8FA] shadow-gray-300 shadow-2xl px-6 sm:px-11 py-6 max-w-[537px] w-full">
        <h1 className="text-[32px] lg:text-[40px] xl:text-[58px] 2xl:text-[68px] font-bold text-[#534988]">
          Sign In
        </h1>
        <p className="text-[#9B85C8] text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[27px]  mt-[-5px] mt-[-10px]">
          As a Student
        </p>
        <div
          onClick={handleSignIn}
          className="flex items-center justify-center px-6 py-3 sm:py-[12px] gap-3 text-darkBlue cursor-pointer rounded-full bg-transparent border-[#534988]/80 border-2  mt-4 text-[16px] md:text-[20px] lg:text-[26.82px] xl:text-[26.82px] 2xl:text-[26.82px]"
        >
          <Image loading="lazy" src={google} alt="google" className="w-[28.93px] h-[28.93px]" />
          Continue with Google
        </div>
        <div className="flex items-center justify-center w-full gap-3 py-5 px-3">
          <div className="w-full">
            <Image loading="lazy" alt="" src={line} />
          </div>
          <span className="text-darkBlue text-[23.01px]">or</span>
          <div className="w-full">
            <Image loading="lazy" alt="" src={line} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex w-full flex-col gap-4">
            <div className="rounded-full bg-[#DBCAFF] px-6 py-[17px] flex items-center w-full border border-[#9184F0]/40">
              <input
                type="email"
                className="placeholder-[#766f97] w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="rounded-full bg-[#DBCAFF] px-6 py-[17px] flex items-center w-full relative border border-[#9184F0]/40">
              <input
                type={showPassword ? 'text' : 'password'}
                className="placeholder-[#766f97] w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue pr-12"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-darkBlue hover:text-lightpurple transition-colors duration-200 focus:outline-none"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m-3.122-3.122l4.244 4.244M12 12l3.878 3.878M12 12l6.878 6.878"
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

            <div className="text-center my-1">
              <span className="text-[#534988] font-normal text-[16px]">I forgot my </span>
              <Link
                href="/forgot-password"
                className="text-[#FC7777] font-normal underline hover:text-[#e66666] transition-colors duration-200"
                style={{ fontSize: '16.38px' }}
              >
                Password
              </Link>
            </div>

            <button
              type="submit"
              className={` bg-customBlue text-2xl text-white rounded-full w-full px-6 py-3 sm:py-[17px] font-bold cursor-pointer text-center lg:text-xl  mb:text-sm  mb:mt-6 `}
            >
              {loading ? 'Loading...' : 'Continue'}
            </button>
          </div>
        </form>
        <p className="text-[#534988] text-[16.38px] mt-5">
          By clicking &quot;Continue with Google / Email&quot; you agree to our User <br />
          <span className="underline text-[#FC7777]">Terms of Service and Privacy Policy </span>
        </p>
      </div>
    </Layout>
  );
}

export default Page;
