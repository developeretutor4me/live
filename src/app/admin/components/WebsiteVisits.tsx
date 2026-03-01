





    
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useGoogleAnalytics } from "../hooks/useGoogleAnalytics";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const names = ["Total", "Daily", "Weekly", "Monthly", "Yearly"];

function WebsiteVisits() {
  const { googleAnalytics, isLoading, error } = useGoogleAnalytics();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentName, setCurrentName] = useState(names[0]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [storedDates, setStoredDates] = useState([currentDate]); // To store all visited dates
  const [startDate, setStartDate] = useState(new Date("2023-02-01")); // Initial start date
  //   const [currentDateMonth, setCurrentDateMo] = useState(new Date()); // Track the current date








  const [visitsData, setVisitsData] = useState({
    total: 0,
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
    percentage: 0
  });











  const [storedMonths, setStoredMonths] = useState([
    months[new Date().getMonth()],
  ]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Track the current year
  const [storedYears, setStoredYears] = useState([new Date().getFullYear()]);







  useEffect(() => {
    if (googleAnalytics?.dailyData) {
     
      const processAnalyticsData = () => {
        if (!googleAnalytics?.dailyData) return;
        
        const dailyData = googleAnalytics.dailyData.map((day: { date: string | any[]; }) => ({
          ...day,
          date: `${day.date.slice(0,4)}-${day.date.slice(4,6)}-${day.date.slice(6,8)}` // Convert YYYYMMDD to YYYY-MM-DD
        }));
      
        // Format current date to match API date format
        const currentDateStr = currentDate.toISOString().split('T')[0];
        
        // Calculate total visits
        const total = dailyData.reduce((sum: any, day: { sessions: any; }) => sum + day.sessions, 0);
      
        // Daily visits
        const dailyVisits = dailyData.find((d: { date: string; }) => d.date === currentDateStr)?.sessions || 0;
        
        // Weekly visits
        const weekStart = new Date(startDate);
        const weekEnd = new Date(startDate);
        weekEnd.setDate(weekEnd.getDate() + 6);
        const weeklyVisits = dailyData
          .filter((d: { date: string | number | Date; }) => {
            const date = new Date(d.date);
            return date >= weekStart && date <= weekEnd;
          })
          .reduce((sum: any, day: { sessions: any; }) => sum + day.sessions, 0);
        
        // Monthly visits
        const monthlyVisits = dailyData
          .filter((d: { date: string | number | Date; }) => {
            const date = new Date(d.date);
            return date.getMonth() === currentDate.getMonth() &&
                   date.getFullYear() === currentDate.getFullYear();
          })
          .reduce((sum: any, day: { sessions: any; }) => sum + day.sessions, 0);
        
        // Yearly visits
        const yearlyVisits = dailyData
          .filter((d: { date: string | number | Date; }) => new Date(d.date).getFullYear() === currentYear)
          .reduce((sum: any, day: { sessions: any; }) => sum + day.sessions, 0);
      
        // Calculate percentage changes
        const previousDay = new Date(currentDate);
        previousDay.setDate(previousDay.getDate() - 1);
        const prevDayStr = previousDay.toISOString().split('T')[0];
        const previousDayVisits = dailyData.find((d: { date: string; }) => d.date === prevDayStr)?.sessions || 0;
      
        const previousWeekStart = new Date(startDate);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekVisits = dailyData
          .filter((d: { date: string | number | Date; }) => {
            const date = new Date(d.date);
            const weekEnd = new Date(previousWeekStart);
            weekEnd.setDate(previousWeekStart.getDate() + 6);
            return date >= previousWeekStart && date <= weekEnd;
          })
          .reduce((sum: any, day: { sessions: any; }) => sum + day.sessions, 0);
      
        const previousMonth = new Date(currentDate);
        previousMonth.setMonth(previousMonth.getMonth() - 1);
        const previousMonthVisits = dailyData
          .filter((d: { date: string | number | Date; }) => {
            const date = new Date(d.date);
            return date.getMonth() === previousMonth.getMonth() &&
                   date.getFullYear() === previousMonth.getFullYear();
          })
          .reduce((sum: any, day: { sessions: any; }) => sum + day.sessions, 0);
      
        const previousYearVisits = dailyData
          .filter((d: { date: string | number | Date; }) => new Date(d.date).getFullYear() === currentYear - 1)
          .reduce((sum: any, day: { sessions: any; }) => sum + day.sessions, 0);
      
        // Calculate percentage based on current view
        let percentageChange = 0;
        switch(currentName) {
          case 'Daily':
            percentageChange = previousDayVisits ? ((dailyVisits - previousDayVisits) / previousDayVisits) * 100 : 0;
            break;
          case 'Weekly':
            percentageChange = previousWeekVisits ? ((weeklyVisits - previousWeekVisits) / previousWeekVisits) * 100 : 0;
            break;
          case 'Monthly':
            percentageChange = previousMonthVisits ? ((monthlyVisits - previousMonthVisits) / previousMonthVisits) * 100 : 0;
            break;
          case 'Yearly':
            percentageChange = previousYearVisits ? ((yearlyVisits - previousYearVisits) / previousYearVisits) * 100 : 0;
            break;
        }
      
        setVisitsData({
          total,
          daily: dailyVisits,
          weekly: weeklyVisits,
          monthly: monthlyVisits,
          yearly: yearlyVisits,
          percentage: percentageChange
        });
      };
  
      processAnalyticsData();
    }
  }, [googleAnalytics, currentDate, currentName, startDate, currentYear]);



 // Helper functions for calculating visits
 const getCurrentPeriodVisits = (period:any) => {
  switch (period) {
    case 'Daily':
      return visitsData.daily;
    case 'Weekly':
      return visitsData.weekly;
    case 'Monthly':
      return visitsData.monthly;
    case 'Yearly':
      return visitsData.yearly;
    default:
      return visitsData.total;
  }
};


const getPreviousPeriodVisits = (period: any, dailyData: any) => {
  switch (period) {
    case 'Daily':
      const previousDay = new Date(currentDate);
      previousDay.setDate(previousDay.getDate() - 1);
      const prevDayStr = previousDay.toISOString().split('T')[0];
      return dailyData.find((d: any) => d.date === prevDayStr)?.sessions || 0;
    
    case 'Weekly':
      const previousWeekStart = new Date(startDate);
      previousWeekStart.setDate(previousWeekStart.getDate() - 7);
      const previousWeekEnd = new Date(previousWeekStart);
      previousWeekEnd.setDate(previousWeekStart.getDate() + 6);
      return dailyData
        .filter((d: any) => {
          const date = new Date(d.date);
          return date >= previousWeekStart && date <= previousWeekEnd;
        })
        .reduce((sum: any, day: any) => sum + day.sessions, 0);
    
    case 'Monthly':
      const previousMonth = new Date(currentDate);
      previousMonth.setMonth(previousMonth.getMonth() - 1);
      return dailyData
        .filter((d: any) => {
          const date = new Date(d.date);
          return date.getMonth() === previousMonth.getMonth() &&
                 date.getFullYear() === previousMonth.getFullYear();
        })
        .reduce((sum: any, day: any) => sum + day.sessions, 0);
    
    case 'Yearly':
      const previousYear = currentYear - 1;
      return dailyData
        .filter((d: any) => new Date(d.date).getFullYear() === previousYear)
        .reduce((sum: any, day: any) => sum + day.sessions, 0);
    
    default:
      return 0;
  }
};








  //   date for year-----------------------------
  const handlePreviousYear = () => {
    const newYear = currentYear - 1; // Go to the previous year
    updateYear(newYear);
  };

  const handleNextYear = () => {
    const newYear = currentYear + 1; // Go to the next year
    updateYear(newYear);
  };

  const updateYear = (newYear: any) => {
    setCurrentYear(newYear);
    setStoredYears((prevYears) => {
      if (!prevYears.includes(newYear)) {
        return [...prevYears, newYear];
      }
      return prevYears;
    });
  };

  //   date by month----------------
  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1); // Go to the previous month
    updateMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1); // Go to the next month
    updateMonth(newDate);
  };

  const updateMonth = (newDate: any) => {
    setCurrentDate(newDate);
    const newMonthName = months[newDate.getMonth()];
    setStoredMonths((prevMonths) => {
      if (!prevMonths.includes(newMonthName)) {
        return [...prevMonths, newMonthName];
      }
      return prevMonths;
    });
  };

  //   date by week--------------
  // Format a date as "dd/mm/yyyy"
  const formatDateWeek = (date: any) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Get the start and end of the week
  const getFormattedWeek = (start: any) => {
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // 6 days after the start date
    return `${formatDateWeek(start)} - ${formatDateWeek(end)}`;
  };
  const [storedWeeks, setStoredWeeks] = useState([
    getFormattedWeek(new Date()),
  ]);
  const handlePreviousWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7); // Move back by 7 days
    updateWeek(newStartDate);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7); // Move forward by 7 days
    updateWeek(newStartDate);
  };

  const updateWeek = (newStartDate: any) => {
    setStartDate(newStartDate);
    const formattedWeek = getFormattedWeek(newStartDate);
    setStoredWeeks((prevWeeks) => {
      // Avoid duplicates in the stored weeks array
      if (!prevWeeks.includes(formattedWeek)) {
        return [...prevWeeks, formattedWeek];
      }
      return prevWeeks;
    });
  };

  // -----------------------------
  //   date by day---------------------
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formatDate = (date: any) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlePreviousdate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1); // Go to the previous day
    updateDate(newDate);
  };

  const handleNextdate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1); // Go to the next day
    updateDate(newDate);
  };

  const updateDate = (newDate: any) => {
    setCurrentDate(newDate);
    setStoredDates((prevDates) => {
      // Avoid duplicates in the stored dates array
      if (
        !prevDates.some(
          (date) => date.toDateString() === newDate.toDateString()
        )
      ) {
        return [...prevDates, newDate];
      }
      return prevDates;
    });
  };
  // =----------------------

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? names.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === names.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Update `currentName` whenever `currentIndex` changes
  useEffect(() => {
    setCurrentName(names[currentIndex]);
  }, [currentIndex]);
  return (
    <div className="h-full hover:cursor-pointer px-3 custom-xl:px-6 py-3 custom-xl:py-6  bg-[#ede8fa]  rounded-md sm:rounded-xl  custom-lg:rounded-3xl">

    <div className="flex justify-between h-full ">
      <div className="flex flex-col justify-between  h-full px-3 py-1.5 ">
        <h1 className="text-xl sm:text-3xl custom-lg:text-[35px] leading-10 text-[#7669b5] font-medium">
        Website Visits 
        </h1>
        <h1 className="text-3xl md:text-4xl custom-lg:text-[70px]  mb-2 leading-none text-[#b394fc] font-medium py-2 custom-lg:py-9">
        {isLoading ? 'Loading...' : getCurrentPeriodVisits(currentName).toLocaleString()}
        </h1>
        <h1 className="text-base sm:text-lg custom-lg:text-2xl font-bold leading-none text-[#a398cf] flex items-center  gap-3">
          {" "}
          <ChevronDown className={`font-extrabold ${visitsData.percentage >= 0 ? 'rotate-180' : ''}`} />{Math.abs(visitsData.percentage).toFixed(1)}%
        </h1>
      </div>

      <div className=" flex flex-col justify-between   pt-3">
        <div className="flex items-center  flex-row-reverse text-[#7669b5]">
          <div className=" flex items-center justify-center gap-1 sm:gap-2 custom-lg:gap-3">
            <button onClick={handlePrevious}>
              <ChevronLeft />
            </button>

            <span className="font-bold text-base sm:text-lg custom-lg:text-2xl  w-fit custom-lg:w-[5.6rem] text-center">
              {currentName}
            </span>

            <button onClick={handleNext}>
              <ChevronRight />
            </button>
          </div>
        </div>

        {currentName === "Daily" && (
          <div className="flex items-center  flex-row-reverse text-[#7669b5]">
            <div className=" flex items-center justify-center gap-1 sm:gap-2 custom-lg:gap-3">
              <button onClick={handlePreviousdate}>
                <ChevronLeft />
              </button>

              <span className="font-medium text-xl  custom-lg:w-[11.4rem] text-center   ">
                {" "}
                {days[currentDate.getDay()]} - {formatDate(currentDate)}
              </span>

              <button onClick={handleNextdate}>
                <ChevronRight />
              </button>
            </div>
          </div>
        )}

        {currentName === "Weekly" && (
          <div className="flex items-center  flex-row-reverse text-[#7669b5]">
            <div className=" flex items-center justify-center gap-1 sm:gap-2 custom-lg:gap-3">
              <button onClick={handlePreviousWeek}>
                <ChevronLeft />
              </button>

              <span className="font-medium text-lg  custom-lg:w-[14.4rem] text-center  ">
                {" "}
                {getFormattedWeek(startDate)}
              </span>

              <button onClick={handleNextWeek}>
                <ChevronRight />
              </button>
            </div>
          </div>
        )}

        {currentName === "Monthly" && (
          <div className="flex items-center  flex-row-reverse text-[#7669b5]">
            <div className=" flex items-center justify-center gap-1 sm:gap-2 custom-lg:gap-3">
              <button onClick={handlePreviousMonth}>
                <ChevronLeft />
              </button>

              <span className="font-bold text-xl  custom-lg:w-[6.3rem] text-center  ">
                {" "}
                {months[currentDate.getMonth()]}
              </span>

              <button onClick={handleNextMonth}>
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
        {currentName === "Yearly" && (
          <div className="flex items-center  flex-row-reverse text-[#7669b5]">
            <div className=" flex items-center justify-center gap-1 sm:gap-2 custom-lg:gap-3">
              <button onClick={handlePreviousYear}>
                <ChevronLeft />
              </button>

              <span className="font-bold text-xl  custom-lg:w-[6.3rem] text-center  ">
                {" "}
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

export default WebsiteVisits;



