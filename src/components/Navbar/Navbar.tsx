'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../../public/assets/logo.png';
import hamburger from '../../../public/assets/icons/hamburger-button.svg';
import cross from '../../../public/assets/icons/crossicon.svg';
import Link from 'next/link';
import Button from '../Button';
import VLine from '../../../public/VerticalLine3.svg';
import { usePathname } from 'next/navigation';
import DropDown from './DropDown';

const Navbar = () => {
  const path = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // class="flex justify-between items-center py-12  px-[100px] mx-auto  mb:p-5 mb:flex-col xl:px-16 lg:px-10 lg:py-8 "

  return (
    <div className="relative flex justify-between items-center py-10 px-3 lg:px-12 xl:px-10 2xl:px-16 mx-auto">
      {/* Desktop Navigation */}
      <div className="hidden custom-nav:flex items-center justify-between w-full">
        {/* Left Section - Logo */}
        <div className="flex items-center w-[16%]">
          <Link href="/">
            <Image
              loading="lazy"
              className="w-[140px] xl:w-[160px]"
              src={logo}
              alt="eTUTOR4ME Logo"
            />
          </Link>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="flex items-center justify-center w-[47%]">
          <ul className="flex items-center justify-between w-full mx-5 text-[#473171]">
            <Link href="/" passHref>
              <li
                className={`flex items-center justify-center leading-tight px-2 ${
                  path === '/'
                    ? 'text-[18px] xl:text-[20px] 2xl:text-[23px] 3xl:text-[25px] border-b-2 border-[#473171] font-medium'
                    : 'text-[16px] xl:text-[18px] 2xl:text-[23px] 3xl:text-[23px] hover:text-[#a8a3c3] transition-colors'
                }`}
              >
                How&nbsp;it&nbsp;works
              </li>
            </Link>
            <Link href="/ETutorSearch">
              <li
                className={`flex items-center justify-center leading-tight px-2 ${
                  path === '/ETutorSearch'
                    ? 'text-[18px] xl:text-[20px] 2xl:text-[23px] 3xl:text-[25px] border-b-2 border-[#473171] font-medium'
                    : 'text-[16px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[23px] hover:text-[#a8a3c3] transition-colors'
                }`}
              >
                eTutors
              </li>
            </Link>
            <Link href="/Packages">
              <li
                className={`flex items-center justify-center leading-tight px-2 ${
                  path === '/Packages'
                    ? 'text-[16px] xl:text-[20px] 2xl:text-[23px] 3xl:text-[25px]  border-b-2 border-[#473171] font-medium'
                    : 'text-[14px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[23px]  hover:text-[#a8a3c3] transition-colors'
                }`}
              >
                Packages
              </li>
            </Link>
            <Link href="/Faqs">
              <li
                className={`flex items-center justify-center leading-tight px-2 ${
                  path === '/Faqs'
                    ? 'text-[16px] xl:text-[20px] 2xl:text-[23px] 3xl:text-[25px]  border-b-2 border-[#473171] font-medium'
                    : 'text-[14px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[23px]  hover:text-[#a8a3c3] transition-colors'
                }`}
              >
                FAQs
              </li>
            </Link>
            <li className="text-[#a8a3c3]">
              <Image src={VLine} alt="" className="block" />
            </li>
            <Link href="/for-etutor">
              <li
                className={`flex items-center justify-center leading-tight px-2 ${
                  path === '/for-etutor'
                    ? 'text-[16px] xl:text-[20px] 2xl:text-[23px] 3xl:text-[25px]  border-b-2 border-[#473171] font-medium'
                    : 'text-[14px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[23px]  hover:text-[#a8a3c3] transition-colors'
                }`}
              >
                For&nbsp;eTutors
              </li>
            </Link>
          </ul>
        </div>

        {/* Right Section - Language Selector and Auth Buttons */}
        <div className="flex items-center justify-evenly w-[37%] 2xl:ps-[50px] 3xl:ps-[60px] 2xl:pe-[5px]">
          <DropDown />

          <Link
            href="/signin"
            className="text-[16px] xl:text-[20px] 2xl:text-[24px] font-medium py-4 px-8 text-[#8653FF] focus:outline-none hover:text-[#a8a3c3] transition-colors"
          >
            SIGN&nbsp;IN
          </Link>

          <Link
            href="/SignupAs"
            className="text-[16px] xl:text-[20px] 2xl:text-[24px] font-extrabold py-4 px-8 rounded-full bg-[#8653FF] hover:bg-[#7A6BD9] text-white transition-colors"
          >
            SIGN&nbsp;UP
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="custom-nav:hidden flex items-center justify-between w-full">
        {/* Mobile Logo */}
        <Link href="/">
          <Image loading="lazy" className="w-[120px]" src={logo} alt="eTUTOR4ME Logo" />
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-3">
          <DropDown />
          <button onClick={toggleMenu} className="p-2">
            <Image
              loading="lazy"
              className="h-6 w-6"
              src={isOpen ? cross : hamburger}
              alt={isOpen ? 'Close Menu' : 'Open Menu'}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 border-t min-h-screen">
            <div className="px-4 py-6">
              <ul className="flex flex-col space-y-4 text-[#473171]">
                <Link href="/" onClick={closeMenu}>
                  <li
                    className={`py-2 ${path === '/' ? 'font-medium border-l-4 border-[#473171] pl-3' : 'pl-3'}`}
                  >
                    How it works
                  </li>
                </Link>
                <Link href="/ETutorSearch" onClick={closeMenu}>
                  <li
                    className={`py-2 ${path === '/ETutorSearch' ? 'font-medium border-l-4 border-[#473171] pl-3' : 'pl-3'}`}
                  >
                    eTutors
                  </li>
                </Link>
                <Link href="/Packages" onClick={closeMenu}>
                  <li
                    className={`py-2 ${path === '/Packages' ? 'font-medium border-l-4 border-[#473171] pl-3' : 'pl-3'}`}
                  >
                    Packages
                  </li>
                </Link>
                <Link href="/Faqs" onClick={closeMenu}>
                  <li
                    className={`py-2 ${path === '/Faqs' ? 'font-medium border-l-4 border-[#473171] pl-3' : 'pl-3'}`}
                  >
                    FAQs
                  </li>
                </Link>
                <Link href="/for-etutor" onClick={closeMenu}>
                  <li
                    className={`py-2 ${path === '/for-etutor' ? 'font-medium border-l-4 border-[#473171] pl-3' : 'pl-3'}`}
                  >
                    For eTutors
                  </li>
                </Link>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link href="/signin" onClick={closeMenu}>
                  <button className="w-full text-left text-[#473171] font-medium py-2">
                    SIGN IN
                  </button>
                </Link>
                <Link href="/SignupAs" onClick={closeMenu}>
                  <Button
                    className="w-full mt-3 text-[14px] py-2 px-4 rounded-full bg-[#8653FF] hover:bg-[#7A6BD9] text-white font-medium"
                    btnName="SIGN UP"
                  />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
