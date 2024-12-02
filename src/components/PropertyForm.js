import React, { useState } from "react";
import { createProperty } from "../services/api";
import "../styles/PropertyForm.css";

const PropertyForm = () => {
  const [property, setProperty] = useState({
    title: "",
    type: "",
    purpose: "",
    price: "",
    status: "",
    description: "",
  });

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProperty(property);
    // Reset form
    setProperty({
      title: "",
      type: "",
      purpose: "",
      price: "",
      status: "",
      description: "",
    });
  };

  return (
    <div className="form-container">
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input">
          <label>Type</label>
          <input
            type="text"
            name="type"
            value={property.type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input">
          <label>Purpose</label>
          <input
            type="text"
            name="purpose"
            value={property.purpose}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={property.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input">
          <label>Status</label>
          <input
            type="text"
            name="status"
            value={property.status}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input">
          <label>Description</label>
          <textarea
            name="description"
            value={property.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn">Add Property</button>
          <button type="reset" className="btn reset">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
