import Image from "next/image";
import React, { useState } from "react";
import downloadReport from "../../../../public/downloadReport.svg";
import { usePageSpeedData } from "../hooks/usePageSpeedData";

function WebsiteSpeed() {
  const [hover, sethover] = useState(false);
  const { pageSpeedData, isLoading, error } = usePageSpeedData();
  

  
if(error){
  return <p>failed to load</p>
}
  
  const performanceScore = pageSpeedData?.lighthouseResult?.categories?.performance?.score;
  
  // Convert it to a percentage (0-100)
  
  const performancePercentage:number|any = performanceScore ? (performanceScore * 100).toFixed(2) : 0;



  return (
    <div className=" min-h-[497px] relative  hover:cursor-pointer px-3 custom-xl:px-6 py-3 custom-xl:py-8  bg-[#ede8fa]  rounded-md sm:rounded-xl  custom-lg:rounded-3xl">
      <div className="flex items-start justify-between gap-2  pt-1.5 ">
        <div className="  text-[#7669b5] font-medium pl-7">
          <h1 className="text-5xl">Website Speed</h1>
        </div>

        <div className="w-fit">
          <Image  loading="lazy" 
            onMouseEnter={() => {
              sethover(true);
            }}
            onMouseLeave={() => {
              sethover(false);
            }}
            src={downloadReport}
            alt=""
            className="w-7  hover:cursor-pointer"
          />
          <div
            className={`absolute w-fit -top-5 right-4 bg-[#7669b5] px-3.5 py-1.5 text-xl  rounded-xl text-white transition-all duration-700 transform  origin-bottom-right  ${
              hover ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            Download Report
          </div>
        </div>
      </div>

      <div className="chart flex items-center justify-center h-[90%] ">
        {isLoading?  <p>Loading...</p>  :(

          <ProgressCircle percentage={performancePercentage || 0}/>
        )}
      </div>
    </div>
  );
}

export default WebsiteSpeed;


interface ProgressCircleProps {
  percentage: number;
  size?: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percentage = 340,
  size = 310,
}) => {
  // Ensure percentage is between 0 and 100
  const normalizedPercentage = Math.min(100, Math.max(0, percentage));

  // Calculate circle properties
  const radius = size * 0.4; // Makes circle slightly smaller than container
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =circumference - (normalizedPercentage / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center "
      style={{ width: size, height: size }}
    >
      {/* Background circle */}
      <svg className="absolute" width={size} height={size}>
        <circle
          className="stroke-[#f0d7e7]"
          fill="none"
          strokeWidth={size * 0.14}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
      </svg>

      {/* Progress circle */}
      <svg className="absolute rotate-90" width={size} height={size}>
        <circle
          className="stroke-[#fc7777]"
          fill="none"
          strokeWidth={size * 0.14}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          style={{
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
      </svg>

      {/* Percentage text */}
      <span
        className="relative text-[#685aad] font-semibold"
        style={{ fontSize: size * 0.2 }}
      >
        {normalizedPercentage}%
      </span>
    </div>
  );
};

