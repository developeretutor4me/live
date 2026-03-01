import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import calendaricon from '../../../../../public/calendaricongray.svg';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { timezoneoptions } from '../../components/Data';

interface TrailBookingStepTwoProps {
  bookingStep: number;
  selectedSubjects: string[];
  nextBookingStepHandler: (allSessions: any) => void;
}

interface BookingInfo {
  id: string;
  subjects: string[];
  date: string;
  time: string;
  timeZone: string;
  duration: string;
  studentNote: string;
  cost: number;
}

const TrailBookingStepTwo = ({
  bookingStep,
  selectedSubjects,
  nextBookingStepHandler,
}: TrailBookingStepTwoProps) => {
  const { toast } = useToast();

  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    id: '',
    subjects: [],
    date: '',
    time: '',
    timeZone: '',
    duration: '',
    studentNote: '',
    cost: 200,
  });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const clearFieldError = (field: string) => {
    if (validationErrors[field]) {
      const newErrors = { ...validationErrors };
      delete newErrors[field];
      setValidationErrors(newErrors);
    }
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setBookingInfo((prev: any) => ({ ...prev, date: date.toLocaleDateString() }));
    clearFieldError('date');
    setIsOpen(false);
  };

  const handleBookingInputChange = (field: any, value: any) => {
    setBookingInfo((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleTimeSelect = (time: string) => {
    // Convert 12-hour format to 24-hour format
    const [timePart, period] = time.split(' ');
    if (period) {
      const [hours, minutes] = timePart.split(':');
      let hour24 = parseInt(hours);
      if (period === 'PM' && hour24 !== 12) {
        hour24 += 12;
      } else if (period === 'AM' && hour24 === 12) {
        hour24 = 0;
      }
      const time24 = `${hour24.toString().padStart(2, '0')}:${minutes}`;
      handleBookingInputChange('time', time24);
    } else {
      handleBookingInputChange('time', time);
    }
    clearFieldError('time');
  };

  const handleSubjectToggle = (subject: string) => {
    setBookingInfo((prev: any) => {
      const currentSubjects = Array.isArray(prev.subjects) ? prev.subjects : [];
      const isSelected = currentSubjects.includes(subject);

      const updatedSubjects = isSelected
        ? currentSubjects.filter((s: string) => s !== subject)
        : [...currentSubjects, subject];

      return { ...prev, subjects: updatedSubjects };
    });
    clearFieldError('subject');
  };

  const handleStudentNoteChange = (value: string) => {
    setBookingInfo((prev: any) => ({ ...prev, studentNote: value }));
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

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

    // Add previous month's days
    const prevMonthDays = firstDay;
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.push({
        day: new Date(currentDate.getFullYear(), currentDate.getMonth(), -i).getDate(),
        isCurrentMonth: false,
      });
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // Add next month's days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    const today = new Date();

    // Ensure currentDate is a valid Date object
    if (!currentDate || !(currentDate instanceof Date)) {
      console.error('currentDate is not defined or not a valid Date object');
      return;
    }

    // Calculate the previous month
    const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);

    // Prevent navigating to a date earlier than today's month and year
    if (
      previousMonthDate.getFullYear() < today.getFullYear() ||
      (previousMonthDate.getFullYear() === today.getFullYear() &&
        previousMonthDate.getMonth() < today.getMonth())
    ) {
      toast({
        title: 'Invalid Navigation',
        description: 'Cannot navigate to a previous month before the current date.',
        variant: 'default',
      });
      return; // Exit without updating
    }

    // Update state to the previous month
    setCurrentDate(previousMonthDate);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const onAddBookingHandler = () => {
    const errors: { [key: string]: string } = {};

    // if (!bookingInfo.subjects || bookingInfo.subjects.length === 0) {
    //   errors.subject = 'Please select a subject';
    // }

    if (!bookingInfo.date || bookingInfo.date.trim() === '') {
      errors.date = 'Please select a date';
    }

    if (!bookingInfo.time || bookingInfo.time.trim() === '') {
      errors.time = 'Please select a time';
    }

    if (!bookingInfo.timeZone || bookingInfo.timeZone.trim() === '') {
      errors.timeZone = 'Please select a timezone';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    nextBookingStepHandler([bookingInfo]);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Right Panel */}
      <div className="w-[50%] m-auto bg-[#EDE8FA] p-8 rounded-2xl flex flex-col items-center">
        {/* Progress Bar */}
        <div className="w-full max-w-4xl bg-[#e9deff] rounded-full h-1 mb-8">
          <div
            className="bg-[#6949ff] h-1 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${bookingStep * 33.33}%` }}
          />
        </div>

        <div className="w-full">
          <div className="mb-8 w-[75%] mx-auto">
            <h3 className="text-[#685AAD] font-normal text-[37px] mb-6 text-center">
              Choose your <span className="font-bold">Session Details</span>
            </h3>
            <div className="space-y-6">
              <div className="space-y-6">
                <div className="w-full mx-auto relative ">
                  <div className="w-full mx-auto relative">
                    {/* Input field */}
                    <div
                      className={`w-full bg-[#DBCAFF] text-[#a394d6] text-sm custom-lg:text-xl custom-2xl:text-2xl pl-10 pr-8 py-2 sm:py-3 rounded-full cursor-pointer flex justify-between items-center ${
                        validationErrors.date ? 'border-2 border-red-500' : ''
                      }`}
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span className="text-purple-400">
                        {selectedDate ? selectedDate.toLocaleDateString() : 'Select a date'}
                      </span>
                      <Image
                        loading="lazy"
                        src={calendaricon}
                        alt="Calendar icon"
                        className="w-6 h-6"
                      />
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
                                  handleDateChange(
                                    new Date(
                                      currentDate.getFullYear(),
                                      currentDate.getMonth(),
                                      day.day
                                    )
                                  );
                                }
                              }}
                              className={`
                  p-2 text-center rounded-full text-sm sm:text-lg custom-2xl:text-2xl font-medium
                  ${day.isCurrentMonth ? 'text-[#685aad] ' : 'text-[#d3c6ef]'}
                  ${
                    selectedDate &&
                    selectedDate.getDate() === day.day &&
                    selectedDate.getMonth() === currentDate.getMonth() &&
                    selectedDate.getFullYear() === currentDate.getFullYear()
                      ? ''
                      : ''
                  }
                `}
                            >
                              {day.day}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {validationErrors.date && (
                      <p className="text-red-500 text-sm mt-1 ml-2">{validationErrors.date}</p>
                    )}
                  </div>
                </div>

                <div className="w-full mx-auto relative">
                  <div className="w-full">
                    {/* Time and Timezone Input */}
                    <div
                      className={`relative w-full bg-[#e0d4ff] text-[#685AAD] text-sm custom-lg:text-xl custom-xl:text-2xl px-6 py-4 rounded-full flex items-center justify-between ${
                        validationErrors.time ? 'border-2 border-red-500' : ''
                      }`}
                    >
                      {/* Time Section */}
                      <div className="flex items-center gap-4">
                        {/* Time Display */}
                        <div className="flex items-center gap-2">
                          <span className="text-[#685AAD] text-lg font-medium">
                            {bookingInfo.time ? bookingInfo.time : '00:00'}
                          </span>
                          {/* Time Adjusters */}
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => {
                                const currentTime = (bookingInfo.time || '00:00').toString();
                                const [hours, minutes] = currentTime.split(':');
                                let newHours = parseInt(hours) + 1;
                                if (newHours > 23) newHours = 0;
                                const newTime = `${newHours.toString().padStart(2, '0')}:${minutes}`;
                                handleTimeSelect(newTime);
                              }}
                              className="text-[#685AAD] hover:text-[#8653FF] transition-colors"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                const currentTime = (bookingInfo.time || '00:00').toString();
                                const [hours, minutes] = currentTime.split(':');
                                let newHours = parseInt(hours) - 1;
                                if (newHours < 0) newHours = 23;
                                const newTime = `${newHours.toString().padStart(2, '0')}:${minutes}`;
                                handleTimeSelect(newTime);
                              }}
                              className="text-[#685AAD] hover:text-[#8653FF] transition-colors"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* AM/PM Section */}
                        <div className="flex items-center gap-2">
                          <span className="text-[#685AAD] text-lg font-medium">
                            {bookingInfo.time
                              ? parseInt(bookingInfo.time.split(':')[0]) >= 12
                                ? 'PM'
                                : 'AM'
                              : 'AM'}
                          </span>
                          {/* AM/PM Adjusters */}
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => {
                                const currentTime = bookingInfo.time || '00:00';
                                const [hours, minutes] = currentTime.split(':');
                                let newHours = parseInt(hours);
                                newHours = newHours >= 12 ? newHours - 12 : newHours + 12;
                                const newTime = `${newHours.toString().padStart(2, '0')}:${minutes}`;
                                handleTimeSelect(newTime);
                              }}
                              className="text-[#685AAD] hover:text-[#8653FF] transition-colors"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                const currentTime = bookingInfo.time || '00:00';
                                const [hours, minutes] = currentTime.split(':');
                                let newHours = parseInt(hours);
                                newHours = newHours >= 12 ? newHours - 12 : newHours + 12;
                                const newTime = `${newHours.toString().padStart(2, '0')}:${minutes}`;
                                handleTimeSelect(newTime);
                              }}
                              className="text-[#685AAD] hover:text-[#8653FF] transition-colors"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Timezone Selector */}
                      <div className="bg-[#685AAD] rounded-full px-2 py-3 flex items-center relative">
                        <select
                          value={bookingInfo.timeZone || 'UTC'}
                          onChange={e => handleBookingInputChange('timeZone', e.target.value)}
                          className="bg-transparent text-white text-center outline-none text-sm font-medium appearance-none pr-6 w-full"
                        >
                          {timezoneoptions.map(timezone => (
                            <option key={timezone.value} value={timezone.value}>
                              {timezone.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-white absolute right-3 pointer-events-none" />
                      </div>
                    </div>

                    {/* Time options dropdown */}
                    {validationErrors.time && (
                      <p className="text-red-500 text-sm mt-1 ml-2">{validationErrors.time}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Select a Subject */}
            {/* <div className="mb-8 mt-8">
              <h3 className="text-[#685AAD] font-normal text-[37px] mb-6 text-center">
                Select a <span className="font-bold">Subject</span>
              </h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {selectedSubjects.map((subject: string) => (
                  <label
                    key={subject}
                    className={`flex items-center bg-[#DBCAFF] text-[#685AAD] px-6 py-3 rounded-lg cursor-pointer transition-colors ${
                      validationErrors.subject ? 'border-2 border-red-500' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={bookingInfo.subjects.includes(subject)}
                      onChange={() => handleSubjectToggle(subject)}
                      className="w-5 h-5 text-[#685AAD] border-2 border-[#685AAD] focus:ring-[#685AAD] mr-3 bg-[#DBCAFF] checked:bg-[#685AAD] rounded-sm appearance-none checked:bg-checkmark checked:bg-center checked:bg-no-repeat checked:bg-[length:12px_12px]"
                      style={{
                        backgroundImage: bookingInfo.subjects.includes(subject)
                          ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e")`
                          : 'none',
                      }}
                    />
                    <span className="text-[#685AAD] text-lg font-normal">{subject}</span>
                  </label>
                ))}
              </div>
              {validationErrors.subject && (
                <p className="text-red-500 text-sm mt-2 text-center">{validationErrors.subject}</p>
              )}
            </div> */}

            {/* Student Note */}
            {/* <div className="mb-8 mt-8">
              <div className="bg-[#DBCAFF] rounded-2xl p-6">
                <h3 className="text-[#685AAD] font-normal text-md mb-4">
                  Share any topics or goals you&apos;d like your eTutor to focus on during your
                  session
                </h3>
                <p className="text-[#a394d6] text-sm mb-4">
                  ex: Id&apos; love for us to review the incorrect answers from my last test.
                </p>
                <textarea
                  value={bookingInfo.studentNote || ''}
                  onChange={e => handleStudentNoteChange(e.target.value)}
                  placeholder=""
                  className="w-full bg-transparent text-[#685AAD] text-lg p-0 h-5 resize-none border-none outline-none"
                />
              </div>
            </div> */}

            {/* Total Cost and Next Button */}
            <div className="space-y-6 mt-32">
              <button
                className="w-full bg-[#8558F9] text-[#FFFFFF] py-4 rounded-full text-lg font-bold hover:bg-[#4a3a7a] transition-colors"
                onClick={onAddBookingHandler}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailBookingStepTwo;
