'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import uparrow from "../../public/assets/icons/uparrowpurple.svg"
import dropdown from "../../public/assets/icons/purplearrowdown.svg"
import CheckboxInput from '@/app/ETutorSignup/components/CheckboxInput';
import cross from "../../public/assets/icons/crossnew.svg"
interface DropdownProps {
    options: string[];
    label: string;
    onSelect: (option: any) => void;
    className: string;
    initialSelectedOptions?: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ options, label, onSelect, className,initialSelectedOptions=[] }:any) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelectedOptions);

    const handleOptionClick =(option:string)=>{
        let newSelectedOptions;
        if(selectedOptions.includes(option)){
            newSelectedOptions = selectedOptions.filter(item=>item !==option)
        }
        else{
            newSelectedOptions =[...selectedOptions,option]
        }
        setSelectedOptions(newSelectedOptions)
        onSelect(newSelectedOptions)
    }
    const removeOption = (option: string) => {
        const newSelectedOptions = selectedOptions.filter(item => item !== option);
        setSelectedOptions(newSelectedOptions);
        onSelect(newSelectedOptions);
    };

    const toggleDropdown = (e:any) => {
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
        <div className="relative w-1/2 flex justify-center flex-col items-center">
            <div
                className='flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-darkBlue text-2xl mb:text-sm'
                onClick={toggleDropdown}
            >
                <button className={`${className} bg-purpleBtn focus:outline-none text-darkpurple`}>
                    {label}
                </button>
                {isDropdownOpen ? (
                    <Image  loading="lazy"  src={uparrow} alt='uparrow' />
                ) : (
                    <Image  loading="lazy"  src={dropdown} alt='dropdown' />
                )}
            </div>

            {isDropdownOpen && (
                <div className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-purple">
                    <div className="py-4 px-10 max-h-60 overflow-y-auto custom-scrollbar">
                        
                    {options.map((option:any) => (
    <div
        key={option}
        className="flex items-center p-2 text-darkBlue border-b px-5 py-2 border-darkBlue cursor-pointer para-global"
        onClick={() => handleOptionClick(option)}
    >
        <CheckboxInput
            id={`checkbox-${option}`}  // Add unique id here
            className='!py-0 !bg-transparent'
            clicked={selectedOptions.includes(option)}
        />
        <label 
            htmlFor={`checkbox-${option}`}  // Connect to checkbox using htmlFor
            className="cursor-pointer ml-2"
        >
            {option}
        </label>
    </div>
))}
                    </div>
                </div>
            )}

            

            
        </div>
        <div className='pl-8'>
        {selectedOptions && (
            <div className="flex flex-wrap items-start justify-start w-full mr-auto gap-2 mt-4 ">
                {selectedOptions.map((option) => (
                    <div key={option} className="flex items-center p-6 w-40 h-12 justify-between bg-[#6C5BAA] text-xl  text-white  rounded-full ">
                        <span>{option}</span>
                        <button onClick={() => removeOption(option)} className="ml-2 w-3 h-8 text-white focus:outline-none">
                            x
                        </button>
                    </div>
                ))}
            </div>
        )}
        </div>
        </>
    );
};

export default Dropdown;