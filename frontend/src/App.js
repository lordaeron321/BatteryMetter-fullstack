import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState,useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import { format, parseISO } from 'date-fns';

import RegistrationForm from './pages/Registration.js';
import Logowanie from './pages/Logowanie';

import { LuMenuSquare } from "react-icons/lu";

import ChartPage from './pages/ChartPage.js';
import AppDetail from './pages/AppDetail.js'
import Sidebar from './components/sidebar.jsx';
import Navbar from './components/navbar.jsx';
import Apps from './components/apps.jsx';
import { useParams } from 'react-router-dom';

function App() {
  const [initialData, setInitialData] = useState(() => {
    const storedData = localStorage.getItem('initialData');
    return storedData ? JSON.parse(storedData) : [];
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://battery-metter-backend.azurewebsites.net/api/user/1/measurements/');
        
        if (!response.ok) {
          throw new Error('Wystąpił problem z pobraniem danych');
        }
        const data = await response.json();
  
        const transformedData = data.map(item => ({
          appName: item.user_application,
          measurementDate: parseISO(item.measurement_date),
          energyConsumption: item.energy_consumption,
          id: item.id
        }));
  
        setInitialData(transformedData);
        localStorage.setItem('initialData', JSON.stringify(transformedData));
  
     
        const currentUser = sessionStorage.getItem('user_id');
        setIsLoggedIn(currentUser !== null); 
      } catch (error) {
        console.error('Błąd:', error);
      }
    };
  
    fetchData();
  }, []);

  const [showBar, setShowBar] = useState(false);

  const toggleSidebar = () => {
    setShowBar(!showBar);
  };


  return (
    <Router>
      <header>
        <LuMenuSquare onClick={toggleSidebar} />
      </header>
  
      <Sidebar show={showBar} isLoggedIn={isLoggedIn} />
  
      <div className='main'>
        <Routes>
         
          {isLoggedIn && (
          <Route path="/home" element={<ChartPage appsData={initialData} />} />
            )}
            {isLoggedIn && (
          <Route path="/AppDetail/:id" element={<AppDetail/>} /> 
         )}
         
          {isLoggedIn && (
            <>
              <Route path="/Apps" element={<Apps appsData={initialData} />} />
              <Route path="/Registration" element={<RegistrationForm/>}/>
            </>
          )}
  
         
          {!isLoggedIn && (
            <Route path="/Logowanie" element={<Logowanie/>} />
          )}
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
