'use client';
import { ReactNode } from 'react';
import Authbackground from '../../../public/assets/signup/auth-background.png';
import Navabr from './Navabr';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Authbackground.src})` }}
    >
      <Navabr />

      <div
        className={`flex items-center justify-center ${showFooter ? 'relative min-h-[calc(100vh-150px)]' : 'min-h-[calc(100vh-90px)]'}  px-4`}
      >
        {children}
      </div>

      {showFooter && (
        <div className="text-center pb-8 pt-2">
          <p className="text-[#473171] text-[16px]">
            eTutor4me Inc. © Copyright 2025. All Rights Reserved.
          </p>
        </div>
      )}
    </div>
  );
};

export default Layout;
