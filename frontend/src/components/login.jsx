import React, { useState } from 'react';
   import { motion } from 'framer-motion';
   import { useNavigate } from 'react-router-dom';

   const Login = ({ handleLogin }) => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');
     const navigate = useNavigate();

     const onLogin = async (e) => {
       e.preventDefault();
       // For demo purposes, bypass actual login and directly call handleLogin
       if (email && password) {
         handleLogin(email); // Pass email to AppRoutes.js
         navigate('/dashboard');
       } else {
         setError('Please enter email and password');
       }
     };

     return (
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="min-h-screen flex items-center justify-center bg-[#EAEFEF]"
       >
         <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
           <h2 className="text-2xl font-bold text-[#333446] mb-6 text-center">Login to SecureWatch</h2>
           <form onSubmit={onLogin}>
             <div className="mb-4">
               <label htmlFor="email" className="block text-[#333446] font-semibold mb-2">
                 Email
               </label>
               <input
                 id="email"
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full p-3 border border-[#B8CFCE] rounded-lg focus:outline-none focus:border-[#7F8CAA]"
                 placeholder="Enter your email"
               />
             </div>
             <div className="mb-6">
               <label htmlFor="password" className="block text-[#333446] font-semibold mb-2">
                 Password
               </label>
               <input
                 id="password"
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full p-3 border border-[#B8CFCE] rounded-lg focus:outline-none focus:border-[#7F8CAA]"
                 placeholder="Enter your password"
               />
             </div>
             {error && <p className="text-red-500 mb-4">{error}</p>}
             <motion.button
               type="submit"
               className="w-full bg-[#7F8CAA] text-white p-3 rounded-lg"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               Login
             </motion.button>
           </form>
         </div>
       </motion.div>
     );
   };

   export default Login;