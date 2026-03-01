'use client';
import { useState } from 'react';
import Head from 'next/head';
import FAQSection from './FAQSection';
import ContactForm from './ContactForm';
import ChatHistory from './ChatHistory';

export default function Home({ profilePicture, name }: any) {
  const activetab = localStorage.getItem('history');
  const [currentPage, setCurrentPage] = useState<'faq' | 'contact' | 'history' | any>(
    activetab || 'faq'
  );

  return (
    <div
      className={`h-[calc(100vh-80px)] w-full max-w-[1376px] mb-8 mx-auto ${
        currentPage == 'history' && 'w-full custom-xl:max-w-[89%] mx-auto px-4 sm:px-8 py-7'
      } ${
        currentPage == 'contact' && 'max-w-[96%] px-9 py-11'
      } bg-[#EDE8FA] justify-center px-7 custom-xl:px-[73px] rounded-3xl py-14 overflow-hidden`}
    >
      {currentPage === 'faq' && (
        <FAQSection
          onNeedMoreHelp={() => setCurrentPage('contact')}
          onChatHistory={() => setCurrentPage('history')}
        />
      )}
      {currentPage === 'contact' && <ContactForm />}
      {currentPage === 'history' && <ChatHistory profilePicture={profilePicture} name={name} />}
    </div>
  );
}
