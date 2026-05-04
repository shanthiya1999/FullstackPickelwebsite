import React, { useEffect, useState } from "react";
import axios from "axios";

function Pickle() {
  const [pickles, setPickles] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  
  let baseURL = "http://localhost:4000";
  useEffect(() => {
    axios
      .get(`${baseURL}/pickles`)
      .then((response) => {
        setPickles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pickles:", error);
      });
  },[]);
  function addcart(item1) {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please log in to add items to your cart.");
      window.location.href = "/login";
      return;
    }
    
    const user = JSON.parse(storedUser);
    const cartItem = {
      ...item1,
      userEmail: user.email,
      quan: 1 // Default quantity
    };
    delete cartItem._id; // Ensure MongoDB generates a new ID for the cart entry

    axios
      .post(`${baseURL}/addtocart`, cartItem)
      .then((response) => {
        console.log("Cart updated:", response.data);
        setPopupMessage(`${item1.name} added to cart!`);
        setTimeout(() => setPopupMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
  }
  return (
    <div className="products-container">
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Premium Pickle Collection</h1>
      <p style={{ textAlign: "center", color: "var(--text)", marginBottom: "40px" }}>Handcrafted traditions, delivered to your doorstep.</p>
      
      <div className="product-grid">
        {pickles.map((item) => (
          <div key={item._id} className="product-card">
            <div className="product-badge">Traditional</div>
            <div className="product-image-wrapper">
              <img
                src={item.image}
                className="product-image"
                alt={item.name}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">{item.name}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text)', marginBottom: '15px' }}>
                Authentic Indian pickle made with fresh ingredients and traditional spices.
              </p>
              <div className="product-meta">
                <span className="product-price">₹{item.price}</span>
                <span className="product-weight">{item.weight || '250g'}</span>
              </div>
              <button onClick={() => addcart(item)} className="add-cart-btn">
                <span>🛒</span> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {popupMessage && (
        <div className="status-toast">
          <span>✅</span> {popupMessage}
        </div>
      )}
    </div>
  );
}

export default Pickle;
