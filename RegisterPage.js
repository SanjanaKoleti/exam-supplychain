// // // // // src/pages/RegisterPage.js
// // // // import React, { useState } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useAuth } from '../context/AuthContext';
// // // // import NetworkStatus from '../components/NetworkStatus';

// // // // function RegisterPage() {
// // // //   const [username, setUsername] = useState('');
// // // //   const [password, setPassword] = useState('');
// // // //   const [confirmPassword, setConfirmPassword] = useState('');
// // // //   const [role, setRole] = useState('');
// // // //   const [privateShare, setPrivateShare] = useState('');
// // // //   const [error, setError] = useState('');
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [isRegistered, setIsRegistered] = useState(false);

// // // //   const { register, networkError } = useAuth();
// // // //   const navigate = useNavigate();

// // // //   const isFormValid = username && password && confirmPassword && role && (password === confirmPassword);

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setError('');

// // // //     if (networkError) {
// // // //       return setError('Please fix network connection issues before registering.');
// // // //     }

// // // //     if (password !== confirmPassword) {
// // // //       return setError('Passwords do not match');
// // // //     }

// // // //     if (!role) {
// // // //       return setError('Please select a role');
// // // //     }

// // // //     setIsLoading(true);

// // // //     try {
// // // //       // In real use, generate privateShare securely
// // // //       const generatedPrivateShare = 'private-share-placeholder'; 
// // // //       await register(username, password, role, generatedPrivateShare);
// // // //       setIsRegistered(true);
// // // //       navigate('/login');
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       setError('Failed to register. Please try again.');
// // // //     }

// // // //     setIsLoading(false);
// // // //   };

// // // //   return (
// // // //     <div className="register-container">
// // // //       <NetworkStatus />
// // // //       <h2>Register</h2>
// // // //       <form onSubmit={handleSubmit} className="register-form">
// // // //         {error && <p className="error">{error}</p>}

// // // //         <input
// // // //           type="text"
// // // //           placeholder="Username"
// // // //           value={username}
// // // //           onChange={(e) => setUsername(e.target.value)}
// // // //           required
// // // //         />

// // // //         <input
// // // //           type="password"
// // // //           placeholder="Password"
// // // //           value={password}
// // // //           onChange={(e) => setPassword(e.target.value)}
// // // //           required
// // // //         />

// // // //         <input
// // // //           type="password"
// // // //           placeholder="Confirm Password"
// // // //           value={confirmPassword}
// // // //           onChange={(e) => setConfirmPassword(e.target.value)}
// // // //           required
// // // //         />

// // // //         <select value={role} onChange={(e) => setRole(e.target.value)} required>
// // // //           <option value="">Select a role</option>
// // // //           <option value="Authority">Authority</option>
// // // //           <option value="ExamCenter">Exam Center</option>
// // // //           <option value="Transporter">Transporter</option>
// // // //         </select>

// // // //         <button type="submit" disabled={!isFormValid || isLoading}>
// // // //           {isLoading ? 'Registering...' : 'Register'}
// // // //         </button>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default RegisterPage;
// // // // src/pages/RegisterPage.js

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import NetworkStatus from '../components/NetworkStatus';

// function RegisterPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [error, setError] = useState('');
//   const [privateShare, setPrivateShare] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const { register, networkError } = useAuth();
//   const navigate = useNavigate();

//   // 🔐 Generate random 32-character hex private share
//   const generatePrivateShare = () => {
//     const array = new Uint8Array(16);
//     window.crypto.getRandomValues(array);
//     return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (networkError) {
//       setError('Please fix network connection issues before registering.');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (!role) {
//       setError('Please select a role');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const generatedShare = generatePrivateShare(); // ✅ Generate share
//       const passwordHash = window.web3.utils.keccak256(password);

//       const success = await register(username, passwordHash, role, generatedShare);

//       if (success) {
//         setPrivateShare(generatedShare);
//         setIsRegistered(true);
//       } else {
//         setError('Failed to register. Please try again.');
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//       setError('An unexpected error occurred.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="register-page">
//       <NetworkStatus />
//       <h2>Register</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {isRegistered ? (
//         <div>
//           <p>✅ Registered successfully!</p>
//           <p><strong>Save this private share securely:</strong></p>
//           <p style={{ wordBreak: 'break-word', color: 'green' }}>{privateShare}</p>
//           <button onClick={() => navigate('/login')}>Go to Login</button>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Username</label>
//             <input value={username} onChange={(e) => setUsername(e.target.value)} required />
//           </div>
//           <div>
//             <label>Password</label>
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </div>
//           <div>
//             <label>Confirm Password</label>
//             <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//           </div>
//           <div>
//             <label>Role</label>
//             <select value={role} onChange={(e) => setRole(e.target.value)} required>
//               <option value="">Select a role</option>
//               <option value="Authority">Authority</option>
//               <option value="Transporter">Transporter</option>
//               <option value="ExamCenter">Exam Center</option>
//             </select>
//           </div>
//           <button type="submit" disabled={isLoading || networkError}>
//             {isLoading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default RegisterPage;
// // // src/pages/RegisterPage.js

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import NetworkStatus from '../components/NetworkStatus';

// function RegisterPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [error, setError] = useState('');
//   const [privateShare, setPrivateShare] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const { register, networkError } = useAuth();
//   const navigate = useNavigate();

//   // 🔐 Generate random private share (32 hex characters)
//   const generatePrivateShare = () => {
//     const array = new Uint8Array(16);
//     window.crypto.getRandomValues(array);
//     return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsRegistered(false);

//     if (networkError) {
//       setError('Please fix network connection issues before registering.');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     if (!role) {
//       setError('Please select a role.');
//       return;
//     }

//     setIsLoading(true);
//     const generatedShare = generatePrivateShare();

//     try {
//       await register(username, password, role, generatedShare);
//       setPrivateShare(generatedShare);
//       setIsRegistered(true);
//       setTimeout(() => navigate('/login'), 3000);
//     } catch (err) {
//       console.error(err);
//       setError('Registration failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <NetworkStatus />
//       <form onSubmit={handleSubmit}>
//         <label>Username</label>
//         <input
//           type="text"
//           value={username}
//           required
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           value={password}
//           required
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <label>Confirm Password</label>
//         <input
//           type="password"
//           value={confirmPassword}
//           required
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />

//         <label>Role</label>
//         <select value={role} onChange={(e) => setRole(e.target.value)} required>
//           <option value="">Select a role</option>
//           <option value="Transporter">Transporter</option>
//           <option value="ExamCenter">Exam Center</option>
//           <option value="Authority">Authority</option>
//         </select>

//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Registering...' : 'Register'}
//         </button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {isRegistered && (
//         <div style={{ marginTop: '1em', color: 'green' }}>
//           <p>✅ Registered Successfully!</p>
//           <p><strong>Private Share (Save this securely!):</strong></p>
//           <code>{privateShare}</code>
//         </div>
//       )}
//     </div>
//   );
// }

// export default RegisterPage;
// // src/pages/RegisterPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NetworkStatus from '../components/NetworkStatus';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [privateShare, setPrivateShare] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, networkError } = useAuth();
  const navigate = useNavigate();

  const generatePrivateShare = () => {
    const array = new Uint8Array(16); // 128-bit
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (networkError) {
      return setError('Please fix network connection issues before registering.');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (!role) {
      return setError('Please select a role');
    }

    setIsLoading(true);

    try {
      const generatedShare = generatePrivateShare();
      setPrivateShare(generatedShare);

      await register(username, password, role, generatedShare);

      setIsRegistered(true); // ✅ Don't auto navigate — wait for user to copy
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <NetworkStatus />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isRegistered ? (
        <div>
          <h3>Registration Successful ✅</h3>
          <p><strong>Your Private Share:</strong></p>
          <textarea value={privateShare} readOnly rows={3} style={{ width: '100%' }} />
          <p style={{ color: 'red' }}>
            Please copy and save this private share securely. It won't be shown again!
          </p>
          <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select a role</option>
            <option value="Transporter">Transporter</option>
            <option value="Authority">Authority</option>
            <option value="ExamCenter">Exam Center</option>
          </select>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      )}
    </div>
  );
}

export default RegisterPage;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import NetworkStatus from '../components/NetworkStatus';

// function RegisterPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [privateShare, setPrivateShare] = useState('');
//   const [error, setError] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
  
//   const { register, networkError } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (networkError) {
//       setError('Please fix network connection issues before registering.');
//       return;
//     }
    
//     if (password !== confirmPassword) {
//       return setError('Passwords do not match');
//     }

//     if (!role) {
//       return setError('Please select a role');
//     }

//     try {
//       setIsLoading(true);
//       const result = await register(username, password, role);
//       setPrivateShare(result.privateShare);
//       setIsRegistered(true);
//     } catch (err) {
//       console.error('Registration Error:', err);
//       setError(err?.message || 'Registration failed. Try again.');
//     }
    
//      finally {
//       setIsLoading(false);
//     }
//   };

//   if (isRegistered) {
//     return (
//       <div className="text-center p-4">
//         <h2 className="text-lg font-bold">Registration Successful!</h2>
//         <p className="mt-2">Your private share (save it securely):</p>
//         <textarea value={privateShare} readOnly rows={4} className="w-full mt-2 p-2 border rounded"></textarea>
//         <button onClick={() => navigate('/login')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Back to Login</button>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
//       <NetworkStatus />
//       <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//       <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
//       <select value={role} onChange={(e) => setRole(e.target.value)} required>
//         <option value="">Select Role</option>
//         <option value="authority">Authority</option>
//         <option value="transporter">Transporter</option>
//         <option value="examCenter">Exam Center</option>
//       </select>
//       {error && <p className="text-red-600">{error}</p>}
//       <button type="submit" disabled={isLoading} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
//         {isLoading ? 'Registering...' : 'Register'}
//       </button>
//     </form>
//   );
// }

// export default RegisterPage;
