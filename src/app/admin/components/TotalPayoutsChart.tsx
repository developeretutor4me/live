"use client";
import { useState } from "react";
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import downloadReport from "../../../../public/downloadReport.svg";
import Image from "next/image";
import SalaryBarChart from "./SalaryBarChart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function TotalPayoutsChart() {
  const [hover, sethover] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && chartRef.current) {
      const drawChart = async () => {
        // Load Google Charts
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://www.gstatic.com/charts/loader.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });

        await google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(renderChart);
      };

      const renderChart = () => {
        const data = google.visualization.arrayToDataTable([
          ['Payment Type', 'Amount', { role: 'style' }],
          ['Mid-Month Pay\n15/10/2024', 55700, '#fc7777'],
          ['Month-End Pay\n30/10/2024', 2500, '#fc7777'],
        ]);

        const options = {
          backgroundColor: '#ede8fa',
          chartArea: { 
            width: '80%', 
            height: '80%',
            backgroundColor: '#ede8fa'
          },
          bar: { groupWidth: '40%' },
          legend: { position: 'none' },
          vAxis: {
            gridlines: {
              color: '#b1a8d7',
              count: 9
            },
            minValue: 0,
            maxValue: 4500,
            format: '#',
            textStyle: { 
              color: '#7669b5',
              fontSize: 12 ,
              bold: true, // You can also use `true` for bold.
              fontWeight: '600',
            }
          },
          hAxis: {
            textStyle: { 
              color: '#7669b5',
              fontSize: 12,
              bold: true, // You can also use `true` for bold.
              fontWeight: '600',
             
            }
          },
          animation: {
            startup: true,
            duration: 1000,
            easing: 'out'
          }
        };

       

        const chart = new google.visualization.ColumnChart(chartRef.current);
        chart.draw(data, options);

        // Make chart responsive
        window.addEventListener('resize', () => {
          chart.draw(data, options);
        });
      };

      drawChart();
    }
  }, [chartRef]);


  return (
    <div className="py-1.5">
      <div className="flex items-end justify-between gap-2  ">
        <div className="flex items-center gap-3 w-fit custom-lg:ml-16 pl-1 text-base text-[#685aad] font-bold">
          <div className="bg-[#fc7777] h-[25px] w-[25px] rounded-sm">
            &nbsp;
          </div>{" "}
          Total Payouts
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
            className="w-7  hover:cursor-pointer"
          />
          <div
            className={`absolute w-fit -top-5 right-4 bg-[#7669b5] px-3.5 py-1.5 text-xl  rounded-xl text-white transition-all duration-700 transform  origin-bottom-right  ${
              hover ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            Download Report
          </div>
        </div>
      </div>

      <div className="">
        <div className="max-w-4xl mx-auto  flex items-center justify-center py-3">

        <div ref={chartRef} className="w-full max-w-full h-[400px]" />

          
        </div>
      </div>
    </div>
  );
}

export default TotalPayoutsChart;



