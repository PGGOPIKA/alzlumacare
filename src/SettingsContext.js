// src/SettingsContext.js

import React, { createContext, useContext, useState } from 'react';

// Create the Settings Context
const SettingsContext = createContext();

// Provider to wrap the application and provide the settings globally
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    medicationAlerts: true,
    doctorReminders: true,
    dailySummary: false,
    emergencyAlerts: true,
    wanderingAlerts: true,
    hydrationReminders: true,
    alertTone: 'Default',
    reminderTime: '15 minutes',
    theme: 'Default',
    language: 'English',
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSelect = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <SettingsContext.Provider value={{ settings, handleToggle, handleSelect }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use settings
export const useSettings = () => useContext(SettingsContext);
