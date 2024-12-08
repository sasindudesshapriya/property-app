import React from 'react';
import "../styles/Home.css";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="background-container">
      <div className="home-wrapper">
        {/* Left image containers */}
        <div className="image-container">
          <div className="image-box top-left"></div>
          <div className="image-box bottom-left"></div>
        </div>

        {/* Main content */}
        <div className="home-container">
          <h1>Welcome to Property Management</h1>
          <p>Your ultimate solution for managing and exploring properties seamlessly.</p>
          <div className="home-links">
          <Link to="/add" className="btn">Add New Property</Link>
            <a href="/listings">View Listings</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>

        {/* Right image containers */}
        <div className="image-container">
          <div className="image-box top-right"></div>
          <div className="image-box bottom-right"></div>
        </div>
      </div>

      {/* New section for bottom boxes and images */}
      <div className="bottom-images-container">
        <div className="bottom-left-box">
          <div className="bottom-image-left"></div>
          
        </div>
        <div className="bottom-right-box">
          <div className="bottom-image-right"></div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
