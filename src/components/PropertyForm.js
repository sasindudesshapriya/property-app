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

  // Address and map states
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isMapVisible, setIsMapVisible] = useState(true); // Manage map visibility
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  // Load initial data
  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setProperty((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleAddressChange = async (e) => {
    const query = e.target.value;
    setAddress(query);

    if (query.length > 2) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=LK`
      );
      const data = await response.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectAddress = (place) => {
    setAddress(place.display_name);
    setSuggestions([]);

    if (mapRef.current) {
      const { lat, lon } = place;
      mapRef.current.setView([lat, lon], 13);
      L.marker([lat, lon]).addTo(mapRef.current);
    } else {
      console.error("Map is not initialized yet");
    }
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
    setAddress("");
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const propertyData = { ...property, address };
    if (initialData.id) {
      await updateProperty(initialData.id, propertyData);
    } else {
      await createProperty(propertyData);
    }
    navigate("/");
  };

  useEffect(() => {
    if (!mapRef.current && mapContainer.current && isMapVisible) {
      const sriLankaBounds = [
        [5.916, 79.652],
        [9.842, 81.891],
      ];

      const mapInstance = L.map(mapContainer.current).fitBounds(sriLankaBounds);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);

      mapRef.current = mapInstance;
    }

    // Cleanup map when it is hidden
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isMapVisible]); // Trigger the effect when map visibility changes

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
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter address"
            />
            {suggestions.length > 0 && (
              <select
                onChange={(e) => {
                  const selectedPlace = suggestions.find(
                    (place) => place.display_name === e.target.value
                  );
                  if (selectedPlace) {
                    handleSelectAddress(selectedPlace);
                  }
                }}
                value={address}
              >
                <option value="" enabled>
                  Select an address
                </option>
                {suggestions.map((place) => (
                  <option key={place.place_id} value={place.display_name}>
                    {place.display_name}
                  </option>
                ))}
              </select>
            )}
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

      {/* Map Panel with Close Button */}
      {isMapVisible ? (
        <div className="map-panel">
          <button
            className="close-map-btn"
            onClick={() => setIsMapVisible(false)}
          >
            Close Map
          </button>
          <div
            ref={mapContainer}
            id="map"
            style={{ height: "400px", width: "100%" }}
          />
        </div>
      ) : (
        <button
          className="show-map-btn"
          onClick={() => setIsMapVisible(true)}
        >
          Show Map
        </button>
      )}
    </div>
  );
};

export default PropertyForm;
