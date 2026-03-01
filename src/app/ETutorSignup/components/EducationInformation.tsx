import React, { useState, useEffect } from 'react';
import FormHeading from './FormHeading';
import InputHeading from './InputHeading';
import Image from 'next/image';
import dropdown from '../../../../public/assets/icons/downarrow.svg';
import uparrow from '../../../../public/assets/icons/uparrow.svg';
import { degrees, subjects } from './Data';

interface EducationInformationProps {
  setEducationInfo: (data: any) => void;
  setCurrentStep: (step: number) => void;
  currentStep: number;
}

const graduationYears: string[] = [];

for (let year = 1950; year <= 2026; year++) {
  if (!graduationYears.includes(String(year))) {
    graduationYears.push(String(year));
  }
}

const EducationInformation = ({
  setEducationInfo,
  setCurrentStep,
  currentStep,
}: EducationInformationProps) => {
  const [universityCollage, setUniversityCollage] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedmajoredu, setSelectedmajoredu] = useState('');
  const [selectedYearedu, setSelectedYearedu] = useState('');
  const [isDropdownOpenedu, setisDropdownOpenedu] = useState(false);
  const [isVisibleedu, setisVisibleedu] = useState(false);
  const [degree, setDegree] = useState(false);
  const [majoredu, setmajoredu] = useState(false);
  const [school, setschool] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleDropdownedu = (e: any) => {
    e.preventDefault();
    setDegree(!degree);
  };

  const toggleDropdownedugraduationyear = (e: any) => {
    e.preventDefault();
    setisDropdownOpenedu(!isDropdownOpenedu);
  };

  const handleDegreeSelect = (subject: any) => {
    setSelectedDegree(subject);
    setDegree(false);
  };

  const toggleDropdownedumajoredu = (e: any) => {
    e.preventDefault();
    setmajoredu(!majoredu);
  };

  const handlemajoreduSelect = (subject: any) => {
    setSelectedmajoredu(subject);
    setmajoredu(false);
  };

  const handleYearSelect = (year: any) => {
    setSelectedYearedu(year);
    setisDropdownOpenedu(false);
  };

  const handleSubmit = () => {
    setEducationInfo({
      universityCollage,
      selectedDegree,
      selectedmajoredu,
      selectedYearedu,
      school,
    });
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="etutor-signup bg-questionbg px-4 py-6 sm:px-8 sm:py-8 md:px-12  md:py-10 custom-lg:px-16 custom-lg:py-12 custom-xl:px-[69px] custom-xl:py-12 rounded-[30px]">
      <FormHeading
        className=""
        heading="Education"
        paragraph="Tutors are required to be enrolled in or have a graduation from a four-year college program "
      />
      <form
        className="pt-12 custom-xl:pt-[32px] w-full grid grid-cols-1 custom-xl:grid-cols-2 gap-3 custom-xl:gap-6 custom-2xl:gap-x-[6rem]"
        action=""
      >
        <div className="">
          <InputHeading text="University/College " />
          <div className="rounded-full bg-purpleBtn px-10 py-4 ">
            <input
              type="text"
              className="placeholder-darkpurple text-2xl text-[#685AAD]   w-full bg-transparent outline-none mb:text-xs placeholder:text-[#AD9DDE]"
              placeholder="Search for your school"
              value={universityCollage}
              onChange={e => {
                setUniversityCollage(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="">
          <InputHeading text="Degree" />
          <div className="relative w-full flex justify-center items-center">
            <div
              className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-darkBlue text-2xl mb:text-sm"
              onClick={toggleDropdownedu}
            >
              <button
                className={`bg-purpleBtn focus:outline-none truncate  ${
                  selectedDegree ? 'text-darkpurple' : 'text-[#AD9DDE]'
                }`}
              >
                {selectedDegree ? selectedDegree : 'Select a degree'}
                {/* Display selected degree */}
              </button>
              {degree ? (
                <Image loading="lazy" src={uparrow} alt="dropdown" />
              ) : (
                <Image loading="lazy" src={dropdown} alt="uparrow" />
              )}
            </div>

            {degree && (
              <div
                onMouseLeave={() => {
                  setDegree(false);
                }}
                className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-[#DBCAFF] py-4 px-10"
              >
                <div id="style-2" className=" max-h-[20rem] overflow-y-auto">
                  {degrees.map(subject => (
                    <div
                      key={subject}
                      className="flex items-center p-2 text-darkBlue border-b  py-2 text-2xl max-w-[80%] border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple"
                      onClick={() => handleDegreeSelect(subject)}
                    >
                      <span>{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="">
          <InputHeading text="Major" />
          <div className="relative w-full flex justify-center items-center">
            <div
              className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-[#AD9DDE] text-2xl mb:text-sm"
              onClick={toggleDropdownedumajoredu}
            >
              <button
                className={`bg-purpleBtn focus:outline-none  ${
                  selectedmajoredu ? 'text-darkpurple' : 'text-[#AD9DDE]'
                }`}
              >
                {selectedmajoredu ? selectedmajoredu : 'Select'} {/* Show selected majoredu */}
              </button>
              {majoredu ? (
                <Image loading="lazy" src={uparrow} alt="dropdown" />
              ) : (
                <Image loading="lazy" src={dropdown} alt="uparrow" />
              )}
            </div>

            {majoredu && (
              <div className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-purpleBtn  px-8 py-6 ">
                <div id="style-2" className=" px-2 max-h-[15rem] overflow-y-auto overflow-x-hidden">
                  {subjects.map(subject => (
                    <div
                      key={subject}
                      className="flex items-center p-2 text-darkBlue border-b px-5 py-2 max-w-[80%] truncate text-2xl border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple"
                      onClick={() => handlemajoreduSelect(subject)}
                    >
                      <span>{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="">
          <InputHeading text="Graduation Year" />
          <div className="relative w-full flex justify-center items-center">
            <div
              className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-darkBlue text-2xl mb:text-sm"
              onClick={toggleDropdownedugraduationyear}
            >
              <button
                className={`bg-purpleBtn focus:outline-none  ${
                  selectedYearedu ? 'text-darkpurple' : 'text-[#AD9DDE]'
                }`}
              >
                {selectedYearedu ? selectedYearedu : 'Select a graduation year'}{' '}
                {/* Display selected year */}
              </button>
              {isDropdownOpenedu ? (
                <Image loading="lazy" src={uparrow} alt="dropdown" />
              ) : (
                <Image loading="lazy" src={dropdown} alt="uparrow" />
              )}
            </div>

            {isDropdownOpenedu && (
              <div className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-[#DBCAFF] py-4 px-10">
                <div id="style-2" className=" max-h-[20rem] overflow-y-auto">
                  {graduationYears.map(year => (
                    <div
                      key={year}
                      className="flex items-center p-2 text-darkBlue border-b  py-2 text-2xl max-w-[80%] border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple"
                      onClick={() => handleYearSelect(year)} // Set selected year and close dropdown
                    >
                      <span>{year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="" onClick={() => setisVisibleedu(true)}>
            <InputHeading
              text="+ Add School "
              className={`!text-[#AE92F9] cursor-pointer text-xl custom-xl:!text-4xl ${
                isVisibleedu ? '!text-[#8653FF]' : '!text-[#AE92F9]'
              }`}
            />
          </div>
          {isVisibleedu && (
            <div className=" w-full custom-2xl:max-w-[33.2rem]">
              <div className="rounded-full bg-purpleBtn px-10 py-4">
                <input
                  type="text"
                  className="placeholder-darkpurple text-2xl text-[#685AAD]   w-full bg-transparent outline-none mb:text-xs placeholder:text-[#AD9DDE]"
                  placeholder="Add School"
                  value={school}
                  onChange={e => {
                    setschool(e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          <div className="mt-4">
            <button
              type="button"
              disabled={
                !universityCollage || !selectedDegree || !selectedmajoredu || !selectedYearedu
              }
              className={`w-full py-4 px-8 rounded-full text-[22px] xl:text-[27px] 2xl:text-[30px] 3xl:text-[30px] font-semibold text-white transition-all duration-300
              ${
                universityCollage && selectedDegree && selectedmajoredu && selectedYearedu
                  ? 'bg-[#9184F0] hover:bg-[#7A6BD9] cursor-pointer shadow-lg hover:shadow-xl'
                  : 'bg-gray-400 cursor-not-allowed opacity-50'
              }
            `}
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </form>
      <style jsx>{`
        #style-2::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: #c9bbef;
        }

        #style-2::-webkit-scrollbar {
          width: 5px;
          background-color: transparent;
        }

        #style-2::-webkit-scrollbar-thumb {
          border-radius: 10px;

          background-color: #8f81c7;
        }
      `}</style>
    </div>
  );
};

export default EducationInformation;
