import { useState } from "react";

export default function PlanDetails({ plan, onBack }: any) {
  const [selectedDuration, setSelectedDuration] = useState("12 months");
  const [selectedLevel, setSelectedLevel] = useState("Senior");

  const planData = {
    premium: {
      title: "Premium",
      sessions: 8,
      price: 249,
      bgColor: "bg-[#5553C4]",
    },
    standard: {
      title: "Standard",
      sessions: 4,
      price: 139,
      bgColor: "bg-[#53497F]",
    },
  };
  // @ts-ignore
  const { title, sessions, price, bgColor } = planData[plan];

  return (
    <div
      className="bg-white rounded-3xl  overflow-hidden border border-black  "
      style={{ boxShadow: "0 20px  #BCB8C8" }}
    >
      <div
        className={`${bgColor}  text-white py-7 flex items-center justify-center px-2 sm:px-4  text-3xl custom-2xl:text-6xl font-bold border-b border-black`}
      >
        {/* <button onClick={onBack} className="text-white mr-4 cursor-pointer">&lt;</button> */}
        <h1 className="">{title}</h1>
      </div>
      <div className="px-14 py-10">
        <div className="grid grid-cols-1 custom-2xl:grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center border-r-0 custom-2xl:border-r border-[#8653FF]">
            <h2 className="text-[#9C78F9]  text-sm sm:text-xl custom-xl:text-3xl custom-2xl:text-6xl font-bold ">
              Choose your Preferences
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center  border-r-0 custom-2xl:border-r border-[#8653FF] ">
            <div className="text-[#9C78F9] text-sm sm:text-lg custom-xl:text-2xl custom-2xl:text-4xl font-medium mb-2">
              <span className="font-bold">
                {" "}
                <span className=" text-lg sm:text-xl custom-xl:text-3xl custom-2xl:text-5xl"> {sessions} </span> Sessions
              </span>{" "}
              / <span className=" text-sm sm:text-xl custom-2xl:text-3xl"> month</span>
            </div>
            <div className="text-[#9C78F9] text-sm sm:text-lg custom-xl:text-2xl custom-2xl:text-5xl font-medium mb-4">
              <span className="font-bold text-sm sm:text-xl custom-xl:text-3xl custom-2xl:text-6xl"> ${price}</span> / month
            </div>
          </div>

          <div className="  flex flex-col items-center justify-center  ">
            <div>
              <div className="text-[#53497F] text-lg custom-2xl:text-2xl mb-3 ">
                <span className="font-bold"> Session duration:</span> 40 minutes
              </div>
              <div className="text-[#53497F] text-lg custom-2xl:text-2xl mb-3">
                <span className="font-bold"> Membership duration:</span>{" "}
                Flexible
              </div>
              <div className="text-[#53497F] text-lg custom-2xl:text-2xl mb-4">
                <span className="font-bold"> Average cost per session:</span> $
                {(price / sessions).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className=" flex  custom-2xl:items-center justify-between flex-col custom-2xl:flex-row ">
          <div>
            <div className="my-14 ">
              <h3 className="text-[#5553C4]  py-7 px-2 sm:px-4   text-2xl custom-2xl:text-4xl font-bold">
                Package duration
              </h3>
              <div className="flex flex-wrap gap-2">
                {["3 months", "6 months", "12 months"].map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    className={`${
                      selectedDuration === duration
                        ? "bg-[#8653FF] hover:bg-[#8653FF]" + " text-white"
                        : "bg-[#EDE8FA] text-[#53497F] hover:bg-[#8753ff52] hover:text-[#8653FF]"
                    } py-2 sm:py-3 px-16 rounded-full text-sm sm:text-xl custom-2xl:text-3xl  transition-all   `}
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6 ">
              <h3 className="text-[#5553C4]  pb-7 px-2 sm:px-4   text-2xl custom-2xl:text-4xl font-bold">
                eTutor&apos;s Level
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Junior", level: "Level 1-3" },
                  { name: "Senior", level: "Level 4-7" },
                  { name: "Expert", level: "Level 8-10" },
                ].map((tutor) => (
                  <button
                    key={tutor.name}
                    onClick={() => setSelectedLevel(tutor.name)}
                    className={`${
                      selectedLevel === tutor.name
                        ? "bg-[#8653FF] hover:bg-[#8653FF]" + " text-white"
                        : "bg-[#EDE8FA] text-[#53497F] hover:bg-[#8753ff52] hover:text-[#8653FF]"
                    }  py-2 sm:py-3 px-20 rounded-3xl  text-sm sm:text-xl custom-2xl:text-3xl  transition-all `}
                  >
                    <span className="text-2xl custom-2xl:text-4xl font-normal">{tutor.name}</span>
                    <span className="block text-sm">{tutor.level}</span>
                  </button>
                ))}
              </div>
            </div>


          </div>

          <div className="bg-[#EDE8FA] px-2 sm:px-4  py-4 sm:py-8 rounded-3xl mb-6">
            <div className=" px-6 pb-3 border-b-2 border-[#8753ff7f]">
              <p className="flex flex-col pb-4">
                <span className="text-[#5553C4]     text-sm sm:text-xl custom-2xl:text-3xl font-bold">
                  Package duration
                </span>
                <span className="text-[#8653FF] text-lg custom-2xl:text-2xl">
                  {selectedDuration}
                </span>
              </p>
              <p className="flex flex-col pb-4 ">
                <span className="text-[#5553C4]      text-sm sm:text-xl custom-2xl:text-3xl font-bold">
                  eTutor&apos;s Level
                </span>
                <span className="text-[#8653FF] text-lg custom-2xl:text-2xl">Senior</span>
              </p>
            </div>

            <div className="px-6">
              <p className=" mt-2">
                <span className="text-[#5553C4]      text-sm sm:text-xl custom-2xl:text-3xl font-bold">
                  Total:
                </span>
                <span className="text-[#9C78F9]      text-sm sm:text-xl custom-2xl:text-3xl font-bold">
                  ${price + 10} / month
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="border border-[#9c78f97a] w-[90%] mx-auto"></div>

        <div className="flex items-center justify-between  flex-col custom-xl:flex-row">
          <div className="text-black text-start max-w-[46rem] text-sm sm:text-md custom-2xl:text-xl pt-12">
            <p>
              If you decide to switch to a different eTutor at a different level
              while on an ongoing membership package, your subscription will be
              adjusted to match the new eTutor&apos;s fee bracket. We will ask for
              your confirmation before making any changes
            </p>
          </div>
          <div className="flex flex-col items-start justify-center mb-6 pt-4  w-full max-w-[22rem]">

            <div className="mb-6">
            <input type="checkbox" id="terms" className="mr-2 text-md custom-2xl:text-xl"/>
            <label htmlFor="terms" className="text-[#53497F] text-xs sm:text-lg custom-2xl:text-2xl">
              I agree with the{" "}
              <span className="underline">terms of service</span>
            </label>
            </div>
            <button
              className={`w-full bg-[#8653FF] text-white py-2 sm:py-3 rounded-full  text-sm sm:text-xl custom-2xl:text-3xl font-semibold`}
            >
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
