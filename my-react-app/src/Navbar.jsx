import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCartCount } from './store/cartSlice'
import axios from 'axios'
import './professional.css'

function Navbar() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const cartCount = useSelector((state) => state.cart.count);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch cart from backend to initialize the count
      axios.get(`http://localhost:4000/viewcart/${parsedUser.email}`)
        .then((response) => {
          const totalQty = response.data.reduce((acc, item) => acc + (item.quan || 1), 0);
          dispatch(setCartCount(totalQty));
        })
        .catch(() => {});
    }
  }, []);

  const handleLogout = () => {
    dispatch(setCartCount(0));
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

        {/* Cart icon with badge */}
        <Link to="/viewcart" className={`nav-link ${isActive('/viewcart')}`} style={{ position: 'relative' }}>
          🛒 Cart
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-12px',
              backgroundColor: '#e53e3e',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '0.7rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}>
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </Link>
        
        <div style={{ marginLeft: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          {user ? (
            <>
              {(user.role === 'admin' || user.email === 'owner@pickle.com') && (
                <Link to="/admin" className={`nav-link ${isActive('/admin')}`} style={{ fontWeight: '600', color: 'var(--accent)' }}>
                  ⚙️ Admin
                </Link>
              )}
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

