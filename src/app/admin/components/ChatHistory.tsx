import React from "react";
import messageicon from "../../../../public/whitemessageicon.svg";
import Image from "next/image";
const ChatHistory = () => {
  const chatHistory = [
    {
      topic: '"eTokies counter not working...',
      date: "SAT / 17 - jun - 2024",
      assistant: "Jackson",
    },
    {
      topic: '"eTokies counter not working...',
      date: "SAT / 17 - jun - 2024",
      assistant: "Jackson",
    },
    {
      topic: '"eTokies counter not working...',
      date: "SAT / 17 - jun - 2024",
      assistant: "Jackson",
    },
    {
      topic: '"eTokies counter not working...',
      date: "SAT / 17 - jun - 2024",
      assistant: "Jackson",
    },
  ];

  return (
    <div className="w-full h-full py-1">
      <h2 className="text-[#534988] text-xl sm:text-2xl custom-2xl:text-6xl font-bold mb-8 ml-7">
        Chat History
      </h2>

      <div className="bg-[#A296CC] rounded-3xl px-4 sm:px-8 py-4 sm:py-11 h-full w-full flex gap-5 flex-col ">
        <div className="flex justify-between w-[85%] font-medium text-white text-xs  sm:text-xl pl-11 pt-0.5 ">
          <span>Topic</span>
          <span className="pl-8">Date</span>
          <span>Assigned assistant</span>
        </div>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className="bg-[#7565A4] rounded-2xl px-4 sm:px-10 py-2 sm:py-7 grid  grid-cols-3 items-center "
          >
            <div className="">
              <p className="text-white  text-sm custom-xl:text-xl font-medium">
                {chat.topic}
              </p>
            </div>

            <div className="border-x border-white flex items-center justify-center">
              <p className="text-white text-sm custom-xl:text-lg ">
                {chat.date}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex  flex-col items-start  pl-4 justify-center ">
                <p className="text-white text-sm custom-xl:text-lg h-fit m-0 p-0 font-medium ">
                  {chat.assistant}
                </p>
                <p className="text-white text-xs h-fit m-0 p-0 ">Assistant</p>
              </div>

              <Image  loading="lazy" 
              
                src={messageicon}
                alt=""
                className="w-3 h-3 sm:w-8 sm:h-8"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
