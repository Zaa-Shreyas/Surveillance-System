import React, { useState, useEffect } from 'react';
   import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
   import Dashboard from './components/Dashboard';
   import Login from './components/login';

   const AppRoutes = () => {
     const [isAuthenticated, setIsAuthenticated] = useState(true); // Hardcode for demo
     const [email, setEmail] = useState('testuser12@example.com'); // Mock email for demo
     const [devices, setDevices] = useState([]);
     const [activeSection, setActiveSection] = useState('dashboard');
     const [subscription, setSubscription] = useState({
       plan: 'Demo Plan',
       expiryDate: new Date('2025-12-31').toISOString(),
     });

     const handleLogin = (userEmail) => {
       setIsAuthenticated(true);
       setEmail(userEmail);
     };

     const handleLogout = () => {
       setIsAuthenticated(false);
       setEmail('');
       localStorage.removeItem('token');
       localStorage.removeItem('userId');
     };

     return (
       <Router>
         <Routes>
           <Route
             path="/dashboard"
             element={
               isAuthenticated ? (
                 <Dashboard
                   email={email}
                   handleLogout={handleLogout}
                   devices={devices}
                   setDevices={setDevices}
                   activeSection={activeSection}
                   setActiveSection={setActiveSection}
                   subscription={subscription}
                 />
               ) : (
                 <Navigate to="/login" />
               )
             }
           />
           <Route
             path="/login"
             element={
               isAuthenticated ? (
                 <Navigate to="/dashboard" />
               ) : (
                 <Login handleLogin={handleLogin} />
               )
             }
           />
           <Route path="*" element={<Navigate to="/dashboard" />} />
         </Routes>
       </Router>
     );
   };

   export default AppRoutes;