import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './RoomMatrix.css';
import roomBg from './assets/room_matrix.png';

const socket = io('http://192.168.109.44:3000'); // Replace with your backend IP and port

function RoomMatrix() {
  const [roomData, setRoomData] = useState({
    temperature: '--',
    pressure: '--',
    motion: false,
    airQuality: '--',
    lighting: '--',
  });

  useEffect(() => {
    socket.on('sensor-data', (data) => {
      setRoomData({
        temperature: data.tempC !== undefined ? data.tempC.toFixed(1) : '--',
        pressure: data.pressure !== undefined ? data.pressure.toFixed(1) : '--',
        motion: data.pir === 1,
        airQuality: data.gas !== undefined ? data.gas : '--',
        lighting: data.lux !== undefined ? data.lux : '--',
      });
    });

    return () => {
      socket.off('sensor-data');
    };
  }, []);

  return (
    <div
      className="room-matrix-container"
      style={{
        backgroundImage: `url(${roomBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '2rem',
        color: '#fff',
      }}
    >
      <h2>Real-Time Room Monitoring</h2>
      <div className="room-matrix">
        <div className="room-matrix-item">
          <h3>Room Temp:</h3>
          <p>{roomData.temperature} °C</p>
        </div>
        <div className="room-matrix-item">
          <h3>Room Pressure (hPa):</h3>
          <p>{roomData.pressure}</p>
        </div>
        <div className="room-matrix-item">
          <h3>Motion (PIR):</h3>
          <p>{roomData.motion ? 'Detected' : 'Not Detected'}</p>
        </div>
        <div className="room-matrix-item">
          <h3>Air Quality:</h3>
          <p>{roomData.airQuality} AQI</p>
        </div>
        <div className="room-matrix-item">
          <h3>Lighting (Lux):</h3>
          <p>{roomData.lighting}</p>
        </div>
      </div>
    </div>
  );
}

export default RoomMatrix;
