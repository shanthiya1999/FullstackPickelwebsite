import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './professional.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'Pickles',
    weight: '500g'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (activeTab === 'pending' || activeTab === 'history') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = () => {
    setLoading(true);
    axios.get('http://localhost:4000/allorders')
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleDispatch = (orderId) => {
    console.log("Dispatching order:", orderId);
    axios.patch(`http://localhost:4000/updateorderstatus/${orderId}`, { status: 'Dispatched' })
      .then((res) => {
        console.log("Response from server:", res.data);
        setMessage('Order marked as Dispatched!');
        fetchOrders();
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(err => {
        console.error("Error dispatching order:", err);
      });
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'pending') return order.status !== 'Dispatched';
    if (activeTab === 'history') return order.status === 'Dispatched';
    return true;
  });

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:4000/addproduct', product)
      .then(() => {
        setMessage('Product added successfully!');
        setProduct({
          name: '',
          price: '',
          description: '',
          image: '',
          category: 'Pickles',
          weight: '500g'
        });
        setLoading(false);
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(err => {
        console.error(err);
        setMessage('Error adding product');
        setLoading(false);
        setTimeout(() => setMessage(''), 3000);
      });
  };

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '30px', color: 'var(--text-h)' }}>Admin Dashboard</h1>
      
      <div className="admin-tabs">
        <div 
          className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Add Product
        </div>
        <div 
          className={`admin-tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Orders
        </div>
        <div 
          className={`admin-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Order History
        </div>
      </div>

      {activeTab === 'products' ? (
        <div className="form-card" style={{ maxWidth: '600px', margin: '0' }}>
          <h2 style={{ marginBottom: '25px' }}>Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input 
                type="text" 
                name="name"
                className="form-input" 
                value={product.name}
                onChange={handleProductChange}
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Price (₹)</label>
              <input 
                type="number" 
                name="price"
                className="form-input" 
                value={product.price}
                onChange={handleProductChange}
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                name="category"
                className="form-input"
                value={product.category}
                onChange={handleProductChange}
              >
                <option value="Pickles">Pickles</option>
                <option value="Powders">Powders</option>
                <option value="Sweets">Sweets</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea 
                name="description"
                className="form-input" 
                rows="3"
                value={product.description}
                onChange={handleProductChange}
                required 
              ></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input 
                type="text" 
                name="image"
                className="form-input" 
                placeholder="https://example.com/image.jpg"
                value={product.image}
                onChange={handleProductChange}
                required 
              />
            </div>
            <button type="submit" className="btn-primary-custom" disabled={loading}>
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </div>
      ) : (
        <div className="admin-table-container">
          {loading ? (
            <p style={{ padding: '40px', textAlign: 'center' }}>Loading orders...</p>
          ) : filteredOrders.length === 0 ? (
            <p style={{ padding: '40px', textAlign: 'center' }}>No orders found.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Action/Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text)' }}>
                      #{order._id.substring(order._id.length - 6)}
                    </td>
                    <td>
                      <div style={{ fontWeight: '600' }}>{order.userName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text)' }}>{order.userEmail}</div>
                    </td>
                    <td>
                      <ul className="order-items-list">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} x {item.quan || 1}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ fontWeight: '700', color: 'var(--accent)' }}>
                      ₹{order.totalAmount || order.total}
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      {order.status === 'Dispatched' ? (
                        <span className="status-badge status-dispatched">Dispatched</span>
                      ) : (
                        <button 
                          className="dispatch-btn"
                          onClick={() => handleDispatch(order._id)}
                        >
                          Dispatch
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {message && (
        <div className="status-toast">
          {message}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
