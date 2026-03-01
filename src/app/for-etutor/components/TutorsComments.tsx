import Headings from '@/components/Headings';
import React from 'react';
import img1 from '../../../../public/assets/homepage/img3.png';
import img2 from '../../../../public/assets/homepage/img2.png';
import award1 from '../../../../public/assets/icons/award1.svg';
import award2 from '../../../../public/assets/icons/award2.svg';
import award3 from '../../../../public/assets/icons/award3.svg';
import award4 from '../../../../public/assets/icons/award4.svg';
import Image from 'next/image';
const TutorsComments = () => {
  const content = [
    {
      id: 1,
      title: 'Emily J.',
      date: 'August 3, 2024',
      img: img1,
      paragraph: `I recently started as an eTutor , and I can 
clearly see how everything works. The 
platform is incredibly well-organized, making 
it easy to manage my schedule and connect 
with students. The support and resources 
available have been fantastic, and I'm excited 
to continue growing and helping students 
achieve their academic goals. `,
      award: award1,
    },
    {
      id: 2,
      title: 'Sarah M.',
      date: ' June 15, 2024',
      img: img1,
      paragraph: `As a Level 6 eTutor, I've had an amazing 
experience so far. It is exceptionally 
well-organized, making it easy to track my 
progress and schedule sessions. The gamified 
system motivates me to keep improving, and 
I love seeing my students succeed. The 
community support is fantastic, and I feel 
valued and rewarded for my efforts. Highly 
recommend to anyone looking to make a 
difference in students' lives!`,
      award: award1,
    },
    {
      id: 3,
      title: 'Priscilla J.',
      date: '  September 28, 2024',
      img: img1,
      paragraph: `I've recently reached Level 8 with eTutor4Me, 
and I couldn't be happier with my experience. 
From day one, everything has been 
straightforward and well-organized, which 
made settling in a breeze. The platform's 
structure is fantastic, and it's clear that a lot 
of thought has gone into making it 
user-friendly. The leveling system is not only 
fun but also a great way to keep track of my 
growth and success. I've found the flexibility 
to be a huge plus, allowing me to balance 
tutoring with my other commitments.`,
      award: award3,
    },
    {
      id: 4,
      title: 'john D.',
      date: ' Oct 16 2023',
      img: img2,
      paragraph: `Reaching Level 10 with eTutor4Me has been 
an incredible journey! I started by adding my 
university grades, which allowed me to jump 
straight to Level 4. From there, I worked my 
way up to Level 10. The platform is 
exceptionally well-organized, making it easy 
to manage everything from scheduling 
sessions to tracking progress. The leveling 
system keeps me motivated and clearly 
showcases my growth. The flexibility is 
fantastic, fitting perfectly with my other 
commitments. The supportive community 
and structured environment make tutoring 
here a truly rewarding experience.`,
      award: award4,
    },
  ];
  return (
    <div className="px-8 py-16 pt-[16.8rem] mb:px-0 mb:py-4 xl:pt-40 lg:px-0 lg:pt-20">
      <Headings heading="‘’What our eTutors say" className={'pl-1.5'} />
      <p className="text-darkBlue text-[30px] mb:text-xs lg:text-2xl mt-3 pl-2">
        98% of our eTutors say they are happy to work with us
      </p>
      <div className="w-full grid grid-cols-4	 gap-7 py-[73px] mb:flex-col xl:grid-cols-3 lg:grid-cols-3 lg:pt-16 mb:grid-cols-1 tb:grid-cols-2">
        {content.map(content => (
          <div
            className="bg-cardbg p-5 w-full rounded-3xl lg:p-4 mb:w-full mb:p-4 h-[256.97px] transition-all duration-300 hover:h-[390px] hover:cursor-default  overflow-hidden "
            key={content.id}
          >
            <div className="flex flex-col row-gap-2  h-full  ">
              <div className="flex items-center justify-between gap-5 mb:gap-2 ">
                <div className="flex items-center gap-2 sm:gap-4 custom-xl:gap-8">
                  <div className="rounded-full w-24 h-24">
                    <Image loading="lazy" src={content.img} alt={''} />
                  </div>
                  <div>
                    <h2 className="truncate  font-semibold text-[#534988] text-[31px] lg:text-lg xl:text-2xl mb:text-xl">
                      {content.title}
                    </h2>
                    <p className="text-[17px]  text-[#786898] xl:text-sm mb:text-xs">
                      {content.date}
                    </p>
                  </div>
                </div>
                <div className="rounded-full pr-2 ">
                  <Image loading="lazy" className="" src={content.award} alt={''} />
                </div>
              </div>
              <p className="text-[#534988] text-lg leading-6 lg:text-sm  mb:text-xs xl:text-base pt-6  text-wrap  h-full overflow-scroll scrollbar-none">
                {content.paragraph}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorsComments;
