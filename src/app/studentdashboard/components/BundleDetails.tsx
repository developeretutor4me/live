import React, { useState } from "react";

interface BundlesComponentprops {
  tutorLevel: any;
  bundles_session: any;
  priceData: any;
}
const BundlesComponent = ({
  tutorLevel,
  bundles_session,
  priceData,
}: BundlesComponentprops) => {
  const [selectedCard, setSelectedCard] = useState<any>(null); // First card selected by default

  const getPlanPrice = (value: any) => {
    return priceData?.data?.["bundles"]
      ?.filter((plan: any) => plan.bundles_session === value)
      ?.map((plan: any) => (Number(plan.priceAmount) / 100).toFixed(2));
  };
  const bundles = [
    {
      id: 1,
      title: "5 Session Bundle",
      session: 5,
      description: "Perfect for short-term needs and focused learning.",
      price: getPlanPrice("five_session_bundle"),
      perSession: "$54.00/session",
      value: "five_session_bundle",
    },
    {
      id: 2,
      title: "10 Session Bundle",
      session: 10,
      description: "Ideal for consistent support and steady progress.",
      price: getPlanPrice("ten_session_bundle"),
      perSession: "$53.00/session",
      value: "ten_session_bundle",
    },
    {
      id: 3,
      title: "20 Session Bundle",
      session: 20,
      description: "Great for long-term learning and exam preparation.",
      price: getPlanPrice("twenty_session_bundle"),
      perSession: "$50.50/session",
      value: "twenty_session_bundle",
    },
  ];

  return (
    <div className="mx-auto px-4 py-2 w-full mb-5 sm:mb-10">
      <div className="mb-5 custom-xl:mb-11">
        <h2 className="text-[#8653ff]  text-2xl  custom-xl:text-4xl custom-xl:text-[64px] custom-xl:leading-tight font-bold mb-3 ">
          Choose your Preferences
        </h2>
        <p className="custom-xl:text-[35.17px] custom-xl:leading-[2.25rem] text-[#584A91]">
          Purchase session bundles upfront and use them whenever you need
        </p>
      </div>
      <div className="border border-[#9c78f97a] w-[89.2%] mx-auto "></div>

      <div className="mt-5 custom-xl:mt-10">
        <h1 className="text-2xl    custom-xl:text-[51.47px] custom-xl:leading-none font-bold text-[#685AAD] mb-5 custom-xl:mb-8 ext-[#685aad]  ">
          Bundles
        </h1>

        <div className="flex  flex-wrap  gap-6">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              onClick={() => {
                setSelectedCard(bundle.id);
                bundles_session(bundle.value);
                tutorLevel("Expert");
              }}
              className={` max-w-[379.18px]
              relative rounded-2xl sm:rounded-3xl px-4 py-3 sm:px-7 sm:py-7 cursor-pointer transition-all duration-200
              ${
                selectedCard === bundle.id
                  ? "bg-[#f4f1fd] ring-[3px] ring-[#8c55ff]"
                  : "bg-[#f4f1fd] "
              }
            `}
            >
              <h2
                className={`text-2xl  custom-xl:text-[41.18px] custom-xl:leading-[2.25rem] font-semibold  mb-2 custom-xl:mb-4
                
                ${
                  selectedCard === bundle.id
                    ? "text-[#8653FF] "
                    : "text-[#685AAD]"
                }
                `}
              >
                {bundle.title}
              </h2>
              <p className="text-lg custom-xl:text-xl text-[#685AAD] font-normal leading-tight mb-2 custom-xl:mb-8">
                {bundle.description}
              </p>
              <div className="flex sm:justify-between sm:items-center flex-col sm:flex-row">
                <span className="text-xl font-bold text-[#8653FF]">
                  ${bundle.price}
                </span>
                <span className="text-xl text-[#8653FF]">
                  ${(bundle.price / bundle.session).toFixed(2)}/session
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BundlesComponent;
