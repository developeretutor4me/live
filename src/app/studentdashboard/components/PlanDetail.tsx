import { useSession } from "next-auth/react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CustomizePopover from "./CustomizePopover";
import BundleDetails from "./BundleDetails";
import { PlanType } from "../../../../types/Stripe";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PlanDetails({ plan, onBack, priceData }: any) {
  const [selectedDuration, setSelectedDuration] = useState("monthly");
  const [selectedLevel, setSelectedLevel] = useState<any>("Junior");
  const { data: session } = useSession();
  const [loading, setloading] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [checked, setchecked] = useState<boolean>(false);
  const [bundlessession, setBundlessession] = useState("");


  
  const getPlanPrice = (
    planType: string,
    tutorLevel: string,
    month: string
  ) => {
    return priceData?.data?.[planType]
      ?.filter(
        (plan: any) =>
          plan.planType === planType &&
          plan.tutorLevel === tutorLevel &&
          plan.month === month
      )
      ?.map((plan: any) => (Number(plan.priceAmount) / 100).toFixed(0));
  };

  const planData = {
    premium: {
      title: "Premium",
      sessions: 8,
      price:
        selectedDuration === "monthly" && selectedLevel === "Junior"
          ? getPlanPrice("premium", "Junior", "Monthly")
          : selectedDuration === "monthly" && selectedLevel === "Senior"
          ? getPlanPrice("premium", "Senior", "Monthly")
          : selectedDuration === "monthly" && selectedLevel === "Expert"
          ? getPlanPrice("premium", "Expert", "Monthly")
          : selectedDuration === "4 months" && selectedLevel === "Junior"
          ? 520
          : selectedDuration === "4 months" && selectedLevel === "Senior"
          ? 600
          : selectedDuration === "4 months" && selectedLevel === "Expert"
          ? 832
          : selectedDuration === "9 months" && selectedLevel === "Junior"
          ? 1080
          : selectedDuration === "9 months" && selectedLevel === "Senior"
          ? 1260
          : selectedDuration === "9 months" && selectedLevel === "Expert"
          ? 1800
          : "",
      bgColor: "bg-[#5553C4]",
    },
    standard: {
      title: "Standard",
      sessions: 4,
      price:
        selectedDuration === "monthly" && selectedLevel === "Junior"
          ? getPlanPrice("standard", "Junior", "Monthly")
          : selectedDuration === "monthly" && selectedLevel === "Senior"
          ? getPlanPrice("standard", "Senior", "Monthly")
          : selectedDuration === "monthly" && selectedLevel === "Expert"
          ? getPlanPrice("standard", "Expert", "Monthly")
          : selectedDuration === "4 months" && selectedLevel === "Junior"
          ? getPlanPrice("standard", "Junior", "4_Months") / 4
          : selectedDuration === "4 months" && selectedLevel === "Senior"
          ? getPlanPrice("standard", "Senior", "4_Months") / 4
          : selectedDuration === "4 months" && selectedLevel === "Expert"
          ? getPlanPrice("standard", "Expert", "4_Months") / 4
          : selectedDuration === "9 months" && selectedLevel === "Junior"
          ? getPlanPrice("standard", "Junior", "9_Months") / 9
          : selectedDuration === "9 months" && selectedLevel === "Senior"
          ? getPlanPrice("standard", "Senior", "9_Months") / 9
          : selectedDuration === "9 months" && selectedLevel === "Expert"
          ? getPlanPrice("standard", "Expert", "9_Months") / 9
          : "00.00",
      bgColor: "bg-[#53497F]",
    },
    bundles: {
      title: "Bundles",
      sessions: 4,
      price:
        selectedDuration === "monthly" && selectedLevel === "Junior"
          ? getPlanPrice("standard", "Junior", "Monthly")
          : selectedDuration === "monthly" && selectedLevel === "Senior"
          ? getPlanPrice("standard", "Senior", "Monthly")
          : selectedDuration === "monthly" && selectedLevel === "Expert"
          ? getPlanPrice("standard", "Expert", "Monthly")
          : selectedDuration === "4 months" && selectedLevel === "Junior"
          ? getPlanPrice("standard", "Junior", "4_Months") / 4
          : selectedDuration === "4 months" && selectedLevel === "Senior"
          ? getPlanPrice("standard", "Senior", "4_Months") / 4
          : selectedDuration === "4 months" && selectedLevel === "Expert"
          ? getPlanPrice("standard", "Expert", "4_Months") / 4
          : selectedDuration === "9 months" && selectedLevel === "Junior"
          ? getPlanPrice("standard", "Junior", "9_Months") / 9
          : selectedDuration === "9 months" && selectedLevel === "Senior"
          ? getPlanPrice("standard", "Senior", "9_Months") / 9
          : selectedDuration === "9 months" && selectedLevel === "Expert"
          ? getPlanPrice("standard", "Expert", "9_Months") / 9
          : "00.00",
      bgColor: "bg-[#53497F]",
    },
  };
  // @ts-ignore
  const { title, sessions, price, bgColor } = planData[plan];

  //  function for stripe checkout session
  const handleSubscribe = async () => {
    try {
      if(plan === "bundles" && bundlessession == ""){
        return alert("Please select the bundle to proceed.")
      }
      const userId = session?.user?.id;
      setloading(true);
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planType: plan,
          tutorLevel: selectedLevel,
          durationMonths: selectedDuration,
          userId: userId,
          email: session?.user?.email,
          bundles_session: bundlessession,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
        setloading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl custom-xl:rounded-[45px]  overflow-hidden border border-black   drop-shadow-[0px_5px_0px_#b0a9c4] sm:drop-shadow-[0px_15px_0px_#b0a9c4] custom-lg:drop-shadow-[0px_20px_0px_#b0a9c4] ">
        <div
          className={`${bgColor}  text-white py-4 custom-xl:py-[30px] flex items-center justify-center px-2 sm:px-4  text-3xl custom-xl:text-[58px] custom-xl:leading-none font-bold border-b border-black`}
        >
          {/* <button onClick={onBack} className="text-white mr-4 cursor-pointer">&lt;</button> */}
          <h1 className="">{title}</h1>
        </div>
        <div className="px-4 sm:px-10 custom-xl:px-12  py-3 sm:py-6 custom-xl:py-8 mb-4">
          {plan != "bundles" ? (
            <>
              <div className="flex  gap-2 sm:gap-4 max-w-[74rem] w-full mx-auto items-start custom-xl:items-center flex-col custom-xl:flex-row custom-xl:justify-between custom-xl:flex-wrap ">
                <div className="flex flex-col items-center justify-center border-r-0 custom-xl:border-r-2 border-[#e0d4ff] custom-xl:max-w-[21.2rem] ">
                  <h2 className="text-[#9C78F9]  text-2xl  custom-xl:text-4xl custom-xl:text-[58.74px] custom-xl:leading-tight font-bold ">
                    Choose your Preferences
                  </h2>
                </div>

                <div className="flex flex-col items-start justify-center gap-y-0 lgsm:gap-y-4 custom-xl:gap-y-8  ">
                  <div className="text-[#8653ff] text-lg  custom-xl:text-2xl custom-xl:text-[54.25px] custom-xl:leading-[2.25rem] font-medium ">
                    <span className="font-bold">
                      {" "}
                      <span className=" text-xl  custom-xl:text-3xl custom-xl:text-[75.48px] custom-xl:leading-none">
                        {" "}
                        {sessions}{" "}
                      </span>{" "}
                      Sessions
                    </span>{" "}
                    <span className=" text-sm sm:text-xl custom-xl:text-4xl">
                      {" "}
                      / month
                    </span>
                  </div>
                  <div className="text-[#8653ff] text-sm sm:text-lg custom-xl:text-2xl custom-xl:text-[43.14px] custom-xl:leading-[2.25rem] font-medium ">
                    <span className="font-bold text-xl custom-xl:text-3xl custom-xl:text-[69.51px] custom-xl:leading-none">
                      {" "}
                      ${price}.00
                    </span>
                    <span>/ month</span>
                  </div>
                </div>

                <div className="  flex flex-col items-start justify-center gap-y-0 sm:gap-y-3 custom-xl:gap-y-6 ">
                  <div className="text-[#53497F] text-lg custom-xl:text-2xl  ">
                    <span className="font-bold"> Session duration:</span> 60
                    minutes
                  </div>
                  <div className="text-[#53497F] text-lg custom-xl:text-2xl ">
                    <span className="font-bold"> Membership duration:</span>{" "}
                    Flexible
                  </div>
                  <div className="text-[#53497F] text-lg custom-xl:text-2xl ">
                    <span className="font-bold">
                      {" "}
                      Average cost per session:
                    </span>{" "}
                    ${(price / sessions).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="mb-[62px] flex  custom-xl:items-end  justify-between flex-col custom-xl:flex-row ">
                <div className="px-2">
                  <div className="custom-xl:my-5 ">
                    <h3 className="text-[#685aad]  py-4  custom-xl:py-8 px-0 sm:px-0.5   text-2xl custom-xl:text-[39.74px] custom-xl:leading-[2.25rem] font-bold">
                      Package duration
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-0.5 pl-1">
                      {["monthly", "4 months", "9 months"].map((duration) => (
                        <button
                          key={duration}
                          onClick={() => setSelectedDuration(duration)}
                          className={`${
                            selectedDuration === duration
                              ? "bg-[#8653FF] hover:bg-[#8653FF]" +
                                " text-white"
                              : "bg-[#EDE8FA] text-[#685aad] hover:bg-[#8753ff52] hover:text-[#8653FF]"
                          } py-2 sm:py-3 px-[68px] rounded-full text-sm sm:text-xl custom-xl:text-[32.98px] custom-xl:leading-[2.25rem]  transition-all   `}
                        >
                          {duration}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className=" ">
                    <h3 className="text-[#685aad]  py-4  custom-xl:py-7 px-0 sm:px-0.5   text-2xl custom-xl:text-[39.74px] custom-xl:leading-[2.25rem] font-bold">
                      eTutor&apos;s Level
                    </h3>
                    <div className="flex flex-wrap gap-3 px-1">
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
                              ? "bg-[#8653FF] hover:bg-[#8653FF]" +
                                " text-white"
                              : "bg-[#EDE8FA] text-[#53497F] hover:bg-[#8753ff52] hover:text-[#8653FF]"
                          }  py-2 sm:py-3.5 px-[75px] rounded-3xl  text-sm sm:text-xl custom-xl:text-3xl  transition-all `}
                        >
                          <span className="text-2xl custom-xl:text-4xl font-normal">
                            {tutor.name}
                          </span>
                          <span className="block text-sm">{tutor.level}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* side box */}
                <div className="bg-[#f4f1fd] px-2 sm:px-7  py-4 sm:py-10 rounded-3xl custom-xl:rounded-[45px]  max-w-[379px] w-full h-[325px]  flex flex-col justify-between mt-5">
                  <div className=" px-6 ">
                    <p className="flex flex-col pb-4">
                      <span className="text-[#685aad]     text-sm sm:text-xl custom-xl:text-[32px] custom-xl:leading-[2.25rem] font-bold">
                        Package duration
                      </span>
                      <span className="text-[#8653ff] text-lg custom-xl:text-[27px] custom-xl:leading-[2rem] font-medium mt-1.5">
                        {selectedDuration}
                      </span>
                    </p>
                    <p className="flex flex-col pb-4 ">
                      <span className="text-[#685aad]      text-sm sm:text-xl custom-xl:text-[32px] custom-xl:leading-[2.25rem] font-bold">
                        eTutor&apos;s Level
                      </span>
                      <span className="text-[#8653ff] text-lg custom-xl:text-[27px] custom-xl:leading-[2rem] font-medium mt-1.5">
                        {selectedLevel}
                        <span className="text-lg  text-[#a883fe]">
                          {selectedLevel === "Junior"
                            ? " / Level 1-3"
                            : selectedLevel === "Senior"
                            ? " / Level 4-7"
                            : selectedLevel === "Expert"
                            ? " / Level 8-10"
                            : ""}
                        </span>
                      </span>
                    </p>
                  </div>

                  <div className="px-6">
                    <p className=" mt-2">
                      <span className="text-[#685aad]      text-sm sm:text-xl custom-xl:text-[32px] custom-xl:leading-[2.25rem] font-bold">
                        Total :
                      </span>
                      <span className="text-[#8653ff]      text-sm sm:text-xl custom-xl:text-[32px] custom-xl:leading-[2.25rem] font-bold mt-1.5">
                        {" "}
                        ${price} / m
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="">
          
              <BundleDetails
                  tutorLevel={setSelectedLevel}
                  bundles_session={setBundlessession} priceData={priceData}              />
            </div>
          )}

          <div className="border border-[#9c78f97a] w-[87%] mx-auto "></div>

          <div className="flex items-end  justify-between  flex-col custom-xl:flex-row pt-2">
            <div className="text-[#625598] text-start max-w-[46rem] text-sm sm:text-md custom-xl:text-xl pt-5 sm:pt-16">
              <p className="leading-tight">
                {plan != "bundles"
                  ? ` If you decide to switch to a different eTutor at a different
                level while on an ongoing membership package, your subscription
                will be adjusted to match the new eTutor&apos;s fee bracket. We
                will ask for your confirmation before making any changes`
                  : `Choose the bundle that fits your learning goals and schedule. Each option is designed to provide the support you need with the flexibility to learn at your own pace.`}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center  pt-1  w-full max-w-[398.73px]">
              <div className="mb-3">
                <input
                  checked={checked}
                  onChange={() => setchecked(!checked)}
                  type="checkbox"
                  id="terms"
                  className="mr-2 text-md custom-xl:text-xl hover:cursor-pointer checked:bg-red-500 checked "
                />
                <label
                  htmlFor="terms"
                  className="text-[#53497F] text-xs sm:text-lg custom-xl:text-[22.19px] custom-xl:leading-[2rem]"
                >
                  I agree with the{" "}
                  <span className="underline">terms of service</span>
                </label>
              </div>
              <button
                className={`w-full bg-[#8653FF] text-white py-2 sm:py-3 rounded-full  text-sm sm:text-xl custom-xl:text-4xl font-semibold`}
                onClick={() => {
                  if (checked && selectedDuration === "9 months") {
                    setisopen(true);
                  } else if (checked) {
                    handleSubscribe();
                  } else if (!checked) {
                    alert("Please agree to the terms of service");
                  }
                }}
              >
            
                {selectedDuration !== "9 months" && loading
                  ? "Wait..."
                  : `${plan != "bundles" ? "Upgrade" : "Purchase"} `}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isopen && (
        <CustomizePopover
          isopen={setisopen}
          tutorLevel={selectedLevel}
          price={Number(price)}
          subscibe={handleSubscribe}
          loading={loading}
        />
      )}
    </>
  );
}
