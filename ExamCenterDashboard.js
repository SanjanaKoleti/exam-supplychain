import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ExamCenterDashboard() {
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
          <h1 className="text-2xl font-bold">Exam Center Dashboard</h1>
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
          <h2 className="text-xl font-bold mb-4">Exam Center Functions</h2>
          <p className="mb-4">As an exam center, you can manage examinations and candidate information.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Schedule Exams</h3>
              <p className="text-gray-700">Create and manage examination schedules</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Register Candidates</h3>
              <p className="text-gray-700">Add and manage candidate information</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Record Results</h3>
              <p className="text-gray-700">Enter and manage examination results</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Generate Reports</h3>
              <p className="text-gray-700">Create reports on examination outcomes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamCenterDashboard;