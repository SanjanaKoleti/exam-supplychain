import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackPacket } from '../services/blockchainService';

const AuthorityDashboard = ({ currentUser }) => {
  const [packetDetails, setPacketDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const goToQrForm = () => {
    navigate('/generate-form');
  };

  const fetchPacketDetails = async () => {
    setLoading(true);
    try {
      const details = await trackPacket(currentUser.id);
      setPacketDetails(details);
    } catch (err) {
      console.error('Failed to fetch packet status:', err);
      setPacketDetails(null);
    }
    setLoading(false);
  };

  return (
    <div className="dashboard-container" style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Authority Dashboard</h2>
      <p>Welcome, <strong>{currentUser?.name}</strong></p>

      {/* Buttons */}
      <div className="tab-buttons" style={{ marginBottom: '20px' }}>
        <button onClick={goToQrForm}>Generate Authority QR</button>
        <button onClick={fetchPacketDetails}>Track Packet Status</button>
      </div>

      {/* Show Packet Tracking Info */}
      {packetDetails && (
        <div className="packet-status" style={{ marginTop: '30px' }}>
          <h3>Packet Tracking Status</h3>
          <p><strong>Packet ID:</strong> {packetDetails.id}</p>
          <p><strong>Current Checkpoint:</strong> {packetDetails.currentCheckpoint}</p>
          <p><strong>Status:</strong> {packetDetails.status}</p>
          <p><strong>Last Updated:</strong> {new Date(packetDetails.updatedAt).toLocaleString()}</p>
        </div>
      )}

      {loading && <p>Loading packet status...</p>}
    </div>
  );
};

export default AuthorityDashboard;
