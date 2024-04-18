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

  useEffect(() => {
    const fetchData = async () => {
      try {
        //test
        const response = await fetch('http://127.0.0.1:8000/api/user/6/measurements/');
        
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
      } catch (error) {
        console.error('Błąd:', error);
      }
    };

    fetchData();
  }, []);

  const [showBar, setShowBar] = useState(true);

  const toggleSidebar = () => {
    setShowBar(!showBar);
  };



 
  return (
    <Router>
      <header>
        <LuMenuSquare onClick={toggleSidebar} />
      </header>

      <Sidebar show={showBar} />

      <div className='main'>
          <Routes>
            <Route path="/Apps" element={<Apps appsData={initialData} />} />
            <Route path="/home" element={<ChartPage appsData={initialData} />} /> 
            <Route path="/AppDetail/:id" element={<AppDetail/>} />
            <Route path="/Registration" element={<RegistrationForm/>}/>
            <Route path="/Logowanie" element={<Logowanie/>} />
          </Routes> 
      </div>
    </Router>
  );
}

export default App;
