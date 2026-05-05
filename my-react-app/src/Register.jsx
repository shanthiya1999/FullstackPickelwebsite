import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './professional.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/register", formData)
      .then((response) => {
        console.log("Registration response:", response.data);
        setPopupMessage("Registered successfully!");
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          address: '',
          password: ''
        });
        setTimeout(() => setPopupMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setPopupMessage("Error registering!");
        setTimeout(() => setPopupMessage(""), 3000);
      });
  };

  return (
    <div className="page-container">
      <div className="form-card" style={{ maxWidth: '600px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">First Name</label>
              <input type="text" name="firstName" className="form-input" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Last Name</label>
              <input type="text" name="lastName" className="form-input" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-input" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                className="form-input" 
                placeholder="Password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input type="tel" name="mobile" className="form-input" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <textarea name="address" className="form-input" placeholder="Full Address" value={formData.address} onChange={handleChange} required rows="3" style={{ resize: 'vertical' }}></textarea>
          </div>

          <button type="submit" className="btn-primary-custom" style={{ marginTop: '10px' }}>Sign Up</button>
        </form>
        <Link to="/login" className="form-link">Already have an account? Log In</Link>
      </div>
      
      {popupMessage && (
        <div style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: popupMessage.includes("Error") ? "#f44336" : "#4caf50",
          color: "white",
          padding: "15px 20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
          zIndex: 1000,
          fontWeight: "bold"
        }}>
          {popupMessage}
        </div>
      )}
    </div>
  )
}

export default Register;
