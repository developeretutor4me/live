import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useTotalIncome } from "../hooks/useTotalIncome";

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const names = ["Total", "Daily", "Weekly", "Monthly", "Yearly"];

function TotalPayoutsDashboard() {
    const { income, isLoading, error } = useTotalIncome();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentName, setCurrentName] = useState(names[0]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [storedDates, setStoredDates] = useState([currentDate]);
    const [startDate, setStartDate] = useState(new Date());
    const [storedMonths, setStoredMonths] = useState([months[new Date().getMonth()]]);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [storedYears, setStoredYears] = useState([new Date().getFullYear()]);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [StoredWeeks, setStoredWeeks] = useState<any>([currentDate])
    // Calculate total income for different time periods
    const calculateIncome = () => {
        if (!income || !Array.isArray(income)) return 0;

        switch (currentName) {
            case "Total":
                return income.reduce((sum, item) => sum + (item.income || 0), 0);

            case "Daily": {
                const targetDate = new Date(currentDate);
                targetDate.setHours(0, 0, 0, 0);

                return income.reduce((sum, item) => {
                    const itemDate = new Date(item.createdAt);
                    itemDate.setHours(0, 0, 0, 0);
                    return itemDate.getTime() === targetDate.getTime() ? sum + (item.income || 0) : sum;
                }, 0);
            }

            case "Weekly": {
                const weekStart = new Date(startDate);
                weekStart.setHours(0, 0, 0, 0);
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                weekEnd.setHours(23, 59, 59, 999);

                return income.reduce((sum, item) => {
                    const itemDate = new Date(item.createdAt);
                    return itemDate >= weekStart && itemDate <= weekEnd ? sum + (item.income || 0) : sum;
                }, 0);
            }

            case "Monthly": {
                const targetMonth = currentDate.getMonth();
                const targetYear = currentDate.getFullYear();

                return income.reduce((sum, item) => {
                    const itemDate = new Date(item.createdAt);
                    return itemDate.getMonth() === targetMonth &&
                        itemDate.getFullYear() === targetYear ? sum + (item.income || 0) : sum;
                }, 0);
            }

            case "Yearly": {
                const targetYear = currentYear;

                return income.reduce((sum, item) => {
                    const itemDate = new Date(item.createdAt);
                    return itemDate.getFullYear() === targetYear ? sum + (item.income || 0) : sum;
                }, 0);
            }

            default:
                return 0;
        }
    };

    // Calculate percentage change
    const calculatePercentageChange = () => {
        if (!income || !Array.isArray(income)) return 0;

        const currentTotal = calculateIncome();
        let comparisonTotal = 0;

        switch (currentName) {
            case "Daily": {
                const comparisonDate = new Date(currentDate);
                // Compare with next day if viewing a past date
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isViewingPastDate = currentDate < today;

                if (isViewingPastDate) {
                    comparisonDate.setDate(currentDate.getDate() + 1);
                } else {
                    comparisonDate.setDate(currentDate.getDate() - 1);
                }
                comparisonDate.setHours(0, 0, 0, 0);

                comparisonTotal = income.reduce((sum, item) => {
                    const itemDate = new Date(item.createdAt);
                    itemDate.setHours(0, 0, 0, 0);
                    return itemDate.getTime() === comparisonDate.getTime() ? sum + (item.income || 0) : sum;
                }, 0);
                break;
            }

            case "Weekly": {
                const currentWeekStart = new Date(startDate);
                const comparisonWeekStart = new Date(startDate);
                const today = new Date();
                const isViewingPastWeek = currentWeekStart < today;

                if (isViewingPastWeek) {
                    comparisonWeekStart.setDate(currentWeekStart.getDate() + 7);
                } else {
                    comparisonWeekStart.setDate(currentWeekStart.getDate() - 7);
                }

                const comparisonWeekEnd = new Date(comparisonWeekStart);
                comparisonWeekEnd.setDate(comparisonWeekStart.getDate() + 6);

                comparisonTotal = income.reduce((sum, item) => {
                    const itemDate = new Date(item.createdAt);
                    return itemDate >= comparisonWeekStart && itemDate <= comparisonWeekEnd ?
                        sum + (item.income || 0) : sum;
                }, 0);
                break;
            }

            case "Monthly": {
                const comparisonDate = new Date(currentDate);
                const today = new Date();
                const isViewingPastMonth =
                    currentDate.getFullYear() < today.getFullYear() ||
                    (currentDate.getFullYear() === today.getFullYear() &&
                        currentDate.getMonth() < today.getMonth());

                if (isViewingPastMonth) {
                    comparisonDate.setMonth(currentDate.getMonth() + 1);
                } else {
                    comparisonDate.setMonth(currentDate.getMonth() - 1);
                }

                comparisonTotal = income.reduce((sum, item) => {
                    const itemDate = new Date(item.createdAt);
                    return itemDate.getMonth() === comparisonDate.getMonth() &&
                        itemDate.getFullYear() === comparisonDate.getFullYear() ?
                        sum + (item.income || 0) : sum;
                }, 0);
                break;
            }

            case "Yearly": {
                const today = new Date();
                const isViewingPastYear = currentYear < today.getFullYear();
                const comparisonYear = isViewingPastYear ? currentYear + 1 : currentYear - 1;

                comparisonTotal = income.reduce((sum, item) => {
                    const itemDate = new Date(item.createdAt);
                    return itemDate.getFullYear() === comparisonYear ? sum + (item.income || 0) : sum;
                }, 0);
                break;
            }
        }

        // If either total is 0, return 0 to avoid division by zero
        if (currentTotal === 0 || comparisonTotal === 0) return 0;

        // Calculate percentage change
        let percentageChange;
        if (currentTotal > comparisonTotal) {
            percentageChange = ((currentTotal - comparisonTotal) / comparisonTotal) * 100;
        } else {
            percentageChange = ((comparisonTotal - currentTotal) / currentTotal) * 100;
            percentageChange = -percentageChange; // Make it negative if current is less than comparison
        }

        // Cap the percentage at ±100
        return Math.max(Math.min(percentageChange, 100), -100);
    };
    // Update calculations when relevant states change
    useEffect(() => {
        const amount = calculateIncome();
        setCurrentAmount(amount);
    }, [calculateIncome]);

    // Navigation handlers
    const handlePrevious = () => {
        setCurrentIndex(prevIndex => prevIndex === 0 ? names.length - 1 : prevIndex - 1);
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => prevIndex === names.length - 1 ? 0 : prevIndex + 1);
    };

    // Date navigation handlers
    const handlePreviousYear = () => {
        const newYear = currentYear - 1;
        setCurrentYear(newYear);
        setStoredYears(prevYears => !prevYears.includes(newYear) ? [...prevYears, newYear] : prevYears);
    };

    const handleNextYear = () => {
        const newYear = currentYear + 1;
        setCurrentYear(newYear);
        setStoredYears(prevYears => !prevYears.includes(newYear) ? [...prevYears, newYear] : prevYears);
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

    const updateMonth = (newDate: any) => {
        setCurrentDate(newDate);
        const newMonthName = months[newDate.getMonth()];
        setStoredMonths(prevMonths => !prevMonths.includes(newMonthName) ? [...prevMonths, newMonthName] : prevMonths);
    };

    const formatDateWeek = (date: any) => {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getFormattedWeek = (start: any) => {
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

    const updateWeek = (newStartDate: any) => {
        setStartDate(newStartDate);
        const formattedWeek = getFormattedWeek(newStartDate);
        setStoredWeeks((prevWeeks: any) => !prevWeeks.includes(formattedWeek) ? [...prevWeeks, formattedWeek] : prevWeeks);
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

    const updateDate = (newDate: any) => {
        setCurrentDate(newDate);
        setStoredDates(prevDates => {
            if (!prevDates.some(date => date.toDateString() === newDate.toDateString())) {
                return [...prevDates, newDate];
            }
            return prevDates;
        });
    };

    useEffect(() => {
        setCurrentName(names[currentIndex]);
    }, [currentIndex]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    const percentageChange = calculatePercentageChange();

    return (
        <div className="px-2 custom-xl:px-[14px] py-2 custom-xl:py-[9px] bg-[#ede8fa]  rounded-md sm:rounded-xl custom-lg:rounded-xl max-h-[168.61px] h-full">
            <div className="grid grid-cols-[auto_auto] h-full">
                <div className="flex flex-col justify-between h-full px-3 md:px-0 custom-lg:px-3 py-1.5">
                    <h1 className="text-xl sm:text-3xl custom-lg:text-[31.4px] leading-10 text-[#685aad] font-medium">
                        Total payouts
                    </h1>
                    <h1 className="text-3xl md:text-4xl custom-lg:text-[44.55px]  leading-none text-[#FC7777] font-medium py-2 custom-lg:py-4">
                        ${currentAmount.toFixed(2)}
                    </h1>
                    <h1 className="text-base sm:text-lg custom-lg:text-[17.82px] custom-lg:leading-[2rem] font-bold leading-none text-[#a398cf] flex items-center gap-3">
                        <ChevronDown className="font-extrabold" />
                        {percentageChange.toFixed(1)}%
                    </h1>
                </div>

                <div className="flex flex-col justify-between pt-3 ">
                    <div className="flex items-center flex-row-reverse text-[#7669b5]">
                        <div className="flex items-center justify-center gap-1 sm:gap-2 custom-lg:gap-3">
                            <button onClick={handlePrevious}>
                                <ChevronLeft />
                            </button>
                            <span className="font-bold text-base sm:text-sm custom-lg:text-[15.08px] custom-lg:leading-[2rem] w-fit custom-lg:w-[2.7rem] text-center">
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
                                <span className="font-medium custom-lg:text-[13px] custom-lg:leading-[2rem] custom-lg:w-[9.3rem] text-center">
                                    {currentDate.toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
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
                                <span className="font-medium custom-lg:text-[13px] custom-lg:leading-[2rem] custom-lg:w-[9.3rem] text-center">
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
                                <span className="font-medium custom-lg:text-[13px] custom-lg:leading-[2rem] custom-lg:w-[3.3rem] text-center">
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
                                <span className="font-medium custom-lg:text-[13px] custom-lg:leading-[2rem] custom-lg:w-[3.3rem] text-center">
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

export default TotalPayoutsDashboard;