import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from './SettingsContext'; // Assuming this is the custom context for settings
import backgroundImage from './alzheimer-care.png'; // Assuming the background image is imported
import './App.css';

function MainApp({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { settings } = useSettings();

  // Handle closing the sidebar when user clicks outside or on a navigation button
  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false); // Close sidebar after navigation
  };

  return (
    <div
      className={`app ${settings.theme === 'High Contrast' ? 'high-contrast' : ''} ${settings.theme === 'Large Fonts' ? 'large-fonts' : ''}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        color: '#fff',
      }}
    >
      <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button onClick={() => handleNavigation('/profile')}>👤 Profile</button>
        <button onClick={() => handleNavigation('/menu')}>📋 Menu</button>
        <button onClick={() => handleNavigation('/settings')}>⚙️ Settings</button>
        <button onClick={onLogout}>🚪 Logout</button>
      </div>

      <div className="center-title">
        <h1>
          {settings.language === 'Malayalam'
            ? 'ആൽസൈമർ പരിചരണം'
            : settings.language === 'Hindi'
            ? 'अल्जाइमर देखभाल'
            : 'ALZLUMACARE'}
        </h1>
      </div>

      {/* Render the actual page content */}
      <div style={{ padding: '1rem' }}>
        {/* Content will be rendered here */}
      </div>
    </div>
  );
}

export default MainApp;
