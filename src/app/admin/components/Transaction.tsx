import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Totalincome from "./Totalincome";
import TotalPayouts from "./TotalPayouts";
import TotalPayoutsChart from "./TotalPayoutsChart";
import Image from "next/image";
import downloadReport from "../../../../public/downloadReport.svg";
import TotalIncomeChart from "./TotalIncomeChart";
import PendingTransection from "./PendingTransection";
import ConfirmedTransaction from "./ConfirmedTransaction";
import LoadingTransaction from "./LoadingTransaction";
import CompletedTransaction from "./CompletedTransaction";
import { usePageSpeedData } from "../hooks/usePageSpeedData";
function Transaction() {
  const [hover, sethover] = useState(false);

  return (
    <div className="bg-[#F6F4FD] h-fit rounded-3xl mt-20 px-4 custom-lg:px-8 py-6 custom-lg:py-16 ">
      <h1 className="text-xl sm:text-3xl custom-lg:text-[45px] text-[#685aad] font-medium pl-8 ">
        Transactions Overview
      </h1>

      <div className="flex flex-col gap-y-9 mt-4">
        {/* section 1 -------------------------------- */}
        <section className=" mt-5 custom-xl:mt-10 grid grid-cols-1 custom-xl:grid-cols-2  grid-rows-2 min-h-[32.5rem] gap-7">
        
            <Totalincome />
          

          <div className="bg-[#ede8fa] px-3 custom-xl:px-6 py-3 custom-xl:py-6 col-span-1 row-span-2 rounded-md sm:rounded-xl  custom-lg:rounded-3xl relative ">
            <TotalPayoutsChart />
          </div>
          <div className="  col-span-1 row-span-1 ">
            <TotalPayouts />
          </div>
        </section>

        {/* section 2 ------------------------ */}
        <section className=" bg-[#ede8fa] rounded-md sm:rounded-xl  custom-lg:rounded-3xl h-[39.2rem] px-5 custom-xl:px-9 py-5 custom-xl:py-10 ">
          <TotalIncomeChart />
        </section>

        {/* section 3 ------------------------ */}
        <section className="bg-[#ede8fa] rounded-md sm:rounded-xl  custom-lg:rounded-3xl h-fit  px-3 custom-xl:px-10  py-3 custom-xl:py-6  relative">
          <PendingTransection />
        </section>
        {/* section 4 ------------------------ */}
        <section className="bg-[#ede8fa] rounded-md sm:rounded-xl  custom-lg:rounded-3xl h-fit  px-3 custom-xl:px-10  py-3 custom-xl:py-6 relative">
          <ConfirmedTransaction/>
        </section>
        <section className="bg-[#ede8fa] rounded-md sm:rounded-xl  custom-lg:rounded-3xl h-fit  px-3 custom-xl:px-10  py-3 custom-xl:py-6 relative">
          <LoadingTransaction/>
        </section>
        <section className="bg-[#ede8fa] rounded-md sm:rounded-xl  custom-lg:rounded-3xl h-fit  px-3 custom-xl:px-10  py-3 custom-xl:py-6 relative">
          <CompletedTransaction/>
        </section>
      </div>
    </div>
  );
}

export default Transaction;
