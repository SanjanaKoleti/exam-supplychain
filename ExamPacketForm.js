import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const ExamPacketForm = () => {
  const [qrData, setQrData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      packet_id: form.packet_id.value,
      created_at: form.created_at.value,
      print_center: form.print_center.value,
      batch_no: form.batch_no.value,
      destination_center: form.destination_center.value,
      destination_location: form.destination_location.value,
      destination_reach_time: form.destination_reach_time.value,
      access_password: form.access_password.value
    };

    setQrData(JSON.stringify(data));
  };

  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
    const link = document.createElement('a');
    link.download = `exam_packet_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div style={{
      padding: '30px',
      maxWidth: '650px',
      margin: 'auto',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center' }}>📝 Exam Packet QR Code Generator</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>
          Packet ID:
          <input type="text" name="packet_id" placeholder="E.g. PACK123" required />
        </label>

        <label>
          Created At:
          <input type="datetime-local" name="created_at" required />
        </label>

        <label>
          Print Center:
          <input type="text" name="print_center" placeholder="E.g. Chennai Print Facility" required />
        </label>

        <label>
          Batch No:
          <input type="text" name="batch_no" placeholder="E.g. BATCH-07" required />
        </label>

        <label>
          Destination Center:
          <input type="text" name="destination_center" placeholder="E.g. Delhi Exam Hall" required />
        </label>

        <label>
          Destination Location (optional format):
          <input
            type="text"
            name="destination_location"
            placeholder="E.g. 28.6139,77.2090 or just 'Main Campus'"
            required
          />
        </label>

        <label>
          Expected Reach Time:
          <input type="datetime-local" name="destination_reach_time" required />
        </label>

        <label>
          Access Password:
          <input type="password" name="access_password" required minLength={6} />
        </label>

        <button type="submit" style={{ padding: '10px 20px', fontWeight: 'bold' }}>
          🔐 Generate QR Code
        </button>
      </form>

      {qrData && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <QRCodeCanvas value={qrData} size={256} />
          <div style={{ marginTop: '20px' }}>
            <button onClick={downloadQRCode}>💾 Download QR Code</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPacketForm;
