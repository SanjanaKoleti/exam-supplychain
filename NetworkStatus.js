// src/components/NetworkStatus.js
import React, { useEffect, useState } from 'react';

function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className={`mb-4 p-2 text-center ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      {isOnline ? 'You are online' : 'You are offline. Please check your connection.'}
    </div>
  );
}

export default NetworkStatus;
