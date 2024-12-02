import React from 'react';
import PropertyList from '../components/PropertyList';
import "../styles/Home.css";

const Home = () => {
  return (
    <div className='home-container'>
      <h1>Welcome to Property Management</h1>
      <PropertyList />
    </div>
  );
};

export default Home;
