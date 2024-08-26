import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import '../App.css'; // Ensure App.css has the styles defined below

export default function Register() {
  const { addUser } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(username, email, phone, password);
    setUsername('');
    setEmail('');
    setPassword('');
    setPhone('');
  };

  return (
    <div className='register-container'>
      <div className='register-card'>
        <h3 className='register-title'>Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="register-field">
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
          </div>
          <div className="register-field">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="register-field">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="register-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}
