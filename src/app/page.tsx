'use client';
import ContactUs from '@/components/ContactUs';
import FAQs from '@/components/FAQs';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowWorks from '@/components/HowWorks';
import MeeteTutors from '@/components/MeeteTutors';
import Navbar from '@/components/Navbar/Navbar';
import ParentsComments from '@/components/ParentsComments';
import Payment from '@/components/Payment';
import StudentsFaqs from '@/components/StudentsFaqs';
import WhyeTutor from '@/components/WhyeTutor';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import PackageFaqs from './Packages/Components/Package';
import BundlePricing from '@/components/PricingBundle';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const { isLoading, error, data, getData } = useVisitorData(
    { extendedResult: true },
    { immediate: true }
  );

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

  return (
    <div className="max-w-[1920px] mx-auto">
      <Navbar />
      <div className="px-[60px] mb:px-5 lg:px-5">
        <Hero />
        <MeeteTutors />
        <WhyeTutor />
        <PackageFaqs
          fontsize={
            'mb:text-2xl lg:text-4xl xl:text-5xl text-3xl text-center font-extrabold 2xl:text-[93px] 2xl:mb-14 2xl:mt-24'
          }
          textcolor={'text-[#534988]'}
          position={'flex items-start flex-col justify-center gap-0 mx-auto'}
          text1={'Our Packages'}
          text2={''}
          width={'w-[94%] lg:w-[90%] m-auto mb:w-[95%] py-28 lg:py-8 xl:py-4 mb:py-5'}
          padding={'custom-2xl:px-10'}
        />
        <BundlePricing />
        <HowWorks />
        <Payment />
        <ParentsComments />
      </div>
      <StudentsFaqs />
      <div className="px-[60px] mb:px-5 lg:px-5">
        <ContactUs />
      </div>
      <Footer />
    </div>
  );
}
