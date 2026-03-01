import React from 'react';

const FormHeading = ({ heading, paragraph, className, paraclass }: any) => {
  return (
    <div>
      <h2
        className={`${className} text-[#534988] text-xl sm:text-3xl custom-xl:text-[40px] font-semibold`}
      >
        {heading}
      </h2>
      {paragraph && (
        <p
          className={`${paraclass} text-[#534988] text-sm sm:text-lg custom-xl:text-[26.4px]  mt-5 mb-5 leading-tight`}
        >
          {paragraph}
        </p>
      )}
    </div>
  );
};

export default FormHeading;
