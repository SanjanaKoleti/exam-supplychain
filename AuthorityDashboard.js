import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AuthorityDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Authority Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-blue-100 p-4 rounded mb-6">
          <p><span className="font-bold">Welcome:</span> {currentUser?.username}</p>
          <p><span className="font-bold">Account:</span> {currentUser?.address}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Authority Functions</h2>
          <p className="mb-4">As an authority, you can manage and oversee transportation and examination processes.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Issue Certificates</h3>
              <p className="text-gray-700">Issue certificates to successful candidates</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Verify Documents</h3>
              <p className="text-gray-700">Verify official documents in the system</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Manage Users</h3>
              <p className="text-gray-700">Oversee user management and permissions</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">System Analytics</h3>
              <p className="text-gray-700">View system usage and performance metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorityDashboard;
