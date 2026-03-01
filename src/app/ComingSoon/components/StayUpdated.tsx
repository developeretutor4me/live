import React from 'react'

const StayUpdated = () => {
  return (
    <div className='w-[75%] mx-auto pt-72 mb:pt-20 lg:w-[85%] xl:w-[80%] xl:pt-52 lg:pt-40 mb:w-[90%]' >
      <div>
        <h2 className='text-[5rem] text-darkBlue font-extrabold xl:text-[4rem] lg:text-[3rem] mb:text-[1.8rem]'>Be Part of the eTutor4Me Journey!</h2>
        <p className='para-global mt-8 lg:mt-4 mb:mt-2 '>
        We&apos;re on a mission to redefine tutoring. Check back soon, and be ready to register as one of our eTutors. Your journey with us is just beginning!
        </p>
      </div>
      <div className='mt-28 xl:mt-20 lg:mt-12 mb:mt-6'>
        <h2 className='text-[4.4rem] text-darkBlue font-bold xl:text-[3.5rem] lg:text-[2.5rem] mb:text-[1.5rem]'>Stay Updated!</h2>
        <p className='para-global mt-5 lg:mt-4 mb:mt-2 '>
        Sign up for our newsletter to receive updates about our launch, services, and how you can join us as an eTutor!
        </p>
      </div>
      <div className='flex justify-center items-center gap-3 pt-24 mb:flex-col mb:pt-12 tb:flex-row mb:items-start mb:justify-center'>
        <div className='bg-[#EDE8FA] h-16 flex items-center justify-center rounded-full px-10 py-3 w-[30rem]  text-darkBlue text-2xl xl:w-[25rem]  mb:max-w-72 mb:text-xl mb:h-12'>
          <input type="text" className='bg-transparent border-none w-full  placeholder:text-[#534988] focus:outline-none' placeholder='Email Address' />
        </div>
        <div className='w-48 h-16 flex items-center justify-center cursor-pointer rounded-full text-2xl font-bold text-white bg-[#8653FF] lg:w-40 mb:w-32 mb:h-12 mb:text-xl'>
          Sing up
        </div>
        
      </div>
    </div>
  )
}

export default StayUpdated
