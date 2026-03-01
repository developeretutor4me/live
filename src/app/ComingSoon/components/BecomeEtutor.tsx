import React from 'react'
import Image from 'next/image'
import icon1 from "../../../../public/assets/icons/icon1.svg"
import icon2 from "../../../../public/assets/icons/icon2.svg"
import icon3 from "../../../../public/assets/icons/icon3.svg"
import icon4 from "../../../../public/assets/icons/icon4.svg"
const BecomeEtutor = () => {
  return (
    <div className='w-[75%] mx-auto pt-48 mb:pt-20 lg:w-[85%] xl:w-[80%] lg:pt-24 mb:w-[90%]'>
      <h2 className='text-[6rem] text-darkBlue font-extrabold xl:text-[4rem] lg:text-[3rem] mb:text-[2rem]'>Why become an eTutor with us ?</h2>

      <div className='flex justify-between mb:flex-col mb:py-4 mb:w-full mt-28 lg:mt-20 mb:mt-6'>

            <div className='flex  items-start gap-12  w-[43%]  xl:w-[45%] lg:w-[45%] lg:gap-10 mb:gap-8 mb:w-full mb:m-auto mb:py-4 tb:w-full'>
              <div className='w-24 h-24  bg-cardbg rounded-xl relative lg:w-24 lg:h-24 mb:w-20 mb:h-20'>
                <Image  loading="lazy"  alt='' className='absolute left-[20px] bottom-[-10px] mb:left-[15px]  mb:h-full ' src={icon1} />
              </div>
              <div className='text-darkBlue  mb:w-2/3'>
                <h2 className='  text-[3rem] font-extrabold mb:text-lg xl:text-4xl lg:text-3xl'>Work from Anywhere</h2>
                <p className='max-w-[28rem] leading-tight lg:max-w-[20rem] mt-3 text-2xl bold-medium mb:text-[12px] mb:max-w-none lg:text-[20px] xl:text-2xl mb:mt-2'>
                  Enjoy the freedom to tutor from anywhere
                  in the world, whether you&apos;re at home,
                  in a café, or traveling, and connect with
                  students online for valuable sessions.
                </p>
              </div>
            </div>

            <div className='flex  items-start gap-12  w-[43%]  xl:w-[45%] lg:w-[45%] lg:gap-10 mb:gap-8 mb:w-full mb:m-auto mb:py-4 tb:w-full'>
              <div className='w-24 h-24  bg-cardbg rounded-xl relative lg:w-24 lg:h-24 mb:w-20 mb:h-20'>
                <Image  loading="lazy"  alt='' className='absolute left-[20px] bottom-[-10px] mb:left-[15px]  mb:h-full ' src={icon2} />
              </div>
              <div className='text-darkBlue  mb:w-2/3'>
                <h2 className='  text-[3rem] font-extrabold mb:text-lg xl:text-4xl lg:text-3xl'>Flexible Scheduling</h2>
                <p className='max-w-[28rem] leading-tight lg:max-w-[20rem] mt-3 text-2xl bold-medium mb:text-[12px] mb:max-w-none lg:text-[20px] xl:text-2xl mb:mt-2'>
                As an eTutor, you control your schedule,
fitting sessions around your commitments
with our flexible platform.
                </p>
              </div>
            </div>
           
          </div>
      <div className='flex justify-between mb:flex-col mb:py-4 mb:w-full mt-28 lg:mt-20 mb:mt-0'>

            <div className='flex  items-start gap-12  w-[43%]  xl:w-[45%] lg:w-[45%] lg:gap-10 mb:gap-8 mb:w-full mb:m-auto mb:py-4 tb:w-full mb:pt-0'>
              <div className='w-24 h-24  bg-cardbg rounded-xl relative lg:w-24 lg:h-24 mb:w-20 mb:h-20'>
                <Image  loading="lazy"  alt='' className='absolute left-[20px] bottom-[-10px] mb:left-[15px]  mb:h-full ' src={icon3} />
              </div>
              <div className='text-darkBlue  mb:w-2/3'>
                <h2 className='  text-[3rem] font-extrabold mb:text-lg xl:text-4xl lg:text-3xl'>Constant Pay Increases</h2>
                <p className='max-w-[28rem] leading-tight lg:max-w-[20rem] mt-3 text-2xl bold-medium mb:text-[12px] mb:max-w-none lg:text-[20px] xl:text-2xl mb:mt-2'>
                Your dedication and hard work lead to constant
pay increases, as leveling up and student success
directly boost your earnings.
                </p>
              </div>
            </div>

            <div className='flex  items-start gap-12  w-[43%]  xl:w-[45%] lg:w-[45%] lg:gap-10 mb:gap-8 mb:w-full mb:m-auto mb:py-4 tb:w-full'>
              <div className='w-24 h-24  bg-cardbg rounded-xl relative lg:w-24 lg:h-24 mb:w-20 mb:h-20'>
                <Image  loading="lazy"  alt='' className='absolute left-[20px] bottom-[-10px] mb:left-[15px]  mb:h-full ' src={icon1} />
              </div>
              <div className='text-darkBlue  mb:w-2/3'>
                <h2 className='  text-[3rem] font-extrabold mb:text-lg xl:text-4xl lg:text-3xl'>Gamified Tutoring</h2>
                <p className='max-w-[28rem] leading-tight lg:max-w-[20rem] mt-3 text-2xl bold-medium mb:text-[12px] mb:max-w-none lg:text-[20px] xl:text-2xl mb:mt-2'>
                Our unique system lets you level up
like in a game, with your progress based
on tutoring effectiveness, activity, and
community involvement
                </p>
              </div>
            </div>
           
          </div>
    </div>
  )
}

export default BecomeEtutor
