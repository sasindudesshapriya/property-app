import React, { useEffect, useState } from "react";
import { createProperty, updateProperty } from "../services/api";
import "../styles/PropertyForm.css";
import { useNavigate } from "react-router-dom";

const PropertyForm = ({ initialData = {} }) => {
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    title: "",
    type: "",
    purpose: "",
    price: "",
    status: "",
    description: "",
  });

  // Populate form fields with initialData when available
  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setProperty((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData])

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setProperty(Object.keys(initialData).length > 0 ? initialData : {
      title: "",
      type: "",
      purpose: "",
      price: "",
      status: "",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData.id) {
      // Update existing property
      await updateProperty(initialData.id, property); // Send the updated data to the API
    }
    else {
      // Create a new property
      await createProperty(property);
    }

    navigate("/"); // Redirect to the property list page
  };

  return (
    
      <div className="form-container">
        <h2>{initialData.id ? "Edit Property" : "Add New Property"}</h2>
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
            <button type="submit" className="btn">
              {initialData.id ? "Edit Property" : "Add Property"}
            </button>
            <button type="reset" className="btn reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    
  );
};

export default PropertyForm;
