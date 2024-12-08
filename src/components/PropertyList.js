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
    <div className="property-list-wrapper">
      <div className="property-ttile-background">
        {/* Header Section */}
        <header className="property-list-header">
          <h2>Property Listings</h2>
        </header>
        
        {/* Titles Section */}
        <div className="property-titles-list">
          <h3>All Titles:</h3>
          <ul>
            {properties.map((property) => (
              <li key={property.id} className="property-title-list-item">
                {property.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Property List Section */}
      <div className="property-list-container">
        <ul>
          {properties.map((property) => (
            <li key={property.id} className="property-item">
              <div className="property-info">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-detail">{property.description}</p>
                <p className="property-detail">{property.type} - {property.purpose}</p>
                <p className="property-detail">${property.price}</p>
                <p className="property-detail">Status: {property.status}</p>
              </div>
              <div className="property-actions">
                <Link to={`/edit/${property.id}`} className="edit-btn">Edit</Link>
                <button onClick={() => handleDelete(property.id)} className="delete-btn">Delete</button>
                <Link to={`/properties/${property.id}`} className="view-btn">View Details</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyList;
