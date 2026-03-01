
import Image from "next/image";
import React, { useState, useEffect } from "react";
import downloadReport from "../../../../public/downloadReport.svg";
import { useUsers } from "../hooks/useUser";

function SubscriptionGraph() {
  const [hover, sethover] = useState(false);
  const { users, isLoading, error } = useUsers();
  const [chartLoaded, setChartLoaded] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([
    ["Day", "premium", "standard"],
    ["Sun", 0, 0],
    ["Mon", 0, 0],
    ["Tue", 0, 0],
    ["Wed", 0, 0],
    ["Thu", 0, 0],
    ["Fri", 0, 0],
    ["Sat", 0, 0],
  ]);


  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Get the start and end of the current week (Sunday to Saturday)
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - currentDay);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + (6 - currentDay));
    endOfWeek.setHours(23, 59, 59, 999);

    // Initialize counters for each day
    const dayCounts: any = {
      premium: { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 },
      standard: { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 },
    };

    if (users?.length > 0) {
      users.forEach((user: any) => {
        const purchaseDate = new Date(user.planType?.createdAt);

        // Check if the purchase is within the current week
        if (purchaseDate >= startOfWeek && purchaseDate <= endOfWeek) {
          const dayName = purchaseDate.toLocaleString("en-us", {
            weekday: "short",
          });
          const planType: string = user.planType?.type;

          if (planType === "premium" || planType === "standard") {
            dayCounts[planType][dayName]++;
          }
        }
      });

      // Update the subscription data
      setSubscriptionData([
        ["Day", "premium", "standard"],
        ["Sun", dayCounts.premium.Sun, dayCounts.standard.Sun],
        ["Mon", dayCounts.premium.Mon, dayCounts.standard.Mon],
        ["Tue", dayCounts.premium.Tue, dayCounts.standard.Tue],
        ["Wed", dayCounts.premium.Wed, dayCounts.standard.Wed],
        ["Thu", dayCounts.premium.Thu, dayCounts.standard.Thu],
        ["Fri", dayCounts.premium.Fri, dayCounts.standard.Fri],
        ["Sat", dayCounts.premium.Sat, dayCounts.standard.Sat],
      ]);
    }
  }, [users]);

  useEffect(() => {
    // Load Google Charts library
    const loadGoogleCharts = () => {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/charts/loader.js";
      script.onload = () => {
        window.google.charts.load("current", { packages: ["corechart"] });
        window.google.charts.setOnLoadCallback(() => {
          setChartLoaded(true);
        });
      };
      document.head.appendChild(script);
    };

    loadGoogleCharts();

    // Cleanup
    return () => {
      const script = document.querySelector(
        'script[src="https://www.gstatic.com/charts/loader.js"]'
      );
      if (script) {
        script.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (chartLoaded) {
      drawChart();
    }
  }, [chartLoaded, subscriptionData]);

  useEffect(() => {
    const handleResize = () => {
      if (chartLoaded) {
        drawChart();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [chartLoaded]);


  if (error) {
    return <p>Error loading data!</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }


  const drawChart = () => {
    const data = window.google.visualization.arrayToDataTable(subscriptionData);

    const options = {
      backgroundColor: "transparent",
      colors: ["#8653ff", "#00dae5"],
      legend: { position: "none" },
      chartArea: {
        width: "90%",
        height: "80%",
      },
      hAxis: {
        gridlines: { color: "transparent" },
        baselineColor: "transparent",
        textStyle: {
          color: "#7669b5",
          fontSize: 12,
          bold: true,
          fontWeight: "600",
        },
      },
      vAxis: {
        gridlines: {
          color: "#b1a8d7",
          count: 9,
        },
        textStyle: {
          color: "#7669b5",
          fontSize: 12,
          bold: true,
          fontWeight: "600",
        },
        baselineColor: "transparent",
        minValue: 0,
        maxValue:10,
      },
      lineWidth: 3,
      pointSize: 5, // Added point size to make data points visible
      animation: {
        startup: true,
        duration: 1000,
        easing: "out",
      },
    };

    const chart = new window.google.visualization.LineChart(
      document.getElementById("subscription_chart")
    );

    chart.draw(data, options);
  };


  

  return (
    <div className="min-h-[32.5rem] bg-[#ede8fa] px-3 custom-xl:px-6 py-3 custom-xl:py-6 col-span-1 row-span-2 rounded-md sm:rounded-xl custom-lg:rounded-3xl relative">
      <div className="flex items-end justify-between gap-2 pt-1.5">
        <div className="flex items-center gap-3 w-fit custom-lg:ml-16 pl-1 text-base text-[#685AAD] font-bold">
          <div className="flex items-center gap-3">
            <div className="bg-[#8653ff] h-[25px] w-[25px] rounded-sm">
              &nbsp;
            </div>{" "}
            premium
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#00dae5] h-[25px] w-[25px] rounded-sm">
              &nbsp;
            </div>{" "}
            standard
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

      <div className="chart h-[calc(100%-60px)] w-full max-w-full">
        {isLoading ? (
          <p>Loading..</p>
        ) : (
          <div id="subscription_chart" className="w-full max-w-full h-full" />
        )}
      </div>
    </div>
  );
}

export default SubscriptionGraph;
