import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AuthorityDashboard from './components/AuthorityDashboard';
import TransportDashboard from './components/TransportDashboard';
import ExamCenterDashboard from './components/ExamCenterDashboard';
import QRScanner from './components/QRScanner';
import PasscodeDisplay from './components/PasscodeDisplay';
import ExamPacketForm from './components/ExamPacketForm';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState({
    authority: false,
    transport: false,
    examCenter: false
  });
  
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Secure Exam System with Blockchain</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route 
              path="/login" 
              element={<Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} 
            />
            <Route 
              path="/authority" 
              element={isLoggedIn.authority ? <AuthorityDashboard currentUser={currentUser} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/transport" 
              element={isLoggedIn.transport ? <TransportDashboard currentUser={currentUser} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/examcenter" 
              element={isLoggedIn.examCenter ? <ExamCenterDashboard currentUser={currentUser} /> : <Navigate to="/login" />} 
            />
            <Route path="/scanner" element={<QRScanner />} />
            <Route path="/generate-form" element={<ExamPacketForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;