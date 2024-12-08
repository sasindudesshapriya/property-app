import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';
import PropertyDetails from './components/PropertyDetails';
import "./styles/App.css";
import PropertyList from './components/PropertyList';
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProperty />} />
        <Route path="/edit/:id" element={<EditProperty />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/listings" element={<PropertyList />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
