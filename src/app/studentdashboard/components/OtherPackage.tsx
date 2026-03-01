// components/OtherPackages.js
import Link from "next/link";

export default function OtherPackages({ onSelectPlan, data, priceData }: any) {
  return (
    <div className="pt-1 ">
      <h2 className="text-[#685AAD] text-sm sm:text-lg custom-lg:text-2xl custom-xl:text-[42px] custom-xl:leading-[2.5rem] font-bold mb-2 sm:mb-3  sm:py-3 ml-2 sm:ml-7">
        Our other offers:{" "}
      </h2>
      <div>
        <div className="grid grid-cols-1 custom-xl:grid-cols-2 gap-6 sm:gap-x-14 sm:gap-y-14 mb-6">
          {data?.user?.planType?.type === "premium" && (
            <>
              <Payasyougo />
              <PackageCard
                title="Standard"
                sessions={4}
                price={priceData?.data?.standard
                  ?.filter(
                    (plan: any) =>
                      plan.planType === "standard" &&
                      plan.tutorLevel === "Junior" &&
                      plan.month === "Monthly"
                  )
                  ?.map((plan: any) =>
                    (Number(plan.priceAmount) / 100).toFixed(0)
                  )}
                duration={60}
                onSelect={() => onSelectPlan("standard")}
              />
            </>
          )}

          {data?.user?.planType?.type === "standard" && (
            <>
              <Payasyougo />
              <PackageCard
                title="Premium"
                sessions={8}
                price={priceData?.data?.premium
                  ?.filter(
                    (plan: any) =>
                      plan.planType === "premium" &&
                      plan.tutorLevel === "Junior" &&
                      plan.month === "Monthly"
                  )
                  ?.map((plan: any) =>
                    (Number(plan.priceAmount) / 100).toFixed(0)
                  )}
                duration={60}
                onSelect={() => onSelectPlan("premium")}
              />
            </>
          )}

          {data?.user?.planType?.type === "" || data?.user?.planType?.type === "no membership" && (
            <>
              <PackageCard
                title="Premium"
                sessions={8}
                price={priceData?.data?.premium
                  ?.filter(
                    (plan: any) =>
                      plan.planType === "premium" &&
                      plan.tutorLevel === "Junior" &&
                      plan.month === "Monthly"
                  )
                  ?.map((plan: any) =>
                    (Number(plan.priceAmount) / 100).toFixed(0)
                  )}
                duration={60}
                onSelect={() => onSelectPlan("premium")}
              />
              <PackageCard
                title="Standard"
                sessions={4}
                price={priceData?.data?.standard
                  ?.filter(
                    (plan: any) =>
                      plan.planType === "standard" &&
                      plan.tutorLevel === "Junior" &&
                      plan.month === "Monthly"
                  )
                  ?.map((plan: any) =>
                    (Number(plan.priceAmount) / 100).toFixed(0)
                  )}
                duration={60}
                onSelect={() => onSelectPlan("standard")}
              />
            </>
          )}

          <div className="cusom-2xl:col-span-2">
            <BundleCard onSelect={() => onSelectPlan("bundles")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PackageCard({ title, sessions, price, duration, onSelect }: any) {
  return (
    <div className="bg-white rounded-3xl custom-xl:rounded-[45px] overflow-hidden border border-black drop-shadow-[0px_5px_0px_#b0a9c4] sm:drop-shadow-[0px_15px_0px_#b0a9c4] custom-lg:drop-shadow-[0px_20px_0px_#b0a9c4]">
      <div
        className={`${
          title === "Premium" ? "bg-[#5553C4]" : "bg-[#53497F]"
        } text-white py-4 custom-xl:py-[30px] px-4 flex items-center justify-center text-sm sm:text-lg custom-lg:text-2xl custom-xl:text-[42px] custom-xl:leading-[2.5rem] font-bold`}
      >
        {title}
      </div>
      <div className="px-3 sm:px-4 py-4 sm:py-7 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="border-r-0 md:border-r-2 border-[#e1d4ff] px-2 md:px-6 pt-0.5 sm:mb-4 md:mb-0 text-center md:text-left">
            <div className="text-[#9C78F9] text-sm custom-lg:text-xl custom-xl:text-[30.98px] custom-xl:leading-[2.25rem] font-medium sm:mb-4 pl-0 md:pl-3">
              <span className="font-extrabold">
                <span className="text-sm sm:text-lg custom-lg:text-2xl custom-xl:text-[43.1px] custom-xl:leading-[2.5rem]">
                  {sessions}{" "}
                </span>
                Sessions{" "}
              </span>
              <span className="text-xs sm:text-base custom-lg:text-xl custom-xl:!text-[26.94px] leading-[2rem] font-medium">
                / month
              </span>
            </div>
            <div className="text-[#9C78F9] text-sm sm:text-lg custom-lg:text-2xl custom-xl:text-4xl font-medium sm:mb-4 pl-0 md:pl-3">
              <span className="font-bold text-sm sm:text-lg custom-lg:text-3xl custom-xl:text-[51.2px] custom-xl:leading-[1]">
                <span className="text-[#8653ff]">${price}</span>
              </span>
              <span className="text-xs sm:text-base custom-lg:text-2xl custom-xl:text-[41.6px] custom-xl:leading-[1]">
                {" "}
                / month
              </span>
            </div>
          </div>

          <div className="p-2 md:px-4 md:py-7 mt-0.5">
            <div className="text-[#53497F] text-xs sm:text-lg custom-xl:text-xl mb-5">
              <span className="font-bold">Session duration:</span> {duration}{" "}
              minutes
            </div>
            <div className="text-[#53497F] text-xs sm:text-lg custom-xl:text-xl mb-4">
              <span className="font-bold">Membership duration:</span> Flexible
            </div>
            <div className="text-[#53497F] text-xs sm:text-lg custom-xl:text-xl mb-4">
              <span className="font-bold">Average cost per session:</span>
              &nbsp;${(price / sessions).toFixed(2)}
            </div>
          </div>
        </div>

        <div className="sm:mt-[18px] sm:mb-3 max-w-[411.08px] w-full mx-auto flex items-center justify-center">
          <button
            onClick={onSelect}
            className="w-full bg-[#8653FF] text-white px-4 py-2 sm:py-4 font-bold text-xs sm:text-sm custom-lg:text-xl custom-xl:text-[33px] custom-xl:leading-[2.25rem] rounded-full hover:bg-[#5a3dd8] transition-colors"
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );
}

function BundleCard({ onSelect }: any) {
  return (
    <div className=" bg-white rounded-3xl custom-xl:rounded-[45px]  overflow-hidden border border-black drop-shadow-[0px_5px_0px_#b0a9c4] sm:drop-shadow-[0px_15px_0px_#b0a9c4] custom-lg:drop-shadow-[0px_20px_0px_#b0a9c4]  ">
      <div className="bg-[#53497F] text-white py-4 custom-xl:py-[30px] flex items-center justify-center px-4 text-sm sm:text-lg custom-lg:text-3xl custom-xl:text-[50px] custom-xl:leading-none font-bold">
        Bundles
      </div>

      <div className="px-3 sm:px-6 py-4 sm:py-7">
        <div className="p-3 custom-xl:p-6 bg-white flex flex-col items-center justify-center  mb-1 sm:mb-3">
          <h3 className="text-[#9C78F9] text-sm sm:text-xl custom-lg:text-4xl custom-xl:text-[63px] custom-xl:leading-none font-bold mb-5">
            Flexible Learning Packages
          </h3>

          <p className="text-[#53497F] font-medium text-xs sm:text-sm custom-lg:text-xl custom-xl:text-[34px]  custom-xl:leading-[2.5rem] max-w-[64rem]  text-center mb-5">
            Purchase session bundles upfront and use them whenever you need.
            Perfect for test prep, flexible schedules, or quick reviews.
          </p>
          <p className="text-[#9C78F9] text-xs sm:text-lg custom-xl:text-[27px] custom-xl:leading-[2rem] font-bold text-center">
            Ideal for upcoming exams and quick revisions.{" "}
          </p>
        </div>
        <div className="  sm:mb-2 max-w-[411.08px] w-full mx-auto flex items-center justify-center ">
          <button
            onClick={onSelect}
            className=" w-full   bg-[#8653FF] text-white px-4 py-2 sm:py-4 font-bold  text-xs sm:text-sm custom-lg:text-xl custom-xl:text-[33px] custom-xl:leading-[2.25rem] rounded-full hover:bg-[#5a3dd8] transition-colors"
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );
}

function Payasyougo() {
  return (
    <div className="bg-white rounded-3xl custom-xl:rounded-[45px]  overflow-hidden border border-black drop-shadow-[0px_5px_0px_#b0a9c4] sm:drop-shadow-[0px_15px_0px_#b0a9c4] custom-lg:drop-shadow-[0px_20px_0px_#b0a9c4] ">
      <div
        className={`bg-[#53497F] text-white py-3 custom-xl:py-[30px] px-4 flex items-center justify-center text-sm sm:text-lg custom-lg:text-2xl custom-xl:text-[42px] custom-xl:leading-[2.5rem] font-bold`}
      >
        Pay as you go
      </div>

      <div className="p-3 custom-xl:p-6 bg-white flex flex-col items-center justify-center mt-1 sm:mt-2.5  mb-6 sm:mb-4">
        <h3 className="text-[#9C78F9] text-sm sm:text-xl custom-lg:text-4xl custom-xl:text-[46px]  custom-xl:leading-none font-bold mb-4">
          Free package
        </h3>
        <div className="border border-[#e0d4ff] w-full max-w-[28rem] mx-auto mb-4"></div>
        <p className="text-[#53497F]  text-xs sm:text-sm custom-lg:text-xl custom-xl:text-[26px]   custom-xl:leading-tight max-w-[28rem] text-center mb-10">
          Book an eTutor at any time, paying only the fees listed for each
          session. No upfront costs or subscription fees
        </p>
        <p className="text-[#aba4c8] text-xs sm:text-lg custom-xl:text-xl text-center max-w-[27rem]">
          You can return to this membership plan if you cancel your current
          membership
        </p>
      </div>
    </div>
  );
}
