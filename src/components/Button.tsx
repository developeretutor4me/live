import React from 'react';
type propsType = {
  btnName: string;
  className: string;
  onClick?: (e: any) => void;
};
const Button = ({ btnName, className, onClick }: propsType) => {
  return (
    <button
      onClick={onClick}
      className={`${className} text-[34px]  font-extrabold bg-customBlue  px-12 py-4 border-none focus:outline-none text-white rounded-full lg:text-2xl   xl:text-2xl  mb:px-8 mb:py-4 mb:text-base`}
    >
      {btnName}
    </button>
  );
};

export default Button;
