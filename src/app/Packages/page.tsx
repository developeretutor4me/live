import React from 'react';
import PackageHero from './Components/PackageHero';
import Membership from './Components/Membership';
import Package from './Components/Package';
import OnlineTutoring from './Components/OnlineTutoring';
import StartJourney from './Components/StartJourney';
import PackageFaqs from './Components/PackageFaqs';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import BundlePricing from '@/components/PricingBundle';

const page = () => {
  return (
    <>
      <Navbar />
      <div className="mb:px-5">
        <PackageHero />
        <Membership />
        <Package
          fontsize={
            'mb:text-2xl lg:text-4xl xl:text-5xl text-3xl text-center font-extrabold 2xl:text-7xl 2xl:leading-tight'
          }
          textcolor={'text-[#5553C4]'}
          position={'flex items-center flex-col justify-center gap-0 mx-auto'}
          text1={'Our most'}
          text2={'popular Package'}
          width={'w-[85%] lg:w-[90%] m-auto mb:w-[95%] py-24 lg:py-8 xl:py-4 mb:py-5'}
          padding={''}
        />
        <BundlePricing />
        <OnlineTutoring />
        <StartJourney />
      </div>
      <PackageFaqs />
      <Footer />
    </>
  );
};

export default page;
