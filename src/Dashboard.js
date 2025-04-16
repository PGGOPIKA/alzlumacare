import React from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardImage from './dashboard.png'; // your provided image
import './Dashboard.css'; // add styling here

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div
      className="dashboard"
      style={{
        backgroundImage: `url(${dashboardImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>MENU</h1>
      <button className="menu-btn" onClick={() => navigate('/medicare')}>MEDICARE</button>
      <button className="menu-btn" onClick={() => navigate('/lifetrack')}>LIFETRACK</button>
      <button className="menu-btn" onClick={() => navigate('/binsight')}>B INSIGHT</button>
      <button className="menu-btn" onClick={() => navigate('/roommatrix')}>ROOM MATRIX</button>
    </div>
  );
}

export default Dashboard;
