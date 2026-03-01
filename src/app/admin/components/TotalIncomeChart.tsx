


import Image from "next/image";
import React, { useEffect, useState } from "react";
import downloadReport from "../../../../public/downloadReport.svg";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useTotalIncome } from "../hooks/useTotalIncome";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const names = ["Total", "Weekly", "Monthly", "Yearly"];

// Sample data structure for fallback
const defaultData = {
  daily: [["Day", "Income"], ["Mon", 0], ["Tue", 0], ["Wed", 0], ["Thu", 0], ["Fri", 0], ["Sat", 0], ["Sun", 0]],
};

function TotalIncomeChart() {
  const { income, isLoading, error } = useTotalIncome();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentName, setCurrentName] = useState(names[0]);
  const [currentDate] = useState(new Date());
  const [chartLoaded, setChartLoaded] = useState(false);
  const [googleChartError, setGoogleChartError] = useState<string | null>(null);
  const [container, setcontainer] = useState<any>(null)
  const processIncomeData = (incomeData: any[], currentName: string) => {
    if (!incomeData || !Array.isArray(incomeData) || incomeData.length === 0) {
      // Return default data structure with zeros if no data
      return defaultData.daily;
    }

    const dailyData: number[] = new Array(7).fill(0);
    const weeklyData: number[] = new Array(4).fill(0);
    const monthlyData: number[] = new Array(12).fill(0);
    const yearlyData: { [key: string]: number } = {};

    try {
      // Process each income entry
      incomeData.forEach(entry => {
        if (!entry?.createdAt || !entry?.income) return; // Skip invalid entries
        
        const date = new Date(entry.createdAt);
        const dayOfWeek = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();
        const weekNumber = Math.floor((date.getDate() - 1) / 7);

        // Accumulate values
        dailyData[dayOfWeek] += Number(entry.income) || 0;
        if (weekNumber < 4) weeklyData[weekNumber] += Number(entry.income) || 0;
        monthlyData[month] += Number(entry.income) || 0;
        yearlyData[year] = (yearlyData[year] || 0) + (Number(entry.income) || 0);
      });

      // Format data based on currentName
      switch (currentName) {
        case "Total":
          return [
            ["Day", "Income"],
            ["Sun", dailyData[0]],
            ["Mon", dailyData[1]],
            ["Tue", dailyData[2]],
            ["Wed", dailyData[3]],
            ["Thu", dailyData[4]],
            ["Fri", dailyData[5]],
            ["Sat", dailyData[6]]
          ];
        
        case "Weekly":
          return [
            ["Week", "Income"],
            ["Week 1", weeklyData[0]],
            ["Week 2", weeklyData[1]],
            ["Week 3", weeklyData[2]],
            ["Week 4", weeklyData[3]]
          ];
        
        case "Monthly":
          return [
            ["Month", "Income"],
            ...months.map((month, index) => [month, monthlyData[index]])
          ];
        
        case "Yearly":
          const years = Object.keys(yearlyData).sort();
          return [
            ["Year", "Income"],
            ...years.map(year => [year.toString(), yearlyData[year]])
          ];

        default:
          return defaultData.daily;
      }
    } catch (error) {
      console.error('Error processing income data:', error);
      return defaultData.daily;
    }
  };

  const loadGoogleCharts = () => {
    return new Promise((resolve, reject) => {
      try {
        if (typeof window === 'undefined') {
          reject(new Error('Window is not defined'));
          return;
        }

        if (window.google?.charts) {
          resolve(window.google.charts);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.onload = () => {
          window.google.charts.load('current', { packages: ['corechart'] });
          window.google.charts.setOnLoadCallback(() => {
            setChartLoaded(true);
            resolve(window.google.charts);
          });
        };
        script.onerror = () => reject(new Error('Failed to load Google Charts'));
        document.head.appendChild(script);
      } catch (error) {
        reject(error);
      }
    });
  };

  useEffect(() => {
    loadGoogleCharts().catch(error => {
      console.error('Error loading Google Charts:', error);
      setGoogleChartError(error.message);
    });
  }, []);

  const drawChart = async () => {
    try {
      if (typeof window === 'undefined' || !window.google || !window.google.visualization) {
        throw new Error('Google Charts is not loaded');
      }

      const chartContainer = document.getElementById('chart_div');
      setcontainer(chartContainer)
      if (!chartContainer) {
        throw new Error('Chart container not found');
      }

      const chartData = processIncomeData(income || [], currentName);
      const data = new window.google.visualization.arrayToDataTable(chartData);

      const options = {
        title: '',
        backgroundColor: 'transparent',
        colors: ['#8458f8'],
        legend: { position: 'none' },
        vAxis: {
          gridlines: { color: '#b1a8d7', count: 9 },
          minValue: 0,
          format: '#',
          textStyle: { 
            color: '#7669b5',
            fontSize: 14,
            bold: true,
            fontWeight: '600',
          }
        },
        hAxis: {
          textStyle: { 
            color: '#7669b5',
            fontSize: 14,
            bold: true,
            fontWeight: '600',
          },
          gridlines: {
            color: '#7669b5',
            count: 1,
            lineWidth: 5,
          },
          baselineColor: '#7669b5',
          baselineWidth: 5,
        },
        bar: { groupWidth: '50%' },
        chartArea: { width: '90%', height: '80%' }
      };

      const chart = new window.google.visualization.ColumnChart(chartContainer);
      chart.draw(data, options);
    } catch (error: any) {
      console.error('Error drawing chart:', error);
      setGoogleChartError(error.message);
    }
  };

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (chartLoaded && !googleChartError) {
        drawChart();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chartLoaded, googleChartError, currentName, income]);

  // Draw chart when data or view changes
  useEffect(() => {
    if (chartLoaded && !googleChartError) {
      drawChart();
    }
  }, [chartLoaded, currentName, income, (container ===null)]);

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? names.length - 1 : prevIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => prevIndex === names.length - 1 ? 0 : prevIndex + 1);
  };

  useEffect(() => {
    setCurrentName(names[currentIndex]);
  }, [currentIndex]);

  // Error and loading states
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-[#7669b5] text-lg">Loading chart data...</p>
      </div>
    );
  }

  if (error || googleChartError) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-red-500 text-lg">
          {error || googleChartError || 'An error occurred while loading the chart'}
        </p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-11">
          <h1 className="text-xl sm:text-3xl custom-lg:text-[46px] !text-[#7669b5] font-medium leading-none pl-2">
            Total Income
          </h1>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex items-center flex-row-reverse text-[#7669b5]">
            <div className="flex items-center justify-center gap-3">
              <button onClick={handlePrevious}>
                <ChevronLeft />
              </button>
              <span className="font-bold text-base sm:text-lg custom-lg:text-2xl custom-lg:w-[5.6rem] text-center">
                {currentName}
              </span>
              <button onClick={handleNext}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="graph mt-8 max-w-full h-[85%]">
        <div id="chart_div" className="w-full max-w-full h-full" />
      </div>
    </div>
  );
}

export default TotalIncomeChart;