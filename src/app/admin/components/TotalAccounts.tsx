


import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import downloadReport from "../../../../public/downloadReport.svg";
import { useUsers } from "../hooks/useUser";

function TotalAccounts() {
  const [hover, sethover] = useState(false);
  const { users, isLoading, error } = useUsers();
  const chartRef = useRef<HTMLDivElement>(null);
  const countRoles = () => {
    if (!users) return { teacher: 0, student: 0, parent: 0 };

    return users.reduce(
      (acc: { teacher: any; student: any; parent: any; }, user: { role: string; }) => {
        if (user.role === "teacher") acc.teacher += 1;
        if (user.role === "student") acc.student += 1;
        if (user.role === "parent") acc.parent += 1;
        return acc;
      },
      { teacher: 0, student: 0, parent: 0 }
    );
  };

  const roleCounts = countRoles();
  useEffect(() => {
    if (typeof window !== "undefined" && chartRef.current) {
      const drawChart = async () => {
        // Load Google Charts
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://www.gstatic.com/charts/loader.js";
          script.onload = resolve;
          document.head.appendChild(script);
        });

        await google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(renderChart);
      };

      const renderChart = () => {
        const data = google.visualization.arrayToDataTable([
          ["Role", "Count", { role: "style" }],
          ["Teacher", roleCounts.teacher, "#fc7777"],
          ["Student", roleCounts.student, "#03dbe6"],
          ["Parent", roleCounts.parent, "#8c5cff"],
        ]);

        const options = {
          backgroundColor: "#ede8fa",
          chartArea: {
            width: "80%",
            height: "80%",
            backgroundColor: "#ede8fa",
          },
          bar: { groupWidth: "40%" },
          legend: { position: "none" },
          vAxis: {
            gridlines: {
              color: "#b1a8d7",
              count: 9,
            },
            minValue: 0,
            format: "#",
            textStyle: {
              color: "#7669b5",
              fontSize: 14,
              bold: true,
              fontWeight: "600",
            },
          },
          hAxis: {
            textStyle: {
              color: "#7669b5",
              fontSize: 14,
              bold: true,
              fontWeight: "600",
            },
          },
          animation: {
            startup: true,
            duration: 1000,
            easing: "out",
          },
        };

        const chart = new google.visualization.ColumnChart(chartRef.current);
        chart.draw(data, options);

        // Make chart responsive
        window.addEventListener("resize", () => {
          chart.draw(data, options);
        });
      };

      drawChart();
    }
  }, [roleCounts]);
  return (
    <div className=" max-h-[631px] bg-[#ede8fa] px-3 custom-xl:px-6 py-3 custom-xl:py-8 col-span-1 row-span-2 rounded-md sm:rounded-xl  custom-lg:rounded-3xl relative ">
      <div className="flex items-start justify-between gap-2  pt-1.5 ">
        <div className="  text-[#7669b5] font-medium pl-7">

          <h1 className="text-5xl">Total Accounts</h1>
        </div>


        <div className="w-fit">
          <Image loading="lazy"
            onMouseEnter={() => {
              sethover(true);
            }}
            onMouseLeave={() => {
              sethover(false);
            }}
            src={downloadReport}
            alt=""
            className="w-7  hover:cursor-pointer"
          />
          <div
            className={`absolute w-fit -top-5 right-4 bg-[#7669b5] px-3.5 py-1.5 text-xl  rounded-xl text-white transition-all duration-700 transform  origin-bottom-right  ${hover ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
          >
            Download Report
          </div>
        </div>
      </div>

      <div className="chart h-[90%]">

        <div ref={chartRef} className="w-full max-w-full h-full " />

      </div>
    </div>
  );
}

export default TotalAccounts;



