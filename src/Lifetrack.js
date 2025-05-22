import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './LifeTrack.css'; 
import LifeTrackimage from './assets/lifetrack.png'; 

const socket = io('http://localhost:3000'); // Change to your backend URL & port

const LifeTrack = () => {
  const [sensorData, setSensorData] = useState({
    heartRate: '--',
    spo2: '--',
    temperature: '--',
    gsr: '--',
    accelerometer: { x: '--', y: '--', z: '--' },
    gyroscope: { x: '--', y: '--', z: '--' },
  });

  useEffect(() => {
    // Listen for 'sensorData' event from backend
    socket.on('sensorData', (data) => {
      setSensorData({
        heartRate: data.heartRate ?? '--',
        spo2: data.spo2 ? data.spo2.toFixed(1) : '--',
        temperature: data.tempC ? data.tempC.toFixed(2) : '--',
        gsr: data.gsr ?? '--',
        accelerometer: {
          x: data.accelX ? data.accelX.toFixed(2) : '--',
          y: data.accelY ? data.accelY.toFixed(2) : '--',
          z: data.accelZ ? data.accelZ.toFixed(2) : '--',
        },
        gyroscope: {
          x: data.gyroX ? data.gyroX.toFixed(2) : '--',
          y: data.gyroY ? data.gyroY.toFixed(2) : '--',
          z: data.gyroZ ? data.gyroZ.toFixed(2) : '--',
        },
      });
    });

    // Clean up on unmount
    return () => {
      socket.off('sensorData');
    };
  }, []);

  return (
    <div className="life-track-container" style={{ backgroundImage: `url(${LifeTrackimage})` }}>
      <h1 className="life-track-title">LIFE TRACK</h1>

      <div className="sensor-line">
        <label>Heart Rate:</label> <strong>{sensorData.heartRate} BPM</strong>
      </div>

      <div className="sensor-line">
        <label>SpO₂:</label> <strong>{sensorData.spo2} %</strong>
      </div>

      <div className="sensor-line">
        <label>Body Temp:</label> <strong>{sensorData.temperature} °C</strong>
      </div>

      <div className="sensor-line">
        <label>GSR:</label> <strong>{sensorData.gsr}</strong>
      </div>

      <div className="sensor-line">
        <label>Accel X:</label> <strong>{sensorData.accelerometer.x}</strong>
      </div>
      <div className="sensor-line">
        <label>Accel Y:</label> <strong>{sensorData.accelerometer.y}</strong>
      </div>
      <div className="sensor-line">
        <label>Accel Z:</label> <strong>{sensorData.accelerometer.z}</strong>
      </div>

      <div className="sensor-line">
        <label>Gyro X:</label> <strong>{sensorData.gyroscope.x}</strong>
      </div>
      <div className="sensor-line">
        <label>Gyro Y:</label> <strong>{sensorData.gyroscope.y}</strong>
      </div>
      <div className="sensor-line">
        <label>Gyro Z:</label> <strong>{sensorData.gyroscope.z}</strong>
      </div>
    </div>
  );
};

export default LifeTrack;
