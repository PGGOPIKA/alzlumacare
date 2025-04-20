import React from 'react';
import { useSettings } from './SettingsContext'; // ✅ Correctly import the hook

function Settings() {
  const { settings, handleToggle, handleSelect, resetSettings } = useSettings(); // ✅ Use the settings from context

  // Function to clear/reset settings to their default values
  const handleClearSettings = () => {
    resetSettings();  // Call the reset function to clear settings
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* Clear Settings Button */}
      <button onClick={handleClearSettings} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', marginBottom: '20px' }}>
        Clear Settings
      </button>

      <section>
        <h3>🔔 Notification Preferences</h3>
        
        {/* Medication Alerts */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={settings.medicationAlerts}
              onChange={() => handleToggle('medicationAlerts')}
            />
            Medication Alerts
          </label>
        </div>

        {/* Doctor Appointment Reminders */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={settings.doctorReminders}
              onChange={() => handleToggle('doctorReminders')}
            />
            Doctor Appointment Reminders
          </label>
        </div>

        {/* Daily Summary Report */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={settings.dailySummary}
              onChange={() => handleToggle('dailySummary')}
            />
            Daily Summary Report
          </label>
        </div>

        {/* Health Emergency Alerts */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={settings.emergencyAlerts}
              onChange={() => handleToggle('emergencyAlerts')}
            />
            Health Emergency Alerts
          </label>
        </div>

        {/* Wandering Alerts */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={settings.wanderingAlerts}
              onChange={() => handleToggle('wanderingAlerts')}
            />
            Wandering Alerts
          </label>
        </div>

        {/* Hydration / Meal Reminders */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={settings.hydrationReminders}
              onChange={() => handleToggle('hydrationReminders')}
            />
            Hydration / Meal Reminders
          </label>
        </div>
      </section>

      {/* Alert Tone and Reminder Time */}
      <section>
        <h3>🎵 Alert Settings</h3>
        
        {/* Alert Tone */}
        <label>
          Alert Tone:
          <select
            value={settings.alertTone}
            onChange={(e) => handleSelect('alertTone', e.target.value)}
          >
            <option>Default</option>
            <option>Chime</option>
            <option>Beep</option>
            <option>Voice Prompt</option>
          </select>
        </label>

        {/* Reminder Time */}
        <label>
          Reminder Time:
          <select
            value={settings.reminderTime}
            onChange={(e) => handleSelect('reminderTime', e.target.value)}
          >
            <option>5 minutes</option>
            <option>15 minutes</option>
            <option>30 minutes</option>
            <option>1 hour</option>
          </select>
        </label>
      </section>

      {/* Theme and Language Preferences */}
      <section>
        <h3>🎨 Accessibility</h3>
        
        {/* Theme */}
        <label>
          Theme:
          <select
            value={settings.theme}
            onChange={(e) => handleSelect('theme', e.target.value)}
          >
            <option>Default</option>
            <option>High Contrast</option>
            <option>Large Fonts</option>
          </select>
        </label>
      </section>

      {/* Language Preferences */}
      <section>
        <h3>🌐 Language</h3>
        
        {/* Language Selection */}
        <label>
          Select Language:
          <select
            value={settings.language}
            onChange={(e) => handleSelect('language', e.target.value)}
          >
            <option>English</option>
            <option>Malayalam</option>
            <option>Hindi</option>
          </select>
        </label>
      </section>
    </div>
  );
}

export default Settings;
