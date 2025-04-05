import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { verifyQrOnBlockchain } from '../services/blockchainService';

const QRScanner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
      rememberLastUsedCamera: true,
    });

    const onScanSuccess = async (decodedText) => {
      try {
        scanner.clear();
        
        // Parse the QR content to extract token
        const url = new URL(decodedText);
        const type = url.searchParams.get('type');
        const token = url.searchParams.get('token');
        
        if (!type || !token) {
          throw new Error('Invalid QR code format');
        }

        // Verify on blockchain
        const isValid = await verifyQrOnBlockchain(token, type);
        
        if (isValid) {
          // Navigate to passcode display
          navigate(`/passcode/${token}`);
        } else {
          alert('Invalid or expired QR code!');
          // Restart scanner
          scanner.render(onScanSuccess, onScanFailure);
        }
      } catch (error) {
        console.error('Scan error:', error);
        
        // Handle URL parsing errors (non-URL QR codes)
        if (error instanceof TypeError) {
          alert('This QR code is not recognized by the system.');
        } else {
          alert(`Error: ${error.message}`);
        }
        
        // Restart scanner
        scanner.render(onScanSuccess, onScanFailure);
      }
    };

    const onScanFailure = (error) => {
      // Silently handle scan failures
      console.warn(`QR scan error: ${error}`);
    };

    scanner.render(onScanSuccess, onScanFailure);

    // Cleanup on component unmount
    return () => {
      scanner.clear().catch(error => {
        console.error('Failed to clear scanner:', error);
      });
    };
  }, [navigate]);

  return (
    <div className="scanner-container">
      <h2>Verification QR Scanner</h2>
      <p className="scanner-description">
        Scan authority, transport, or exam center QR codes for verification
      </p>
      
      <div id="qr-reader" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}></div>
      
      <div className="scanner-instructions">
        <h3>How to scan:</h3>
        <ol>
          <li>Position the QR code within the frame</li>
          <li>Hold steady until scanned</li>
          <li>View the verification passcode</li>
        </ol>
      </div>
    </div>
  );
};

export default QRScanner;