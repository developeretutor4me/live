import React from 'react';

const InputHeading = ({ text, className }: any) => {
  return (
    <div className="w-fit">
      <p
        className={`${className} text-[#685AAD] text-[28px] font-medium xl:text-2xl lg:text-xl py-2 custom-xl:py-3 pl-8 mb:text-sm  `}
      >
        {text}
      </p>
    </div>
  );
};

export default InputHeading;
