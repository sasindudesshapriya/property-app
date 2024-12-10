import React, { useEffect, useState, useRef } from "react";
import { createProperty, updateProperty } from "../services/api";
import "../styles/PropertyForm.css";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PropertyForm = ({ initialData = {} }) => {
  const navigate = useNavigate();

  // Property form states
  const [property, setProperty] = useState({
    title: "",
    type: "",
    purpose: "",
    price: "",
    status: "",
    description: "",
  });

  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lon: null,
    address: "",
  });

  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Load initial data
  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setProperty((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setProperty(
      Object.keys(initialData).length > 0
        ? initialData
        : {
            title: "",
            type: "",
            purpose: "",
            price: "",
            status: "",
            description: "",
          }
    );
    setSelectedLocation({
      lat: null,
      lon: null,
      address: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const propertyData = { ...property, location: selectedLocation };
    if (initialData.id) {
      await updateProperty(initialData.id, propertyData);
    } else {
      await createProperty(propertyData);
    }
    navigate("/");
  };

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;

    // Move or add a marker to the clicked location
    if (!markerRef.current) {
      markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
    } else {
      markerRef.current.setLatLng([lat, lng]);
    }

    // Reverse geocode the selected location
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    const address = data.display_name || "Unknown Address";

    // Update the state with the selected location
    setSelectedLocation({ lat, lon: lng, address });
  };

  useEffect(() => {
    if (!mapRef.current && mapContainer.current) {
      const sriLankaBounds = [
        [5.916, 79.652],
        [9.842, 81.891],
      ];

      // Initialize the map
      const mapInstance = L.map(mapContainer.current).fitBounds(sriLankaBounds);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);

      // Add click event listener
      mapInstance.on("click", handleMapClick);

      mapRef.current = mapInstance;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div className="form-container">
        <h2>{initialData.id ? "Edit Property" : "Add New Property"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
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

          {/* Map */}
          <div
            ref={mapContainer}
            style={{ height: "400px", width: "100%", marginTop: "20px" }}
          ></div>
          {selectedLocation.address && (
            <p>
              <strong>Selected Address:</strong> {selectedLocation.address}
            </p>
          )}

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
    </div>
  );
};

export default PropertyForm;
