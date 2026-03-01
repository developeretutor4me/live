import React, { useState } from 'react';

const SidebarCalendar = () => {
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

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
  return (
    <div className="bg-[#ECE8FC] rounded-2xl p-4">
      <div className="mb-4">
        <h2 className="text-[#685AAD] font-bold text-lg text-left">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="text-center text-[#685AAD] text-sm font-normal py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {generateDays().map((day: any, index: any) => (
          <button
            key={index}
            className={`
          p-2 text-center rounded-full text-sm font-normal
          ${day.isCurrentMonth ? 'text-[#685AAD] hover:bg-[#DBCAFF]' : 'text-gray-300'}
          ${
            selectedDate &&
            selectedDate.getDate() === day.day &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getFullYear() === currentDate.getFullYear()
              ? 'bg-[#685AAD] text-white'
              : ''
          }
        `}
          >
            {day.day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SidebarCalendar;
