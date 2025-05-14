import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4"];

function StatsPieChart({ emails }) {
  console.log(emails, "emailsss");

  const subjectCounts = emails.reduce((acc, email) => {
    acc[email.tag] = (acc[email.tag] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(subjectCounts).map(([tag, count]) => ({
    name: tag,
    value: count,
  }));

  return (
    <PieChart width={350} height={250}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
      >
        {data.map((_, i) => (
          <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend layout="horizontal" align="bottom" />
    </PieChart>
  );
}

export default StatsPieChart;
