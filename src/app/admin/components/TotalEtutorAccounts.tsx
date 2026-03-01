import React from "react";


interface TotalEtutorAccountsprops{
  user:any
}

function TotalEtutorAccounts({user}:TotalEtutorAccountsprops) {

  const totalteacher = user.filter((user:any) => user?.role === "teacher").length;
  return (
    <div>
      <div>
        <div className="rounded-md sm:rounded-xl  custom-lg:rounded-3xl       px-3 custom-xl:px-10 py-3 custom-xl:py-4  bg-[#ede8fa] ">
          <div className="flex  justify-between items-center  ">
            <div className="flex flex-col  justify-between   px-3 py-1.5">
              <h1 className="flex gap-5 items-center text-xl sm:text-3xl custom-lg:text-[43px] leading-10 text-[#7669b5] font-medium py-4">
                <div className="bg-[#00dae5] h-[25px] w-[25px] rounded-sm">
                  &nbsp;
                </div>{" "}
                Total Accounts
              </h1>

          
              <h1 className="text-3xl md:text-4xl custom-lg:text-[90px]   custom-xl:leading-none text-[#b394fc] font-medium ">
                {totalteacher}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalEtutorAccounts;
