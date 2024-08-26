import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { AdminContext } from '../context/AdminContext'; // Import AdminContext
import '../App.css';

export default function Login() {
  const { login: userLogin } = useContext(UserContext);
  const { adminLogin } = useContext(AdminContext); // Destructure adminLogin from AdminContext
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false); // New state to track admin mode

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isAdminMode) {
      adminLogin(username, password); // Use adminLogin if in admin mode
    } else {
      userLogin(username, password); // Use userLogin if in user mode
    }

    setUsername('');
    setPassword('');
  };

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  return (
    <div className='login-container'>
      <div className='login-card'>
        <h3 className='login-title'>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
          </div>
          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Login</button>

          {/* Button to toggle between user and admin mode */}
          <button type="button" onClick={toggleAdminMode} className="login-mode-button">
            {isAdminMode ? 'Switch to User Mode' : 'Switch to Admin Mode'}
          </button>
        </form>
      </div>
    </div>
  );
}