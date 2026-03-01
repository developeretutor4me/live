import React, { useState } from 'react';
import FormContainer from '@/components/auth/FormContainer';
import Image from 'next/image';
import Calendaricon from '../../../public/calendaricongray.svg';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ShowAvailabilityProps {
  onConfirm: (selectedDate: Date, selectedTimeZone: string) => void;
  title: string;
}

const months: string[] = [
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

const timezones: { label: string; value: string }[] = [
  { label: 'Baker Island, GMT -12:00', value: 'Baker Island, GMT -12:00' },
  { label: 'American Samoa, GMT -11:00', value: 'American Samoa, GMT -11:00' },
  { label: 'Hawaii, GMT -10:00', value: 'Hawaii, GMT -10:00' },
  { label: 'Alaska, GMT -09:00', value: 'Alaska, GMT -09:00' },
  {
    label: 'Pacific Time (US & Canada), GMT -08:00',
    value: 'Pacific Time (US & Canada), GMT -08:00',
  },
  {
    label: 'Mountain Time (US & Canada), GMT -07:00',
    value: 'Mountain Time (US & Canada), GMT -07:00',
  },
  {
    label: 'Central Time (US & Canada), GMT -06:00',
    value: 'Central Time (US & Canada), GMT -06:00',
  },
  {
    label: 'Eastern Time (US & Canada), GMT -05:00',
    value: 'Eastern Time (US & Canada), GMT -05:00',
  },
  { label: 'Caracas, GMT -04:00', value: 'Caracas, GMT -04:00' },
  { label: 'Buenos Aires, GMT -03:00', value: 'Buenos Aires, GMT -03:00' },
  { label: 'South Georgia, GMT -02:00', value: 'South Georgia, GMT -02:00' },
  { label: 'Cape Verde, GMT -01:00', value: 'Cape Verde, GMT -01:00' },
  { label: 'London, GMT ±00:00', value: 'London, GMT ±00:00' },
  { label: 'Berlin, GMT +01:00', value: 'Berlin, GMT +01:00' },
  { label: 'Cairo, GMT +02:00', value: 'Cairo, GMT +02:00' },
  { label: 'Moscow, GMT +03:00', value: 'Moscow, GMT +03:00' },
  { label: 'Dubai, GMT +04:00', value: 'Dubai, GMT +04:00' },
  { label: 'Islamabad, GMT +05:00', value: 'Islamabad, GMT +05:00' },
  {
    label: 'India Standard Time, GMT +05:30',
    value: 'India Standard Time, GMT +05:30',
  },
  { label: 'Nepal, GMT +05:45', value: 'Nepal, GMT +05:45' },
  { label: 'Dhaka, GMT +06:00', value: 'Dhaka, GMT +06:00' },
  { label: 'Myanmar, GMT +06:30', value: 'Myanmar, GMT +06:30' },
  { label: 'Bangkok, GMT +07:00', value: 'Bangkok, GMT +07:00' },
  { label: 'Beijing, GMT +08:00', value: 'Beijing, GMT +08:00' },
  {
    label: 'Australia Central Time, GMT +08:45',
    value: 'Australia Central Time, GMT +08:45',
  },
  { label: 'Tokyo, GMT +09:00', value: 'Tokyo, GMT +09:00' },
  {
    label: 'Australia Central Time, GMT +09:30',
    value: 'Australia Central Time, GMT +09:30',
  },
  { label: 'Sydney, GMT +10:00', value: 'Sydney, GMT +10:00' },
  {
    label: 'Lord Howe Island, GMT +10:30',
    value: 'Lord Howe Island, GMT +10:30',
  },
  {
    label: 'Solomon Islands, GMT +11:00',
    value: 'Solomon Islands, GMT +11:00',
  },
  { label: 'Norfolk Island, GMT +11:30', value: 'Norfolk Island, GMT +11:30' },
  { label: 'Auckland, GMT +12:00', value: 'Auckland, GMT +12:00' },
  {
    label: 'Chatham Islands, GMT +12:45',
    value: 'Chatham Islands, GMT +12:45',
  },
  { label: "Nuku'alofa, GMT +13:00", value: "Nuku'alofa, GMT +13:00" },
  { label: 'Kiritimati, GMT +14:00', value: 'Kiritimati, GMT +14:00' },
];

const ShowAvailability = ({ onConfirm, title }: ShowAvailabilityProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isOpentime, setIsOpentime] = useState(false);
  const [selectedTime, setSelectedTime] = useState('Berlin, GMT +02:00');
  const [selectedTimeZone, setSelectedTimeZone] = useState('Berlin, GMT +02:200');

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(false);
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

  const handleTimeSelect = (time: any) => {
    setSelectedTimeZone(time);
    setSelectedTime(time);
    setIsOpentime(false);
  };

  const handleConfirm = () => {
    if (!selectedDate) {
      return;
    }
    onConfirm(selectedDate, selectedTimeZone);
  };

  return (
    <FormContainer title={title} maxWidth="max-w-2xl" titleAlignment="left">
      <div className="space-y-8">
        <div className="w-full mx-auto relative ">
          <div className="w-full mx-auto relative">
            {/* Input field */}
            <div
              className="w-full bg-[#DBCAFF] text-[#a394d6] text-sm custom-lg:text-xl custom-2xl:text-2xl pl-10 pr-8 py-2 sm:py-3 rounded-full cursor-pointer flex justify-between items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="text-purple-400">
                {selectedDate ? selectedDate.toLocaleDateString() : 'Select a date'}
              </span>
              <Image loading="lazy" src={Calendaricon} alt="Calendar icon" className="w-6 h-6" />
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
                            new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day)
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
          </div>
        </div>

        <div className="w-full mx-auto mt-3 custom-xl:mt-6 relative">
          <div className="w-full relative">
            {/* Input field */}
            <div
              className="relative  w-full bg-[#DBCAFF] text-[#a394d6] text-sm custom-lg:text-xl custom-2xl:text-2xl pl-10 pr-3 py-2 sm:py-2 sm:pr-3 sm:pl-6 rounded-full cursor-pointer flex justify-between items-center"
              onClick={() => setIsOpentime(!isOpentime)}
            >
              <span className="text-[#a394d6] truncate">Start time</span>

              <div className=" h-full w-fit sm:w-full  sm:max-w-[219px] bg-[#685AAD] rounded-full text-xs sm:text-base custom-xl:text-xl flex items-center justify-start px-4 text-white p-1.5 truncate">
                <span className="px-2 truncate">{selectedTime}</span>

                {isOpentime && (
                  <div
                    onMouseLeave={() => setIsOpentime(false)}
                    className="bg-[#685AAD] text-white rounded-3xl p-2 shadow-lg absolute  top-10 sm:top-14 w-full   max-w-[219px]  right-0"
                  >
                    <div
                      id="style-2"
                      className="max-h-[11.7rem] overflow-y-auto scrollbar-none  px-2 sm:px-4"
                    >
                      {timezones.map((timezone, index) => (
                        <button
                          key={index}
                          onClick={() => handleTimeSelect(timezone.value)}
                          className={`
                                    block w-full text-left sm:px-1 py-2  truncate last:border-b-0 border-b border-white text-xs sm:text-sm 
                                    ${selectedTime === timezone.value ? '' : ''}
                                  `}
                        >
                          {timezone.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12 pt-4">
          <button
            onClick={handleConfirm}
            className="bg-[#8358F7] text-white px-[100px] py-2 rounded-full text-[20px] lg:text-[24px] xl:text-[30px] 2xl:text-[36px] font-semibold hover:bg-[#6B46C1] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Confirm
          </button>
        </div>
      </div>
    </FormContainer>
  );
};

export default ShowAvailability;
