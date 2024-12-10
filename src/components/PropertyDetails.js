import React, { useEffect, useState } from 'react';
import { fetchPropertyById } from '../services/api';
import { useParams, Link } from 'react-router-dom';
import "../styles/PropertyDetails.css";
import "../styles/background.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const getProperty = async () => {
      try {
        const response = await fetchPropertyById(id);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };
    getProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="page-container">
      <div className="property-details-container">
        <h2 className="property-details-header">{property.title}</h2>
        <p className="property-details-item">
          <span>Description:</span> 
          <div className="property-details-value">
          {property.description}
          </div>
        </p>
        <p className="property-details-item">
          <span>Type:</span> {property.type}
        </p>
        <p className="property-details-item">
          <span>Purpose:</span> {property.purpose}
        </p>
        <p className="property-details-item">
          <span>Price:</span> ${property.price}
        </p>
        <p className="property-details-item">
          <span>Status:</span> {property.status}
        </p>
        <p className="property-details-item">
          <span>Address:</span>
          <div className="property-details-value">
            {property.location?.address || "Not available"}
          </div>
        </p>

        <Link to="/" className="back-link">Back to Properties</Link>
      </div>
    </div>
  );
};

export default PropertyDetails;
