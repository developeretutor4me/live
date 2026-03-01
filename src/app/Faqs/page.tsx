import React from 'react';
import FAQHero from './Components/FAQHero';
import FAQsSection from './Components/FAQsSection';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';

const page = () => {
  return (
    <>
      <Navbar />
      <div className="mb:px-5">
        <FAQHero />
        <FAQsSection />
      </div>
      <Footer />
    </>
  );
};

export default page;
