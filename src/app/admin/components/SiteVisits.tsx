import Image from "next/image";
import React, { useState, useEffect } from "react";
import downloadReport from "../../../../public/downloadReport.svg";
import { useGoogleAnalytics } from "../hooks/useGoogleAnalytics";

function SiteVisits() {
  const [hover, sethover] = useState(false);
  const [chartLoaded, setChartLoaded] = useState(false);
  const { googleAnalytics, isLoading, error } = useGoogleAnalytics();

  useEffect(() => {
    const loadGoogleCharts = () => {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = () => {
        window.google.charts.load('current', { packages: ['corechart'] });
        window.google.charts.setOnLoadCallback(() => {
          setChartLoaded(true);
        });
      };
      document.head.appendChild(script);
    };

    loadGoogleCharts();
  }, []);

  useEffect(() => {
    if (chartLoaded && googleAnalytics?.dailyData) {
      drawChart();
    }
  }, [chartLoaded, googleAnalytics]);
  useEffect(() => {
    if (chartLoaded && googleAnalytics?.dailyData) {
      drawChart();
    }
  
    const handleResize = () => {
      if (chartLoaded && googleAnalytics?.dailyData) {
        drawChart(); // Redraw chart on window resize
      }
    };
  
    // Add resize event listener
    window.addEventListener('resize', handleResize);
  
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [chartLoaded, googleAnalytics]);

  const parseDateString = (dateString:any) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return new Date(year, month - 1, day);
  };

  const getDayName = (date:any) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const drawChart = () => {
    if (!googleAnalytics?.dailyData) return;

    // Process and sort the data
    const chartData = [['Day', 'Visits']];

    // Aggregate data by date
    const aggregatedData = googleAnalytics.dailyData.reduce((acc:any, day:any) => {
      const date = day.date;
      if (!acc[date]) {
        acc[date] = {
          date: parseDateString(date),
          activeUsers: 0,
        };
      }
      acc[date].activeUsers += day.activeUsers;
      return acc;
    }, {});

    // Get all the dates in the last 7 days
    const today = new Date();
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      last7Days.push(date);
    }

    // Prepare data for the chart
    last7Days.forEach((date) => {
      const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
      const visits = aggregatedData[formattedDate] ? aggregatedData[formattedDate].activeUsers : 0;
      chartData.push([getDayName(date), visits]);
    });

    const data = window.google.visualization.arrayToDataTable(chartData);

    const options = {
      backgroundColor: 'transparent',
      colors: ['#fc7777'],
     
      legend: { position: 'none' },
      chartArea: {
        width: '90%',
        height: '80%',
        
      },
      hAxis: {
        
        gridlines: { color: 'transparent' },
        baselineColor: 'transparent',
        textStyle: { 
          color: '#7669b5',
          fontSize: 12,
          bold: true, // You can also use `true` for bold.
          fontWeight: '600',
         
        }
      },
      vAxis: {
       
        gridlines: {
          color: '#b1a8d7',
          count: 9
        },
        
        textStyle: { 
          color: '#7669b5',
          fontSize: 12 ,
          bold: true, // You can also use `true` for bold.
          fontWeight: '600',
          
        },
        baselineColor: 'transparent',
        minValue: 0,
     
        
      
      },
      lineWidth: 3,
      pointSize: 0,
 
      interpolateNulls: true,
      animation: {
        startup: true,
        duration: 1000,
        easing: 'out'
      }
  
    };

    const chart = new window.google.visualization.LineChart(
      document.getElementById('visits_chart')
    );

    chart.draw(data, options);
  };

  return (
    <div className="min-h-[32.5rem] bg-[#ede8fa] px-3 custom-xl:px-6 py-3 custom-xl:py-6 col-span-1 row-span-2 rounded-md sm:rounded-xl custom-lg:rounded-3xl relative">
      <div className="flex items-end justify-between gap-2 pt-1.5">
        <div className="flex items-center gap-3 w-fit custom-lg:ml-16 pl-1 text-base text-[#685AAD] font-bold">
          <div className="flex items-center gap-3">
            <div className="bg-[#fc7777] h-[25px] w-[25px] rounded-sm">
              &nbsp;
            </div>{" "}
            Visits
          </div>
        </div>

        <div></div>
        <div className="w-fit">
          <Image  loading="lazy" 
            onMouseEnter={() => {
              sethover(true);
            }}
            onMouseLeave={() => {
              sethover(false);
            }}
            src={downloadReport}
            alt=""
            className="w-7 hover:cursor-pointer"
          />
          <div
            className={`absolute w-fit -top-5 right-4 bg-[#7669b5] px-3.5 py-1.5 text-xl rounded-xl text-white transition-all duration-700 transform origin-bottom-right ${
              hover ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            Download Report
          </div>
        </div>
      </div>

      <div className="chart h-[calc(100%-60px)]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-[#685AAD]">
            Loading...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-[#685AAD]">
            Error loading data
          </div>
        ) : (
          <div id="visits_chart" style={{ width: '100%', height: '100%' }} />
        )}
      </div>
    </div>
  );
}

export default SiteVisits;
