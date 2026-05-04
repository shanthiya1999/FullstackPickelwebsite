import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './professional.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/login", { email, password })
      .then((response) => {
        setPopupMessage("Login successful!");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setTimeout(() => {
          setPopupMessage("");
          window.location.href = "/"; // Force a full reload to update Navbar state
        }, 1500);
      })
      .catch((error) => {
        console.error("Login error:", error);
        setPopupMessage("Invalid email or password");
        setTimeout(() => setPopupMessage(""), 3000);
      });
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary-custom">Log In</button>
        </form>
        <Link to="/register" className="form-link">Don't have an account? Sign Up</Link>
      </div>

      {popupMessage && (
        <div style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: popupMessage.includes("Invalid") ? "#f44336" : "#4caf50",
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

export default Login;
