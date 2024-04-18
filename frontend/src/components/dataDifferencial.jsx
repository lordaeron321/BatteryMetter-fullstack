import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import RoundChart from './RoundChart'

const DataDifferencial = (props) => {
  const initialData = props.appsData;

  const [data, setData] = useState(initialData);


  useEffect(() => {
    if (data.length > 1) {
      const newData = data.map((item, index) => {
        if (index === 0) return { ...item, derivative: 0 };
        const prevItem = data[index - 1];
        const timeDifference = new Date(item.measurementDate) - new Date(prevItem.measurementDate);
        const energyDifference = item.energyConsumption - prevItem.energyConsumption;
        const derivative = energyDifference / timeDifference;
        return { ...item, derivative };
      });
      setData(newData);
    }
  }, [data]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <ResponsiveContainer width="96%" height={600}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="measurementDate" />
            <YAxis />
            <Tooltip />
            <Area type={'monotone'} dataKey="derivative" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <RoundChart key={JSON.stringify(data)} appsData={data}/>
    </div>
  );
};

export default DataDifferencial;
