'use client';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';

function DropDown() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <div className="">
      <Popover open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
        <PopoverTrigger asChild>
          <button
            className={`flex items-center justify-around w-[196px]  ${
              isDropDownOpen ? 'border border-[#534988]' : 'custom-2xl:border-none '
            } !origin-center transform ease-in transition-all duration-100 h-[51px] px-4 py-2 text-sm hover:bg-gray-50`}
          >
            <span className="text-[#534988] text-[16px] xl:text-[20px] 2xl:text-[23px]">
              English, USD
            </span>
            <ChevronDown
              className={`w-6 h-6 text-[#534988] transform transition-transform duration-300 ${
                isDropDownOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-[196px] border-[#534988] p-4 bg-white rounded-lg shadow-lg">
          <div className="space-y-3">
            <div>
              <p className="mb-2 text-[15.59px] text-purple-900">Language</p>
              <Select defaultValue="english">
                <SelectTrigger className="w-full py-5 px-3 rounded-lg  border-[#534988] text-[#534988]  text-[19.49px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="mb-2 text-sm text-purple-900">Currency</p>
              <Select defaultValue="usd">
                <SelectTrigger className="w-full py-5 px-3 rounded-lg  border-[#534988] text-[#534988]  text-[19.49px]">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DropDown;
