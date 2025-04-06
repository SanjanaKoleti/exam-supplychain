import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthorityDashboard from './pages/AuthorityDashboard';
import TransporterDashboard from './pages/TransporterDashboard';
import ExamCenterDashboard from './pages/ExamCenterDashboard';

// Import CSS
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/authority-dashboard" element={<AuthorityDashboard />} />
            <Route path="/transporter-dashboard" element={<TransporterDashboard />} />
            <Route path="/exam-center-dashboard" element={<ExamCenterDashboard />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;