import Headings from '@/components/Headings';
import React from 'react';
import img1 from '../../../../public/faqEtutorIcon.svg';
import img2 from '../../../../public/assets/homepage/findtutor.png';
import img3 from '../../../../public/assets/homepage/packages.png';
import img4 from '../../../../public/assets/homepage/questions.png';
import img5 from '../../../../public/assets/homepage/generalquestion.png';
import img6 from '../../../../public/assets/homepage/booking.png';
import img7 from '../../../../public/assets/homepage/security.png';
import img8 from '../../../../public/assets/homepage/etutor.png';
import Image from 'next/image';
import Link from 'next/link';

const FAQHero = () => {
  const content = [
    { Text: `Become an eTutor`, img: img1, link: '#faq-etutor' },
    { Text: `For eTutors`, img: img2, link: '#faq-for-etutors' },
    { Text: `Packages`, img: img3, link: '#faq-packages' },
    {
      Text: `Technical questions`,
      img: img4,
      link: '#faq-technical-questions',
    },
    { Text: `General questions`, img: img5, link: '#faq-general-questions' },
    { Text: `Booking`, img: img6, link: '#faq-booking' },
    { Text: `Security`, img: img7, link: '#faq-security' },
    { Text: `eTutor4Me`, img: img8, link: '#faq-etutor4me' },
  ];

  return (
    <div className="w-full ">
      <div className="h-[80vh] flex justify-center items-center flex-col lg:h-[60vh] xl:h-[70vh] mb:h-[60vh]">
        <div className="w-3/4 m-auto flex items-center justify-center text-center my-9 ">
          <h1 className="-mt-2 text-[93px] text-center font-extrabold max-w-3xl leading-[1.15] xl:leading-normal mb:text-[35px] mb:leading-none     mb:text-2xl   text-darkBlue lg:text-5xl  xl:text-6xl">
            Frequently Asked <br></br> Questions
          </h1>
        </div>

        <p className="text-[42px] text-center font-medium  text-[#473171] mt-0 mb:text-lg mb:w-4/5 mb:mx-auto lg:text-[30px] xl:text-[35px]">
          Here you&apos;ll find answers to the most common questions about our services
        </p>
      </div>

      <div className="grid  grid-cols-4 gap-y-20 gap-10 m-auto content-center justify-items-center  w-[88%] xl:py-32 py-60 pb-80 mb:grid-cols-2 lg:py-32 mb:w-full mb:gap-5 mb:py-12 tb:grid-cols-3">
        {content.map((item, index) => (
          <div key={index} className="w-full">
            <Link href={item.link || '#'}>
              <div className="flex  max-w-[310px] w-full  xl:w-[95%] mx-auto lg:w-full cursor-pointer py-8 flex-col items-center gap-0 justify-center h-[310px] xl:h-64 lg:h-52 bg-cardbg rounded-[2.5rem] p-6 mb:w-full mb:h-full tb:rounde-[2rem] mb:rounded-[1rem]  mb:p-5">
                <Image
                  loading="lazy"
                  className="lg:w-[40%] mb:w-[40%]"
                  src={item.img}
                  alt={item.Text}
                />
                <h2 className="text-center px-5 text-darkBlue leading-tight font-bold text-[36px] mt-8 mb:text-base xl:text-2xl lg:text-xl lg:mt-4 mb:mt-2 mb:px-0">
                  {item.Text}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQHero;
