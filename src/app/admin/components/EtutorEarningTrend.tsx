


    import React, { useState } from "react";
import downloadReport from '../../../../public/downloadReport.svg'
import Image from "next/image";
function EtutorEarningTrend() {
    const [hover, sethover] = useState(false)
  return (
    <div className="py-1.5">



      <div className="flex items-end justify-between gap-2  ">
        <div className="flex items-center gap-3 w-fit custom-lg:ml-16 pl-1 text-base text-[#685aad] font-bold">
          <div className="bg-[#fc7777] h-[25px] w-[25px] rounded-sm">
            &nbsp;
          </div>{" "}
          eTutors earnings 
        </div>

        <div></div>
        <div className="w-fit">
            <Image  loading="lazy"  
            onMouseEnter={()=>{
                sethover(true)
            }} 
            onMouseLeave={()=>{
                sethover(false)
            }}
            src={downloadReport} alt="" className="w-7  hover:cursor-pointer"/>
            <div  className={`absolute w-fit -top-5 right-4 bg-[#7669b5] px-3.5 py-1.5 text-xl  rounded-xl text-white transition-all duration-700 transform  origin-bottom-right  ${hover ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>Download Report</div>
        </div>
      </div>






      <div className="chart">




      </div>
    </div>
  );
}

export default EtutorEarningTrend;
