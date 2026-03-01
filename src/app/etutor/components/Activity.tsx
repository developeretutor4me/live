import Image from "next/image";
import React, { useState } from "react";
import etokiicon from "../../../../public/etokiIcon.svg";
import plus from "../../../../public/plusIncrease.svg";
import minus from "../../../../public/minusDecrease.svg";
import axios from "axios";
interface activityprops {
  teacher: any;
  etokiesprop:any
  sessionData:any
}
function Activity({ teacher,etokiesprop ,sessionData}: activityprops) {
  const [etokies, setetokies] = useState(0);
    const [loading, setLoading] = useState(false)

  const sendRedeemRequest = async () => {
    setLoading(true);
   // Reset success message
    try {
      const response = await axios.post("/api/UpdateEtokies", { etokies });
      if (response.data.success) {
        etokiesprop(etokies)
      } else {
      
      }
    } catch (error) {
      console.error("Error redeeming etokies:", error);

    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="h-fit mt-3 sm:mt-6 custom-lg:mt-8 custom-xl:mt-16 p-3 sm:p-6 custom-lg:p-8 custom-xl:p-16 rounded-md sm:rounded-xl  custom-lg:rounded-3xl bg-[#ede8fa]">
      <div className=" ">
        <div className="flex gap-4 sm:gap-8 custom-lg:gap-16 custom-xl:gap-24 items-center ">
          <div className="img  rounded-full h-[70px] sm:h-[100px] custom-xl:h-[164px] w-[70px] sm:w-[100px] custom-xl:w-[164px] flex items-center justify-center overflow-hidden">
            <img
              src={teacher?.user?.profilePicture}
              alt=""
              className="object-cover w-full"
            />
          </div>

          <div className="flex flex-col gap-1 custom-xl:gap-3">
            <span className=" text-2xl custom-lg:text-4xl custom-xl:text-[55px] leading-none font-bold  text-[#6c5baa]">
              {teacher?.contactInformation?.firstName} {teacher?.contactInformation?.lastName}
            </span>
            <span className=" text-lg custom-lg:text-xl custom-xl:text-[33px] leading-none   text-[#6c5baa]">
              eTutor ID: {teacher?.user?._id.substring(0, 6)}
            </span>
            <span className=" text-lg custom-lg:text-xl custom-xl:text-[26px] leading-none font-medium text-[#9486c2]">
              {teacher?.user?.email || ""}
            </span>
          </div>
        </div>

        <div className="data grid grid-cols-1 custom-lg:grid-cols-2 custom-xl:grid-cols-3  mt-3 sm:mt-6 custom-lg:mt-8 custom-xl:mt-12 gap-x-9 custom-xl:gap-x-12 gap-y-2 sm:gap-y-4 custom-lg:gap-y-7 custom-xl:gap-y-10">
          <div className="">
            <label className="block text-lg sm:text-3xl pl-12 font-medium text-[#8276bc]">
              Age
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-full text-[#685AAD] bg-[#dbcaff] text-base sm:text-lg custom-xl:text-2xl "
              value={ Math.floor((Date.now() - new Date(Number(teacher?.DOB.year), Number(teacher?.DOB.month) - 1, Number(teacher?.DOB.day)).getTime()) / (365.25 * 24 * 60 * 60 * 1000))}
              disabled
            />
          </div>
          <div className="">
            <label className="block text-lg sm:text-3xl pl-12 font-medium text-[#8276bc]">
              Sessions Completed
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-full text-[#685AAD] bg-[#dbcaff] text-base sm:text-lg custom-xl:text-2xl "
              value={sessionData.filter((request:any) =>request.status === "accepted" && (request.meetingCompleted ===true)).length || 0}
            />
          </div>
          <div className="">
            <label className="block text-lg sm:text-3xl pl-12 font-medium text-[#8276bc]">
              Sessions Booked
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-full text-[#685AAD] bg-[#dbcaff] text-base sm:text-lg custom-xl:text-2xl "
              value={sessionData.filter((request:any) =>request.status === "accepted" && (!request.meetingCompleted)).length || 0}
              disabled
            />
          </div>
       
          <div className="">
            <label className="block text-lg sm:text-3xl pl-12 font-medium text-[#8276bc]">
              Signup Date
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-full text-[#685AAD] bg-[#dbcaff] text-base sm:text-lg custom-xl:text-2xl "
              value={new Date(teacher?.user?.createdAt).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              )}
              disabled
            />
          </div>
        
          
        
          <div className="">
            <label className="block text-lg sm:text-3xl pl-12 font-medium text-[#8276bc]">
              Free Trials completed
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-full text-[#685AAD] bg-[#dbcaff] text-base sm:text-lg custom-xl:text-2xl "
              value={sessionData.filter((request:any) =>(request.status === "accepted") && (request?.meetingCompleted ===true && request?.IsTrialSession ===true )).length || 0}
              disabled
            />
          </div>
          <div className="">
            <label className="block text-lg sm:text-3xl pl-12 font-medium text-[#8276bc]">
              Free Trials Booked
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-full text-[#685AAD] bg-[#dbcaff] text-base sm:text-lg custom-xl:text-2xl "
              value={sessionData.filter((request:any) =>(request.status === "accepted") && (request?.meetingCompleted ===false && request?.IsTrialSession ===true )).length || 0}
              disabled
            />
          </div>
        </div>
      
      </div>

      <div className="space-y-2 custom-lg:col-span-2 w-full max-w-full custom-xl:order-2 order-1  mt-11">
          <label className="block text-lg sm:text-2xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
            Qualifications
          </label>

          <div className="bg-[#ece6ff] rounded-2xl p-4 ">
            <textarea
              value={teacher?.additionalInformation}
              disabled
              className="w-full bg-[#DBCAFF] outline-none text-[#685AAD] min-h-[200px] text-xl font-medium   rounded-3xl px-7 py-4 resize-none"
            />
          </div>
        </div>
      <div className="flex justify-between gap-6 custom-xl:flex-row flex-col   pt-3">
        <div className=" w-full max-w-[28rem] custom-xl:order-1 order-2">
          <label className="block text-lg sm:text-3xl pl-12 font-medium text-[#8276bc]">
            eTutor&apos;s etokis
          </label>

          <div className="relative">
            <input
              type="text"
              className="mt-2 sm:mt-4 px-11 py-2 sm:py-3 custom-xl:py-4 outline-none block w-full rounded-full text-[#685AAD] bg-[#dbcaff] text-base sm:text-lg custom-xl:text-5xl font-bold "
              value={etokies || 0}
              onChange={(e: any) => {
                const value = e.target.value;
                if (!isNaN(Number(value))) {
                  setetokies(value);
                }
              }}
            />
            <Image
              loading="lazy"
              src={etokiicon}
              alt=""
              className="w-8 custom-xl:w-16 h-8 custom-xl:h-16 absolute top-1/2  transform  -translate-y-1/2 right-8"
            />
          </div>

          <div className="mt-2 sm:mt-5 pt-1 px-5 flex justify-between items-center sm:flex-row flex-col gap-3">
            <div className="flex gap-x-2 sm:order-1 order-2">
              <button onClick={sendRedeemRequest} className="px-4 sm:px-9 py-0.5 sm:py-2 rounded-full bg-[#dbcaff] text-[#685AAD] text-base sm:text-2xl">
              {loading ? "wait...":"Save"}
                
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setetokies(Number(teacher?.user?.etokis));
                }}
                className="px-4 sm:px-8 py-0.5 sm:py-2 rounded-full bg-[#dbcaff] text-[#685AAD] text-base sm:text-2xl"
              >
                Cancel
              </button>
            </div>

            <div className="bg-[#dbcaff]  rounded-full px-3 py-2 sm:w-fit flex items-center justify-between gap-x-4 w-full sm:order-2 order-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setetokies(Number(etokies) - 1);
                }}
              >
                <Image src={minus} alt="" className="w-5 sm:w-7 h-5 sm:h-7" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setetokies(Number(etokies) + 1);
                }}
              >
                <Image src={plus} alt="" className="w-5 sm:w-7 h-5 sm:h-7" />
              </button>
            </div>
          </div>
        </div>

        {/* additional information */}
        <div className="space-y-2 custom-lg:col-span-2 w-full max-w-[50rem] custom-xl:order-2 order-1">
          <label className="block text-lg sm:text-2xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
            Additional Information
          </label>

          <div className="bg-[#ece6ff] rounded-2xl p-4 ">
            <textarea
              value={teacher?.additionalInformation}
              disabled
              className="w-full bg-[#DBCAFF] outline-none text-[#685AAD] min-h-[200px] text-xl font-medium   rounded-3xl px-7 py-4 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activity;
