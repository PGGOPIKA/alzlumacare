// src/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // optional for styling

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      background: '#f7f7f7 url(background.jpg) no-repeat center center fixed',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <header style={{
        backgroundColor: 'rgba(74, 144, 226, 0.9)',
        color: 'white',
        padding: '20px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1>AlzLumaCare</h1>
        <p>Empowering Alzheimer’s Patient Care with Smart Technology</p>
      </header>

      <main style={{
        padding: '40px 20px',
        maxWidth: '800px',
        textAlign: 'center',
        width: '100%',
        flex: 1
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}>
          <h2>Welcome to AlzLumaCare</h2>
          <p>
            Our platform helps caregivers and families with real-time activity tracking,
            behavior analysis, room automation, and emergency alerts to support Alzheimer’s
            patients with comfort and safety.
          </p>
          <button
            onClick={() => navigate('/login')}
            style={{
              marginTop: '20px',
              background: '#4a90e2',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Login to Continue
          </button>
        </div>
      </main>

      <footer style={{
        background: 'rgba(74, 144, 226, 0.9)',
        color: 'white',
        padding: '15px',
        width: '100%',
        textAlign: 'center'
      }}>
        &copy; 2025 AlzLumaCare. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
