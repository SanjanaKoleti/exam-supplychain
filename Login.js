import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, verifyCredentials } from '../services/authService';

const Login = ({ setIsLoggedIn, setCurrentUser }) => {
  const [userType, setUserType] = useState('authority');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // In real application, this would connect to blockchain for verification
      const user = await verifyCredentials(username, password, userType);
      
      if (user) {
        setCurrentUser(user);
        
        // Update logged in state
        const loginState = { authority: false, transport: false, examCenter: false };
        loginState[userType] = true;
        setIsLoggedIn(loginState);
        
        // Redirect to appropriate dashboard
        switch(userType) {
          case 'authority':
            navigate('/authority');
            break;
          case 'transport':
            navigate('/transport');
            break;
          case 'examCenter':
            navigate('/examcenter');
            break;
          default:
            navigate('/login');
        }
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login Portal</h2>
      
      <div className="user-type-selector">
        <button 
          className={userType === 'authority' ? 'active' : ''} 
          onClick={() => setUserType('authority')}
        >
          Authority
        </button>
        <button 
          className={userType === 'transport' ? 'active' : ''} 
          onClick={() => setUserType('transport')}
        >
          Transport
        </button>
        <button 
          className={userType === 'examCenter' ? 'active' : ''} 
          onClick={() => setUserType('examCenter')}
        >
          Exam Center
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="login-button">
          Login as {userType === 'examCenter' ? 'Exam Center' : userType.charAt(0).toUpperCase() + userType.slice(1)}
        </button>
      </form>
    </div>
  );
};

export default Login;