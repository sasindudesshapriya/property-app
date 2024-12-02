import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyForm from '../components/PropertyForm';
import { fetchPropertyById, updateProperty } from '../services/api';
import "../styles/EditProperty.css";

const EditProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const getProperty = async () => {
      try {
        const response = await fetchPropertyById(id);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property for edit:', error);
      }
    };
    getProperty();
  }, [id]);

  const handleEditProperty = async (data) => {
    await updateProperty(id, data);
  };

  if (!property) return <p>Loading...</p>;

  return (
    <div className='edit-property-container'>
      <h2>Edit Property</h2>
      <PropertyForm initialData={property} onSubmit={handleEditProperty} />
    </div>
  );
};

export default EditProperty;
