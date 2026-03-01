'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import sortIcon from '../../../../public/assets/icons/sorticon.svg';
import uparrow from '../../../../public/assets/icons/uparrowpurple.svg';
import searchIcon from '../../../../public/assets/icons/searchicon.svg';
import { useTeacher } from '@/app/admin/hooks/useTeacher';
interface SearchTutorprops {
  setfilteredTutors: any;
}

const SearchTutor = ({ setfilteredTutors }: SearchTutorprops) => {
  const { teacher, isLoading3, error3 } = useTeacher();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const subjects = ['Joining Date', 'Alphabetical order (a-z)', 'Alphabetical order (z-a)'];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (teacher) {
      let filteredResults = [...teacher];

      // Apply search filter
      if (searchQuery) {
        filteredResults = filteredResults.filter(tutor =>
          tutor?.contactInformation?.firstName?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply sorting
      if (sortOption) {
        switch (sortOption) {
          case 'Joining Date':
            filteredResults.sort(
              (a, b) =>
                new Date(b?.user?.createdAt).getTime() - new Date(a?.user?.createdAt).getTime()
            );
            break;
          case 'Alphabetical order (a-z)':
            filteredResults.sort((a, b) =>
              (a?.contactInformation?.firstName || '').localeCompare(
                b?.contactInformation?.firstName || ''
              )
            );
            break;
          case 'Alphabetical order (z-a)':
            filteredResults.sort((a, b) =>
              (b?.contactInformation?.firstName || '').localeCompare(
                a?.contactInformation?.firstName || ''
              )
            );
            break;
          default:
            break;
        }
      }

      setfilteredTutors(filteredResults);
    }
  }, [searchQuery, sortOption, teacher, setfilteredTutors]);

  if (isLoading3) {
    return (
      <div className="flex justify-center items-center min-h-[400px] w-full">
        <div className="relative">
          <div className="mt-6 text-center">
            <p className="text-[#8653ff] font-semibold text-lg animate-pulse">Loading eTutors...</p>
            <div className="flex justify-center mt-2 space-x-1">
              <div
                className="w-2 h-2 bg-[#ab87ff] rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              ></div>
              <div
                className="w-2 h-2 bg-[#8653ff] rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              ></div>
              <div
                className="w-2 h-2 bg-[#ab87ff] rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              ></div>
            </div>
          </div>
        </div>

        <style jsx>
          {`
            @keyframes bounce {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            .animate-bounce {
              animation: bounce 1s infinite;
            }
          `}
        </style>
      </div>
    );
  }

  if (error3) {
    return (
      <div className="flex justify-center items-center min-h-[400px] w-full">
        <div className="text-center max-w-md mx-auto p-8">
          {/* Error Icon */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
            {/* Animated ring */}
            <div className="absolute inset-0 w-20 h-20 border-4 border-red-200 rounded-full animate-ping opacity-20"></div>
          </div>

          {/* Error Message */}
          <h3 className="text-2xl text-gray-800 mb-3">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {error3?.message || "We're having trouble loading the eTutors. Please try again later."}
          </p>

          {/* Decorative elements */}
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-[#ab87ff] rounded-full animate-pulse"></div>
            <div
              className="w-3 h-3 bg-[#8653ff] rounded-full animate-pulse"
              style={{ animationDelay: '0.2s' }}
            ></div>
            <div
              className="w-3 h-3 bg-[#ab87ff] rounded-full animate-pulse"
              style={{ animationDelay: '0.4s' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  const handleSort = (option: string) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full mt-[1rem] sm:mt-[1.5rem] md:mt-[2rem] px-2 sm:px-4 py-4 sm:py-6 md:py-8">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center sm:justify-end">
        {/* Sort By Dropdown */}
        <div
          className="relative w-full sm:w-[180px] md:w-[180px] lg:w-[240px] xl:w-[300px] 2xl:w-[467px]"
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div
            onClick={toggleDropdown}
            className="bg-white border-2 border-[#534988] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 w-full cursor-pointer flex items-center justify-between hover:border-purple-300 transition-colors"
          >
            <span className="text-[#8780ac] text-[18px] md:text-[25px] xl:text-[28px] 2xl:text-[32px]">
              {sortOption || 'sort by'}
            </span>
            {isDropdownOpen ? (
              <Image
                loading="lazy"
                alt="sort"
                className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
                src={uparrow}
              />
            ) : (
              <Image
                loading="lazy"
                alt="sort"
                className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
                src={sortIcon}
              />
            )}
          </div>

          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border-2 border-[#534988] rounded-2xl shadow-lg">
              <div className="px-4">
                {subjects.map((subject, index) => (
                  <div
                    key={subject}
                    onClick={() => handleSort(subject)}
                    className={`px-3 sm:px-4 py-2 text-[16px] sm:text-[18px] md:text-[25px] xl:text-[28px] 2xl:text-[32px] text-[#534988] hover:text-[#6C5BAA] cursor-pointer transition-colors ${
                      index !== subjects.length - 1 ? 'border-b border-[#534988]' : ''
                    }`}
                  >
                    {subject}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-[180px] md:w-[180px] lg:w-[240px] xl:w-[300px] 2xl:w-[467px]">
          <div className="bg-white border-2 border-[#534988] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 w-full flex items-center justify-between hover:border-purple-300 transition-colors">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="search by name"
              className="w-[85%] bg-transparent text-[#534988] placeholder-[#8780ac] focus:outline-none text-[18px] md:text-[25px] xl:text-[28px] 2xl:text-[32px]"
            />
            <Image
              loading="lazy"
              alt="search"
              className="w-4 h-4 text-gray-400 ml-2"
              src={searchIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTutor;
