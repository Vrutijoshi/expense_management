"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface IncomeChartProps {
  userId: string;
}

interface IncomeData {
  source: string;
  amount: number;
}

export function IncomeChart({ userId }: IncomeChartProps) {
  const [data, setData] = useState<IncomeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIncomeData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/income/sources?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch income data");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching income data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchIncomeData();
  }, [userId]);

  // Get colors from the CSS variables
  const getChartColors = () => {
    const root = document.documentElement;
    return [
      getComputedStyle(root).getPropertyValue('--chart-1').trim(),
      getComputedStyle(root).getPropertyValue('--chart-2').trim(),
      getComputedStyle(root).getPropertyValue('--chart-3').trim(),
      getComputedStyle(root).getPropertyValue('--chart-4').trim(),
      getComputedStyle(root).getPropertyValue('--chart-5').trim(),
    ];
  };

  if (loading) {
    return <div className="h-64 w-full flex items-center justify-center">Loading chart data...</div>;
  }

  if (data.length === 0) {
    return (
      <div className="h-64 w-full flex items-center justify-center">
        No income data available. Add income sources to see your breakdown.
      </div>
    );
  }

  const colors = getChartColors();

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="amount"
            nameKey="source"
            label={({ source, percent }) => `${source}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `$${value}`} 
            labelFormatter={(name) => `Source: ${name}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}