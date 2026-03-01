"use client"
import axios from "axios";

import React, { useEffect, useState } from "react";

const ReferralComponent = () => {
  const [activeTab, setActiveTab] = useState<"student" | "tutor">("student");
  const [subActiveTab, setSubActiveTab] = useState("student");
  const [link, setLink] = useState("");
  const [Copy, setCopy] = useState("Copy")

 

  

  useEffect(() => {
    const referCode = async () => {
      try {
        const referResponse = await axios.get("/api/refer");
        const LinkData = referResponse.data.referralLink;
        setLink(LinkData);
      } catch (error) {
        console.error("Error fetching referral info:", error);
      }
    };
    referCode();
  }, []);


  const subToggleTab = () => {
    setSubActiveTab(subActiveTab === "student" ? "tutor" : "student");
  };

  const subGetButtonStyles = (subIsActive: boolean) => {
    return subIsActive
      ? "bg-[#B4A5D7] text-white"
      : "bg-[#EDE8FA] text-[#685AAD]";
  };
  return (
    <div className="flex flex-col gap-9">
      <div className="bg-[#F2EEFF] rounded-3xl py-6 px-14 ">
        <h2 className="text-[#685AAD]   text-lg custom-lg:text-xl custom-xl:text-3xl font-bold mb-2">
          GET MORE eTokis
        </h2>
        <p className="text-[#685AAD] font-bold text-sm custom-xl:text-xl mb-2">
          Refer your friends, get eTokis to spend!
        </p>
        <p className="text-[#685AAD]  text-sm custom-xl:text-xl ">
          Get 10 eTokis for each student and 5 eTokis for each eTutor you
          successfully refer.
        </p>
      </div>

      <div
        className={`rounded-3xl ${
          subActiveTab === "student" ? "bg-[#B4A5D7]" : "bg-[#EDE8FA]"
        }`}
      >
        <div className="flex mb-2 sm:mb-4">
          <button
            className={`py-3 custom-xl:py-7 w-[31%] rounded-tl-3xl text-lg custom-lg:text-xl custom-xl:text-3xl font-bold ${subGetButtonStyles(
              subActiveTab === "student"
            )}`}
            onClick={subToggleTab}
          >
            {subActiveTab === "student" ? "Refer Student" : "Refer eTutor"}
          </button>
          <button
            className={`py-3 custom-xl:py-7 w-full flex  pl-12 rounded-bl-3xl rounded-tr-3xl text-lg custom-lg:text-xl custom-xl:text-3xl font-bold ${subGetButtonStyles(
              subActiveTab === "tutor"
            )}`}
            onClick={subToggleTab}
          >
            {subActiveTab === "student" ? "Refer eTutor" : "Refer Student"}
          </button>
        </div>

        <div className="px-10 custom-xl:px-20 mt-5 custom-xl:mt-10 mb-10 custom-xl:mb-20">
          <p
            className={`text-sm sm:text-lg custom-xl:text-2xl font-medium mb-2   ${subGetButtonStyles(
              subActiveTab === "student"
            )}`}
          >
            {`Copy and share the link to refer ${
              subActiveTab === "student" ? "a Student" : "an eTutor"
            }`}
          </p>
          <div className="mt-5 custom-xl:mt-10 py-2 sm:py-3 pl-5 sm:pl-10 custom-xl:pl-20 pr-2 custom-xl:pr-4 max-w-[58rem] flex bg-[#685AAD] rounded-3xl overflow-hidden">
            <input
              type="text"
              value={link} 
              readOnly
              className="flex-grow bg-[#685AAD] py-2 outline-none text-white"
            />
            <button 
             onClick={() => {
              navigator.clipboard.writeText(link);
              setCopy("Copied!")
              setTimeout(() => {
                setCopy("Copy")
              }, 2000);
            }}
            className="bg-[#8653FF] text-white px-4 sm:px-8 custom-xl:px-16 rounded-xl py-2 sm:py-3 custom-xl:py-5 text-sm sm:text-lg font-medium">
              {Copy}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#EDE8FA] rounded-3xl ">
        <h3 className="text-[#5D3FB1] pl-7 custom-xl:pl-14 mt-4 custom-xl:mt-7 mb-4 custom-xl:mb-8 text-lg custom-lg:text-xl custom-xl:text-3xl font-bold ">
          How to get your free eTokis
        </h3>
        <div className=" py-3 sm:py-6 custom-xl:py-12 px-8 custom-xl:px-16 grid grid-cols-3 gap-4 bg-[#B4A5D7] rounded-3xl">
          <div>
            <h4 className="text-[#685AAD]  text-sm sm:text-lg custom-xl:text-2xl font-bold mb-1">
              Share your link
            </h4>
            <p className="text-white text-xs sm:text-lg custom-xl:text-xl  max-w-[16rem]">
              Share your referral link directly with friends, or on social
              media.
            </p>
          </div>
          <div>
            <h4 className="text-[#685AAD] text-sm sm:text-lg custom-xl:text-2xl font-bold mb-1">
              Your friends join
            </h4>
            <p className="text-white text-xs sm:text-lg custom-xl:text-xl  max-w-[16rem]">
              Students need to maintain an eTutor4me membership for one month or
              more. Students need to complete their first Sessions.
            </p>
          </div>
          <div>
            <h4 className="text-[#685AAD] text-sm sm:text-lg custom-xl:text-2xl font-bold mb-1">
              Get your free eTokis
            </h4>
            <p className="text-white text-xs sm:text-lg custom-xl:text-xl  max-w-[16rem]">
              You will recieve your 50 eTokis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralComponent;
