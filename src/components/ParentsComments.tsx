import React from 'react';
import Headings from './Headings';
import img1 from '../../public/assets/homepage/img1.png';
import img2 from '../../public/assets/homepage/img2.png';
import img3 from '../../public/assets/homepage/img3.png';
import Image from 'next/image';

const ParentsComments = () => {
  const content = [
    {
      id: 1,
      title: 'Priscilla',
      date: ' Oct 16 2023',
      img: img1,
      paragraph: `"eTutor4Me has completely changed the way 
I approach my studies. The sessions are 
engaging and my grades have improved 
significantly!"`,
      writer: '- Sarah, High School Student',
    },
    {
      id: 2,
      title: 'James',
      date: ' Oct 16 2023',
      img: img2,
      paragraph: `"My eTutor understands exactly what I need 
help with and explains things in a way that 
makes sense to me. Highly recommend!"`,
      writer: '- James, College Student',
    },
    {
      id: 3,
      title: 'Lisa',
      date: ' Oct 16 2023',
      img: img3,
      paragraph: `"As a parent, I've seen such an amazing 
improvement in my child's grades and 
confidence. Big thanks to Emily, our fantastic 
eTutor!"`,
      writer: '- Lisa, Parent',
    },
  ];
  return (
    <div className="px-5 lg:px-5 mt:mt-[50px] md:mt-[80px] lg:mt-[100px] xl:mt-[120px] 2xl:mt-[150px] mb-[20px] md:mb-[30px] lg:mb-[40px] xl:mb-[50px] 2xl:mb-[70px]">
      <Headings className="ml-2.5" heading=" “ Loved by parents & students" />
      <p className="text-darkBlue mt-6 text-[27px] mb:text-base ml-9">
        98% of our parents say their students made significant progress
      </p>

      <div className="w-full flex gap-8 py-24 mb:flex-col tb:grid tb:grid-cols-2 lg:py-16 mb:py-10">
        {content.map(content => (
          <div className=" bg-cardbg p-8 w-1/3 rounded-3xl lg:p-5 mb:w-full" key={content.id}>
            <div className="flex flex-col row-gap-2 h-full">
              <div className="flex items-center gap-12">
                <div className="rounded-full w-32 h-32 mb:w-20 mb:h-20">
                  <Image loading="lazy" alt="img" src={content.img} />
                </div>
                <div>
                  <h2 className="font-semibold text-[33px] text-darkBlue lg:text-2xl">
                    {content.title}
                  </h2>
                  <p className="text-[18px] mb:text-xs text-[#6B5692] lg:text-xs xl:text-lg">
                    Published:{content.date}
                  </p>
                </div>
              </div>
              <div className="flex flex-col h-full justify-between">
                <p className="text-[#473171] text-[26px] pt-4  mb:text-xs lg:text-lg xl:text-xl">
                  {content.paragraph}
                </p>
                <p className="text-right text-[#473171] text-[16px] md:text-[20px] lg:text-[26px] xl:text-[26px] 2xl:text-[26px] pt-1">
                  {content.writer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentsComments;
