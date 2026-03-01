



import React, { useState } from 'react';
import downarrow from '../../../../public/downarrow.svg'
import Image from 'next/image';
const FAQSection = ({ onNeedMoreHelp, onChatHistory }: any) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "How are eTutors selected?", answer: "Answer for how eTutors are selected." },
    { question: "What subjects do you offer tutoring in?", answer: "List of subjects offered for tutoring." },
    { question: "How does the free lesson work?", answer: "Explanation of the free lesson process." },
    { question: "How do I schedule a session with my eTutor?", answer: "Steps to schedule a session with an eTutor." },
    { question: "What if I'm not satisfied with my eTutor?", answer: "Policy for handling dissatisfaction with eTutors." }
  ];

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" w-full h-fit flex flex-col custom-xl:flex-row">
      <div className='  w-full h-full'>
        <h2 className="text-lg sm:text-2xl custom-xl:text-[45px] custom-xl:leading-[2.25rem] font-bold text-[#685AAD] mb-0 ml-4">Frequently Asked Questions</h2>
        <ul className="mt-4 px-2 custom-xl:px-9  custom-xl:mt-10 ">
          {faqs.map((faq, index) => (
            <li key={index} className="py-4 custom-xl:py-11 text-xs sm:text-lg custom-xl:text-[28.15px] leading-[2rem]  border-b text-[#534988]  border-[#ada7cfc4] last:border-b-0  ">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left py-3  flex   gap-2 sm:gap-4 custom-xl:gap-7 items-center cursor-pointer text-[#534988] hover:bg-[#EDE8FA] transition-colors"
              >

                <Image loading="lazy" src={downarrow} alt="" className={` sm:h-4 custom-xl:h-7  h-2 w-2 sm:w-4 custom-xl:w-7 text-black font-thin transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`} />
                <span >{faq.question}</span>
              </button>
              {openIndex === index && (
                <div className="px-12 py-2 text-[#534988]">
                  {faq.answer}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>


      <div className="mt-6     custom-xl:pl-11 w-fit mx-auto  flex justify-end flex-col gap-2 custom-xl:gap-4 ">
        <button
          onClick={onChatHistory}
          className="w-full bg-[#8558F9] text-white text-base custom-xl:text-2xl py-3.5 px-24 rounded-xl hover:bg-opacity-90 transition-colors"
        >
          Chat&nbsp;history
        </button>
        <button
          onClick={onNeedMoreHelp}
          className="w-full bg-[#FF7777] text-white text-base custom-xl:text-2xl py-3.5 px-24 rounded-xl hover:bg-opacity-90 transition-colors"
        >
          Need&nbsp;More&nbsp;Help?
        </button>
      </div>



    </div>
  );
};

export default FAQSection;