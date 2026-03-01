// components/CurrentPackage.js
import Image from "next/image";
import vLine from "../../../../public/Vertical Line2.svg";
interface CurrentPackageprops {
  data: any;
}
export default function CurrentPackage({ data }: CurrentPackageprops) {
  return (
    <>
      <div className="mb-2 sm:mb-4 custom-xl:mb-8 ">
        <h2 className="text-[#685AAD] text-sm custom-lg:text-xl custom-xl:text-[42px] custom-xl:leading-[2.5rem] mt-0.5 ml-2 sm:ml-7 font-bold mb-2 sm:mb-6">
          My current package:
        </h2>

        {data?.user?.planType?.type === "" ||
        data?.user?.planType?.type === "no membership" ? (
          <div className="bg-white rounded-3xl custom-xl:rounded-[45px]  overflow-hidden border border-black drop-shadow-[0px_5px_0px_#b0a9c4] sm:drop-shadow-[0px_15px_0px_#b0a9c4] custom-lg:drop-shadow-[0px_20px_0px_#b0a9c4] ">
            <div className="bg-[#53497F] text-white py-4 custom-xl:py-[30px] flex items-center justify-center px-4 text-sm sm:text-lg custom-lg:text-3xl custom-xl:text-[50px] custom-xl:leading-none font-bold">
              Pay as you go
            </div>

            <div className="p-3 custom-xl:p-6 bg-white flex flex-col items-center justify-center mt-3 sm:mt-8 mb-6 sm:mb-11">
              <h3 className="text-[#9C78F9] text-sm sm:text-xl custom-lg:text-4xl custom-xl:text-[63px] custom-xl:leading-none font-bold mb-5">
                Free Package
              </h3>

              <p className="text-[#53497F] font-medium text-xs sm:text-sm custom-lg:text-xl custom-xl:text-[34px]  custom-xl:leading-[2.5rem] max-w-[57rem] text-center mb-5">
                Book an eTutor at any time, paying only the fees listed for each
                session. No upfront costs or subscription fees
              </p>
              <p className="text-[#9C78F9] text-xs sm:text-lg custom-xl:text-[27px] custom-xl:leading-[2rem] font-bold text-center">
                Ideal for upcoming exams and quick revisions.{" "}
              </p>
            </div>
          </div>
        ) : data?.user?.planType?.type === "standard" ? (
          <PackageCard
            title="Standard"
            sessions={4}
            price={139}
            duration={60}
          />
        ) : data?.user?.planType?.type === "premium" ? (
          <PackageCard title="Premium" sessions={8} price={280} duration={60} />
        ) : (
          <div className="bg-white rounded-3xl custom-xl:rounded-[45px]  overflow-hidden border border-black drop-shadow-[0px_5px_0px_#b0a9c4] sm:drop-shadow-[0px_15px_0px_#b0a9c4] custom-lg:drop-shadow-[0px_20px_0px_#b0a9c4] ">
            <div className="bg-[#53497F] text-white py-4 custom-xl:py-[30px] flex items-center justify-center px-4 text-sm sm:text-lg custom-lg:text-3xl custom-xl:text-[50px] custom-xl:leading-none font-bold">
              Pay as you go
            </div>

            <div className="p-3 custom-xl:p-6 bg-white flex flex-col items-center justify-center mt-3 sm:mt-8 mb-6 sm:mb-11">
              <h3 className="text-[#9C78F9] text-sm sm:text-xl custom-lg:text-4xl custom-xl:text-[63px] custom-xl:leading-none font-bold mb-5">
                Free Package
              </h3>

              <p className="text-[#53497F] font-medium text-xs sm:text-sm custom-lg:text-xl custom-xl:text-[34px]  custom-xl:leading-[2.5rem] max-w-[57rem] text-center mb-5">
                Book an eTutor at any time, paying only the fees listed for each
                session. No upfront costs or subscription fees
              </p>
              <p className="text-[#9C78F9] text-xs sm:text-lg custom-xl:text-[27px] custom-xl:leading-[2rem] font-bold text-center">
                Ideal for upcoming exams and quick revisions.{" "}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function PackageCard({ title, sessions, price, duration, onSelect }: any) {
  return (
    <div className="bg-white rounded-3xl custom-xl:rounded-[45px] overflow-hidden border border-black drop-shadow-[0px_5px_0px_#b0a9c4] sm:drop-shadow-[0px_15px_0px_#b0a9c4] custom-lg:drop-shadow-[0px_20px_0px_#b0a9c4]">
      <div
        className={`${
          title === "Premium" ? "bg-[#5553C4]" : "bg-[#53497F]"
        } text-white py-4 custom-xl:py-[35px] px-4 flex items-center justify-center text-sm sm:text-lg custom-lg:text-2xl custom-xl:text-[50px] custom-xl:leading-[2.5rem] font-bold`}
      >
        {title}
      </div>
      <div className="px-3 sm:px-4 py-4 sm:py-12 flex flex-col justify-center items-center ">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-[33rem] custom-xl:max-w-[66rem] w-full">
          <div className=" px-2 md:px-6 pt-0.5 sm:mb-4 md:mb-0 text-center md:text-left  flex flex-col gap-y-4 custom-xl:gap-y-11">
            <div className="text-[#8653ff] text-sm custom-lg:text-xl custom-xl:text-[60.36px] custom-xl:leading-[2.25rem] font-medium  pl-0 md:pl-3">
              <span className="font-extrabold">
                <span className="text-sm sm:text-lg custom-lg:text-2xl custom-xl:text-[83.98px] custom-xl:leading-[2.5rem]">
                  {sessions}{" "}
                </span>
                Sessions{" "}
              </span>
              <span className="text-xs sm:text-base custom-lg:text-xl custom-xl:!text-[40px] leading-[2rem] font-medium">
                / month
              </span>
            </div>
            <div className="text-[#9C78F9] text-sm sm:text-lg custom-lg:text-2xl custom-xl:text-4xl font-medium  pl-0 md:pl-3">
              <span className="font-bold text-sm sm:text-lg custom-lg:text-3xl custom-xl:text-[77.34px] custom-xl:leading-[1]">
                <span className="text-[#8653ff]">${price}.00</span>
              </span>
              <span className="text-xs sm:text-base custom-lg:text-2xl custom-xl:text-[41.6px] custom-xl:leading-[1]">
                {" "}
                / month
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src={vLine}
              alt=""
              className="h-[116.68px] custom-xl:h-[236.68px]"
            />
          </div>
          <div className="p-2 md:px-4 md:py-7 mt-0.5 flex gap-8 flex-col">
            <div className="text-[#53497F] text-xs sm:text-lg custom-xl:text-[28.86px] custom-xl:leading-[2.25rem] ">
              <span className="font-bold">Session duration:</span> {duration}{" "}
              minutes
            </div>
            <div className="text-[#53497F] text-xs sm:text-lg custom-xl:text-[28.86px] custom-xl:leading-[2.25rem] ">
              <span className="font-bold">Membership duration:</span> Flexible
            </div>
            <div className="text-[#53497F] text-xs sm:text-lg custom-xl:text-[28.86px] custom-xl:leading-[2.25rem] ">
              <span className="font-bold">Average cost per session:</span>
              &nbsp;${(price / sessions).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
