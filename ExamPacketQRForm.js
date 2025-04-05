import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';


const ExamPacketQRForm = () => {
  const [formData, setFormData] = useState({
    packet_id: '',
    created_at: '',
    print_center: '',
    batch_no: '',
    destination_center: '',
    destination_location: '',
    destination_reach_time: '',
    blockchain_hash: '',
    access_password: ''
  });

  const [qrData, setQrData] = useState('');
  const qrRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonString = JSON.stringify(formData);
    setQrData(jsonString);
  };

  const handleDownload = () => {
    const svg = qrRef.current.querySelector('svg');
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svg)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `exam_packet_${formData.packet_id}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="exam-packet-form">
      <h2>📝 Exam Packet QR Code Generator</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Packet ID" name="packet_id" required onChange={handleChange} />
        <input type="datetime-local" name="created_at" required onChange={handleChange} />
        <input type="text" placeholder="Print Center" name="print_center" required onChange={handleChange} />
        <input type="text" placeholder="Batch No" name="batch_no" required onChange={handleChange} />
        <input type="text" placeholder="Destination Center" name="destination_center" required onChange={handleChange} />
        <input type="text" placeholder="Destination Location (lat,lng)" name="destination_location" required onChange={handleChange} />
        <input type="datetime-local" name="destination_reach_time" required onChange={handleChange} />
        <input type="text" placeholder="Blockchain Txn Hash" name="blockchain_hash" required onChange={handleChange} />
        <input type="password" placeholder="Access Password" name="access_password" required onChange={handleChange} />
        <button type="submit">🔐 Generate QR Code</button>
      </form>

      {qrData && (
        <div id="qrcode" ref={qrRef} style={{ textAlign: 'center', marginTop: '30px' }}>
          <QRCodeCanvas value={qrData} size={256} />

          <div style={{ marginTop: '20px' }}>
            <button onClick={handleDownload}>💾 Download QR Code</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPacketQRForm;
