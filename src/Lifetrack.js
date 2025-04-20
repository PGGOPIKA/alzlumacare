import React, { useState, useEffect } from 'react';
import './LifeTrack.css'; // Make sure this file contains background styling
import LifeTrackimage from './assets/lifetrack.png'; // Import the image

const LifeTrack = () => {
  const [sensorData, setSensorData] = useState({
    gsr: 0,
    accelerometer: { x: 0, y: 0, z: 0 },
    gyroscope: { x: 0, y: 0, z: 0 },
    heartRate: 0,
    temperature: 0,
    spo2: 0,
  });

  // Simulating sensor data update
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData({
        gsr: (Math.random() * 100).toFixed(2),
        accelerometer: {
          x: (Math.random() * 10 - 5).toFixed(2),
          y: (Math.random() * 10 - 5).toFixed(2),
          z: (Math.random() * 10 - 5).toFixed(2),
        },
        gyroscope: {
          x: (Math.random() * 360).toFixed(2),
          y: (Math.random() * 360).toFixed(2),
          z: (Math.random() * 360).toFixed(2),
        },
        heartRate: Math.floor(Math.random() * 40 + 60),
        temperature: (Math.random() * 2 + 36).toFixed(1),
        spo2: Math.floor(Math.random() * 5 + 95),
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="life-track-container" style={{ backgroundImage: `url(${LifeTrackimage})` }}>
      <h1 className="life-track-title">LIFE TRACK</h1>

      <div className="sensor-line">
        <label>Heart Rate:</label> <strong>{sensorData.heartRate} bpm</strong>
      </div>

      <div className="sensor-line">
        <label>Temperature:</label> <strong>{sensorData.temperature} °C</strong>
      </div>

      <div className="sensor-line">
        <label>GSR:</label> <strong>{sensorData.gsr}</strong>
      </div>

      <div className="sensor-line">
        <label>SpO₂:</label> <strong>{sensorData.spo2} %</strong>
      </div>

      <div className="sensor-line">
        <label>Accelerometer (X, Y, Z):</label>{' '}
        <strong>
          {sensorData.accelerometer?.x ?? '...'}, {sensorData.accelerometer?.y ?? '...'}, {sensorData.accelerometer?.z ?? '...'}
        </strong>
      </div>

      <div className="sensor-line">
        <label>Gyroscope (X, Y, Z):</label>{' '}
        <strong>
          {sensorData.gyroscope?.x ?? '...'}, {sensorData.gyroscope?.y ?? '...'}, {sensorData.gyroscope?.z ?? '...'}
        </strong>
      </div>
    </div>
  );
};

export default LifeTrack;
