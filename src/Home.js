// App.js or HomePage.js
import React, { useState } from 'react';
import './App.css'; // create this for styles

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="main-container">
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        &#9776;
      </div>

      <div className="center-text">
        <h1>ALZLUMACARE</h1>
      </div>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li>👤 Profile</li>
          <li>📋 Menu</li>
          <li>⚙️ Settings</li>
          <li>🚪 Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
