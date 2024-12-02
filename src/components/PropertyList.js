import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProperties, deleteProperty } from '../services/api';
import "../styles/PropertyList.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await fetchProperties();
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    getProperties();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProperty(id);
      setProperties(properties.filter((property) => property.id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <div className='property-list-container'>
      <h2>Property Listings</h2>
      <Link to="/add" className="btn">Add New Property</Link>
      <ul>
        {properties.map((property) => (
          <li key={property.id} className="property-item">
            <div className="property-info">
              <h3 className="property-title">{property.title}</h3>
              <p>{property.description}</p>
              <p>{property.type} - {property.purpose}</p>
              <p>${property.price}</p>
              <p>Status: {property.status}</p>
            </div>
            <div className="property-actions">
              <Link to={`/edit/${property.id}`} className="btn">Edit</Link>
              <button onClick={() => handleDelete(property.id)} className="btn">Delete</button>
              <Link to={`/properties/${property.id}`} className="btn">View Details</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
