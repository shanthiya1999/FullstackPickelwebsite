import React from 'react';
import './professional.css';

function About() {
  return (
    <div className="page-container">
      <div className="form-card" style={{ maxWidth: '900px' }}>
        <h1 style={{ color: 'var(--accent)', marginBottom: '10px', fontSize: '2.5rem' }}>🥒 Our Story</h1>
        <p style={{ color: 'var(--text)', fontSize: '1.1rem', marginBottom: '40px' }}>Preserving heritage, one jar at a time.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px', color: 'var(--text-h)' }}>
              Welcome to <strong>Traditional Pickles</strong>, where we bring the authentic taste of home right to your doorstep. 
              Our journey started with a simple passion for preserving the rich, vibrant flavors of our grandmother's recipes.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px', color: 'var(--text-h)' }}>
              We use only the finest, hand-picked ingredients and age-old techniques to ensure every jar is packed with love and nostalgia. 
              From tangy mango to spicy garlic, our selection caters to every palate.
            </p>
          </div>
          
          <div style={{ backgroundColor: 'var(--accent-bg)', padding: '30px', borderRadius: '20px', border: '1px solid var(--accent-border)' }}>
            <h3 style={{ marginTop: '0', marginBottom: '20px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              ✨ Our Quality Promise
            </h3>
            <ul style={{ fontSize: '1.05rem', lineHeight: '2', paddingLeft: '0', listStyle: 'none' }}>
              <li>🌿 100% Natural Ingredients</li>
              <li>🚫 No Artificial Preservatives</li>
              <li>📜 Authentic Traditional Recipes</li>
              <li>🎨 Handcrafted with Care</li>
              <li>📦 Eco-friendly Packaging</li>
            </ul>
          </div>
        </div>
        
        <div style={{ marginTop: '50px', textAlign: 'center', padding: '30px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontStyle: 'italic', color: 'var(--text)', fontSize: '1.2rem' }}>
            "Bringing the taste of tradition to the modern table."
          </p>
        </div>
      </div>
    </div>
  )
}

export default About;
