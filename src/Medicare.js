import React, { useState } from 'react';
import medicareBg from './assets/medicare.png'; // adjust path if needed
import './Medicare.css';
import MedicationRemainder from './MedicationRemainder'; // Import the Medication Remainder component

function Medicare() {
  const [showMedicationRemainder, setShowMedicationRemainder] = useState(false);

  // Toggle the visibility of the Medication Remainder window
  const handleMedicationRemainderClick = () => {
    setShowMedicationRemainder(true); // Show Medication Reminder window
  };

  return (
    <div className="medicare-container">
      <div className="medicare-overlay">
        <h1 className="medicare-title">MEDICARE</h1>

        {/* Clock display (optional: can be animated if needed) */}
        <div className="clock-center" />

        {/* Reminder Buttons */}
        {!showMedicationRemainder && (
          <div className="reminder-buttons">
            <button onClick={handleMedicationRemainderClick}>MEDICATION REMAINDER</button>
            <button>FOOD AND HYDRATION REMAINDER</button>
            <button>DOCTOR CONSULTATION REMAINDER</button>
          </div>
        )}

        {/* Display Medication Remainder window when button is clicked */}
        {showMedicationRemainder && <MedicationRemainder />}
      </div>
    </div>
  );
}

export default Medicare;
