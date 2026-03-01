import React from 'react';
type propsType = {
  number: number;
  head: string;
  text: string;
};
const WorkSteps = ({ number, head, text }: propsType) => {
  return (
    <div className="  flex justify-start items-center mt-14 lg:mt-10 gap-9 mb:gap-3 mb:mt-5">
      <div className=" w-28 h-28 text-[#534988]  text-[90px] flex justify-center items-center bg-cardbg  rounded-2xl font-extrabold lg:w-20 lg:h-20 lg:text-[50px] mb:text-2xl  mb:h-16 mb:w-16 mb:p-4 xl:text-[70px] xl:w-24 xl:h-24">
        {number}
      </div>
      <div className="w-[80%]">
        <h2 className=" text-[39px] text-[#473171] font-semibold lg:text-2xl mb:text-base xl:text-[30px]">
          {head}
        </h2>
        <p className=" text-[22px] text-[#473171] lg:text-sm mb:text-xs xl:text-[17px] leading-tight">
          {text}
        </p>
      </div>
    </div>
  );
};

export default WorkSteps;
