import { useState } from 'react';
import Head from 'next/head';
import FAQSection from './FAQSection';
import ContactForm from './ContactForm';
import ChatHistory from './ChatHistory';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'faq' | 'contact' | 'history'>('faq');

  return (
    <div className={`min-h-screen  w-full ${currentPage == "history" ? "w-full custom-xl:max-w-[89%] mx-auto  px-4  sm:px-8 py-9 mt-16 ml-20":currentPage == "contact"?"mt-12":"-mt-3 py-14"} ${currentPage == "contact" && "max-w-[98%] px-8 py-11 mx-auto min-h-screen h-full "}   bg-[#EDE8FA] justify-center px-14 rounded-3xl `}>

      
        {currentPage === 'faq' && <FAQSection onNeedMoreHelp={() => setCurrentPage('contact')} onChatHistory={() => setCurrentPage('history')} />}
        {currentPage === 'contact' && <ContactForm />}
        {currentPage === 'history' && <ChatHistory />}
      


    </div>
  );
}
