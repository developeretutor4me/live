import React from 'react';
import HeroSection from './components/HeroSection';
import WhyEtutorWithus from './components/WhyEtutorWithus';
import HowToStart from './components/HowToStart';
import TutorsComments from './components/TutorsComments';
import ParaDetails from './components/ParaDetails';
import ETutorsFaqs from './components/ETutorsFaqs';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
const Page = () => {
  return (
    <>
      <Navbar />
      <div className="px-10 mb:px-5">
        <HeroSection />
        <WhyEtutorWithus />
        <HowToStart />
        <TutorsComments />
      </div>
      <ETutorsFaqs />
      <div className="px-10 mb:px-5">
        <ParaDetails />
      </div>
      <Footer />
    </>
  );
};

export default Page;
