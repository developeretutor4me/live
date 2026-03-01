import React, { useState, useEffect } from 'react';
import FormHeading from './FormHeading';
import RadioInput from './RadioInput';
import { levels, months, subjectOptions, languageoptions, days } from './Data';
import { Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from 'lucide-react';
import Image from 'next/image';
import calendaricon from '../../../../public/calendaricongray.svg';
import { useToast } from '../../../hooks/use-toast';

interface ExperienceProps {
  setExperienceInfo: (data: any) => void;
  setCurrentStep: (step: number) => void;
  currentStep: number;
}

const ExperienceQuestions = ({ question, className, span, star, hasError }: any) => {
  return (
    <div>
      <h2
        className={`${className} ${hasError ? 'text-red-500' : 'text-[#534988]'} py-3 custom-xl:py-5 text-lg custom-xl:text-[26px] font-medium `}
      >
        {question} <span className="!font-light">{span}</span>
        <span className="!font-light text-[#FC7777]">{star}</span>
      </h2>
    </div>
  );
};

const ExperienceInformation = ({
  setExperienceInfo,
  setCurrentStep,
  currentStep,
}: ExperienceProps) => {
  const [hasTutoringExperience, setHasTutoringExperience] = useState<string | undefined>('');
  const [tutoringInterestLevel, setTutoringInterestLevel] = useState<string[]>([]);
  const [tutoringSubjects, setTutoringSubjects] = useState<string[]>([]);
  const [language, setlanguage] = useState<string[]>([]);
  const [instructionsInterest, setInstructionsInterest] = useState<string[]>([]);
  const [tutorAvailabilityHours, setTutorAvailabilityHours] = useState('');
  const [selectedStartTutoringDate, setSelectedStartTutoringDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [generalAvailability, setGeneralAvailability] = useState<Record<string, string[]>>({});
  const [classRoomTeachingExperience, setClassRoomTeachingExperience] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState<boolean>(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const timeSlots: string[] = ['Morning', 'Afternoon', 'Evening'];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRadioChange = (value: string) => {
    setHasTutoringExperience(value);
  };

  const handleCheckboxChange = (level: string) => {
    setTutoringInterestLevel(prevSelected =>
      prevSelected.includes(level)
        ? prevSelected.filter(item => item !== level)
        : [...prevSelected, level]
    );
  };

  const handlePrevMonth = (e: any) => {
    e.preventDefault();
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = (e: any) => {
    e.preventDefault();
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    const prevMonthDays = firstDay;
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.push({
        day: new Date(currentDate.getFullYear(), currentDate.getMonth(), -i).getDate(),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handleStartTutoringDateChange = (date: any) => {
    setSelectedStartTutoringDate(date);
    setIsOpen(false);
  };

  const toggleSubjectDropdown = () => {
    setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
  };

  const handleSubjectClick = (subject: string) => {
    if (tutoringSubjects.includes(subject)) {
      setTutoringSubjects(tutoringSubjects.filter(item => item !== subject));
    } else {
      setTutoringSubjects([...tutoringSubjects, subject]);
    }
  };

  const removeSubject = (subject: string) => {
    setTutoringSubjects(tutoringSubjects.filter(item => item !== subject));
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const handleLanguageClick = (subject: string) => {
    if (language.includes(subject)) {
      setlanguage(language.filter(item => item !== subject));
    } else {
      setlanguage([...language, subject]);
    }
  };

  const removeLanguage = (subject: string) => {
    setlanguage(language.filter(item => item !== subject));
  };

  const handleCheckboxChangenumberofstudents = (label: string) => {
    setInstructionsInterest(prev =>
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  const handleHoursChange = (value: string) => {
    setTutorAvailabilityHours(value);
  };

  const handleTimeSlotChange = (day: string, timeSlot: string) => {
    setGeneralAvailability(prev => {
      const currentDaySlots = prev[day] || [];
      if (currentDaySlots.includes(timeSlot)) {
        return {
          ...prev,
          [day]: currentDaySlots.filter(slot => slot !== timeSlot),
        };
      } else {
        return { ...prev, [day]: [...currentDaySlots, timeSlot] };
      }
    });
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!hasTutoringExperience) errors.push('hasTutoringExperience');
    if (tutoringInterestLevel.length === 0) errors.push('tutoringInterestLevel');
    if (tutoringSubjects.length === 0) errors.push('tutoringSubjects');
    if (language.length === 0) errors.push('language');
    if (instructionsInterest.length === 0) errors.push('instructionsInterest');
    if (!tutorAvailabilityHours) errors.push('tutorAvailabilityHours');
    if (!classRoomTeachingExperience) errors.push('classRoomTeachingExperience');

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    setValidationErrors(errors);

    if (errors.length > 0) {
      toast({
        title: 'Please fill all required fields',
        description: 'All fields marked with * are required to continue.',
        variant: 'destructive',
      });
      return;
    }

    setExperienceInfo({
      hasTutoringExperience,
      tutoringInterestLevel,
      tutoringSubjects,
      language,
      instructionsInterest,
      tutorAvailabilityHours,
      selectedStartTutoringDate,
      generalAvailability,
      classRoomTeachingExperience,
    });

    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="etutor-signup bg-questionbg px-4 py-6 sm:px-8 sm:py-8 md:px-12  md:py-10 custom-lg:px-16 custom-lg:py-12 custom-xl:px-[73px] custom-xl:py-16 rounded-3xl custom-xl:rounded-[50px]">
      <FormHeading
        className=""
        heading="Teaching & Tutoring"
        paragraph="Previous experience is not requirement. Experts with a variety of background have been successful on our  platform."
      />
      <form className="pt-12  flex flex-col " action="">
        {/* Has Tutoring Experience */}
        <div>
          <ExperienceQuestions
            question="Do you have tutoring experience?"
            star="*"
            hasError={validationErrors.includes('hasTutoringExperience')}
          />
          <RadioInput
            id="experienceYes"
            name="tutoringExperience"
            value="yes"
            checked={hasTutoringExperience === 'yes'}
            onChange={() => handleRadioChange('yes')}
            label="Yes"
          />
          <RadioInput
            id="experienceNo"
            name="tutoringExperience"
            value="no"
            checked={hasTutoringExperience === 'no'}
            onChange={() => handleRadioChange('no')}
            label="NO"
          />
        </div>

        {/* Tutoring Interest Level */}
        <div className="mt-5 custom-xl:mt-6">
          <ExperienceQuestions
            question="What level(s) are you interested in tutoring? "
            span="(Select all that apply)"
            star="*"
            className="mt-3 !py-3.5"
            hasError={validationErrors.includes('tutoringInterestLevel')}
          />

          {levels.map(level => {
            const clicked = tutoringInterestLevel.includes(level);
            return (
              <div
                key={level}
                className="flex items-center py-3 custom-xl:py-[23px] px-[5px] relative"
              >
                <div className="relative flex items-center justify-center w-7 h-7">
                  <input
                    type="checkbox"
                    id={`checkbox-${level}`}
                    checked={clicked}
                    onChange={() => handleCheckboxChange(level)}
                    className="absolute w-6  h-6  custom-xl:w-7  custom-xl:h-7 opacity-0 cursor-pointer hover:!bg-darkBlue "
                  />
                  <div
                    className={`w-6 h-6  custom-xl:w-[26.5px]  custom-xl:h-[26.5px]  border-2 custom-xl:border-[3px] border-[#685AAD] rounded-sm flex items-center justify-center ${
                      clicked ? 'bg-[#685AAD]' : 'bg-transparent'
                    }`}
                  >
                    {clicked && <Check className="w-10 h-10 text-white" />}
                  </div>
                </div>
                <label
                  className="text-[#685AAD]  text-xl custom-xl:text-2xl pl-3 custom-xl:pl-7"
                  htmlFor={`checkbox-${level}`}
                >
                  {level}
                </label>
              </div>
            );
          })}
        </div>

        {/* Tutoring Subjects */}
        <div className="mt-6">
          <ExperienceQuestions
            question="What subject(s) can you tutor in?"
            star="*"
            hasError={validationErrors.includes('tutoringSubjects')}
          />
          <div className="w-full  mx-auto mt-2 custom-xl:mt-3 mb-3">
            <div className="relative  select-none max-w-[28rem]">
              <div
                className="w-full bg-[#DBCAFF] text-[#ad9dde]  text-sm  custom-2xl:text-[22px] pr-7 sm:pr-8 pl-10 sm:pl-10 py-2 custom-2xl:py-[17px] rounded-full cursor-pointer flex justify-between items-center"
                onClick={toggleSubjectDropdown}
              >
                <span>
                  {tutoringSubjects.length > 0
                    ? `${tutoringSubjects.length} selected`
                    : 'select a subject'}
                </span>
                {isSubjectDropdownOpen ? (
                  <ChevronUp size={30} className="text-[#a394d6] " />
                ) : (
                  <ChevronDown size={30} className="text-[#a394d6] " />
                )}
              </div>

              {isSubjectDropdownOpen && (
                <div
                  onMouseLeave={() => {
                    setIsSubjectDropdownOpen(false);
                  }}
                  className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[92%] mx-auto py-4 custom-2xl:py-7 "
                >
                  <div id="style-2" className="max-h-[16.4rem] overflow-y-scroll  ">
                    {subjectOptions.map((subject: { value: string; label: string }) => (
                      <div
                        key={subject.value}
                        className="  custom-xl:py-2 cursor-pointer flex !items-center"
                        onClick={() => handleSubjectClick(subject.value)}
                      >
                        <div className=" border-b-2 border-[#a394d682] py-2 custom-xl:py-3 flex items-center  gap-4  w-full px-0 custom-xl:px-4 max-w-[90%] truncate">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={tutoringSubjects.includes(subject.value)}
                              onChange={() => {}}
                              className="absolute opacity-0 cursor-pointer"
                            />
                            <div
                              className={`h-4 custom-xl:h-7 w-4 custom-xl:w-7  border custom-xl:border-2 border-[#6C5BAA] hover:bg-[#a394d6] hover:border-[#a394d6] rounded-sm custom-xl:rounded-md flex items-center justify-center ${
                                tutoringSubjects.includes(subject.value) ? 'bg-[#6c5baa]' : ''
                              }`}
                            >
                              {tutoringSubjects.includes(subject.value) && (
                                <Check className="text-white" />
                              )}
                            </div>
                          </div>
                          <span className="ml-1 sm:ml-2 text-base sm:text-lg custom-xl:text-2xl text-[#6C5BAA] truncate ">
                            {subject.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {tutoringSubjects.length > 0 && (
              <div className="flex flex-wrap items-start justify-start gap-2 mt-3 sm:mt-5 custom-xl:mt-8   px-2 custom-xl:px-6 mx-auto min-h-[3.4rem]">
                {tutoringSubjects.map(subject => (
                  <span
                    key={subject}
                    className="bg-[#6C5BAA] text-white text-xs custom-xl:text-xl leading-none px-5 py-1.5 custom-2xl:py-1.5 rounded-full flex items-center  gap-7  justify-between"
                  >
                    {subject}
                    <X
                      className="ml-7 h-4 custom-2xl:h-5 w-4 custom-2xl:w-5 cursor-pointer"
                      onClick={() => removeSubject(subject)}
                    />
                  </span>
                ))}
              </div>
            )}
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
        </div>

        {/* Languages */}
        <div className="">
          <ExperienceQuestions
            question="What languages can you tutor in?"
            star="*"
            hasError={validationErrors.includes('language')}
          />
          <div className="w-full  mx-auto mt-2 custom-xl:mt-3 mb-4">
            <div className="relative  select-none max-w-[28rem] w-full">
              <div
                className="w-full bg-[#DBCAFF] text-[#ad9dde]  text-sm  custom-2xl:text-[22px] pr-7 sm:pr-8 pl-10 sm:pl-10 py-2 custom-2xl:py-[17px] rounded-full cursor-pointer flex justify-between items-center"
                onClick={toggleLanguageDropdown}
              >
                <span>
                  {language.length > 0 ? `${language.length} selected` : 'select a language'}
                </span>
                {isLanguageDropdownOpen ? (
                  <ChevronUp size={30} className="text-[#a394d6] " />
                ) : (
                  <ChevronDown size={30} className="text-[#a394d6] " />
                )}
              </div>

              {isLanguageDropdownOpen && (
                <div
                  onMouseLeave={() => {
                    setIsLanguageDropdownOpen(false);
                  }}
                  className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[92%] mx-auto py-4 custom-2xl:py-7  "
                >
                  <div id="style-2" className="max-h-[16.4rem] overflow-y-scroll  ">
                    {languageoptions.map(subject => (
                      <div
                        key={subject.value}
                        className=" custom-xl:py-2 cursor-pointer flex !items-center"
                        onClick={() => handleLanguageClick(subject.value)}
                      >
                        <div className=" border-b-2 border-[#a394d682] py-2 custom-xl:py-3 flex items-center  gap-4  w-full px-0 custom-xl:px-4 max-w-[90%] truncate">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={language.includes(
                                // @ts-ignore
                                subject.value
                              )}
                              onChange={() => {}}
                              className="absolute opacity-0 cursor-pointer"
                            />
                            <div
                              className={`h-4 custom-xl:h-7 w-4 custom-xl:w-7  border custom-xl:border-2 border-[#6C5BAA] hover:bg-[#a394d6] hover:border-[#a394d6] rounded-sm custom-xl:rounded-md flex items-center justify-center${
                                language.includes(subject.value) ? 'bg-[#6c5baa]' : ''
                              }`}
                            >
                              {language.includes(subject.value) && <Check className="text-white" />}
                            </div>
                          </div>
                          <span className="ml-1 sm:ml-2 text-base sm:text-lg custom-xl:text-2xl text-[#6C5BAA] truncate ">
                            {subject.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {language.length > 0 && (
              <div className="flex flex-wrap items-start justify-start gap-2 mt-3 sm:mt-5 custom-xl:mt-8   px-2 custom-xl:px-6 mx-auto min-h-[3.4rem]">
                {language.map(subject => (
                  <span
                    key={subject}
                    className="bg-[#6C5BAA] text-white text-xs custom-xl:text-xl leading-none px-5 py-1.5 custom-2xl:py-1.5 rounded-full flex items-center  gap-7  justify-between"
                  >
                    {subject}
                    <X
                      className="ml-7 h-4 custom-2xl:h-5 w-4 custom-2xl:w-5 cursor-pointer"
                      onClick={() => removeLanguage(subject)}
                    />
                  </span>
                ))}
              </div>
            )}
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
        </div>

        {/* Instructions Interest */}
        <div className="mt-5 custom-xl:mt-6">
          <ExperienceQuestions
            question="What type of instruction are you interested in? "
            span="(Select all that apply)"
            star="*"
            hasError={validationErrors.includes('instructionsInterest')}
          />
          <div className="flex items-center py-3 custom-xl:py-6 relative">
            <div className="relative flex items-center justify-center w-7 h-7">
              <input
                type="checkbox"
                id="instructionOne"
                checked={instructionsInterest.includes('1-on-1')}
                onChange={() => handleCheckboxChangenumberofstudents('1-on-1')}
                className="absolute w-6  h-6  custom-xl:w-7  custom-xl:h-7 opacity-0 cursor-pointer hover:!bg-darkBlue "
              />
              <div
                className={`w-6 h-6  custom-xl:w-[26.5px]  custom-xl:h-[26.5px]  border-2 custom-xl:border-[3px] border-[#685AAD] rounded-sm flex items-center justify-center  ${
                  instructionsInterest.includes('1-on-1') ? 'bg-[#685AAD]' : 'bg-transparent'
                }`}
              >
                {instructionsInterest.includes('1-on-1') && (
                  <Check className="w-10 h-10 text-white" />
                )}
              </div>
            </div>
            <label
              className="text-[#685AAD]  text-xl custom-xl:text-2xl pl-3 custom-xl:pl-7"
              htmlFor="instructionOne"
            >
              1-on-1
            </label>
          </div>

          <div className="flex items-center py-3 custom-xl:py-6 relative">
            <div className="relative flex items-center justify-center w-7 h-7">
              <input
                type="checkbox"
                id="instructionGroup"
                checked={instructionsInterest.includes('Small group (5 to 15 students)')}
                onChange={() =>
                  handleCheckboxChangenumberofstudents('Small group (5 to 15 students)')
                }
                className="absolute w-6  h-6  custom-xl:w-7  custom-xl:h-7 opacity-0 cursor-pointer hover:!bg-darkBlue "
              />
              <div
                className={`w-6 h-6  custom-xl:w-[26.5px]  custom-xl:h-[26.5px]  border-2 custom-xl:border-[3px] border-[#685AAD] rounded-sm flex items-center justify-center  ${
                  instructionsInterest.includes('Small group (5 to 15 students)')
                    ? 'bg-[#685AAD]'
                    : 'bg-transparent'
                }`}
              >
                {instructionsInterest.includes('Small group (5 to 15 students)') && (
                  <Check className="w-10 h-10 text-white " />
                )}
              </div>
            </div>
            <label
              className="text-[#685AAD]  text-xl custom-xl:text-2xl pl-3 custom-xl:pl-7"
              htmlFor="instructionGroup"
            >
              Small group (5 to 15 students)
            </label>
          </div>
        </div>

        {/* Toturing Availability Hours */}
        <div className="mt-5 custom-xl:mt-8">
          <ExperienceQuestions
            question="How many hours are you available to tutor each week?"
            star="*"
            hasError={validationErrors.includes('tutorAvailabilityHours')}
          />
          <RadioInput
            id="hoursLessThan5"
            name="tutoringHours"
            value="Less than 5 hours"
            checked={tutorAvailabilityHours === 'Less than 5 hours'}
            onChange={() => handleHoursChange('Less than 5 hours')}
            label="Less than 5 hours"
          />
          <RadioInput
            id="hours5To10"
            name="tutoringHours"
            value="5-10 hours"
            checked={tutorAvailabilityHours === '5-10 hours'}
            onChange={() => handleHoursChange('5-10 hours')}
            label="5-10 hours"
          />
          <RadioInput
            id="hours10To20"
            name="tutoringHours"
            value="10-20 hours"
            checked={tutorAvailabilityHours === '10-20 hours'}
            onChange={() => handleHoursChange('10-20 hours')}
            label="10-20 hours"
          />
          <RadioInput
            id="hoursMoreThan20"
            name="tutoringHours"
            value="More than 20 hours"
            checked={tutorAvailabilityHours === 'More than 20 hours'}
            onChange={() => handleHoursChange('More than 20 hours')}
            label="More than 20 hours"
          />
        </div>

        {/* Start Tutoring Date */}
        <div className="mt-5 custom-xl:mt-8">
          <ExperienceQuestions question="What date can you start tutoring?" />
          <div className="w-full  mx-auto relative  custom-xl:mt-6">
            <div className="relative  select-none max-w-[30rem] w-full">
              {/* Input field */}
              <div
                className="w-full bg-[#DBCAFF] text-[#ad9dde]  text-sm  custom-2xl:text-[22px] pr-7 sm:pr-8 pl-10 sm:pl-10 py-2 custom-2xl:py-[17px] rounded-full cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="text-purple-400">
                  {selectedStartTutoringDate
                    ? selectedStartTutoringDate.toLocaleDateString()
                    : 'Select a date'}
                </span>
                <Image loading="lazy" src={calendaricon} alt="" className="w-6 h-6" />
              </div>

              {/* Calendar dropdown */}
              {isOpen && (
                <div className="bg-[#e2d5fd] text-[#a394d6] z-50 rounded-3xl p-4 shadow-lg absolute top-[72px] w-full  px-4 sm:px-10 py-4 sm:py-9">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-11  ">
                    <button onClick={handlePrevMonth} className="text-purple-600">
                      <ChevronLeft className="w-8 h-8 font-bold" />
                    </button>
                    <h2 className="text-[#685AAD] font-medium text-sm sm:text-xl custom-2xl:text-3xl">
                      {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <button onClick={handleNextMonth} className="text-purple-600">
                      <ChevronRight className="w-8 h-8 font-bold " />
                    </button>
                  </div>

                  {/* Days of week */}
                  <div className="grid grid-cols-7 gap-1 mb-2 ">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <div
                        key={index}
                        className="text-center text-[#76639b] text-sm sm:text-lg custom-2xl:text-2xl font-medium"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {generateDays().map((day, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (day.isCurrentMonth) {
                            handleStartTutoringDateChange(
                              new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day)
                            );
                          }
                        }}
                        className={`p-2 text-center rounded-full text-sm sm:text-lg custom-2xl:text-2xl font-medium${day.isCurrentMonth ? 'text-[#685aad] ' : 'text-[#d3c6ef]'}${
                          selectedStartTutoringDate &&
                          selectedStartTutoringDate.getDate() === day.day &&
                          selectedStartTutoringDate.getMonth() === currentDate.getMonth() &&
                          selectedStartTutoringDate.getFullYear() === currentDate.getFullYear()
                            ? ''
                            : ''
                        }`}
                      >
                        {day.day}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* General Availability */}
        <div className="mt-5 custom-xl:mt-14">
          <ExperienceQuestions
            question="What’s your general availability? "
            span="(Select all that apply)"
          />

          <div className="w-[81.8%] mt-2.5 ">
            {days.map(day => (
              <div
                key={day}
                className="flex custom-xl:pl-[29px] flex-col custom-xl:flex-row items-start custom-xl:justify-between  custom-xl:items-center mb-2"
              >
                <span className="text-darkBlue  text-xl font-medium custom-xl:font-normal custom-xl:text-[25px]   ">
                  {day}
                </span>
                <div className="flex gap-2 flex-col sm:flex-row sm:justify-between custom-xl:w-[71.4%] w-full  ">
                  {timeSlots.map(timeSlot => {
                    const isChecked = generalAvailability[day]?.includes(timeSlot) || false;

                    return (
                      <div key={timeSlot} className="flex items-center space-x-2">
                        <div className="flex items-center py-3 custom-xl:py-5 relative">
                          <div className="relative flex items-center justify-center w-7 h-7">
                            <input
                              type="checkbox"
                              id={`${day}-${timeSlot}`}
                              checked={isChecked}
                              onChange={() => handleTimeSlotChange(day, timeSlot)}
                              className="absolute w-7 h-7 opacity-0 cursor-pointer hover:!bg-darkBlue"
                            />
                            <div
                              className={`w-6 h-6  custom-xl:w-[26.5px]  custom-xl:h-[26.5px]  border-2 custom-xl:border-[3px] border-[#685AAD] rounded-sm flex items-center justify-center ${
                                isChecked ? 'bg-[#685AAD]' : 'bg-transparent '
                              }`}
                            >
                              {isChecked && <Check className="w-10 h-10 text-white" />}
                            </div>
                          </div>
                          <label
                            htmlFor={`${day}-${timeSlot}`}
                            className="text-[#685AAD]  text-xl custom-xl:text-2xl pl-3 custom-xl:pl-7"
                          >
                            {timeSlot}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Room Teaching Experience */}
        <div className="mt-5 custom-xl:mt-7">
          <ExperienceQuestions
            question="Do you have classroom teaching experience? "
            star="*"
            hasError={validationErrors.includes('classRoomTeachingExperience')}
          />
          <RadioInput
            id="classroomexperienceYes"
            name="tutoringExperience"
            value="yes"
            checked={classRoomTeachingExperience === 'yes'}
            onChange={() => setClassRoomTeachingExperience('yes')}
            label="Yes"
          />
          <RadioInput
            id="classroomexperienceNo"
            name="tutoringExperience"
            value="no"
            checked={classRoomTeachingExperience === 'no'}
            onChange={() => setClassRoomTeachingExperience('no')}
            label="No"
          />
        </div>

        {/* Continue Button */}
        <div className="mt-4">
          <button
            type="button"
            className={`
                w-full md:w-1/2 py-4 px-8 rounded-full text-lg font-semibold text-white transition-all duration-300
                ${
                  hasTutoringExperience &&
                  tutoringInterestLevel.length > 0 &&
                  tutoringSubjects.length > 0 &&
                  language.length > 0 &&
                  instructionsInterest.length > 0 &&
                  tutorAvailabilityHours &&
                  classRoomTeachingExperience
                    ? 'bg-[#9184F0] hover:bg-[#7A6BD9] cursor-pointer shadow-lg hover:shadow-xl'
                    : 'bg-gray-400 cursor-not-allowed opacity-50'
                }
              `}
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceInformation;
