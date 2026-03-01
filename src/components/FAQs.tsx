'use client';
import React, { useState } from 'react';
import downarrow from '../../public/downarrowhome.svg';
import uparrow from '../../public/assets/icons/uparrow.svg';
import Image from 'next/image';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  display?: string;
  isOpen?: boolean;
  onClick?: () => void;
}

interface FAQsProps {
  faqData?: FAQItem[]; // Array of FAQ items
  display?: string;
  isOpen?: boolean;
}

const FAQ: React.FC<FAQItem> = ({ question, answer, isOpen = false, onClick }) => {
  return (
    <div className="border-b last:border-b-0 border-[#B5B1D1]">
      <div className="py-12 xl:py-8 lg:py-6 mb:py-4 ">
        <div className="flex  items-center gap-x-8 cursor-pointer" onClick={onClick}>
          {isOpen ? (
            <Image
              loading="lazy"
              className="w-[28px] translate rotate-180 mb:h-3 mb:w-3"
              src={downarrow}
              alt="Up Arrow"
            />
          ) : (
            <Image
              loading="lazy"
              className="w-[28px]   mb:h-3 mb:w-3"
              src={downarrow}
              alt="Down Arrow"
            />
          )}
          <h2 className="text-[28px] text-[#473171] xl:text-[23px] lg:text-xl">{question}</h2>
        </div>
      </div>
      {isOpen && (
        <p className="text-[28px]  text-[#473171] pl-12 pb-10 xl:text-[23px] lg:text-xl mb:text-xs mb:pl-10">
          {answer}
        </p>
      )}
    </div>
  );
};

const FAQs: React.FC<{
  faqData: any[];
  display: string;
  morequestion: string;
}> = ({ faqData, display, morequestion }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Check if faqData is valid
  if (!faqData || !Array.isArray(faqData)) {
    return <div>No FAQs available</div>;
  }

  return (
    <div className={`w-full pr-0 flex justify-between m-auto mb:flex-col-reverse mb:px-0 mb:pb-16`}>
      <div className="lg:w-1/2 ps-[40px] md:ps-[50px] lg:ps-[100px] xl:ps-[120px] 2xl:ps-[150px]">
        {faqData.map((faq, index) => (
          <FAQ
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>

      <div
        className={`lg:w-1/2 mt-20 h-fit right-0 left-auto flex flex-col items-end mb:top-0 mb:right-0 ${display}`}
      >
        <div className="bg-cardbg px-16 py-12 rounded-l-3xl flex flex-col justify-end">
          <h2 className="text-[20px] lg:text-[40px] xl:text-[40px] 2xl:text-[60px] 3xl:text-[73px] text-darkBlue font-extrabold leading-tight">
            Frequently Asked <br></br> Questions
          </h2>
          <Link
            href="/Faqs"
            className={`${morequestion} text-right text-customBlue text-[22.91px] leading-[1.75rem] underline font-bold mt-3.5 lg:text-base`}
          >
            More questions?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
