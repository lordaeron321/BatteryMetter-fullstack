import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DataDifferencial from '../components/dataDifferencial.jsx';

const DataChart = (props) => {
  const initialData = props.appsData;

  const [originalData, setOriginalData] = useState(initialData);
  const [data, setData] = useState(originalData);
  const [startDate, setStartDate] = useState(new Date(data[0]?.measurementDate));
  const [endDate, setEndDate] = useState(new Date(data[data.length - 1]?.measurementDate));
  const [selectedApps, setSelectedApps] = useState(new Set());
  const [selectAllApps, setSelectAllApps] = useState(true);
  const [appsDropdownVisible, setAppsDropdownVisible] = useState(false);
  const chartContainerRef = useRef(null);
  const [interpolationIndex, setInterpolationIndex] = useState(3);
  const interpolations = ['linear', 'step', 'natural', 'monotone'];

  useEffect(() => {
    const newData = originalData.filter(entry => selectedApps.has(entry.appName));
    setData(newData);
  }, [originalData, selectedApps]);

  useEffect(() => {
    if (selectAllApps) {
      const allApps = new Set(originalData.map(entry => entry.appName));
      setSelectedApps(allApps);
    }
  }, [selectAllApps, originalData]);

  const handleChangeStart = (date) => {
    setStartDate(date);
  };

  const handleChangeEnd = (date) => {
    setEndDate(date);
  };

  const handleAppChange = (event) => {
    const appName = event.target.value;
    const updatedSelectedApps = new Set(selectedApps);
    if (updatedSelectedApps.has(appName)) {
      updatedSelectedApps.delete(appName);
    } else {
      updatedSelectedApps.add(appName);
    }
    setSelectedApps(updatedSelectedApps);
  };

  const handleSelectAllApps = (event) => {
    const checked = event.target.checked;
    setSelectAllApps(checked);
    if (checked) {
      const allApps = new Set(originalData.map(entry => entry.appName));
      setSelectedApps(allApps);
    } else {
      setSelectedApps(new Set());
    }
  };

  const handleInterpolationChange = () => {
    const newIndex = (interpolationIndex + 1) % interpolations.length;
    setInterpolationIndex(newIndex);
  };

  const toggleAppsDropdown = () => {
    setAppsDropdownVisible(!appsDropdownVisible);
  };

  const filteredData = data.filter(entry => new Date(entry.measurementDate) >= startDate && new Date(entry.measurementDate) <= endDate);

  
  const groupedData = filteredData.reduce((acc, curr) => {
    const measurementDate = new Date(curr.measurementDate).toISOString().split('T')[0];
    if (!acc[measurementDate]) {
      acc[measurementDate] = { ...curr };
    } else {
      acc[measurementDate].energyConsumption += curr.energyConsumption;
    }
    return acc;
  }, {});

 
  const chartData = Object.keys(groupedData).map(date => ({
    measurementDate: date,
    energyConsumption: groupedData[date].energyConsumption,
  }));

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <ResponsiveContainer width="100%" height={600} ref={chartContainerRef}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="measurementDate" />
              <YAxis />
              <Tooltip />
              <Area type={interpolations[interpolationIndex]} dataKey="energyConsumption" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="buttons-container">
          <div style={{ flex: 0.2, padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div className="apps-dropdown-container">
              <button onClick={toggleAppsDropdown}>Select apps included in stats</button>
              {appsDropdownVisible && (
                <div className="apps-dropdown">
                  <form className="AppsCombination">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectAllApps}
                        onChange={handleSelectAllApps}
                      />
                      Select All Apps
                    </label>
                    {Array.from(new Set(originalData.map(entry => entry.appName))).map(appName => (
                      <label key={appName}>
                        <input
                          type="checkbox"
                          value={appName}
                          checked={selectedApps.has(appName)}
                          onChange={handleAppChange}
                        />
                        {appName}
                      </label>
                    ))}
                  </form>
                </div>
              )}
            </div>
            <p style={{ marginBottom: '5px' }}>Start Date:</p>
            <DatePicker
              selected={startDate}
              onChange={handleChangeStart}
              minDate={new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000))}
              maxDate={endDate}
              dateFormat="yyyy-MM-dd HH:mm"
              showTimeInput
              className="date-picker"
            />
            <p style={{ marginTop: '10px', marginBottom: '5px' }}>End Date:</p>
            <DatePicker
              selected={endDate}
              onChange={handleChangeEnd}
              minDate={startDate}
              maxDate={new Date()}
              dateFormat="yyyy-MM-dd HH:mm"
              showTimeInput
              className="date-picker"
            />
            <button onClick={handleInterpolationChange}>Change Interpolation</button>
          </div>
        </div>
      </div>
      <DataDifferencial key={JSON.stringify(chartData)} appsData={chartData} appsDataRC={data} />
    </div>
  );
};

export default DataChart;
