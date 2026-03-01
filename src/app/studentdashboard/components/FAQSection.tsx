import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import downarrow from "../../../../public/downarrow.svg";
import Image from "next/image";

const FAQSection = ({ onNeedMoreHelp, onChatHistory }: any) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How are eTutors selected?",
      answer: "Answer for how eTutors are selected.",
    },
    {
      question: "What subjects do you offer tutoring in?",
      answer: "List of subjects offered for tutoring.",
    },
    {
      question: "How does the free lesson work?",
      answer: "Explanation of the free lesson process.",
    },
    {
      question: "How do I schedule a session with my eTutor?",
      answer: "Steps to schedule a session with an eTutor.",
    },
    {
      question: "What if I'm not satisfied with my eTutor?",
      answer: "Policy for handling dissatisfaction with eTutors.",
    },
  ];

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 1506);
    };

    // Initial check
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={`flex ${!isVisible && "flex-col" } gap-4 custom-xl:h-full scrollbar-none`} >
      {/* faq box */}
      <div className= {`${isVisible  ?"max-w-[957px]":"" }  order-2 custom-xl:max-h-[927px] h-fit custom-xl:h-full rounded-2xl sm:rounded-3xl custom-xl:rounded-[30px] px-4 sm:px-10 custom-xl:px-[78px] py-4 sm:py-10 custom-xl:py-16 sm:mt-5 w-full  flex flex-col custom-xl:flex-row bg-[#EDE8FA]`}>
        <div className="  w-full h-full py-1">
          <h2 className="text-lg sm:text-2xl custom-xl:text-[49.8px] custom-xl:mt-2  font-bold text-[#685AAD] mb-0">
            Frequently Asked Questions
          </h2>
          <ul className=" sm:mt-2 custom-xl:mt-8 ">
            {faqs.map((faq, index) => (
              <li
                key={index}
                className="py-2 custom-xl:py-4 custom-xl:py-[34.6px] text-sm sm:text-lg custom-xl:text-[24.61px]  border-b text-[#534988]  border-[#ada7cfc4] last:border-b-0  "
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left py-3  flex  gap-4  sm:gap-6 custom-xl:gap-[35px] items-center cursor-pointer text-[#534988] hover:bg-[#EDE8FA] transition-colors"
                >
                  <Image
                    loading="lazy"
                    src={downarrow}
                    alt=""
                    className={` h-3 custom-xl:h-5   w-3 custom-xl:w-[24.31px] text-black font-thin transition-transform ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                  <span>{faq.question}</span>
                </button>
                {openIndex === index && (
                  <div className="px-12 py-2 text-[#534988]">{faq.answer}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

   
      {/* button box */}
      <div className={`${isVisible && "absolute right-0"} order-1  flex justify-end flex-col items-end`}>
      
        <div className={`${!isVisible && "hidden"} bg-[#EDE8FA] rounded-l-2xl px-12 py-12 mt-[84px]  w-[486.59px] h-[227.25px] text-lg sm:text-2xl custom-xl:text-[52.67px] flex  flex-col justify-center   font-bold text-[#685AAD] `}>
          <h1 className="py-4">Frequently&nbsp;Asked</h1>
          <h1 className="py-4">Questions</h1>
        </div>
      

        <div className="sm:mt-[38px]    w-full mx-auto  flex  flex-col items-center justify-center gap-2 sm:gap-3 custom-lg:gap-5  ">
          <button
            onClick={onChatHistory}
            className=" bg-[#8558F9] text-white  text-[17px] md:text-[24px] custom-lg:text-[27.49px] font-medium py-[4px] md:py-[15px] custom-lg:py-[17px] px-[40px] md:px-[80px] custom-lg:px-[110px] rounded-full hover:bg-opacity-90 transition-colors"
          >
            Ticket&nbsp;Inbox
          </button>
          <button
            onClick={onNeedMoreHelp}
            className=" bg-[#685aad] text-white text-[17px] md:text-[24px] custom-lg:text-[27.49px] font-medium py-[4px] md:py-[15px] custom-lg:py-[17px] px-[23px] md:px-[57px] custom-lg:px-[83px] rounded-full hover:bg-opacity-90 transition-colors"
          >
            Need&nbsp;More&nbsp;Help?
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
