import React from 'react';
import Button from '@/components/Button';
import './TutorsList.css';
import { useRouter } from 'next/navigation';
interface SeeTutorsListprops {
  filteredTutors: any;
}
const SeeTutorsList = ({ filteredTutors }: SeeTutorsListprops) => {
  const router = useRouter();

  const seeFullListHandler = () => {
    localStorage.setItem('activeSidebarItem', 'Find eTutor');
    localStorage.setItem('activeTab', 'trial');
    router.push('/SignupAs');
  };

  return (
    <div className="tutor_list flex max-w-[1776.84px] mx-auto items-center sm:gap-2 justify-center flex-col bg-cover custom-lg:pb-[130px] custom-lg:pt-[150px] mb-[16rem] mt-48  bg-center  w-full rounded-3xl custom-lg:rounded-[35px]    mb:gap-0 text-center mb:px-0 mb:py-5 mb:my-8 xl:py-50">
      <h2 className="text-[72px] text-[#8179A7] mb:text-xl lg:text-[40px] xl:text-[50px]">
        {filteredTutors?.length}+&nbsp;More eTutors found
      </h2>

      <h1 className="mb:text-2xl text-[86px] leading-none font-extrabold text-darkBlue lg:text-5xl  xl:text-6xl ">
        Sign up to see the full list
      </h1>

      <div className="mt-[115px] mb:mt-8">
        <Button
          btnName="SEE THE FULL LIST"
          className="py-[25px] px-20 mb:py-4 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-customOrange/25 active:scale-95 hover:animate-pulse cursor-pointer"
          onClick={seeFullListHandler}
        />
      </div>
    </div>
  );
};

export default SeeTutorsList;
