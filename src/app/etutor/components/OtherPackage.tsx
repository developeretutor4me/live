// components/OtherPackages.js
import Link from "next/link";

export default function OtherPackages({ onSelectPlan }: any) {
  return (
    <div>
      <h2 className="text-[#685AAD] text-sm sm:text-lg custom-lg:text-2xl custom-2xl:text-4xl font-bold mb-4 py-3">
        Our other packages:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <PackageCard
          title="Premium"
          sessions={8}
          price={249}
          duration={60}
          onSelect={() => onSelectPlan("premium")}
        />
        <PackageCard
          title="Standard"
          sessions={4}
          price={139}
          duration={60}
          onSelect={() => onSelectPlan("standard")}
        />
      </div>
    </div>
  );
}

function PackageCard({ title, sessions, price, duration, onSelect }: any) {
  return (
    <div
      className="bg-white rounded-3xl  overflow-hidden border border-black  "
      style={{ boxShadow: "0 20px  #BCB8C8" }}
    >
      <div
        className={`${
          title === "Premium" ? "bg-[#5553C4]" : "bg-[#53497F]"
        } text-white py-4 custom-xl:py-7 px-4 flex items-center justify-center  text-sm sm:text-lg custom-lg:text-2xl custom-2xl:text-4xl font-bold`}
      >
        {title}
      </div>
      <div className="px-3 sm:px-6 py-4 sm:py-7 flex flex-col justify-center">
        <div className="flex items-center justify-center">

          <div className="border-r border-black px-3 ">
            <div className="text-[#9C78F9] text-sm custom-lg:text-xl custom-2xl:text-3xl font-medium mb-2">
             <span className="font-bold"> <span className="text-sm sm:text-lg custom-lg:text-2xl custom-2xl:text-4xl"> {sessions} </span> Sessions</span> / <span className="text-2xl"> month</span>
            </div>
            <div className="text-[#9C78F9] text-sm sm:text-lg custom-lg:text-2xl custom-2xl:text-4xl font-medium mb-4">
             <span className="font-bold text-sm sm:text-lg custom-lg:text-3xl custom-2xl:text-5xl"> ${price}</span> / month
            </div>
          </div>



          <div className="p-6  ">
            <div className="text-[#53497F]   text-xs sm:text-lg custom-2xl:text-xl mb-3 ">
             <span className="font-bold"> Session duration:</span> {duration} minutes
            </div>
            <div className="text-[#53497F]  text-xs sm:text-lg custom-2xl:text-xl mb-3">
             <span className="font-bold"> Membership duration:</span> Flexible
            </div>
            <div className="text-[#53497F]  text-xs sm:text-lg custom-2xl:text-xl mb-4">
            <span className="font-bold"> Average cost per session:</span> ${(price / sessions).toFixed(2)}
            </div>
          </div>


        </div>
        <div className="mt-5 mb-3 max-w-[22rem] w-full mx-auto flex items-center justify-center">
        <button
          onClick={onSelect}
          className=" w-full   bg-[#8653FF] text-white px-2 py-2 sm:py-4 font-bold  text-xs sm:text-sm custom-lg:text-xl custom-2xl:text-3xl rounded-full hover:bg-[#5a3dd8] transition-colors"
        >
          Plan details
        </button>
        </div>
      </div>
    </div>
  );
}


       