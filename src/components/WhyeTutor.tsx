import React from 'react';
import Headings from './Headings';
import Image from 'next/image';
import img1 from '../../public/assets/homepage/engaging-session.png';
import img2 from '../../public/assets/homepage/efficient-learn.png';
import img3 from '../../public/assets/homepage/encourage-env.png';
const WhyeTutor = () => {
  const content = [
    {
      id: 1,
      heading: 'Engaging Sessions',
      paragraph:
        'Our eTutors make learning engaging and fun with innovative teaching methods, keeping students motivated and eager to learn.',
      img: img1,
    },
    {
      id: 2,
      heading: 'Efficient Learning',
      paragraph:
        'Our eTutors deliver impactful lessons, helping you quickly and thoroughly understand concepts while valuing your time.',
      img: img2,
    },
    {
      id: 3,
      heading: 'Encouraging Environment',
      paragraph:
        'We create a supportive atmosphere where our eTutors help students build confidence and overcome challenges with ease.',
      img: img3,
    },
  ];
  return (
    <div className="px-14 pt-4 sm:pt-20 mb:px-0 lg:px-5 lg:pt-16 animate-fade-in">
      <Headings className="mb-1 animate-slide-in-left" heading="Why Choose eTutor4Me?" />

      <div className="w-full grid grid-cols-3 gap-4 py-8 pt-5 custom-lg:pt-10 custom-xl:pt-16 mb:flex-col mb:grid-cols-1 tb:grid-cols-3">
        {content.map((content, index) => (
          <div
            className={`bg-cardbg p-10 w-full max-w-[547px] max-h-[638px] h-full rounded-[30px] mb:rounded-2xl mb:w-full mb:p-4 lg:p-5 lg:rounded-2xl xl:p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-customBlue/20 animate-card-appear`}
            key={content.id}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="flex flex-col row-gap-2 mb:text-xs">
              <div className="w-full rounded-3xl mb:h-full overflow-hidden">
                <Image
                  loading="lazy"
                  className="w-full h-full transform transition-transform duration-500 hover:scale-110"
                  alt="img"
                  src={content.img}
                />
              </div>
              <h2 className="text-[#4a3c7f] text-[40px] font-semibold mt-5  xl:text-2xl lg:text-2xl mb:text-xl">
                {content.heading}
              </h2>
              <p className="text-[#473171] text-[30px] leading-tight mt-1.5   xl:text-xl lg:text-base  mb:text-sm ">
                {content.paragraph}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyeTutor;
