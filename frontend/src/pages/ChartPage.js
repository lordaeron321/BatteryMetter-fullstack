import React from 'react';
import DataChart from '../components/data.jsx';
import RoundChart from '../components/RoundChart.jsx';
import DataDifferencial from '../components/dataDifferencial.jsx';
import PerformanceTable from '../components/PerformanceTable.jsx';
const ChartPage = (props) => {
   
   const initialData = props.appsData;
 

   return ( 
      <div className="DataChart">
            <div><DataChart appsData = { initialData }/></div>
            <PerformanceTable appsData = { initialData }/>
      </div> 
   );
}
export default ChartPage;
