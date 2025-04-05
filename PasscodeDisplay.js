import React from 'react';
import { useParams } from 'react-router-dom';

const PasscodeDisplay = () => {
  const { token } = useParams();

  return (
    <div className="passcode-display">
      <h2>Packet Verified!</h2>
      <p>Passcode for token <strong>{token}</strong> is:</p>
      <h3>PASS-{token.slice(-5).toUpperCase()}</h3>
    </div>
  );
};

export default PasscodeDisplay;
