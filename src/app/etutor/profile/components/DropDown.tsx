"use client";

import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropDownProps {
  options: DropdownOption[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  selected,
  onSelect,
  placeholder = "Sort by",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleClick = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const selectedLabel = useMemo(() => {
    const found = options.find((opt) => opt.value === selected);
    return found?.label ?? placeholder;
  }, [selected, options, placeholder]);

  const renderedOptions = useMemo(() => {
    return options.map((option) => (
      <div
        key={option.value}
        role="option"
        aria-selected={selected === option.value}
        className="py-2 cursor-pointer flex items-center group"
        onClick={() => handleClick(option.value)}
      >
        <div className="border-b border-white py-2 group-last:border-b-0 flex gap-4 w-full px-4 max-w-[80%] truncate">
          <span
            title={option.label}
            className="ml-2 text-xl text-white truncate"
          >
            {option.label}
          </span>
        </div>
      </div>
    ));
  }, [options]);

  return (
    <div
      className={`min-w-[15rem] custom-xl:min-w-[20rem] 2xl:min-w-[26.7rem] ${className}`}
    >
      <div className="relative select-none w-full">
        <div
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") toggleDropdown();
            if (e.key === "Escape") setIsOpen(false);
          }}
          onClick={toggleDropdown}
          className="w-full bg-[#B4A5D7] text-white font-normal text-sm custom-lg:text-xl pr-8 pl-5 py-[7px] custom-2xl:py-2.5 rounded-lg cursor-pointer flex justify-between items-center"
        >
          <span className="custom-2xl:my-1 capitalize">{selectedLabel}</span>
          {isOpen ? (
            <ChevronUp size={22} className="text-white" />
          ) : (
            <ChevronDown size={22} className="text-white" />
          )}
        </div>

        {isOpen && (
          <div
            onMouseLeave={() => setIsOpen(false)}
            className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3 border border-white"
          >
            <div id="style-2" className="max-h-[16.4rem] overflow-y-scroll">
              {renderedOptions}
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        #style-2::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: #c9bbef;
        }

        #style-2::-webkit-scrollbar {
          width: 5px;
          background-color: transparent;
        }

        #style-2::-webkit-scrollbar-thumb {
          border-radius: 10px;

          background-color: white;
        }
      `}</style>
    </div>
  );
};

export default DropDown;
