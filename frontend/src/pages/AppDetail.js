import React from 'react';
import { useLocation } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AppDetail() {

  const data = useLocation().state.from;;

 React.useEffect(() => {
    console.log(data);
  },[])

  return (
    <div>
      <ResponsiveContainer width="100%" height={600}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="measurementDate" />
          <YAxis />
          <Tooltip />
          <Area type={'monotone'} dataKey="energyConsumption" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AppDetail;
