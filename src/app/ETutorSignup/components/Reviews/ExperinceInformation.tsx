import React, { useState } from 'react';
import Header from './Header';
import Image from 'next/image';
import { levels, months, subjectOptions, languageoptions, days } from '../Data';
import { Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from 'lucide-react';
import calendaricon from '../../../../../public/calendaricongray.svg';
import { useToast } from '../../../../hooks/use-toast';

interface ExperinceInformationProps {
  experinceInfo: any;
  setExperinceInfo: (data: any) => void;
}

const ExperinceInformation = ({ experinceInfo, setExperinceInfo }: ExperinceInformationProps) => {
  const { toast } = useToast();

  const [editActive, setEditActive] = useState(false);
  const [hasTutoringExperience, setHasTutoringExperience] = useState<string | undefined>(
    experinceInfo.hasTutoringExperience || ''
  );
  const [tutoringInterestLevel, setTutoringInterestLevel] = useState<string[]>(
    experinceInfo.tutoringInterestLevel || []
  );
  const [tutoringSubjects, setTutoringSubjects] = useState<string[]>(
    experinceInfo.tutoringSubjects || []
  );
  const [language, setlanguage] = useState<string[]>(experinceInfo.language || []);
  const [instructionsInterest, setInstructionsInterest] = useState<string[]>(
    experinceInfo.instructionsInterest || []
  );
  const [tutorAvailabilityHours, setTutorAvailabilityHours] = useState(
    experinceInfo.tutorAvailabilityHours || ''
  );
  const [selectedStartTutoringDate, setSelectedTutoringDate] = useState<Date | null>(
    experinceInfo.selectedStartTutoringDate
      ? new Date(experinceInfo.selectedStartTutoringDate)
      : null
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [generalAvailability, setGeneralAvailability] = useState<Record<string, string[]>>(
    experinceInfo.generalAvailability || {}
  );
  const [classRoomTeachingExperience, setClassRoomTeachingExperience] = useState(
    experinceInfo.classRoomTeachingExperience || ''
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState<boolean>(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const timeSlots: string[] = ['Morning', 'Afternoon', 'Evening'];

  const handleEditToggle = () => {
    if (editActive) {
      setHasTutoringExperience(experinceInfo.hasTutoringExperience);
      setTutoringInterestLevel(experinceInfo.tutoringInterestLevel || []);
      setTutoringSubjects(experinceInfo.tutoringSubjects || []);
      setlanguage(experinceInfo.language || []);
      setInstructionsInterest(experinceInfo.instructionsInterest || []);
      setTutorAvailabilityHours(experinceInfo.tutorAvailabilityHours || '');
      setSelectedTutoringDate(
        experinceInfo.selectedStartTutoringDate
          ? new Date(experinceInfo.selectedStartTutoringDate)
          : null
      );
      setGeneralAvailability(experinceInfo.generalAvailability || {});
      setClassRoomTeachingExperience(experinceInfo.classRoomTeachingExperience || '');
    }
    setEditActive(!editActive);
  };

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
    setSelectedTutoringDate(date);
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

  const handleSave = () => {
    const errors = validateForm();
    setValidationErrors(errors);

    if (errors.length > 0) {
      const errorMessages = {
        hasTutoringExperience: 'Please select whether you have tutoring experience',
        tutoringInterestLevel: 'Please select at least one tutoring level',
        tutoringSubjects: 'Please select at least one subject',
        language: 'Please select at least one language',
        instructionsInterest: 'Please select at least one instruction type',
        tutorAvailabilityHours: 'Please select your availability hours',
        classRoomTeachingExperience: 'Please select whether you have classroom teaching experience',
      };

      const firstError = errors[0];
      const errorMessage =
        errorMessages[firstError as keyof typeof errorMessages] ||
        'Please fill all required fields';

      toast({
        title: 'Validation Error',
        description: errorMessage,
        variant: 'destructive',
      });

      return;
    }

    // Update the experinceInfo with current form values
    const updatedInfo = {
      hasTutoringExperience,
      tutoringInterestLevel,
      tutoringSubjects,
      language,
      instructionsInterest,
      tutorAvailabilityHours,
      selectedStartTutoringDate,
      generalAvailability,
      classRoomTeachingExperience,
    };

    setExperinceInfo(updatedInfo);
    setEditActive(false);

    toast({
      title: 'Success',
      description: 'Experience information updated successfully!',
      variant: 'default',
    });
  };

  return (
    <div className="bg-[#e6ddff] px-5 custom-lg:px-8 rounded-[30px] mt-12 custom-xl:mt-[70px]">
      <Header
        heading="Experience"
        editActive={editActive}
        handleEditToggle={handleEditToggle}
        handleSave={handleSave}
      />
      <div className="grid grid-cols-1 gap-3 custom-xl:gap-[4.4rem] py-5 custom-xl:py-12 custom-xl:pl-5">
        {!editActive && (
          <>
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className="font-semibold">Do you have tutoring experience?</h2>
              <p className="mt-2 sm:mt-5 font-light">
                {experinceInfo.hasTutoringExperience ? 'Yes' : 'No'}
              </p>
            </div>

            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className="font-semibold">What level(s) are you interested in tutoring?</h2>
              <p className="mt-2 sm:mt-5 font-light">
                {experinceInfo.tutoringInterestLevel?.length > 0
                  ? experinceInfo.tutoringInterestLevel.map((level: any, index: number) => (
                      <span key={index} className="block mb-1">
                        {level}
                      </span>
                    ))
                  : '-----'}
              </p>
            </div>

            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className="font-semibold">What subject(s) can you tutor in?</h2>
              <p className="mt-2 sm:mt-5 font-light">
                {experinceInfo.tutoringSubjects?.length > 0
                  ? experinceInfo.tutoringSubjects.map((subject: any, index: number) => (
                      <span key={index} className="block mb-1">
                        {subject}
                      </span>
                    ))
                  : '-----'}
              </p>
            </div>

            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className="font-semibold">What languages can you tutor in?</h2>
              <p className="mt-2 sm:mt-5 font-light">
                {experinceInfo.language?.length > 0
                  ? experinceInfo.language.map((language: any, index: number) => (
                      <span key={index} className="block">
                        {language}
                      </span>
                    ))
                  : '-----'}
              </p>
            </div>

            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className="font-semibold">What type of instruction are you interested in?</h2>
              <p className="mt-2 sm:mt-5 font-light">
                {experinceInfo.instructionsInterest?.length > 0
                  ? experinceInfo.instructionsInterest.map((type: any, index: number) => (
                      <span key={index} className="block">
                        {type}
                      </span>
                    ))
                  : '-----'}
              </p>
            </div>

            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className="font-semibold">
                How many hours are you available to tutor each week?
              </h2>
              <p className="mt-2 sm:mt-5 font-light">
                {experinceInfo.tutorAvailabilityHours || '-----'}
              </p>
            </div>

            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className="font-semibold">What date can you start tutoring?</h2>
              <p className="mt-2 sm:mt-5 font-light">
                {experinceInfo.selectedStartTutoringDate
                  ? new Date(experinceInfo.selectedStartTutoringDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : '-----'}
              </p>
            </div>

            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className="font-semibold">General Availability</h2>
              <p className="mt-2 sm:mt-5 font-light">
                {experinceInfo.generalAvailability &&
                Object.keys(experinceInfo.generalAvailability).length > 0
                  ? Object.entries(experinceInfo.generalAvailability).map(
                      ([day, times]: [string, any], index: number) => (
                        <span key={index} className="block mb-1">
                          <b>{day}</b>: {Array.isArray(times) ? times.join(', ') : times}
                        </span>
                      )
                    )
                  : '-----'}
              </p>
            </div>

            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className="font-semibold">Classroom Teaching Experience</h2>
              <p className="mt-2 sm:mt-5 font-light">
                {experinceInfo.classRoomTeachingExperience ? 'Yes' : 'No'}
              </p>
            </div>
          </>
        )}
        {editActive && (
          <div className="space-y-6">
            {/* Tutoring Experience */}
            <div>
              <h2
                className={`text-lg custom-xl:text-[26px] font-medium py-3 custom-xl:py-5 ${
                  validationErrors.includes('hasTutoringExperience')
                    ? 'text-red-500'
                    : 'text-[#534988]'
                }`}
              >
                Do you have tutoring experience? <span className="text-[#FC7777]">*</span>
              </h2>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="tutoringExperience"
                    value="yes"
                    checked={hasTutoringExperience === 'yes'}
                    onChange={() => handleRadioChange('yes')}
                    className="w-5 h-5 text-[#6C5BAA]"
                  />
                  <span className="text-[#685AAD] text-xl custom-xl:text-2xl">Yes</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="tutoringExperience"
                    value="no"
                    checked={hasTutoringExperience === 'no'}
                    onChange={() => handleRadioChange('no')}
                    className="w-5 h-5 text-[#6C5BAA]"
                  />
                  <span className="text-[#685AAD] text-xl custom-xl:text-2xl">No</span>
                </label>
              </div>
            </div>

            {/* Tutoring Interest Level */}
            <div className="mt-6">
              <h2
                className={`text-lg custom-xl:text-[26px] font-medium py-3 custom-xl:py-5 ${
                  validationErrors.includes('tutoringInterestLevel')
                    ? 'text-red-500'
                    : 'text-[#534988]'
                }`}
              >
                What level(s) are you interested in tutoring?{' '}
                <span className="text-[#FC7777]">*</span>
              </h2>
              <div className="w-full mx-auto mt-2 custom-xl:mt-3 mb-3">
                <div className="grid grid-cols-1 gap-3">
                  {levels.map(level => (
                    <label key={level} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tutoringInterestLevel.includes(level)}
                        onChange={() => handleCheckboxChange(level)}
                        className="w-5 h-5 text-[#6C5BAA]"
                      />
                      <span className="text-[#685AAD] text-xl custom-xl:text-2xl">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Tutoring Subjects */}
            <div className="mt-6">
              <h2
                className={`text-lg custom-xl:text-[26px] font-medium py-3 custom-xl:py-5 ${
                  validationErrors.includes('tutoringSubjects') ? 'text-red-500' : 'text-[#534988]'
                }`}
              >
                What subject(s) can you tutor in? <span className="text-[#FC7777]">*</span>
              </h2>
              <div className="w-full mx-auto mt-2 custom-xl:mt-3 mb-3">
                <div className="relative select-none max-w-[28rem]">
                  <div
                    className="w-full bg-[#DBCAFF] text-[#ad9dde] text-sm custom-2xl:text-[22px] pr-7 sm:pr-8 pl-10 sm:pl-10 py-2 custom-2xl:py-[17px] rounded-full cursor-pointer flex justify-between items-center"
                    onClick={toggleSubjectDropdown}
                  >
                    <span>
                      {tutoringSubjects.length > 0
                        ? `${tutoringSubjects.length} selected`
                        : 'select subjects'}
                    </span>
                    {isSubjectDropdownOpen ? (
                      <ChevronUp size={30} className="text-[#a394d6]" />
                    ) : (
                      <ChevronDown size={30} className="text-[#a394d6]" />
                    )}
                  </div>

                  {isSubjectDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[92%] mx-auto py-4 custom-2xl:py-7">
                      <div className="max-h-[16.4rem] overflow-y-scroll">
                        {subjectOptions.map(subject => (
                          <div
                            key={subject.value}
                            className="custom-xl:py-2 cursor-pointer flex items-center"
                            onClick={() => handleSubjectClick(subject.value)}
                          >
                            <div className="border-b-2 border-[#a394d682] py-2 custom-xl:py-3 flex items-center gap-4 w-full px-0 custom-xl:px-4 max-w-[90%] truncate">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={tutoringSubjects.includes(subject.value)}
                                  onChange={() => {}}
                                  className="absolute opacity-0 cursor-pointer"
                                />
                                <div
                                  className={`h-4 custom-xl:h-7 w-4 custom-xl:w-7 border custom-xl:border-2 border-[#6C5BAA] hover:bg-[#a394d6] hover:border-[#a394d6] rounded-sm custom-xl:rounded-md flex items-center justify-center ${
                                    tutoringSubjects.includes(subject.value) ? 'bg-[#6c5baa]' : ''
                                  }`}
                                >
                                  {tutoringSubjects.includes(subject.value) && (
                                    <Check className="text-white" />
                                  )}
                                </div>
                              </div>
                              <span className="ml-1 sm:ml-2 text-base sm:text-lg custom-xl:text-2xl text-[#6C5BAA] truncate">
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
                  <div className="flex flex-wrap items-start justify-start gap-2 mt-3 sm:mt-5 custom-xl:mt-8 px-2 custom-xl:px-6 mx-auto min-h-[3.4rem]">
                    {tutoringSubjects.map(subject => (
                      <span
                        key={subject}
                        className="bg-[#6C5BAA] text-white text-xs custom-xl:text-xl leading-none px-5 py-1.5 custom-2xl:py-1.5 rounded-full flex items-center gap-7 justify-between"
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
              </div>
            </div>

            {/* Languages */}
            <div className="mt-6">
              <h2 className="text-lg custom-xl:text-[26px] font-medium text-[#534988] py-3 custom-xl:py-5">
                What languages can you tutor in? <span className="text-[#FC7777]">*</span>
              </h2>
              <div className="w-full mx-auto mt-2 custom-xl:mt-3 mb-3">
                <div className="relative select-none max-w-[28rem]">
                  <div
                    className="w-full bg-[#DBCAFF] text-[#ad9dde] text-sm custom-2xl:text-[22px] pr-7 sm:pr-8 pl-10 sm:pl-10 py-2 custom-2xl:py-[17px] rounded-full cursor-pointer flex justify-between items-center"
                    onClick={toggleLanguageDropdown}
                  >
                    <span>
                      {language.length > 0 ? `${language.length} selected` : 'select a language'}
                    </span>
                    {isLanguageDropdownOpen ? (
                      <ChevronUp size={30} className="text-[#a394d6]" />
                    ) : (
                      <ChevronDown size={30} className="text-[#a394d6]" />
                    )}
                  </div>

                  {isLanguageDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[92%] mx-auto py-4 custom-2xl:py-7">
                      <div className="max-h-[16.4rem] overflow-y-scroll">
                        {languageoptions.map(lang => (
                          <div
                            key={lang.value}
                            className="custom-xl:py-2 cursor-pointer flex items-center"
                            onClick={() => handleLanguageClick(lang.value)}
                          >
                            <div className="border-b-2 border-[#a394d682] py-2 custom-xl:py-3 flex items-center gap-4 w-full px-0 custom-xl:px-4 max-w-[90%] truncate">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={language.includes(lang.value)}
                                  onChange={() => {}}
                                  className="absolute opacity-0 cursor-pointer"
                                />
                                <div
                                  className={`h-4 custom-xl:h-7 w-4 custom-xl:w-7 border custom-xl:border-2 border-[#6C5BAA] hover:bg-[#a394d6] hover:border-[#a394d6] rounded-sm custom-xl:rounded-md flex items-center justify-center ${
                                    language.includes(lang.value) ? 'bg-[#6c5baa]' : ''
                                  }`}
                                >
                                  {language.includes(lang.value) && (
                                    <Check className="text-white" />
                                  )}
                                </div>
                              </div>
                              <span className="ml-1 sm:ml-2 text-base sm:text-lg custom-xl:text-2xl text-[#6C5BAA] truncate">
                                {lang.label}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {language.length > 0 && (
                  <div className="flex flex-wrap items-start justify-start gap-2 mt-3 sm:mt-5 custom-xl:mt-8 px-2 custom-xl:px-6 mx-auto min-h-[3.4rem]">
                    {language.map(lang => (
                      <span
                        key={lang}
                        className="bg-[#6C5BAA] text-white text-xs custom-xl:text-xl leading-none px-5 py-1.5 custom-2xl:py-1.5 rounded-full flex items-center gap-7 justify-between"
                      >
                        {lang}
                        <X
                          className="ml-7 h-4 custom-2xl:h-5 w-4 custom-2xl:w-5 cursor-pointer"
                          onClick={() => removeLanguage(lang)}
                        />
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Instructions Interest */}
            <div>
              <h2 className="text-lg custom-xl:text-[26px] font-medium text-[#534988] py-3 custom-xl:py-5">
                What type of instruction are you interested in?{' '}
                <span className="text-[#FC7777]">*</span>
              </h2>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={instructionsInterest.includes('1-on-1')}
                    onChange={() => handleCheckboxChangenumberofstudents('1-on-1')}
                    className="w-5 h-5 text-[#6C5BAA]"
                  />
                  <span className="text-[#685AAD] text-xl custom-xl:text-2xl">1-on-1</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={instructionsInterest.includes('Small group (5 to 15 students)')}
                    onChange={() =>
                      handleCheckboxChangenumberofstudents('Small group (5 to 15 students)')
                    }
                    className="w-5 h-5 text-[#6C5BAA]"
                  />
                  <span className="text-[#685AAD] text-xl custom-xl:text-2xl">
                    Small group (5 to 15 students)
                  </span>
                </label>
              </div>
            </div>

            {/* Tutoring Availability Hours */}
            <div>
              <h2 className="text-lg custom-xl:text-[26px] font-medium text-[#534988] py-3 custom-xl:py-5">
                How many hours are you available to tutor each week?{' '}
                <span className="text-[#FC7777]">*</span>
              </h2>
              <div className="space-y-3">
                {['Less than 5 hours', '5-10 hours', '10-20 hours', 'More than 20 hours'].map(
                  hours => (
                    <label key={hours} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="tutoringHours"
                        value={hours}
                        checked={tutorAvailabilityHours === hours}
                        onChange={() => handleHoursChange(hours)}
                        className="w-5 h-5 text-[#6C5BAA]"
                      />
                      <span className="text-[#685AAD] text-xl custom-xl:text-2xl">{hours}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Start Tutoring Date */}
            <div className="mt-5 custom-xl:mt-8">
              <h2 className="text-lg custom-xl:text-[26px] font-medium text-[#534988] py-3 custom-xl:py-5">
                What date can you start tutoring?
              </h2>
              <div className="w-full mx-auto relative custom-xl:mt-6">
                <div className="relative select-none max-w-[30rem] w-full">
                  {/* Input field */}
                  <div
                    className="w-full bg-[#DBCAFF] text-[#ad9dde] text-sm custom-2xl:text-[22px] pr-7 sm:pr-8 pl-10 sm:pl-10 py-2 custom-2xl:py-[17px] rounded-full cursor-pointer flex justify-between items-center"
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
                    <div className="bg-[#e2d5fd] text-[#a394d6] z-50 rounded-3xl p-4 shadow-lg absolute top-[72px] w-full px-4 sm:px-10 py-4 sm:py-9">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-11">
                        <button onClick={handlePrevMonth} className="text-purple-600">
                          <ChevronLeft className="w-8 h-8 font-bold" />
                        </button>
                        <h2 className="text-[#685AAD] font-medium text-sm sm:text-xl custom-2xl:text-3xl">
                          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h2>
                        <button onClick={handleNextMonth} className="text-purple-600">
                          <ChevronRight className="w-8 h-8 font-bold" />
                        </button>
                      </div>

                      {/* Days of week */}
                      <div className="grid grid-cols-7 gap-1 mb-2">
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
                                  new Date(
                                    currentDate.getFullYear(),
                                    currentDate.getMonth(),
                                    day.day
                                  )
                                );
                              }
                            }}
                            className={`p-2 text-center rounded-full text-sm sm:text-lg custom-2xl:text-2xl font-medium ${
                              day.isCurrentMonth ? 'text-[#685aad]' : 'text-[#d3c6ef]'
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
              <h2 className="text-lg custom-xl:text-[26px] font-medium text-[#534988] py-3 custom-xl:py-5">
                What&apos;s your general availability? (Select all that apply)
              </h2>
              <div className="w-[81.8%] mt-2.5">
                {days.map(day => (
                  <div
                    key={day}
                    className="flex custom-xl:pl-[29px] flex-col custom-xl:flex-row items-start custom-xl:justify-between custom-xl:items-center mb-2"
                  >
                    <span className="text-darkBlue text-xl font-medium custom-xl:font-normal custom-xl:text-[25px]">
                      {day}
                    </span>
                    <div className="flex gap-2 flex-col sm:flex-row sm:justify-between custom-xl:w-[71.4%] w-full">
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
                                  className={`w-6 h-6 custom-xl:w-[26.5px] custom-xl:h-[26.5px] border-2 custom-xl:border-[3px] border-[#685AAD] rounded-sm flex items-center justify-center ${
                                    isChecked ? 'bg-[#685AAD]' : 'bg-transparent'
                                  }`}
                                >
                                  {isChecked && <Check className="w-10 h-10 text-white" />}
                                </div>
                              </div>
                              <label
                                htmlFor={`${day}-${timeSlot}`}
                                className="text-[#685AAD] text-xl custom-xl:text-2xl pl-3 custom-xl:pl-7"
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

            {/* Classroom Teaching Experience */}
            <div className="mt-5 custom-xl:mt-7">
              <h2 className="text-lg custom-xl:text-[26px] font-medium text-[#534988] py-3 custom-xl:py-5">
                Do you have classroom teaching experience? <span className="text-[#FC7777]">*</span>
              </h2>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="classroomExperience"
                    value="yes"
                    checked={classRoomTeachingExperience === 'yes'}
                    onChange={() => setClassRoomTeachingExperience('yes')}
                    className="w-5 h-5 text-[#6C5BAA]"
                  />
                  <span className="text-[#685AAD] text-xl custom-xl:text-2xl">Yes</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="classroomExperience"
                    value="no"
                    checked={classRoomTeachingExperience === 'no'}
                    onChange={() => setClassRoomTeachingExperience('no')}
                    className="w-5 h-5 text-[#6C5BAA]"
                  />
                  <span className="text-[#685AAD] text-xl custom-xl:text-2xl">No</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperinceInformation;
