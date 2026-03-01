import React from "react";

function BankDetails() {
  return (
    <div className="mt-36 pt-2.5 ">
      <div className=" w-full bg-[#EDE8FA] h-full px-6 sm:px-12 py-10 custom-xl:py-[68px] rounded-3xl">
        <h1 className="text-lg sm:text-xl custom-xl:text-5xl text-[#685AAD] font-bold sm:pl-11">
          Payout information{" "}
        </h1>

        <div className="mt-6 sm:mt-12 custom-xl:mt-[75px] px-4 sm:px-16 custom-xl:px-32 py-5 sm:py-10 custom-xl:py-20 bg-[#B4A5D7] rounded-3xl space-y-16">
          <div className="flex items-center  justify-between flex-wrap">
            <label className=" min-w-[194px] text-lg sm:text-3xl font-medium  text-white flex items-center">
              Account holder <span className="text-[#FC7777]"> *</span>
            </label>
            <input
              type="text"
              className="px-8 py-2 custom-xl:py-[18px] block  rounded-lg text-[#685aada1] placeholder:text-[#685aada1] bg-[#EDE8FA] text-lg  custom-xl:text-2xl  max-w-[41.7rem] w-full "
              placeholder="enter full name "
            />
          </div>
          <div className="flex items-center  justify-between flex-wrap">
            <label className="min-w-[194px] text-lg sm:text-3xl font-medium  text-white flex items-center">
              IBAN <span className="text-[#FC7777]"> *</span>
            </label>
            <input
              type="text"
              className="px-8 py-2 custom-xl:py-[18px] block  rounded-lg text-[#685aada1] placeholder:text-[#685aada1] bg-[#EDE8FA] text-lg  custom-xl:text-2xl  max-w-[41.7rem] w-full "
              placeholder="enter IBAN"
            />
          </div>
          <div className="flex items-center  justify-between flex-wrap">
            <label className="min-w-[194px] text-lg sm:text-3xl font-medium  text-white flex items-center">
              BIC/SWIFT <span className="text-[#FC7777]"> *</span>
            </label>
            <input
              type="text"
              className="px-8 py-2 custom-xl:py-[18px] block  rounded-lg text-[#685aada1] placeholder:text-[#685aada1] bg-[#EDE8FA] text-lg  custom-xl:text-2xl  max-w-[41.7rem] w-full "
              placeholder="enter BIC/SWIFT "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankDetails;
