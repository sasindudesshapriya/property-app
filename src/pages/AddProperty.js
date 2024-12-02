import React from 'react';
import PropertyForm from '../components/PropertyForm';
import { createProperty } from '../services/api';
import "../styles/AddProperty.css";

const AddProperty = () => {
  const handleAddProperty = async (data) => {
    await createProperty(data);
  };

  return (
    <div className='add-property-container'>
      <h2>Add New Property</h2>
      <PropertyForm onSubmit={handleAddProperty} />
    </div>
  );
};

export default AddProperty;
