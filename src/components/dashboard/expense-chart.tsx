"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ExpenseChartProps {
  userId: string;
}

interface ExpenseData {
  category: string;
  amount: number;
}

export function ExpenseChart({ userId }: ExpenseChartProps) {
  const [data, setData] = useState<ExpenseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenseData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/expenses/categories?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch expense data");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching expense data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchExpenseData();
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
        No expense data available. Add expenses to see your spending breakdown.
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
            nameKey="category"
            label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `$${value}`} 
            labelFormatter={(name) => `Category: ${name}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}