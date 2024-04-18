import React from 'react';
import { GiBatteryPack } from "react-icons/gi";
import { FaRegChartBar } from "react-icons/fa";
import { TbArrowsDoubleNeSw } from "react-icons/tb";
const PerformanceTable = () => {
    return ( 
        <div className="performance">

        <div className="performanceHeader"></div>
        <div className="performanceTables">
           <div className="performanceTable"><GiBatteryPack /></div>
           <div className="performanceTable"><FaRegChartBar /></div>
           <div className="performanceTable"><TbArrowsDoubleNeSw /></div>
           
        </div>
     </div>
       );
}

export default PerformanceTable;


