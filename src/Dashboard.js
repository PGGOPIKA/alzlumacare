import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from './SettingsContext'; // Assuming this is the context for accessing settings

const Dashboard = () => {
  const { settings } = useSettings(); // Accessing the settings context

  return (
    <div className="dashboard" style={{ 
      backgroundImage: `url('./alzheimer-care.png')`, 
      backgroundSize: 'cover', 
      minHeight: '100vh',
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      color: 'black',
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 'bold',
        textAlign: 'center',
      }}>
        {settings.language === 'Malayalam'
          ? 'ആൽസൈമർ പരിചരണം'
          : settings.language === 'Hindi'
          ? 'अल्जाइमर देखभाल'
          : 'ALZLUMACARE'}
      </h1>
    </div>
  );
};

export default Dashboard;
