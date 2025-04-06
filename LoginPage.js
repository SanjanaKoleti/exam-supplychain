// // // import React, { useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { useAuth } from '../context/AuthContext';
// // // import NetworkStatus from '../components/NetworkStatus';

// // // function LoginPage() {
// // //   const [username, setUsername] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [privateShare, setPrivateShare] = useState('');
// // //   const [error, setError] = useState('');
// // //   const [isLoading, setIsLoading] = useState(false);
  
// // //   const { login, networkError } = useAuth();
// // //   const navigate = useNavigate();
  
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
    
// // //     if (networkError) {
// // //       setError('Please fix network connection issues before logging in.');
// // //       return;
// // //     }
    
// // //     setError('');
// // //     setIsLoading(true);
    
// // //     try {
// // //       const result = await login(username, password, privateShare);
// // //       console.log('Login result:', result);

// // //       if (result.success) {
// // //         // Redirect based on user role
        
// // // switch (result.role) {
// // //     case 'authority':
// // //       navigate('/authority-dashboard');
// // //       break;
// // //     case 'transporter':
// // //       navigate('/transporter-dashboard');
// // //       break;
// // //     case 'examCenter':
// // //       navigate('/exam-center-dashboard');
// // //       break;
// // //     default:
// // //       navigate('/login');
// // //   }
// // //       } else {
// // //         setError(result.message || 'Login failed');
// // //       }
// // //     } catch (error) {
// // //         console.error("Login Error:", error);
// // //         setError(error?.message || 'Failed to login. Please check your credentials and blockchain connection.');
// // //       }
    
// // //     setIsLoading(false);
// // //   };
  
// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// // //       <div className="bg-white p-8 rounded-lg shadow-md w-96">
// // //         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
// // //         {/* Display network status */}
// // //         <NetworkStatus />
        
// // //         {/* Display error message */}
// // //         {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        
// // //         <form onSubmit={handleSubmit}>
// // //           <div className="mb-4">
// // //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
// // //               Username
// // //             </label>
// // //             <input
// // //               id="username"
// // //               type="text"
// // //               className="w-full px-3 py-2 border rounded-lg"
// // //               value={username}
// // //               onChange={(e) => setUsername(e.target.value)}
// // //               required
// // //             />
// // //           </div>
          
// // //           <div className="mb-4">
// // //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
// // //               Password
// // //             </label>
// // //             <input
// // //               id="password"
// // //               type="password"
// // //               className="w-full px-3 py-2 border rounded-lg"
// // //               value={password}
// // //               onChange={(e) => setPassword(e.target.value)}
// // //               required
// // //             />
// // //           </div>
          
// // //           <div className="mb-6">
// // //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="privateShare">
// // //               Private Share
// // //             </label>
// // //             <input
// // //               id="privateShare"
// // //               type="text"
// // //               className="w-full px-3 py-2 border rounded-lg"
// // //               value={privateShare}
// // //               onChange={(e) => setPrivateShare(e.target.value)}
// // //               required
// // //             />
// // //             <p className="text-sm text-gray-500 mt-1">This is the private share provided during registration</p>
// // //           </div>
          
// // //           <button
// // //             type="submit"
// // //             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
// // //             disabled={isLoading || networkError}
// // //           >
// // //             {isLoading ? 'Logging in...' : 'Login'}
// // //           </button>
// // //         </form>
        
// // //         <div className="mt-4 text-center">
// // //           <p>Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-700">Register</a></p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default LoginPage;
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
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import NetworkStatus from '../components/NetworkStatus';

// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [privateShare, setPrivateShare] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const { login, networkError } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (networkError) {
//       setError('Please fix network connection issues before logging in.');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const result = await login(username, password, privateShare);
//       console.log('Login result:', result);

//       if (result?.success) {
//         switch (result.role) {
//           case 'authority':
//             navigate('/authority-dashboard');
//             break;
//           case 'transporter':
//             navigate('/transporter-dashboard');
//             break;
//           case 'examCenter':
//             navigate('/exam-center-dashboard');
//             break;
//           default:
//             setError('Unknown role');
//         }
//       } else {
//         setError('Invalid credentials or private share');
//       }
//     } catch (err) {
//       console.error('Login Error:', err);
//       setError('Login failed. Check your credentials and private share.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
//       <NetworkStatus />

//       <div>
//         <label className="block mb-1">Username</label>
//         <input
//           value={username}
//           onChange={(e) => { setUsername(e.target.value); setError(''); }}
//           placeholder="Username"
//           autoComplete="username"
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       <div>
//         <label className="block mb-1">Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => { setPassword(e.target.value); setError(''); }}
//           placeholder="Password"
//           autoComplete="current-password"
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       <div>
//         <label className="block mb-1">Private Share</label>
//         <input
//           value={privateShare}
//           onChange={(e) => { setPrivateShare(e.target.value); setError(''); }}
//           placeholder="Private Share"
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       {error && <p className="text-red-600">{error}</p>}

//       <button
//         type="submit"
//         disabled={isLoading}
//         className="bg-blue-500 text-white px-4 py-2 rounded w-full disabled:opacity-50"
//       >
//         {isLoading ? 'Logging in...' : 'Login'}
//       </button>

//       <p className="mt-4 text-center text-sm">
//         Don't have an account?{' '}
//         <span
//           className="text-blue-600 cursor-pointer hover:underline"
//           onClick={() => navigate('/register')}
//         >
//           Register
//         </span>
//       </p>
//     </form>
    
//   );
// }

// export default LoginPage;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import NetworkStatus from '../components/NetworkStatus';

// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [privateShare, setPrivateShare] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const { login, networkError } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (networkError) {
//       setError('Fix network issues first.');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const result = await login(username, password, privateShare);
//       navigate(`/${result.role}`);
//     } catch (err) {
//       console.error('Login Error:', err);
//       if (err.message.includes('Invalid credentials')) {
//         setError('Account not found. Redirecting to Register...');
//         setTimeout(() => {
//           navigate('/register');
//         }, 2000);
//       } else {
//         setError('Login failed. Try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
//       <NetworkStatus />
//       <input
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//         className="border w-full mb-2 p-2"
//         required
//       />
//       <input
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         type="password"
//         className="border w-full mb-2 p-2"
//         required
//       />
//       <input
//         value={privateShare}
//         onChange={(e) => setPrivateShare(e.target.value)}
//         placeholder="Private Share"
//         className="border w-full mb-2 p-2"
//         required
//       />

//       {error && <p className="text-red-500 mb-2">{error}</p>}

//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded w-full"
//         disabled={isLoading}
//       >
//         {isLoading ? 'Logging in...' : 'Login'}
//       </button>
//       <p className="mt-4 text-center text-sm">
//          Don't have an account?{' '}
//        <span
//         className="text-blue-600 cursor-pointer hover:underline"
//         onClick={() => navigate('/register')}
//        >
//          Register
//       </span>
//     </p>
//     </form>
//   );
// }

// export default LoginPage;
