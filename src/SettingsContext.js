import React, { createContext, useContext, useState } from 'react';

// Create the Settings Context
const SettingsContext = createContext();

// Default settings values
const defaultSettings = {
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
};

// Provider to wrap the application and provide the settings globally
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);  // Initialize with default values

  // Toggle setting value (checkbox-like behavior)
  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  // Handle dropdown/select values
  const handleSelect = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  // Reset settings to default values
  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, handleToggle, handleSelect, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use settings
export const useSettings = () => useContext(SettingsContext);
