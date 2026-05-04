import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './professional.css'

function Navbar() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="modern-navbar">
      <Link to="/" className="navbar-brand">
        🥒 Traditional<span>Pickles</span>
      </Link>
      
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${isActive('/')}`}>🏠 Home</Link>
        <Link to="/pickles" className={`nav-link ${isActive('/pickles')}`}>🌶️ Products</Link>
        <Link to="/about" className={`nav-link ${isActive('/about')}`}>ℹ️ About</Link>
        <Link to="/viewcart" className={`nav-link ${isActive('/viewcart')}`}>🛒 Cart</Link>
        
        <div style={{ marginLeft: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          {user ? (
            <>
              <Link to="/account" className={`nav-link ${isActive('/account')}`} style={{ fontWeight: '600' }}>
                👤 Account
              </Link>
              <button onClick={handleLogout} className="nav-btn nav-btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-btn nav-btn-solid" style={{ textDecoration: 'none' }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
