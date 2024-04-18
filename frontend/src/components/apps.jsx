import React from 'react';
import { Link } from 'react-router-dom';
import { GrAndroid } from "react-icons/gr";
import AppDetail from '../pages/AppDetail'
function Apps(props) {
  const appsData = props.appsData;

  const uniqueAppIds = [...new Set(appsData.map(app => app.appName))];

  const renderApps = () => {


    return uniqueAppIds.map(appName => {
      const filteredData = appsData.filter(app => app.appName === appName);
      
      return (
        <Link
          key={appName}
          to={{
            pathname: `/AppDetail/${appName}`,
            
          }}
          state={{ from: filteredData}}
          style={{ textDecoration: 'none', color: '#000' }}
        >
          <div className="AppBlock">
            <GrAndroid style={{ fontSize: '5rem', marginTop:'20%'}}/>
            <h3>{filteredData[0].appName}</h3>
          </div>
        </Link>
      );
    });
  };

  return <div className="AppsContainer">{renderApps()}</div>;
}

export default Apps;
