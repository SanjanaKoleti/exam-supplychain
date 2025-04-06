import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [networkError, setNetworkError] = useState(false);
  const [authContract, setAuthContract] = useState(null);

  // ✅ Replace with your deployed contract address
  const contractAddress = '0x7103a61CB6F3ada6f902607c9ADCd4146e63e781'; // <-- UPDATE THIS

  const AuthABI = [
    {
      "anonymous": false,
      "inputs": [
        { "indexed": false, "internalType": "string", "name": "username", "type": "string" },
        { "indexed": false, "internalType": "string", "name": "role", "type": "string" }
      ],
      "name": "UserRegistered",
      "type": "event"
    },
    {
      "inputs": [
        { "internalType": "string", "name": "_username", "type": "string" },
        { "internalType": "bytes32", "name": "_passwordHash", "type": "bytes32" },
        { "internalType": "string", "name": "_privateShare", "type": "string" },
        { "internalType": "string", "name": "_role", "type": "string" }
      ],
      "name": "registerUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  // ✅ Initialize Web3 and contract
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
  
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
  
          const contract = new web3.eth.Contract(AuthABI, contractAddress);
          setAuthContract(contract);
        } catch (err) {
          console.error('MetaMask connection error:', err);
          setNetworkError(true);
        }
      } else {
        setNetworkError(true);
      }
    };
  
    init();
  }, []);
  

  // ✅ Register function
  const register = async (username, password, privateShare, role) => {
    if (!authContract || !account) throw new Error('Contract not initialized or wallet not connected');

    const passwordHash = Web3.utils.keccak256(password);

    try {
      await authContract.methods.registerUser(username, passwordHash, privateShare, role)
        .send({ from: account });

      console.log("✅ Registered successfully");
    } catch (error) {
      console.error("❌ Registration error:", error);
      throw error;
    }
  };

  // Placeholder login/logout functions
  const login = async () => {};
  const logout = () => setAccount('');

  return (
    <AuthContext.Provider value={{
      currentUser: { address: account },
      login,
      logout,
      register,
      networkError,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Web3 from 'web3';
// import AuthJSON from '../components/Auth1.json'; // Make sure this path is correct

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [account, setAccount] = useState('');
//   const [networkError, setNetworkError] = useState(false);
//   const [authContract, setAuthContract] = useState(null);

//   useEffect(() => {
//     const init = async () => {
//       if (window.ethereum) {
//         const web3 = new Web3(window.ethereum);
//         try {
//           await window.ethereum.enable();
//           const accounts = await web3.eth.getAccounts();
//           setAccount(accounts[0]);

//           const networkId = await web3.eth.net.getId();
//           const deployedNetwork = AuthJSON.networks[networkId];
//           if (deployedNetwork) {
//             const instance = new web3.eth.Contract(
//               AuthJSON.abi,
//               deployedNetwork.address
//             );
//             setAuthContract(instance);
//             setNetworkError(false);
//           } else {
//             setNetworkError(true);
//           }
//         } catch (error) {
//           console.error("MetaMask connection error:", error);
//           setNetworkError(true);
//         }
//       } else {
//         console.error("MetaMask not detected");
//         setNetworkError(true);
//       }
//     };

//     init();
//   }, []);

//   const register = async (username, password, role) => {
//     if (!authContract || !account) throw new Error('Contract or account not loaded');
//     const passwordHash = Web3.utils.sha3(password);
//     const privateShare = Web3.utils.randomHex(32);

//     await authContract.methods.register(username, passwordHash, privateShare, role).send({ from: account });

//     return { success: true, privateShare };
//   };

//   const login = async (username, password, privateShare) => {
//     if (!authContract || !account) throw new Error('Contract or account not loaded');
//     const passwordHash = Web3.utils.sha3(password);

//     const user = await authContract.methods.login(username, passwordHash, privateShare).call();
//     return {
//       success: true,
//       role: user.role,
//     };
//   };

//   return (
//     <AuthContext.Provider value={{ account, register, login, networkError }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Web3 from 'web3';
// import AuthJSON from '../components/Auth1.json';

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [account, setAccount] = useState('');
//   const [networkError, setNetworkError] = useState(false);
//   const [authContract, setAuthContract] = useState(null);

//   useEffect(() => {
//     const init = async () => {
//       if (window.ethereum) {
//         const web3 = new Web3(window.ethereum);
//         try {
//           await window.ethereum.enable();
//           const accounts = await web3.eth.getAccounts();
//           setAccount(accounts[0]);

//           const networkId = await web3.eth.net.getId();
//           const deployedNetwork = AuthJSON.networks[networkId];

//           if (deployedNetwork) {
//             const instance = new web3.eth.Contract(
//               AuthJSON.abi,
//               deployedNetwork.address
//             );
//             setAuthContract(instance);
//             setNetworkError(false);
//           } else {
//             setNetworkError(true);
//           }
//         } catch (error) {
//           console.error("MetaMask connection error:", error);
//           setNetworkError(true);
//         }
//       } else {
//         console.error("MetaMask not detected");
//         setNetworkError(true);
//       }
//     };

//     init();
//   }, []);

//   const register = async (username, password, role) => {
//     if (!authContract || !account) throw new Error('Contract or account not loaded');
  
//     const passwordHash = Web3.utils.sha3(password);
//     const privateShare = Web3.utils.randomHex(32);
  
//     try {
//       await authContract.methods
//         .register(username, passwordHash, privateShare, role)
//         .send({ from: account });
  
//       return { success: true, privateShare };
//     } catch (err) {
//       console.error("Smart Contract Error:", err);
//       throw err;
//     }
//   };
  

//   const login = async (username, password, privateShare) => {
//     if (!authContract || !account) throw new Error('Contract or account not loaded');

//     try {
//       const passwordHash = Web3.utils.sha3(password);
//       const user = await authContract.methods.login(username, passwordHash, privateShare).call();

//       return {
//         success: true,
//         role: user.role,
//       };
//     } catch (error) {
//       console.error('Login Error:', error);
//       throw new Error('Login failed. Invalid credentials.');
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ account, register, login, networkError }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
