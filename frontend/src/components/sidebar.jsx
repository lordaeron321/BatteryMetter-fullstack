import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ show }) => {
  const navigate = useNavigate();
  const currentUser = sessionStorage.getItem('user_id');

  const handleLogout = () => {
    sessionStorage.removeItem('user_id'); // Usunięcie danych użytkownika z sessionStorage
    window.location.reload();
    navigate('/Logowanie'); // Przeniesienie użytkownika z powrotem do strony logowania
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
          <Link to="/Logowanie">Logowanie</Link>
        </li>
        
        {currentUser && (
          <li>
            <span>Zalogowany jako: {currentUser}</span>
          </li>
        )}

        {currentUser && (
          <li>
            <button onClick={handleLogout}>Wyloguj się</button> {/* Obsługa wylogowania */}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
