import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ show }) => {
  const navigate = useNavigate();
  const currentUser = sessionStorage.getItem('user_id');

  const handleLogout = () => {
    sessionStorage.removeItem('user_id'); 
    window.location.reload();
    navigate('/Logowanie');
  };

  return (
    <div className={show ? 'sidebar active' : 'sidebar'}>
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
          <Link to="/Logowanie">Log In</Link>
        </li>
        

        {currentUser && (
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        )}

{currentUser && (
          <li>
            <span>Logged as user {currentUser}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
