'use client';
import { useState } from 'react';
import Head from 'next/head';
import FAQSection from './FAQSection';
import ContactForm from './ContactForm';
import ChatHistory from './ChatHistory';

interface HomeProps {
  profilePicture: any;
  name: any;
  email: string;
}
export default function Home({ profilePicture, name, email }: HomeProps) {
  const activetab = localStorage.getItem('history');
  const [currentPage, setCurrentPage] = useState<'faq' | 'contact' | 'history' | any>(
    activetab || 'faq'
  );

  return (
    <div className="h-full pl-1">
      {currentPage === 'faq' && (
        <FAQSection
          onNeedMoreHelp={() => setCurrentPage('contact')}
          onChatHistory={() => setCurrentPage('history')}
        />
      )}
      {currentPage === 'contact' && (
        <ContactForm currentPage={setCurrentPage} name={name} email={email} />
      )}
      {currentPage === 'history' && <ChatHistory profilePicture={profilePicture} name={name} />}
    </div>
  );
}
