import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function TransporterDashboard() {
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
          <h1 className="text-2xl font-bold">Transporter Dashboard</h1>
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
          <h2 className="text-xl font-bold mb-4">Transporter Functions</h2>
          <p className="mb-4">As a transporter, you can manage transportation logistics and delivery.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Manage Routes</h3>
              <p className="text-gray-700">Create and manage transportation routes</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Track Deliveries</h3>
              <p className="text-gray-700">Monitor delivery status and locations</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Schedule Pickups</h3>
              <p className="text-gray-700">Schedule and manage pickup operations</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">View Reports</h3>
              <p className="text-gray-700">Access transportation analytics and reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransporterDashboard;
