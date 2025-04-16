import React, { useEffect, useState } from 'react';
import './RoomMatrix.css';
import roomBg from './assets/room_matrix.png'; // ✅ Correct image import

function RoomMatrix() {
  const [roomData, setRoomData] = useState({
    temperature: 0,
    pressure: 0,
    motion: false,
    airQuality: 0,
    lighting: 0,
  });

  // Simulating data fetch every 10 seconds
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const res = await fetch('/api/room-data'); // Replace with your real API
        const data = await res.json();
        setRoomData(data);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRoomData();
    const interval = setInterval(fetchRoomData, 10000);

    return () => clearInterval(interval);
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
          <h3>Temperature</h3>
          <p>{roomData.temperature} °C</p>
        </div>
        <div className="room-matrix-item">
          <h3>Pressure</h3>
          <p>{roomData.pressure} hPa</p>
        </div>
        <div className="room-matrix-item">
          <h3>Motion</h3>
          <p>{roomData.motion ? 'Detected' : 'Not Detected'}</p>
        </div>
        <div className="room-matrix-item">
          <h3>Air Quality</h3>
          <p>{roomData.airQuality} AQI</p>
        </div>
        <div className="room-matrix-item">
          <h3>Lighting</h3>
          <p>{roomData.lighting} %</p>
        </div>
      </div>
    </div>
  );
}

export default RoomMatrix;
