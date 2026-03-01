import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";

interface SalaryData {
  midMonthPay: number;
  monthEndPay: number;
  midMonthDate: string;
  monthEndDate: string;
}

const SalaryBarChart = ({ 
  midMonthPay = 3700,
  monthEndPay = 2600,
  midMonthDate = "15/10/2024",
  monthEndDate = "30/10/2024"
}: SalaryData) => {
  const [maxValue, setMaxValue] = useState(0);
  const [yAxisTicks, setYAxisTicks] = useState<number[]>([]);

  const data = [
    {
      name: `Mid-Month Pay\n${midMonthDate}`,
      value: midMonthPay
    },
    {
      name: `Month-End Pay\n${monthEndDate}`,
      value: monthEndPay
    }
  ];

  useEffect(() => {
    // Find the maximum value between both payments
    const max = Math.max(midMonthPay, monthEndPay);
    
    // Round up to the nearest 500
    const roundedMax = Math.ceil(max / 500) * 500;
    
    // Set the maximum value with some padding
    const yAxisMax = roundedMax + 500;
    setMaxValue(yAxisMax);

    // Generate ticks from 0 to maxValue in steps of 500
    const ticks = Array.from(
      { length: (yAxisMax / 500) + 1 },
      (_, i) => i * 500
    );
    setYAxisTicks(ticks);
  }, [midMonthPay, monthEndPay]);

  return (
    <Card className="  bg-transparent border-none shadow-none">
      <CardContent className="">
        <div className="border border-red-700 h-[400px]"> {/* Fixed height container */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              
            >
              <CartesianGrid 
                horizontal={true}
                vertical={false} 
                stroke="#9C89FF"
                
                strokeDasharray="3 3"
              />
              <XAxis 
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#6B4EFF', fontSize: 14 }}
                height={60}
                interval={0}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#6B4EFF', fontSize: 14 }}
                domain={[0, maxValue]}
                ticks={yAxisTicks}
              />
              <Bar 
             
                dataKey="value" 
                fill="#FFB7B7"
                radius={[8, 8, 0, 0]}
                barSize={70}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryBarChart;