import React from 'react'
import NavbarSoon from '../NavbarSoon'
import './HeroSoon.css'
const HeroSoon = () => {
  return (
    <div className='hero_soon h-[90vh] flex flex-col justify-center items-center text-center px-20 mb:px-6 '>
      <h2 className='text-[13rem] font-extrabold text-darkBlue leading-tight xl:text-[10rem] lg:text-[8rem] mb:text-[3.5rem]'>Coming Soon </h2>
      <p className='text-3xl text-[#473171] mt-16 max-w-3xl font-medium xl:text-2xl xl:mt-12 lg:text-xl lg:max-w-xl lg:mt-8 mb:text-sm mb:max-w-sm mb:mt-6'>Sign up for our newsletter to receive updates about our launch, services, and how you can join us as an eTutor!</p>
      <div className='flex justify-center items-center gap-3 pt-24 mb:flex-col mb:pt-12 tb:flex-row'>
        <div className='bg-[#EDE8FA] h-16 flex items-center justify-center rounded-full px-10 py-3 w-[30rem]  text-darkBlue text-2xl xl:w-[25rem] lg:w-[20rem] mb:max-w-72 mb:text-xl mb:h-12'>
          <input type="text" className='bg-transparent border-none w-full  placeholder:text-[#534988] focus:outline-none' placeholder='Email Address' />
        </div>
        <div className='w-48 h-16 flex items-center justify-center cursor-pointer rounded-full text-2xl font-bold text-white bg-[#8653FF] lg:w-40 mb:w-32 mb:h-12 mb:text-xl'>
          Sing up
        </div>
        
      </div>
    </div>
  )
}

export default HeroSoon
