import React, { useState, useEffect } from 'react';
import QRValidator from './QRValidator';

const ExamCentreDashboard = () => {
  const [isAtDestination, setIsAtDestination] = useState(false);
  const [received, setReceived] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });

  const destLat = parseFloat(localStorage.getItem('destination_lat'));
  const destLng = parseFloat(localStorage.getItem('destination_lng'));

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setLocation({ lat, lng });

        const threshold = 0.0005; // ~50 meters
        const matched =
          Math.abs(destLat - lat) < threshold &&
          Math.abs(destLng - lng) < threshold;

        setIsAtDestination(matched);
      },
      () => {
        setIsAtDestination(false);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [destLat, destLng]);

  const handleReceive = () => {
    if (isAtDestination) {
      setReceived(true);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🏫 Exam Centre Dashboard</h2>
      <QRValidator />

      <button
        onClick={handleReceive}
        disabled={!isAtDestination || received}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: received ? '#28a745' : '#aaa',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isAtDestination && !received ? 'pointer' : 'not-allowed'
        }}
      >
        📥 Mark as Received
      </button>

      {received && (
        <p style={{ color: 'green', fontWeight: 'bold', marginTop: '15px' }}>
          ✅ Packet Received
        </p>
      )}
    </div>
  );
};

export default ExamCentreDashboard;
