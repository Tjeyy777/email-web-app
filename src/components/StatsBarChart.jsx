import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function StatsBarChart({ emails }) {
  const dayMap = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayCounts = emails.reduce((acc, email) => {
    const day = dayMap[new Date(email.date).getDay()];
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const data = dayMap.map((day) => ({
    day,
    count: dayCounts[day] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#1976d2" name="Emails" />{" "}
        <Legend layout="horizontal" align="center" verticalAlign="top" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StatsBarChart;
