import React from "react";
import "./Medicare.css";

const Medicare = () => {
  return (
    <div className="medicare-container">
      <h2>Medicare</h2>
      <img src="/path-to-your-image.png" alt="Medicare Interface" className="medicare-image" />
      <div className="reminders">
        <button>Medication Reminder</button>
        <button>Food Reminder</button>
        <button>Hydration Reminder</button>
        <button>Doctor Consultation Reminder</button>
      </div>
    </div>
  );
};

export default Medicare;
