import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPacketDetails } from '../services/blockchainService';

const PacketDetails = () => {
  const { packetId } = useParams();
  const [packetData, setPacketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPacketDetails(packetId);
      setPacketData(data);
      setLoading(false);
    };
    fetchData();
  }, [packetId]);

  if (loading) return <div>Loading packet details...</div>;

  return (
    <div className="packet-details">
      <h2>Exam Packet Details</h2>
      <div className="packet-info">
        <p><strong>Packet ID:</strong> {packetData.id}</p>
        <p><strong>Contents:</strong> {packetData.contents.join(', ')}</p>
        <p><strong>Status:</strong> {packetData.status}</p>
        <p><strong>Assigned To:</strong> {packetData.assignedTo}</p>
      </div>
      
      <div className="packet-actions">
        <button onClick={() => logReceipt(packetData.id)}>
          Confirm Receipt
        </button>
      </div>
    </div>
  );
};

export default PacketDetails;