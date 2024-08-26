import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import '../App.css';

export default function Profile() {
  const { currentUser, updateUser, delete_your_account } = useContext(UserContext);
  const [username, setUsername] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(username, email, phone);
  };

  if (!currentUser) {
    return <div className="alert alert-warning">Not Authorized to access this page</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <span>{currentUser.username.substring(0, 1).toUpperCase()}</span>
        </div>
        <div className="profile-info">
          <h4>{currentUser.username}</h4>
          <p>Full Stack Developer</p>
        </div>
      </div>

      <div className="profile-details">
        <h2>Profile</h2>
        <p>Username: {currentUser.username}</p>
        <p>Email: {currentUser.email}</p>
        <p>Phone: {currentUser.phone}</p>
      </div>

      <div className="profile-update">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
          <label>Email address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <label>Phone</label>
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
          <button type="submit">Save</button>
        </form>
      </div>

      <div className="profile-danger">
        <h2>Danger zone - This action is irreversible</h2>
        <button onClick={delete_your_account}>DELETE YOUR ACCOUNT</button>
      </div>
    </div>
  );
}
