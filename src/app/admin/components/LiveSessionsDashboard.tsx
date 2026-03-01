import React from 'react'

function LiveSessionsDashboard() {
    return (
        <div
            className="px-4 custom-xl:px-[35px] py-2 custom-xl:py-[9px] bg-[#ede8fa]  rounded-md sm:rounded-xl custom-lg:rounded-xl max-h-[168.61px] h-full flex items-center justify-center "

        >

            <div className=" flex items-center gap-x-[3.4%] w-full LiveSessionsDashboard ">
                <div className="flex items-start flex-col justify-between  gap-2 custom-lg:gap-y-2 custom-2xl:gap-y-3 max-h-[90px] ">
                    <div className='flex gap-3 custom-lg:gap-5 items-center 2xl:mb-3.5'>
                        <div className="w-[21.61px] h-[21.61px] bg-[#FC7777] rounded-md"></div>
                        <h2 className="text-xl sm:text-2xl custom-lg:text-[37.97px] leading-10 text-[#685AAD] font-bold">Live Sessions</h2>
                    </div>
                    <p className="text-[#9085C4] text-base custom-lg:text-[21.94px]  font-medium leading-[1.75rem]">Today&apos;s peak: 560 Session</p>
                </div>

                <div className="">
                    <div className=" font-bold text-[#AC8AFC] leading-none sessionnumber">
                        1234
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveSessionsDashboard
