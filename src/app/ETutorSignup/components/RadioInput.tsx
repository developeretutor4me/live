import React from 'react';

const RadioInput = ({ id, name, value, checked, onChange, label }: any) => {
  return (
    <div className="flex items-center py-2 custom-xl:py-4">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`w-6 custom-xl:w-8 h-6 custom-xl:h-8 border rounded-full cursor-pointer appearance-none hover:border-none hover:bg-lightpurple transition-all duration-300 ${
          checked ? 'border-[#685AAD] border-4 custom-xl:border-8' : 'border-[#685AAD] border-[3px]'
        } focus:outline-none`}
      />
      <label className="text-[#685AAD] text-xl custom-xl:text-2xl pl-3 custom-xl:pl-6" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
