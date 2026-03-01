import React from 'react';

const PackageHero = () => {
  return (
    <div className="flex flex-col justify-center items-center xl:py-44 lg:py-26 py-[10.5rem] mb:py-12 text-center">
      <h2 className="text-darkBlue 2xl:text-[74.5px] text-5xl font-semibold mb:text-3xl">
        Online Tutoring <span className="text-customBlue">Packages</span>{' '}
      </h2>
      <p className="2xl:!text-[42px] !leading-tight custom-xl:leading-none  font-medium  text-[#473171] xl:text-[30px] !mb:text-base mt-11  lg:text-2xl  ">
        Our pricing is straightforward, flexible, and cost-effective for both group and individual
        sessions
      </p>
    </div>
  );
};

export default PackageHero;
