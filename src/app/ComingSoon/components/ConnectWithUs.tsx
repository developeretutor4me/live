import React from 'react'
import Image from 'next/image'
import insta from "../../../../public/assets/icons/insta.svg"
import tiktok from "../../../../public/assets/icons/tiktok.svg"
import twitter from "../../../../public/assets/icons/twitte.svg"
import youtube from "../../../../public/assets/icons/youtube.svg"
const ConnectWithUs = () => {
  return (
    <div className='w-[75%] mx-auto pt-96 mb:pt-40 lg:w-[85%] xl:w-[80%] xl:pt-80 lg:pt-72 mb:w-[90%]'>
      <h2 className='text-[4.4rem] text-darkBlue font-bold xl:text-[3.5rem] lg:text-[2.5rem] mb:text-[1.5rem]'>Connect with Us</h2>
        <p className='para-global mt-2 lg:mt-4 mb:mt-2 '>
        Follow us on social media to get the latest updates and sneak peeks:
        </p>
        <div className='w-[60%] flex justify-between items-center pt-16 lg:w-[70%] mb:w-[90%] mb:flex-wrap mb:gap-10 tb:w-[70%]'>
            <div className='w-[7rem] relative h-[7rem] mb:w-[4rem] mb:h-[4rem] mb:rounded-xl rounded-3xl bg-[#EDE8FA]'>
                    <Image  loading="lazy"  className='absolute left-5 top-7 mb:top-3 ' src={insta} alt={''} />
            </div>
            <div className='w-[7rem] relative h-[7rem] mb:w-[4rem] mb:h-[4rem] mb:rounded-xl rounded-3xl bg-[#EDE8FA]'>
                    <Image  loading="lazy"  className='absolute left-7 top-7 mb:top-3 mb:left-4' src={tiktok} alt={''} />
            </div>
            <div className='w-[7rem] relative h-[7rem] mb:w-[4rem] mb:h-[4rem] mb:rounded-xl rounded-3xl bg-[#EDE8FA]'>
                    <Image  loading="lazy"  className='absolute left-7 top-7 mb:top-3 mb:left-3' src={twitter} alt={''} />
            </div>
            <div className='w-[7rem] relative h-[7rem] mb:w-[4rem] mb:h-[4rem] mb:rounded-xl rounded-3xl bg-[#EDE8FA]'>
                    <Image  loading="lazy"  className='absolute left-5 top-7 mb:top-3 mb:left-3' src={youtube} alt={''} />
            </div>
        </div>
    </div>
  )
}

export default ConnectWithUs
