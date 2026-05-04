import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './professional.css';

function Account() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Fetch user's orders
      axios.get(`http://localhost:4000/orders/${parsedUser.email}`)
        .then(response => {
          setOrders(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching orders", err);
          setLoading(false);
        });
    } else {
      window.location.href = "/login";
    }
  }, []);

  if (!user) return null; // Will redirect in useEffect

  return (
    <div className="page-container">
      <div className="form-card" style={{ maxWidth: '800px' }}>
        <h1 style={{ color: 'var(--accent)', marginBottom: '20px' }}>My Account</h1>
        
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px', backgroundColor: 'var(--code-bg)', padding: '20px', borderRadius: '12px' }}>
            <h3 style={{ marginBottom: '15px' }}>Profile Details</h3>
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </div>

          <div style={{ flex: '2', minWidth: '300px' }}>
            <h3 style={{ marginBottom: '15px' }}>Order History</h3>
            {loading ? (
              <p>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p>You have not placed any orders yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {orders.map((order, index) => (
                  <div key={order._id || index} style={{ border: '1px solid var(--border)', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong>Order #{order._id?.substring(0, 8) || index + 1}</strong>
                      <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>₹{order.totalAmount}</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text)' }}>
                      {order.items.map((item, i) => (
                        <li key={i}>{item.name} (x{item.quan || 1})</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Account;
