import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RoundChart = (props) => {
  const initialData = props.appsData;


  const appEnergyData = initialData.reduce((acc, curr) => {
    if (!acc[curr.appName]) {
      acc[curr.appName] = 0;
    }
    acc[curr.appName] += curr.energyConsumption;
    return acc;
  }, {});

 
  const chartData = Object.keys(appEnergyData).map(appName => ({
    name: appName,
    value: appEnergyData[appName]
  }));

  return (
    <PieChart width={400} height={600}>
      <Pie
        data={chartData}
        cx={200}
        cy={200}
        labelLine={false}
        label={({ name, value }) => `${name}: ${value}`}
        outerRadius={180}
        fill="#8884d8"
        dataKey="value"
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default RoundChart;