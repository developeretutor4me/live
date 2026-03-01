import { Cross, X } from "lucide-react";
import React from "react";



interface EtutorPerformanceFormprops{
    close:any
}
function ETutorPerformanceForm({close}:EtutorPerformanceFormprops) {
  return (
    <div className="w-full max-w-[1501px] bg-[#ede8fa] p-4 sm:p-5 md:px-[75px] md:py-[70px] rounded-xl sm:rounded-2xl md:rounded-3xl mx-auto">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl sm:text-3xl md:text-[53.65px] md:leading-none font-semibold text-[#FC7777] mb-3 sm:mb-4 md:mb-[35px]">
          eTutor Performance Feedback Form
        </h1>

        <button onClick={()=>{
            close(false)
        }} className="" >
        <X  className="text-[#8653FF] hover:text-[#FC7777] "/>
        </button>
      </div>

      <p className="text-[#7b6eaf] text-sm sm:text-base md:text-2xl mb-4 sm:mb-5 md:mb-6 leading-tight">
        Share your thoughts on your eTutor&apos;s performance to help us improve
        the tutoring experience, track progress, and maintain high-quality
        sessions.
      </p>

      <div className="w-full sm:w-[90%] md:w-[87%] h-[1px] sm:h-[1.5px] md:h-[2px] bg-[#7b6eaf] bg-opacity-30 mt-4 sm:mt-5 md:mt-6 mb-4 sm:mb-5 md:mb-7"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 custom-xl:grid-cols-3 gap-4 sm:gap-6 custom-xl:gap-24 mb-5 sm:mb-6 md:mb-[37px]">
        <div>
          <label className="block text-lg sm:text-xl md:text-[27.82px] font-medium text-[#7b6eaf] mb-1 sm:mb-2 md:mb-3">
            Date
          </label>
          <div className="bg-[#b4a5d7] py-2 sm:py-2.5 md:py-3.5 px-3 sm:px-3.5 md:px-4 text-base sm:text-lg md:text-[23px] rounded-lg text-white">
            04 / 09 / 2024
          </div>
        </div>

        <div className="mt-4 sm:mt-0">
          <label className="block text-lg sm:text-xl md:text-[27.82px] font-medium text-[#7b6eaf] mb-1 sm:mb-2 md:mb-3">
            Total Sessions This Month
          </label>
          <div className="bg-[#b4a5d7] py-2 sm:py-2.5 md:py-3.5 px-3 sm:px-3.5 md:px-4 text-base sm:text-lg md:text-[23px] rounded-lg text-white">
            9 sessions
          </div>
        </div>

        <div className="mt-4 sm:mt-4 md:mt-0">
          <label className="block text-lg sm:text-xl md:text-[27.82px] font-medium text-[#7b6eaf] mb-1 sm:mb-2 md:mb-3">
            Total Hours Tutoring
          </label>
          <div className="bg-[#b4a5d7] py-2 sm:py-2.5 md:py-3.5 px-3 sm:px-3.5 md:px-4 text-base sm:text-lg md:text-[23px] rounded-lg text-white">
            8 hours 30 mins
          </div>
        </div>
      </div>

      <div className="mb-6 sm:mb-8 md:mb-11">
        <label className="block text-lg sm:text-xl md:text-[27.82px] font-medium text-[#7b6eaf] mb-2 sm:mb-3 md:mb-5">
          Topics Covered This Month
        </label>
        <textarea
          rows={8}
          className="w-full bg-white p-2 sm:p-3 md:p-4 rounded-lg text-[#7b6eaf] placeholder-[#cbd5e0] text-base sm:text-lg md:text-[25px]"
          placeholder="Summery of main topics or concepts covered during the month"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-5 sm:mt-6 md:mt-8">
        <div className="hidden sm:block"></div>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 sm:gap-4 w-full">
          <button className="bg-[#FC7777] hover:bg-[#ff7a7a] text-white  py-2 sm:py-2.5 px-8 sm:px-12 md:px-16 rounded-full text-xl sm:text-2xl md:text-[32.92px] w-full sm:w-auto order-1 text-center">
            Save Draft
          </button>
          <button className="bg-[#7665dd] hover:bg-[#6555cc] text-white py-2 sm:py-2.5 px-8 sm:px-12 md:px-16 rounded-full text-xl sm:text-2xl md:text-[32.92px] w-full sm:w-auto order-2">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ETutorPerformanceForm;
