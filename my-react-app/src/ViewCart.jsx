import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCartCount, decrementCart, resetCart } from './store/cartSlice';

function ViewCart() {
    const [cartItems, setCartItems] = useState([]);
    const [showBilling, setShowBilling] = useState(false);
    const dispatch = useDispatch();
    let baseURL = "http://localhost:4000";
    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            window.location.href = "/login";
            return;
        }
        const user = JSON.parse(storedUser);
        
        axios.get(`${baseURL}/viewcart/${user.email}`)
        .then((response)=>{
            console.log("Cart items:", response.data);
            setCartItems(response.data);
            // Sync total quantity to Redux store
            const totalQty = response.data.reduce((acc, item) => acc + (item.quan || 1), 0);
            dispatch(setCartCount(totalQty));
        })
        .catch((error)=>{
            console.error("Error fetching cart items:", error);
        })
    },[]);
    function delete1(id){
        const itemToDelete = cartItems.find(item => item._id === id);
        console.log("Deleting item with id:", id);
        axios.delete(`${baseURL}/deletecart/${id}`)
        .then((response)=>{
            console.log("Item deleted:", response.data);
            setCartItems(cartItems.filter(item => item._id !== id));
            // Decrement by the quantity of the deleted item
            dispatch(decrementCart(itemToDelete?.quan || 1));
        })
        .catch((error)=>{
            console.error("Error deleting item:", error);
        })
    }
    function increaseQty(id){
        axios.patch(`${baseURL}/increase/${id}`)
        .then((response)=>{
            console.log("Quantity increased:", response.data);
            setCartItems(cartItems.map(item => item._id === id ? { ...item, quan: (item.quan || 1) + 1 } : item));
        })
        .catch((error)=>{
            console.error("Error increasing quantity:", error);
        })
    }
    function decreaseQty(id){
        axios.patch(`${baseURL}/decrease/${id}`)
        .then((response)=>{ 
            console.log("Quantity decreased:", response.data);
            setCartItems(cartItems.map(item => item._id === id ? { ...item, quan: Math.max((item.quan || 1) - 1, 1) } : item));
        })
        .catch((error)=>{
            console.error("Error decreasing quantity:", error);
        })
    }

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * (item.quan || 1)), 0);

    function confirmOrder() {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("Please log in to place an order.");
        window.location.href = "/login";
        return;
      }
      const user = JSON.parse(storedUser);
      const order = {
        userEmail: user.email,
        userName: `${user.firstName} ${user.lastName}`,
        items: cartItems.map(item => ({ name: item.name, price: item.price, quan: item.quan || 1 })),
        totalAmount: totalAmount
      };
      axios.post("http://localhost:4000/placeorder", order)
        .then((response) => {
          alert("Order placed successfully!");
          setCartItems([]);
          setShowBilling(false);
          dispatch(resetCart()); // Reset cart count after order
        })
        .catch((err) => {
          console.error("Error placing order:", err);
          alert("Error placing order. Please try again.");
        });
    }

  return (
    <div className="cart-container">
      <h1 style={{ marginBottom: "30px", textAlign: "left" }}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🛒</div>
          <h2>Your cart is empty</h2>
          <p style={{ color: "var(--text)", marginTop: "10px" }}>Looks like you haven't added anything yet.</p>
          <button 
            onClick={() => window.location.href = "/pickles"}
            className="btn-primary-custom" 
            style={{ maxWidth: "200px", marginTop: "30px" }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px', alignItems: 'start' }}>
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.name}</h3>
                  <div className="cart-item-price">₹{item.price}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text)', marginTop: '5px' }}>Weight: {item.weight || '250g'}</div>
                </div>

                <div className="cart-controls">
                  <button className="qty-btn" disabled={item.quan <= 1} onClick={() => decreaseQty(item._id)}>−</button>
                  <span style={{ fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>{item.quan || 1}</span>
                  <button className="qty-btn" onClick={() => increaseQty(item._id)}>+</button>
                </div>

                <div style={{ marginLeft: '25px', fontWeight: '700', minWidth: '80px', textAlign: 'right' }}>
                  ₹{item.price * (item.quan || 1)}
                </div>

                <button onClick={() => delete1(item._id)} className="delete-btn" title="Remove item">
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 style={{ marginBottom: '20px', textAlign: 'left' }}>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: '#10b981', fontWeight: '600' }}>FREE</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
            
            <button 
              onClick={() => setShowBilling(true)}
              className="btn-primary-custom"
              style={{ marginTop: "25px", padding: '16px' }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {showBilling && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          display: "flex", justifyContent: "center", alignItems: "center",
          zIndex: 2000,
          padding: '20px'
        }}>
          <div className="form-card" style={{ width: "100%", maxWidth: "500px", margin: 0, borderRadius: '24px' }}>
            <h2 style={{ textAlign: "center", marginBottom: "25px", color: "var(--text-h)" }}>Complete Your Order</h2>
            <div style={{ marginBottom: "25px", maxHeight: "300px", overflowY: "auto", paddingRight: '5px' }}>
              {cartItems.map(item => (
                <div key={item._id} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", padding: "12px 0" }}>
                  <span style={{ color: 'var(--text)' }}>{item.name} <span style={{ fontSize: '0.8rem' }}>(x{item.quan || 1})</span></span>
                  <span style={{ fontWeight: '600' }}>₹{item.price * (item.quan || 1)}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.3rem", fontWeight: "800", marginTop: "10px", color: "var(--accent)" }}>
              <span>Grand Total</span>
              <span>₹{totalAmount}</span>
            </div>
            <div style={{ display: "flex", gap: "15px", marginTop: "35px" }}>
              <button 
                onClick={() => setShowBilling(false)}
                style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "1px solid var(--border)", background: "transparent", cursor: "pointer", fontWeight: '600' }}
              >
                Back
              </button>
              <button 
                onClick={confirmOrder}
                className="btn-primary-custom"
                style={{ flex: 2, margin: 0 }}
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCart;
