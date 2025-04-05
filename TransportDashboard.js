import React, { useState, useEffect } from 'react';
import QRValidator from './QRValidator';

const TransportDashboard = () => {
  const [delivered, setDelivered] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState('');
  const [isAtDestination, setIsAtDestination] = useState(false);

  // Destination coordinates from localStorage
  const destLat = parseFloat(localStorage.getItem('destination_lat'));
  const destLng = parseFloat(localStorage.getItem('destination_lng'));

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setLocation({ lat, lng });

        const threshold = 0.0005; // ~50m
        const matched =
          Math.abs(destLat - lat) < threshold &&
          Math.abs(destLng - lng) < threshold;

        setIsAtDestination(matched);
      },
      () => setError('Unable to retrieve your location.'),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [destLat, destLng]);

  const handleDeliver = () => {
    if (!isAtDestination) {
      setError('❌ You are not at the destination location.');
      return;
    }

    setDelivered(true);
    setError('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🚚 Transport Dashboard</h2>
      <QRValidator />

      <button
        onClick={handleDeliver}
        disabled={!isAtDestination || delivered}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: isAtDestination && !delivered ? '#007bff' : '#999',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isAtDestination && !delivered ? 'pointer' : 'not-allowed'
        }}
      >
        ✅ Mark as Delivered
      </button>

      {delivered && (
        <p style={{ color: 'green', fontWeight: 'bold', marginTop: '15px' }}>
          📦 Delivered Successfully
        </p>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TransportDashboard;
