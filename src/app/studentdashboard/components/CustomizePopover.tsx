import { X } from "lucide-react";
import React, { useState } from "react";

interface MembershipPaymentProps {
  isopen: any;
  tutorLevel: string;
  price: number;
  subscibe:any;
  loading:boolean
}
const MembershipPayment = ({
  isopen,
  tutorLevel,
  price,
  subscibe,
  loading
}: MembershipPaymentProps) => {
  const [selectedOption, setSelectedOption] = useState("full");
  const [totalAmount, setTotalAmount] = useState<number>(
    parseFloat(((price * 9) / 9).toFixed(2)) || 0
  );
  const [subtotalText, setSubtotalText] = useState(`Pay in Full (15%): $${(
          totalAmount * 9 -
          (15 / 100) * (totalAmount * 9)
        ).toFixed(2)}`);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);

    if (option === "full") {
      setTotalAmount(parseFloat(((price * 9) / 9).toFixed(2)));
      setSubtotalText(
        `Pay in Full (15%): $${(
          totalAmount * 9 -
          (15 / 100) * (totalAmount * 9)
        ).toFixed(2)}`
      );
    } else if (option === "quarterly") {
      // setTotalAmount("$208.00/m");
      setSubtotalText(
        `Every 3 Months (10%): $${(
          totalAmount * 9 -
          (10 / 100) * (totalAmount * 9)
        ).toFixed(2)}`
      );
    } else {
      // setTotalAmount("$232.00/m");
      setSubtotalText(
        `Monthly Payment (0%) $${(
          totalAmount * 9 -
          (0 / 100) * (totalAmount * 9)
        ).toFixed(2)}`
      );
    }
  };

  return (
    <div className="w-full  max-w-[1196px] mx-auto bg-white rounded-3xl drop-shadow-[0px_0px_10px_rgb(0,0,0,0.7)] p-8 md:p-12 custom-xl:px-16 custom-xl:py-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl md:text-4xl custom-xl:text-[54.63px] custom-xl:leading-none font-semibold text-[#9365ff] ">
          Customize Your Membership Payment
        </h1>
        <X
          onClick={() => {
            isopen(false);
          }}
          className="text-[#9365ff] hover:cursor-pointer "
        />
      </div>

      <p className="text-[#776bb5] custom-xl:text-[21.86px] custom-xl:leading-[1.75rem]  mb-8 custom-xl:mb-9">
        Choose your preferred payment schedule for your 9-month Standard
        Membership with a Junior eTutor.
        <br />
        Select the option that best fits your budget and learning goals.
      </p>

      <div className="flex flex-col md:flex-row gap-8 custom-xl:gap-16">
        <div className="flex-1 flex flex-col gap-6 custom-xl:mt-4">
          <button
            className={` rounded-2xl p-6 custom-xl:px-12 custom-xl:py-[26px] text-left  ${
              selectedOption === "full"
                ? "border-[#776bb5] border-[3px]"
                : "border-2 border-[#d2cee6]"
            }`}
            onClick={() => handleOptionClick("full")}
            onMouseEnter={() => setHoveredOption("full")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className="flex justify-between items-center">
              <span className="text-xl custom-xl:text-3xl text-[#776bb5] font-medium">
                Pay in Full
              </span>
              <span className="text-xl custom-xl:text-[27.49px] custom-xl:leading-[2rem] font-semibold text-[#776bb5]">
                15% discount
              </span>
            </div>
            {(hoveredOption === "full" || selectedOption === "full") && (
              <p className="text-[#776bb5] mt-2">
                Pay the entire amount upfront and enjoy a 15% discount on the
                total price.
              </p>
            )}
          </button>

          <button
            className={` rounded-2xl p-6 custom-xl:px-12 custom-xl:py-[26px] text-left  ${
              selectedOption === "quarterly"
                ? "border-[#776bb5] border-[3px]"
                : "border-2 border-[#dddaec]"
            }`}
            onClick={() => handleOptionClick("quarterly")}
            onMouseEnter={() => setHoveredOption("quarterly")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className="flex justify-between items-center">
              <span className="text-xl custom-xl:text-3xl text-[#776bb5]">
                Pay Every 3 Months
              </span>
              <span className="text-xl custom-xl:text-[27.49px] custom-xl:leading-[2rem] font-semibold text-[#776bb5]">
                10% discount
              </span>
            </div>
            {(hoveredOption === "quarterly" ||
              selectedOption === "quarterly") && (
              <p className="text-[#776bb5] mt-2">
                Split your payment into three equal installments, billed every 3
                months, and enjoy a 10% discount on the total price.
              </p>
            )}
          </button>

          <button
            className={` rounded-2xl p-6 custom-xl:px-12 custom-xl:py-[26px] text-left ${
              selectedOption === "monthly"
                ? "border-[#776bb5] border-[3px]"
                : "border-2 border-[#dddaec]"
            }`}
            onClick={() => handleOptionClick("monthly")}
            onMouseEnter={() => setHoveredOption("monthly")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className="flex justify-between items-center">
              <span className="text-xl custom-xl:text-3xl text-[#776bb5] ">
                Pay Monthly
              </span>
            </div>
            {(hoveredOption === "monthly" || selectedOption === "monthly") && (
              <p className="text-[#776bb5] mt-2">
                Pay on a monthly basis with automatic renewal. This option does
                not include any discounts.
              </p>
            )}
          </button>
        </div>

        <div className="md:w-[363px]  custom-xl:mr-3 custom-xl:mt-1">
          <div className="border  rounded-3xl custom-xl:rounded-[45px] p-6 custom-xl:px-14 custom-xl:py-10 mb-8 custom-xl:mb-10 border-[#685AAD]">
            <div className="mb-4">
              <h2 className="text-xl custom-xl:text-3xl text-[#685aad] font-medium">
                Package duration
              </h2>
              <p className="text-[#8653ff] custom-xl:text-2xl font-medium">
                9 months
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl custom-xl:text-3xl text-[#685aad] font-medium">
                eTutor&apos;s Level
              </h2>
              <p className="text-[#8653ff] custom-xl:text-2xl font-medium">
                {tutorLevel}{" "}
                <span className="text-sm">
                  / Level{" "}
                  {tutorLevel === "Junior"
                    ? "1-3"
                    : tutorLevel === "Senior"
                    ? "4-7"
                    : tutorLevel === "Expert"
                    ? "8-10"
                    : "1-3"}
                </span>
              </p>
            </div>

            <div className="border-t border-[#c2a9ff] pt-5">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl custom-xl:text-[34.2px] custom-xl:leading-[2.25rem] text-[#685aad] font-medium">
                  Total :
                </h2>
                <span className="text-3xl text-[#8653FF] font-medium">
                  ${totalAmount}/m
                </span>
              </div>
              <p className="text-[#867bbd] font-medium text-xl">
                {subtotalText}
              </p>
            </div>
          </div>

          <button
          onClick={subscibe}
          className=" custom-xl:mb-5 w-full bg-[#8653ff] text-white py-3.5 rounded-2xl text-lg custom-xl:text-3xl font-medium hover:bg-[#6b37e2] duration-200 transition-colors">
            {loading ? "Wait...":"Proceed to Checkout"} 
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipPayment;
