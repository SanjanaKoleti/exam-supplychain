import React, { useState } from "react";
import jsQR from "jsqr";
import LiveLocationTracker from "./LiveLocationTracker";

const QRValidator = () => {
  const [showPasscode, setShowPasscode] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [passcode, setPasscode] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          try {
            const parsed = JSON.parse(code.data);
            const { lat, lng } = parsed;

            if (lat && lng) {
              // Save destination
              localStorage.setItem("destination_lat", lat);
              localStorage.setItem("destination_lng", lng);

              // Generate a simple passcode (e.g., based on lat/lng or timestamp)
              const code = `PASS-${Math.floor(Math.random() * 9000 + 1000)}`;

              setPasscode(code);
              setShowPasscode(true);
              setShowTracking(false);
              return;
            }

            // If lat/lng missing
            throw new Error("Missing lat/lng");
          } catch (err) {
            alert("❌ Invalid QR code format. Fallback to tracking.");
            setShowPasscode(false);
            setShowTracking(true); // fallback to tracking
          }
        } else {
          alert("❌ No QR code detected. Fallback to tracking.");
          setShowPasscode(false);
          setShowTracking(true); // fallback to tracking
        }
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h3>📷 Scan QR Code</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {showPasscode && (
        <div style={{ marginTop: "1rem", fontSize: "1.2rem", color: "green" }}>
          ✅ QR Validated! <br />
          Your Passcode: <strong>{passcode}</strong>
        </div>
      )}

      {showTracking && (
        <div style={{ marginTop: "1rem" }}>
          <LiveLocationTracker />
        </div>
      )}
    </div>
  );
};

export default QRValidator;
