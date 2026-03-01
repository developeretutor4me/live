import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { useUsers } from "../hooks/useUser";

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

interface SubscriptionOverTimeprops {
  user: any;
}

function SubscriptionOverTime({ user }: SubscriptionOverTimeprops) {
  const { users, isLoading, error } = useUsers();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [currentName, setCurrentName] = useState(names[0]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [storedDates, setStoredDates] = useState([currentDate]); // To store all visited dates
  const [startDate, setStartDate] = useState(new Date("2023-02-01")); // Initial start date
  //   const [currentDateMonth, setCurrentDateMo] = useState(new Date()); // Track the current date
  const [storedMonths, setStoredMonths] = useState([
    months[new Date().getMonth()],
  ]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Track the current year
  const [storedYears, setStoredYears] = useState([new Date().getFullYear()]);

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
    getFormattedWeek(new Date("2023-02-01")),
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

  const premiumCount = user.filter(
    (user: any) => user?.planType?.type === "premium"
  ).length;
  const payasyougoCount = user.filter(
    (user: any) => user?.planType?.type === "payasyougo"
  ).length;

  // Count Standard memberships
  const standardCount = user.filter(
    (user: any) => user?.planType?.type === "standard"
  ).length;

  useEffect(() => {
    const calculateSubscriptionTrends = (users: any[]) => {
      // Current Date and Time Intervals
      const currentDate = new Date();
      const oneDayAgo = new Date(currentDate);
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);

      const oneWeekAgo = new Date(currentDate);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const oneMonthAgo = new Date(currentDate);
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const oneYearAgo = new Date(currentDate);
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      // Filter users by planType and time intervals
      const dailyUsers = users.filter(
        (user: any) => user.planType && new Date(user.createdAt) >= oneDayAgo
      );
      const weeklyUsers = users.filter(
        (user: any) => user.planType && new Date(user.createdAt) >= oneWeekAgo
      );
      const monthlyUsers = users.filter(
        (user: any) => user.planType && new Date(user.createdAt) >= oneMonthAgo
      );
      const yearlyUsers = users.filter(
        (user: any) => user.planType && new Date(user.createdAt) >= oneYearAgo
      );

      // Count the number of users
      const dailyCount = dailyUsers.length;
      const weeklyCount = weeklyUsers.length;
      const monthlyCount = monthlyUsers.length;
      const yearlyCount = yearlyUsers.length;

      // Calculate average users per day over the past week, month, and year
      const avgUsersPerDayLastWeek = weeklyCount / 7;
      const avgUsersPerDayLastMonth = monthlyCount / 30; // Assuming 30 days in a month
      const avgUsersPerDayLastYear = yearlyCount / 365; // Assuming 365 days in a year

      // Calculate percentage changes
      const dailyChange = avgUsersPerDayLastWeek
        ? ((dailyCount - avgUsersPerDayLastWeek) / avgUsersPerDayLastWeek) * 100
        : 0;

      const weeklyChange =
        avgUsersPerDayLastMonth * 7
          ? ((weeklyCount - avgUsersPerDayLastMonth * 7) /
              (avgUsersPerDayLastMonth * 7)) *
            100
          : 0;

      const monthlyChange =
        avgUsersPerDayLastYear * 30
          ? ((monthlyCount - avgUsersPerDayLastYear * 30) /
              (avgUsersPerDayLastYear * 30)) *
            100
          : 0;

      const yearlyChange = yearlyCount
        ? ((yearlyCount - avgUsersPerDayLastYear * 365) /
            (avgUsersPerDayLastYear * 365)) *
          100
        : 0;

      // Cap the changes to 100% max
      return {
        dailyCount,
        weeklyCount,
        monthlyCount,
        yearlyCount,
        dailyChange: Math.min(dailyChange, 100).toFixed(2), // e.g., "12.34%"
        weeklyChange: Math.min(weeklyChange, 100).toFixed(2),
        monthlyChange: Math.min(monthlyChange, 100).toFixed(2),
        yearlyChange: Math.min(yearlyChange, 100).toFixed(2),
      };
    };

    const result = calculateSubscriptionTrends(user);
    setSubscriptionData(result);
  }, [user]);

  return (
    <div className="h-full hover:cursor-pointer px-3 custom-xl:px-6 py-3 custom-xl:py-6  bg-[#ede8fa]  rounded-md sm:rounded-xl  custom-lg:rounded-3xl">
      <div className="flex justify-between h-full ">
        <div className="flex flex-col justify-between  h-full px-3 py-1.5">
          <h1 className="text-xl sm:text-3xl custom-lg:text-[35px] leading-10 text-[#8276bc] font-medium">
            Subscriptions over time
          </h1>
          <h1 className="text-3xl md:text-4xl custom-lg:text-[44px]  mb-2 leading-none text-[#685AAD] font-medium py-2 custom-lg:py-6">
            {premiumCount + standardCount + payasyougoCount} subscription
          </h1>
          <div>
            {subscriptionData ? (
              <>
                {/* Daily Trend */}

                {currentName === "Daily" && (
                  <h1 className="text-base sm:text-lg custom-lg:text-2xl font-bold leading-none text-[#a398cf] flex items-center gap-3">
                    {currentName === "Daily" &&
                    subscriptionData.dailyChange > 0 ? (
                      <ChevronUp className="font-extrabold" />
                    ) : (
                      <ChevronDown className="font-extrabold" />
                    )}
                    {Math.abs(subscriptionData.dailyChange)}%
                  </h1>
                )}

                {/* Weekly Trend */}
                {currentName === "Weekly" && (
                  <h1 className="text-base sm:text-lg custom-lg:text-2xl font-bold leading-none text-[#a398cf] flex items-center gap-3">
                    {currentName === "Weekly" &&
                    subscriptionData.weeklyChange > 0 ? (
                      <ChevronUp className="font-extrabold" />
                    ) : (
                      <ChevronDown className="font-extrabold" />
                    )}
                    {Math.abs(subscriptionData.weeklyChange)}%
                  </h1>
                )}

                {/* Monthly Trend */}
                {true && (
                  <h1 className="text-base sm:text-lg custom-lg:text-2xl font-bold leading-none text-[#a398cf] flex items-center gap-3">
                    {subscriptionData.monthlyChange > 0 ? (
                      <>
                        <ChevronUp className="font-extrabold text-[#8856fc]" />
                        <span className="text-[#8856fc]">
                          {" "}
                          {Math.abs(subscriptionData.monthlyChange)}%
                        </span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="font-extrabold" />
                        <span className="">
                          {" "}
                          {Math.abs(subscriptionData.monthlyChange)}%
                        </span>
                      </>
                    )}
                  </h1>
                )}

                {/* Yearly Trend */}
                {currentName === "Yearly" && (
                  <h1 className="text-base sm:text-lg custom-lg:text-2xl font-bold leading-none text-[#a398cf] flex items-center gap-3">
                    {(currentName === "Yearly" || currentName === "total") &&
                    subscriptionData.yearlyChange > 0 ? (
                      <ChevronUp className="font-extrabold" />
                    ) : (
                      <ChevronDown className="font-extrabold" />
                    )}
                    {Math.abs(subscriptionData.yearlyChange)}%
                  </h1>
                )}
              </>
            ) : (
              <div>Loading subscription data...</div>
            )}
          </div>
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

export default SubscriptionOverTime;
