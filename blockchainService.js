// blockchainService.js
export const registerQrOnBlockchain = async (type, userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tokenId = `${type}_${userId}_${Date.now()}`;
        console.log(`Registered token ${tokenId} on blockchain`);
        resolve(tokenId);
      }, 500);
    });
  };
  
  export const verifyQrOnBlockchain = async (tokenId, type) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = tokenId && tokenId.startsWith(type);
        resolve(isValid);
      }, 700);
    });
  };
  
  export const generatePasscode = async (tokenId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const passcode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`Generated passcode ${passcode} for token ${tokenId}`);
        resolve(passcode);
      }, 300);
    });
  };
  
  // Packet-specific functions
  export const generateExamPacketQR = async (authorityId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const packetId = `packet_${authorityId}_${Date.now()}`;
        const qrValue = `exam-packet:${packetId}`;
        console.log(`Generated exam packet QR for ${packetId}`);
        resolve({ qrValue, packetId });
      }, 800);
    });
  };
  
  export const trackPacket = async (userId) => {
    // Fetch the latest packet status for authority user
    // This is a mocked response – replace with your blockchain call
    return {
      id: 'PKT123456',
      currentCheckpoint: 'Transport Office',
      status: 'In Transit',
      updatedAt: Date.now(),
    };
  };
  
  
  export const logPacketCheckpoint = async (packetId, location, status, verifiedBy) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Logged checkpoint for ${packetId} at ${location}`);
        resolve(true);
      }, 500);
    });
  };