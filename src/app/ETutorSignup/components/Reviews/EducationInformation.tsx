import React, { useState } from 'react';
import Header from './Header';
import Image from 'next/image';
import dropdown from '../../../../../public/assets/icons/downarrow.svg';
import uparrow from '../../../../../public/assets/icons/uparrow.svg';
import { degrees, subjects } from '../Data';
import { useToast } from '@/hooks/use-toast';

interface EducationInformationProps {
  educationInfo: any;
  setEducationInfo: (data: any) => void;
}

const EducationInformation = ({ educationInfo, setEducationInfo }: EducationInformationProps) => {
  const { toast } = useToast();

  const [editActive, setEditActive] = useState(false);
  const [universityCollage, setUniversityCollage] = useState(educationInfo.universityCollage);
  const [selectedDegree, setSelectedDegree] = useState(educationInfo.selectedDegree);
  const [selectedmajoredu, setSelectedmajoredu] = useState(educationInfo.selectedmajoredu);
  const [selectedYearedu, setSelectedYearedu] = useState(educationInfo.selectedYearedu);
  const [school, setSchool] = useState(educationInfo.school);
  const [isDropdownOpenedu, setisDropdownOpenedu] = useState(false);
  const [degree, setDegree] = useState(false);
  const [majoredu, setmajoredu] = useState(false);

  const handleEditToggle = () => {
    if (editActive) {
      setUniversityCollage(educationInfo.universityCollage);
      setSelectedDegree(educationInfo.selectedDegree);
      setSelectedmajoredu(educationInfo.selectedmajoredu);
      setSelectedYearedu(educationInfo.selectedYearedu);
      setSchool(educationInfo.school);
    }
    setEditActive(!editActive);
  };

  const handleSave = () => {
    const requiredFields = [];

    if (!universityCollage?.trim()) {
      requiredFields.push('University/College');
    }

    if (!selectedDegree?.trim()) {
      requiredFields.push('Degree');
    }

    if (!selectedmajoredu?.trim()) {
      requiredFields.push('Major');
    }

    if (!selectedYearedu) {
      requiredFields.push('Year');
    }

    if (requiredFields.length > 0) {
      const missingFieldsText = requiredFields.join(', ');

      toast({
        title: 'Signup Failed',
        description: `Please fill in the following required fields: ${missingFieldsText}`,
        variant: 'destructive',
      });
      return;
    }

    setEditActive(false);
    setEducationInfo({
      universityCollage: universityCollage,
      selectedDegree: selectedDegree,
      selectedmajoredu: selectedmajoredu,
      selectedYearedu: selectedYearedu,
      school: school,
    });
  };

  const toggleDropdownedu = (e: any) => {
    e.preventDefault();
    setDegree(!degree);
  };

  const toggleDropdownedugraduationyear = (e: any) => {
    e.preventDefault();
    setisDropdownOpenedu(!isDropdownOpenedu);
  };

  const toggleDropdownedumajoredu = (e: any) => {
    e.preventDefault();
    setmajoredu(!majoredu);
  };

  const handleDegreeSelect = (subject: any) => {
    setSelectedDegree(subject);
    setDegree(false);
  };

  const handlemajoreduSelect = (subject: any) => {
    setSelectedmajoredu(subject);
    setmajoredu(false);
  };

  const handleYearSelect = (year: any) => {
    setSelectedYearedu(year);
    setisDropdownOpenedu(false);
  };

  return (
    <div className="bg-[#e6ddff] px-5 custom-lg:px-8 rounded-[30px] mt-12 custom-xl:mt-[70px]">
      <Header
        heading="Education"
        editActive={editActive}
        handleEditToggle={handleEditToggle}
        handleSave={handleSave}
      />
      <div className="grid grid-cols-1 custom-lg:grid-cols-2 gap-3 custom-xl:gap-[4.4rem] py-5 custom-xl:py-12 custom-xl:pl-5">
        {!editActive && (
          <>
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2
                className={`font-semibold ${!universityCollage ? 'text-red-500' : 'text-darkBlue'}`}
              >
                University/college
              </h2>
              <p className="mt-2 sm:mt-5 font-light">{universityCollage || 'Not provided'}</p>
            </div>
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2
                className={`font-semibold ${!selectedmajoredu ? 'text-red-500' : 'text-darkBlue'}`}
              >
                Major
              </h2>
              <p className="mt-2 sm:mt-5 font-light">{selectedmajoredu || 'Not provided'}</p>
            </div>
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-semibold ${!selectedDegree ? 'text-red-500' : 'text-darkBlue'}`}>
                Degree
              </h2>
              <p className="mt-2 sm:mt-5 font-light">{selectedDegree || 'Not provided'}</p>
            </div>
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2
                className={`font-semibold ${!selectedYearedu ? 'text-red-500' : 'text-darkBlue'}`}
              >
                Year
              </h2>
              <p className="mt-2 sm:mt-5 font-light">{selectedYearedu || 'Not provided'}</p>
            </div>
            {school && (
              <div className="text-lg custom-xl:text-[27px] text-darkBlue">
                <h2 className="font-semibold">School</h2>
                <p className="mt-2 sm:mt-5 font-light">{school}</p>
              </div>
            )}
          </>
        )}
        {editActive && (
          <>
            {/* University/College */}
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2
                className={`font-normal ${!universityCollage ? 'text-red-500' : 'text-darkBlue'}`}
              >
                University/college *
              </h2>
              <div className="mt-2 sm:mt-5">
                <input
                  type="text"
                  value={universityCollage}
                  onChange={e => {
                    setUniversityCollage(e.target.value);
                  }}
                  className={`w-full px-4 py-3 bg-purpleBtn rounded-full text-darkBlue text-lg custom-xl:text-xl border-none outline-none ${
                    !universityCollage ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="Enter University/College"
                />
                {!universityCollage && (
                  <p className="text-red-500 text-sm mt-1 ml-2">University/College is required</p>
                )}
              </div>
            </div>

            {/* Major */}
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-normal ${!selectedmajoredu ? 'text-red-500' : 'text-darkBlue'}`}>
                Major *
              </h2>
              <div className="mt-2 sm:mt-5">
                <div className="relative w-full flex justify-center items-center">
                  <div
                    className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-[#AD9DDE] text-2xl mb:text-sm"
                    onClick={toggleDropdownedumajoredu}
                  >
                    <button
                      className={`bg-purpleBtn focus:outline-none ${
                        selectedmajoredu ? 'text-darkpurple' : 'text-[#AD9DDE]'
                      }`}
                    >
                      {selectedmajoredu ? selectedmajoredu : 'Select'}
                    </button>
                    {majoredu ? (
                      <Image loading="lazy" src={uparrow} alt="dropdown" />
                    ) : (
                      <Image loading="lazy" src={dropdown} alt="uparrow" />
                    )}
                  </div>

                  {majoredu && (
                    <div className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-purpleBtn px-8 py-6">
                      <div
                        id="style-2"
                        className="px-2 max-h-[15rem] overflow-y-auto overflow-x-hidden"
                      >
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
            </div>

            {/* Degree */}
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-normal ${!selectedDegree ? 'text-red-500' : 'text-darkBlue'}`}>
                Degree *
              </h2>
              <div className="mt-2 sm:mt-5">
                <div className="relative w-full flex justify-center items-center">
                  <div
                    className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-darkBlue text-2xl mb:text-sm"
                    onClick={toggleDropdownedu}
                  >
                    <button
                      className={`bg-purpleBtn focus:outline-none truncate ${
                        selectedDegree ? 'text-darkpurple' : 'text-[#AD9DDE]'
                      }`}
                    >
                      {selectedDegree ? selectedDegree : 'Select a degree'}
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
                      <div id="style-2" className="max-h-[20rem] overflow-y-auto">
                        {degrees.map(subject => (
                          <div
                            key={subject}
                            className="flex items-center p-2 text-darkBlue border-b py-2 text-2xl max-w-[80%] border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple"
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
            </div>

            {/* Year */}
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-normal ${!selectedYearedu ? 'text-red-500' : 'text-darkBlue'}`}>
                Year *
              </h2>
              <div className="mt-2 sm:mt-5">
                <div className="relative w-full flex justify-center items-center">
                  <div
                    className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-darkBlue text-2xl mb:text-sm"
                    onClick={toggleDropdownedugraduationyear}
                  >
                    <button
                      className={`bg-purpleBtn focus:outline-none ${
                        selectedYearedu ? 'text-darkpurple' : 'text-[#AD9DDE]'
                      }`}
                    >
                      {selectedYearedu ? selectedYearedu : 'Select a graduation year'}
                    </button>
                    {isDropdownOpenedu ? (
                      <Image loading="lazy" src={uparrow} alt="dropdown" />
                    ) : (
                      <Image loading="lazy" src={dropdown} alt="uparrow" />
                    )}
                  </div>

                  {isDropdownOpenedu && (
                    <div className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-[#DBCAFF] py-4 px-10">
                      <div id="style-2" className="max-h-[20rem] overflow-y-auto">
                        {Array.from({ length: 77 }, (_, i) => 2026 - i).map(year => (
                          <div
                            key={year}
                            className="flex items-center p-2 text-darkBlue border-b py-2 text-2xl max-w-[80%] border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple"
                            onClick={() => handleYearSelect(year)}
                          >
                            <span>{year}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* School */}
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className="font-normal">School</h2>
              <div className="mt-2 sm:mt-5">
                <input
                  type="text"
                  value={school}
                  onChange={e => setSchool(e.target.value)}
                  className="w-full px-4 py-3 bg-purpleBtn rounded-full text-darkBlue text-lg custom-xl:text-xl border-none outline-none"
                  placeholder="Enter School"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EducationInformation;
