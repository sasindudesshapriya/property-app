import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <h1 className="contact-header">Contact Us</h1>
      <div className="contact-row">
        {/* Contact Details Card */}
        <div className="contact-card-details">
          <h2>Contact Information</h2>
          <p>
            Have questions, feedback, or need assistance? 
            <br /> We’re here to help!
          </p>
          <ul className='contact-list'>
            <li><strong>Email:</strong> support@PropertyManagement.com</li>
            <li><strong>Phone:</strong> +1 234 567 890</li>
            <li><strong>Address:</strong> 123 Your Street, Your City, Your Country</li>
          </ul>
          {/* Back to Home Button */}
          <Link to="/" className="back-link">Back to Home</Link>
        </div>

        {/* Contact Form Card */}
        <div className="contact-card-form">
          <h2>Send Us a Message</h2>
          <form className="contact-form">
            <label htmlFor="name">Your Name:</label>
            <input type="text" id="name" name="name" required placeholder="Enter your name" />
            
            <label htmlFor="email">Your Email:</label>
            <input type="email" id="email" name="email" required placeholder="Enter your email" />
            
            <label htmlFor="message">Your Message:</label>
            <textarea id="message" name="message" rows="4" required placeholder="Write your message"></textarea>
            
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
