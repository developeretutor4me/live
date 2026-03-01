import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const names = ["Total", "Daily", "Weekly", "Monthly", "Yearly"];

interface GeneralSubscriptionOverTimeProps {
  user: any[];
}

function GeneralSubscriptionOverTime({ user }: GeneralSubscriptionOverTimeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentName, setCurrentName] = useState(names[0]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [storedDates, setStoredDates] = useState([currentDate]);
  const [startDate, setStartDate] = useState(new Date("2023-02-01"));
  const [storedMonths, setStoredMonths] = useState([months[new Date().getMonth()]]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [storedYears, setStoredYears] = useState([new Date().getFullYear()]);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [StoredWeeks, setStoredWeeks] = useState("")

// Function to count subscriptions for a given date range
const countSubscriptions = (startDate: Date | null, endDate: Date | null) => {
  return user.filter(u => {
    if (!u.planType?.type || !u.planType.createdAt) return false;
    
    // Only count if plan type is Premium, Standard, or Payasyougo
    const validPlanTypes = ['premium', 'standard', 'payasyougo'];
    if (!validPlanTypes.includes(u.planType.type)) return false;
    
    const userDate = new Date(u.planType.createdAt);
    
    // If no date range specified (for total), just check plan type
    if (!startDate || !endDate) return true;
    
    // Check if within date range and has valid plan type
    return userDate >= startDate && userDate <= endDate;
  }).length;
};
  // Calculate counts and percentage change based on current view
  useEffect(() => {
    let start: Date | null = null;
    let end: Date | null = null;
    let previousStart: Date | null = null;
    let previousEnd: Date | null = null;
  
    switch (currentName) {
      case "Daily":
        start = new Date(currentDate.setHours(0, 0, 0, 0));
        end = new Date(currentDate.setHours(23, 59, 59, 999));
        previousStart = new Date(start);
        previousEnd = new Date(end);
        previousStart.setDate(previousStart.getDate() - 1);
        previousEnd.setDate(previousEnd.getDate() - 1);
        break;
  
      case "Weekly":
        start = new Date(startDate);
        end = new Date(startDate);
        end.setDate(end.getDate() + 6);
        previousStart = new Date(start);
        previousEnd = new Date(end);
        previousStart.setDate(previousStart.getDate() - 7);
        previousEnd.setDate(previousEnd.getDate() - 7);
        break;
  
      case "Monthly":
        start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        previousStart = new Date(start);
        previousEnd = new Date(end);
        previousStart.setMonth(previousStart.getMonth() - 1);
        previousEnd.setMonth(previousEnd.getMonth() - 1);
        break;
  
      case "Yearly":
        start = new Date(currentYear, 0, 1);
        end = new Date(currentYear, 11, 31);
        previousStart = new Date(start);
        previousEnd = new Date(end);
        previousStart.setFullYear(previousStart.getFullYear() - 1);
        previousEnd.setFullYear(previousEnd.getFullYear() - 1);
        break;
  
      default: // Total
        start = null;
        end = null;
        break;
    }
  
    const currentCount = countSubscriptions(start, end);
    setSubscriptionCount(currentCount);
  
    if (start && end && previousStart && previousEnd) {
      const previousCount = countSubscriptions(previousStart, previousEnd);
      const change = previousCount === 0 ? 0 : 
        ((currentCount - previousCount) / previousCount) * 100;
      setPercentageChange(change);
    } else {
      setPercentageChange(0);
    }
  }, [currentName, currentDate, startDate, currentYear, user]);

  // Existing date handling functions
  const handlePreviousYear = () => {
    const newYear = currentYear - 1;
    updateYear(newYear);
  };

  const handleNextYear = () => {
    const newYear = currentYear + 1;
    updateYear(newYear);
  };

  const updateYear = (newYear: number) => {
    setCurrentYear(newYear);
    setStoredYears((prevYears) => {
      if (!prevYears.includes(newYear)) {
        return [...prevYears, newYear];
      }
      return prevYears;
    });
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    updateMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    updateMonth(newDate);
  };

  const updateMonth = (newDate: Date) => {
    setCurrentDate(newDate);
    const newMonthName = months[newDate.getMonth()];
    setStoredMonths((prevMonths) => {
      if (!prevMonths.includes(newMonthName)) {
        return [...prevMonths, newMonthName];
      }
      return prevMonths;
    });
  };

  const formatDateWeek = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getFormattedWeek = (start: Date) => {
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${formatDateWeek(start)} - ${formatDateWeek(end)}`;
  };

  const handlePreviousWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    updateWeek(newStartDate);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    updateWeek(newStartDate);
  };

  const updateWeek = (newStartDate: Date) => {
    setStartDate(newStartDate);
    const formattedWeek = getFormattedWeek(newStartDate);
    setStoredWeeks((prevWeeks:any) => {
      if (!prevWeeks.includes(formattedWeek)) {
        return [...prevWeeks, formattedWeek];
      }
      return prevWeeks;
    });
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlePreviousdate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    updateDate(newDate);
  };

  const handleNextdate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    updateDate(newDate);
  };

  const updateDate = (newDate: Date) => {
    setCurrentDate(newDate);
    setStoredDates((prevDates) => {
      if (!prevDates.some((date) => date.toDateString() === newDate.toDateString())) {
        return [...prevDates, newDate];
      }
      return prevDates;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex === 0 ? names.length - 1 : prevIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex === names.length - 1 ? 0 : prevIndex + 1);
  };

  useEffect(() => {
    setCurrentName(names[currentIndex]);
  }, [currentIndex]);

  return (
    <div className="h-full hover:cursor-pointer px-3 custom-xl:px-6 py-3 custom-xl:py-6  bg-[#ede8fa]  rounded-md sm:rounded-xl  custom-lg:rounded-3xl">
      <div className="flex justify-between h-full ">
        <div className="flex flex-col justify-between  h-full px-3 py-1.5 ">
          <h1 className="text-xl sm:text-3xl custom-lg:text-[35px] leading-10 text-[#7669b5] font-medium">
            Subscriptions over time
          </h1>
          <h1 className="text-3xl md:text-4xl custom-lg:text-[70px]  mb-2 leading-none text-[#b394fc] font-medium py-2 custom-lg:py-9">
            {subscriptionCount}
          </h1>

          <h1 className="text-base sm:text-lg custom-lg:text-2xl font-bold leading-none text-[#a398cf] flex items-center gap-3">
          {currentName != "Total" && (
            <>
            {percentageChange > 0 ? (
              <ChevronUp className="font-extrabold" />
            ) : (
              <ChevronDown className="font-extrabold" />
            )}
            {Math.abs(percentageChange).toFixed(1)}%
            </>
          )}
          </h1>
        </div>

        <div className="flex flex-col justify-between pt-3">
          <div className="flex items-center flex-row-reverse text-[#7669b5]">
            <div className="flex items-center justify-center gap-1 sm:gap-2 custom-lg:gap-3">
              <button onClick={handlePrevious}>
                <ChevronLeft />
              </button>
              <span className="font-bold text-base sm:text-lg custom-lg:text-2xl w-fit custom-lg:w-[5.6rem] text-center">
                {currentName}
              </span>
              <button onClick={handleNext}>
                <ChevronRight />
              </button>
            </div>
          </div>

          {currentName === "Daily" && (
            <div className="flex items-center flex-row-reverse text-[#7669b5]">
              <div className="flex items-center justify-center gap-1 sm:gap-2 custom-lg:gap-3">
                <button onClick={handlePreviousdate}>
                  <ChevronLeft />
                </button>
                <span className="font-medium text-xl custom-lg:w-[11.4rem] text-center">
                  {days[currentDate.getDay()]} - {formatDate(currentDate)}
                </span>
                <button onClick={handleNextdate}>
                  <ChevronRight />
                </button>
              </div>
            </div>
          )}

          {currentName === "Weekly" && (
            <div className="flex items-center flex-row-reverse text-[#7669b5]">
              <div className="flex items-center justify-center gap-1 sm:gap-2 custom-lg:gap-3">
                <button onClick={handlePreviousWeek}>
                  <ChevronLeft />
                </button>
                <span className="font-medium text-lg custom-lg:w-[14.4rem] text-center">
                  {getFormattedWeek(startDate)}
                </span>
                <button onClick={handleNextWeek}>
                  <ChevronRight />
                </button>
              </div>
            </div>
          )}

          {currentName === "Monthly" && (
            <div className="flex items-center flex-row-reverse text-[#7669b5]">
              <div className="flex items-center justify-center gap-1 sm:gap-2 custom-lg:gap-3">
                <button onClick={handlePreviousMonth}>
                  <ChevronLeft />
                </button>
                <span className="font-bold text-xl custom-lg:w-[6.3rem] text-center">
                  {months[currentDate.getMonth()]}
                </span>
                <button onClick={handleNextMonth}>
                  <ChevronRight />
                </button>
              </div>
            </div>
          )}

          {currentName === "Yearly" && (
            <div className="flex items-center flex-row-reverse text-[#7669b5]">
              <div className="flex items-center justify-center gap-1 sm:gap-2 custom-lg:gap-3">
                <button onClick={handlePreviousYear}>
                  <ChevronLeft />
                </button>
                <span className="font-bold text-xl custom-lg:w-[6.3rem] text-center">
                  {currentYear}
                </span>
                <button onClick={handleNextYear}>
                  <ChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GeneralSubscriptionOverTime;