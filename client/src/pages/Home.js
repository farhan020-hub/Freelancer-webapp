import React from 'react';
import { Link } from 'react-router-dom';
import img from '../images/img.jpg';
import '../App.css'; 

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Welcome to the Freelancer App</h1>
        <p className="landing-description">Join our community of professional freelancers and find exciting new projects to work on.</p>
        <Link to="/login" className="landing-button">Join Us</Link>
      </div>
      <div className="landing-image-container">
        <img src={img} alt="Freelancer Work" className="landing-image" />
      </div>
    </div>
  );
};

export default LandingPage;
