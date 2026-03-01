
// components/CurrentPackage.js
export default function CurrentPackage() {
    return (
      <div className="mb-4 custom-xl:mb-8 ">
        <h2 className="text-[#685AAD] text-sm custom-lg:text-xl custom-2xl:text-4xl font-bold mb-4">My current package:</h2>
        <div className="bg-white rounded-3xl  overflow-hidden border border-black  " style={{boxShadow:"0 20px  #BCB8C8"}}>

          <div className="bg-[#53497F] text-white py-4 custom-xl:py-8 flex items-center justify-center px-4 text-sm sm:text-lg custom-lg:text-3xl custom-2xl:text-5xl font-bold">
            Pay as you go
          </div>

          <div className="p-3 custom-xl:p-6 bg-white flex flex-col items-center justify-center mt-3 sm:mt-6 mb-6 sm:mb-12">
            <h3 className="text-[#9C78F9] text-sm sm:text-xl custom-lg:text-4xl custom-2xl:text-6xl font-bold mb-2">Free Package</h3>
            <p className="text-[#53497F] font-medium text-xs sm:text-sm custom-lg:text-xl custom-2xl:text-3xl max-w-[47rem] text-center mb-4">
              Book an eTutor at any time, paying only the fees listed for each session. No upfront costs or subscription fees
            </p>
            <p className="text-[#9C78F9] text-xs sm:text-lg custom-2xl:text-2xl font-bold text-center">Ideal for upcoming exams and quick revisions.</p>
          </div>
        </div>
      </div>
    );
  }
  