import React from 'react';
import PropertyForm from '../components/PropertyForm';
import "../styles/AddProperty.css";
import "../styles/background.css";

const AddProperty = () => {

  return (
    <div className="page-container">
      <div className='add-property-container'>
        <PropertyForm />
      </div>
    </div >
  );
};

export default AddProperty;
