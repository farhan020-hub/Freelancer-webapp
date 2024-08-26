import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { AdminContext } from '../context/AdminContext';
import '../App.css';

function Navbar() {
  const { currentUser, logout } = useContext(UserContext);
  const { isAdmin, adminLogout } = useContext(AdminContext);

  const handleLogout = () => {
    if (isAdmin) {
      adminLogout();
    } else {
      logout();
    }
  };

  // Determine whether to show login/register links
  const showLoginRegister = !currentUser && !isAdmin;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">Freelancer</Link>
        <ul className="nav-items">
          {isAdmin && (
            <>
              <li>
                <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-link logout" onClick={handleLogout}>Admin Logout</li>
            </>
          )}
          {!isAdmin && currentUser && (
            <>
              <li>
                <Link to="/jobs" className="nav-link">Jobs</Link>
              </li>
              <li>
                <Link to="/profile" className="nav-link">Profile</Link>
              </li>
              <li className="nav-link logout" onClick={handleLogout}>Logout</li>
            </>
          )}
          {showLoginRegister && (
            <>
              <li>
                <Link to="/register" className="nav-link">Register</Link>
              </li>
              <li>
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
