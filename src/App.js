// src/App.js

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import Medicare from './Medicare';
import Lifetrack from './Lifetrack';
import BInsight from './BInsight';
import RoomMatrix from './RoomMatrix';
import MedicationRemainder from './MedicationRemainder';
import Profile from './Profile';
import Settings from './Settings';
import backgroundImage from './alzheimer-care.png';
import './App.css';

// Import SettingsContext
import { SettingsProvider, useSettings } from './SettingsContext'; // ✅ Import Settings Context

// MainApp component with sidebar
function MainApp({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { settings } = useSettings(); // ✅ Get settings from context

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
      {/* Sidebar Toggle */}
      <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <a onClick={() => navigate('/profile')}>👤 Profile</a>
        <a onClick={() => navigate('/menu')}>📋 Menu</a>
        <a onClick={() => navigate('/settings')}>⚙️ Settings</a>
        <a onClick={onLogout}>🚪 Logout</a>
      </div>

      {/* Center Title */}
      <div className="center-title">
        <h1>
          {settings.language === 'Malayalam'
            ? 'ആൽസൈമർ പരിചരണം'
            : settings.language === 'Hindi'
            ? 'अल्जाइमर देखभाल'
            : 'ALZLUMACARE'}
        </h1>
      </div>
    </div>
  );
}

// Main App router and logic
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <SettingsProvider> {/* ✅ Wrap the app with the SettingsProvider */}
      <Router>
        <Routes>
          {!loggedIn ? (
            <Route path="*" element={<Login onLogin={() => setLoggedIn(true)} />} />
          ) : (
            <>
              <Route path="/" element={<MainApp onLogout={() => setLoggedIn(false)} />} />
              <Route path="/menu" element={<Dashboard />} />
              <Route path="/medicare" element={<Medicare />} />
              <Route path="/lifetrack" element={<Lifetrack />} />
              <Route path="/binsight" element={<BInsight />} />
              <Route path="/roommatrix" element={<RoomMatrix />} />
              <Route path="/medication" element={<MedicationRemainder />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </>
          )}
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;
