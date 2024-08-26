import React from 'react';
import UserProvider from './context/UserContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';  
import Profile from './pages/Profile';
import Navbar from './layout/Navbar';
import AdminDashboard from './admindashboard/AdminDashboard';

import './App.css';
import { AdminProvider } from './context/AdminContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AdminProvider>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs/*" element={<Jobs />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </UserProvider>
        </AdminProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;