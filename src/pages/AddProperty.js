import React from 'react';
import PropertyForm from '../components/PropertyForm';
import "../styles/AddProperty.css";

const AddProperty = () => {
  
  return (
    <div className='add-property-container'>
      <h2>Add New Property</h2>
      <PropertyForm />
    </div>
  );
};

export default AddProperty;
