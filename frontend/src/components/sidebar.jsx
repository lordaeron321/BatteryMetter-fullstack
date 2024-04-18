
import Apps from './apps.jsx'; 
import ChartPage from '../pages/ChartPage.js';
import Logowanie from '../pages/Logowanie.js';
import RegistrationForm from '../pages/Registration.js';
import { Link } from 'react-router-dom'; 
const Sidebar = ({show}) => {
  return (
   <div className={show ? 'sidebar active':'sidebar'}>
    
      <ul>
        <li>
        <Link to="/home">home</Link>
        </li>

        <li>
        <Link to="/Apps">apps</Link>
        </li>

        <li>
        <Link to="/Registration">Registration</Link>
        </li>

        <li>
        <Link to="/Logowanie">Logowanie</Link>
        </li>
      </ul>
   </div>
  );
};

export default Sidebar;
