import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom destination icon (similar to red marker used in Google Maps style)
const destinationIcon = L.icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const PacketTracking = ({ data }) => {
  useEffect(() => {
    const map = L.map('map').setView([0, 0], 2); // default view

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);

    if (data.checkpoints.length > 0) {
      const bounds = [];

      data.checkpoints.forEach((checkpoint, index) => {
        const { location, timestamp, handler, isDestination } = checkpoint;

        const [lat, lng] = location.split(',').map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
          const marker = L.marker([lat, lng], {
            icon: index === data.checkpoints.length - 1 ? destinationIcon : undefined,
          }).addTo(map);

          marker.bindPopup(`
            <b>${index === data.checkpoints.length - 1 ? '🏁 Destination' : '📦 Checkpoint'}:</b><br/>
            Location: ${location}<br/>
            Time: ${new Date(timestamp).toLocaleString()}<br/>
            Handler: ${handler}
          `);

          bounds.push([lat, lng]);
        }
      });

      if (bounds.length) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }

    return () => map.remove(); // Cleanup map on component unmount
  }, [data]);

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>🚚 Packet Route Map</h3>
      <div id="map" style={{ height: '500px', width: '100%', borderRadius: '10px' }} />
    </div>
  );
};

export default PacketTracking;
