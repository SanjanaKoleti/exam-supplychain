import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NetworkStatus from '../components/NetworkStatus';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [privateShare, setPrivateShare] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, networkError } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (networkError) {
      setError('Please fix network connection issues before logging in.');
      return;
    }

    try {
      setIsLoading(true);
      const result = await login(username, password, privateShare);
      
      if (result?.success) {
        switch (result.role) {
          case 'authority':
            navigate('/authority-dashboard');
            break;
          case 'transporter':
            navigate('/transporter-dashboard');
            break;
          case 'examCenter':
            navigate('/exam-center-dashboard');
            break;
          default:
            setError('Unknown role');
        }
      } else {
        setError('Invalid credentials or private share');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Login failed. Check your credentials and private share.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <NetworkStatus />
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <input value={privateShare} onChange={(e) => setPrivateShare(e.target.value)} placeholder="Private Share" required />
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate('/register')}
        >
          Register
        </span>
      </p>
    </form>
  );
}

export default LoginPage;
