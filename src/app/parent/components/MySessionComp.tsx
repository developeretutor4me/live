"use client";
import { useState } from "react";

export default function MySessionComp() {
    const [activetab, setactivetab] = useState("individual");

    const getTabColors = (tabName: string) => {
        if (activetab === "individual") {
            if (tabName === "group") return "#9B85C8";
            if (tabName === "trial") return "#6B5692";
        } else if (activetab === "group") {
            if (tabName === "individual") return "#6B5692";
            if (tabName === "trial") return "#9B85C8";
        } else if (activetab === "trial") {
            if (tabName === "group") return "#9B85C8";
            if (tabName === "individual") return "#6B5692";
        }
        return "#EDE8FA"; // Active tab color
    };


    return (
        <div className="relative w-full max-w-[1448.64px] mt-[130px]  min-h-[22rem]">
            {/* Individual Tab */}
            <div
                onClick={() => setactivetab("individual")}
                className={`relative  w-full max-w-[1448.64px] h-[857px] rounded-[40px] rounded-tl-none z-[30] hover:cursor-pointer`}
                style={{ backgroundColor: getTabColors("individual") }}
            >


                {/* Top arc (was before) */}
                <div className={`absolute top-[-88px] w-[344px] h-[100px] rounded-tl-[40px] rounded-tr-[20px] flex items-center justify-center text-xl font-bold ${activetab === "individual" ? "text-[#685AAD]" : "text-white"}`} style={{ backgroundColor: getTabColors("individual") }} >
                    <span className="mb-2">

                        INDIVIDUAL SESSION
                    </span>

                </div>
                {/* Bubble bump (was after) */}
                <div className="absolute top-[-3.8%] left-[289.04px] w-[88px] h-[88px]" style={{ backgroundImage: `radial-gradient(circle at 100% 0%, rgba(207,27,27,0) 33px, ${getTabColors("individual")} 33px)` }} />
            </div>

            {/* Group Tab */}
            <div className="absolute top-0 left-0 w-full h-full z-[20]  ">
                <div
                    onClick={() => setactivetab("group")}
                    className={`relative  w-full max-w-[400px]  custom-2xl:max-w-[600px]  h-[857px] top-0 left-[287px] rounded-[20px] rounded-tl-none hover:cursor-pointer`}
                    style={{ backgroundColor: getTabColors("group") }}
                >
                    <div className={`absolute top-[-88px] w-[395px] h-[100px] rounded-tl-[40px] rounded-tr-[20px] flex items-center justify-center  text-xl font-bold  ${activetab === "group" ? "text-[#685AAD]" : "text-white"}`} style={{ backgroundColor: getTabColors("group") }} >
                        <span className="mb-2 ml-[58px]">

                            GROUP SESSION
                        </span>

                    </div>
                    <div className="absolute top-[-3.8%] left-[340px] w-[88px] h-[88px]" style={{ backgroundImage: `radial-gradient(circle at 100% 0%, rgba(207,27,27,0) 33px, ${getTabColors("group")} 33px)` }} />
                </div>
            </div>

            {/* Trial Tab */}
            <div className="absolute top-0 left-0 w-full h-full z-[10]">
                <div
                    onClick={() => setactivetab("trial")}
                    className={`relative  w-full max-w-[200px] custom-xl:max-w-[300px] h-[857px] top-0 left-[619px] rounded-[20px] rounded-tl-none hover:cursor-pointer`}
                    style={{ backgroundColor: getTabColors("trial") }}
                >
                    <div className={`absolute top-[-88px] w-[400px] h-[100px] rounded-tl-[40px] rounded-tr-[20px] flex items-center justify-center   text-xl font-bold ${activetab === "trial" ? "text-[#685AAD]" : "text-white"} `} style={{ backgroundColor: getTabColors("trial") }} >
                        <span className="mb-2 ml-[20px]">

                            TRIAL SESSION
                        </span>

                    </div>
                    <div className="absolute top-[-3.8%] left-[345px] w-[88px] h-[88px]" style={{ backgroundImage: `radial-gradient(circle at 100% 0%, rgba(207,27,27,0) 33px, ${getTabColors("trial")} 33px)` }} />
                </div>
            </div>

            {/* Active content display */}
            <div className="absolute top-0 left-0 min-w-full  h-full z-[50] bg-[#EDE8FA] rounded-tr-[40px] rounded-b-[40px] flex items-center justify-center text-4xl font-semibold text-[#333]">


            </div>
        </div>

    );
}
