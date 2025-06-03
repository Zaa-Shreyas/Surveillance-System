import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, LogOut, AlertTriangle, Settings, BarChart2, Video, Shield } from 'lucide-react';
import './App.css';
import gridPattern from './grid-pattern.svg';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [devices, setDevices] = useState([
    { id: 1, name: 'Main Entrance Camera', status: 'Online', location: 'Front Door', lastSeen: '2 mins ago', uptime: '99.8%' },
    { id: 2, name: 'Parking Lot Camera', status: 'Offline', location: 'Parking Area', lastSeen: '1 hour ago', uptime: '87.2%' },
    { id: 3, name: 'Motion Sensor Hall', status: 'Online', location: 'Main Hall', lastSeen: 'Just now', uptime: '98.5%' },
    { id: 4, name: 'Backyard Camera', status: 'Online', location: 'Garden', lastSeen: '30 secs ago', uptime: '95.1%' },
  ]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.token) {
      setIsLoggedIn(true);
      alert('Login successful!');
    } else {
      alert('Login failed!');
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.message) {
      alert('Registration successful! Please log in.');
    } else {
      alert('Registration failed!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setActiveSection('dashboard');
  };

  const sections = {
    dashboard: (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-[#EAEFEF] p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-4xl font-bold text-[#7F8CAA]">{devices.length}</p>
            <p className="text-gray-600">Total Devices</p>
          </motion.div>
          <motion.div
            className="bg-[#EAEFEF] p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-4xl font-bold text-[#7F8CAA]">{devices.filter(d => d.status === 'Online').length}</p>
            <p className="text-gray-600">Online Devices</p>
          </motion.div>
          <motion.div
            className="bg-[#EAEFEF] p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-4xl font-bold text-[#7F8CAA]">{devices.filter(d => d.status === 'Offline').length}</p>
            <p className="text-gray-600">Offline Devices</p>
          </motion.div>
          <motion.div
            className="bg-[#EAEFEF] p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-4xl font-bold text-[#7F8CAA]">3</p>
            <p className="text-gray-600">Active Alerts</p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map(device => (
            <motion.div
              key={device.id}
              className="bg-[#EAEFEF] p-6 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-[#333446]">{device.name}</h4>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    device.status === 'Online' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}
                >
                  {device.status}
                </span>
              </div>
              <p className="text-gray-600">Location: {device.location}</p>
              <p className="text-gray-600">Last Seen: {device.lastSeen}</p>
              <p className="text-gray-600">Uptime: {device.uptime}</p>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    devices: (
      <div className="text-center p-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="text-6xl mb-4">📷</div>
          <h2 className="text-2xl font-bold text-[#333446] mb-2">Device Management</h2>
          <p className="text-gray-600">Add or remove devices here (coming soon).</p>
          <div className="mt-6 max-w-md mx-auto bg-[#EAEFEF] p-6 rounded-xl shadow-lg">
            <input
              type="text"
              placeholder="Device Name"
              className="w-full p-3 mb-4 border border-[#B8CFCE] rounded-lg"
              disabled
            />
            <input
              type="text"
              placeholder="Device Type"
              className="w-full p-3 mb-4 border border-[#B8CFCE] rounded-lg"
              disabled
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full p-3 mb-4 border border-[#B8CFCE] rounded-lg"
              disabled
            />
            <button className="bg-[#7F8CAA] text-white p-3 rounded-lg opacity-50 cursor-not-allowed">
              Add Device
            </button>
          </div>
        </motion.div>
      </div>
    ),
    'live-feed': (
      <div className="text-center p-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="text-6xl mb-4">👁️</div>
          <h2 className="text-2xl font-bold text-[#333446] mb-2">Live Feed</h2>
          <p className="text-gray-600">View live feeds from your cameras (coming soon).</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#EAEFEF] p-4 rounded-xl shadow-lg">
              <div className="bg-gray-300 h-48 flex items-center justify-center rounded-lg">
                <p className="text-gray-600">Camera 1 Feed (Mock)</p>
              </div>
            </div>
            <div className="bg-[#EAEFEF] p-4 rounded-xl shadow-lg">
              <div className="bg-gray-300 h-48 flex items-center justify-center rounded-lg">
                <p className="text-gray-600">Camera 2 Feed (Mock)</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    ),
    alerts: (
      <div className="text-center p-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="text-6xl mb-4">🔔</div>
          <h2 className="text-2xl font-bold text-[#333446] mb-2">Alerts</h2>
          <p className="text-gray-600">View recent alerts (coming soon).</p>
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="bg-[#EAEFEF] p-4 rounded-xl shadow-lg mb-4">
              <p className="text-[#333446] font-semibold">Motion detected by Main Entrance Camera</p>
              <p className="text-gray-600 text-sm">2 mins ago</p>
            </div>
            <div className="bg-[#EAEFEF] p-4 rounded-xl shadow-lg">
              <p className="text-[#333446] font-semibold">Parking Lot Camera offline</p>
              <p className="text-gray-600 text-sm">1 hour ago</p>
            </div>
          </div>
        </motion.div>
      </div>
    ),
    analytics: (
      <div className="text-center p-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="text-6xl mb-4">📈</div>
          <h2 className="text-2xl font-bold text-[#333446] mb-2">Analytics</h2>
          <p className="text-gray-600">View device activity and uptime (coming soon).</p>
          <div className="mt-6 max-w-2xl mx-auto bg-[#EAEFEF] p-6 rounded-xl shadow-lg">
            <div className="bg-gray-300 h-48 flex items-center justify-center rounded-lg">
              <p className="text-gray-600">Uptime Chart (Mock)</p>
            </div>
          </div>
        </motion.div>
      </div>
    ),
    settings: (
      <div className="text-center p-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="text-6xl mb-4">⚙️</div>
          <h2 className="text-2xl font-bold text-[#333446] mb-2">Settings</h2>
          <p className="text-gray-600">Manage your account (coming soon).</p>
          <div className="mt-6 max-w-md mx-auto bg-[#EAEFEF] p-6 rounded-xl shadow-lg">
            <input
              type="email"
              placeholder="New Email"
              className="w-full p-3 mb-4 border border-[#B8CFCE] rounded-lg"
              disabled
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-3 mb-4 border border-[#B8CFCE] rounded-lg"
              disabled
            />
            <button className="bg-[#7F8CAA] text-white p-3 rounded-lg opacity-50 cursor-not-allowed">
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence>
      {!isLoggedIn ? (
  <motion.div
    key="login"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="min-h-screen bg-[#333446] flex flex-col md:flex-row"
  >
    {/* Left Panel - Login Page Section */}
    <div className="flex-1 flex flex-col justify-center items-center p-8 text-center bg-gradient-to-br from-[#333446] to-[#16213e] relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: `url(${gridPattern})` }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Rest of the left panel content */}
      <motion.div
        className="w-32 h-32 bg-gradient-to-br from-[#7F8CAA] to-[#B8CFCE] rounded-full flex items-center justify-center mb-6 shadow-2xl relative z-10"
        whileHover={{ scale: 1.1 }}
      >
        <Shield className="w-16 h-16 text-white" />
      </motion.div>
      <h1 className="text-4xl font-bold text-white mb-4 text-shadow-lg relative z-10">
        SecureWatch
      </h1>
      <p className="text-white/80 text-lg mb-6 relative z-10">
        Platform-Independent Surveillance System
      </p>
      <ul className="text-left text-white/90 relative z-10">
        <li className="flex items-center mb-2">
          <span className="text-green-500 font-bold mr-2">✓</span> Real-time monitoring
        </li>
        <li className="flex items-center mb-2">
          <span className="text-green-500 font-bold mr-2">✓</span> Multi-device compatibility
        </li>
        <li className="flex items-center mb-2">
          <span className="text-green-500 font-bold mr-2">✓</span> Advanced analytics
        </li>
        <li className="flex items-center mb-2">
          <span className="text-green-500 font-bold mr-2">✓</span> Secure cloud storage
        </li>
        <li className="flex items-center">
          <span className="text-green-500 font-bold mr-2">✓</span> 24/7 support
        </li>
      </ul>
    </div>
    
            {/* Right Panel */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 bg-[#EAEFEF] relative">
              <motion.div
                className="w-full max-w-md bg-gradient-to-br from-[#EAEFEF] to-[#B8CFCE] p-8 rounded-2xl shadow-xl relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-[#333446] text-center mb-2">Welcome Back</h2>
                <p className="text-gray-600 text-center mb-6">Sign in to your SecureWatch account</p>
                <div className="relative mb-6">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 border-2 border-[#B8CFCE] rounded-xl bg-[#f8f9fa] text-[#333446] focus:border-[#7F8CAA] focus:bg-white focus:shadow-lg transition-all duration-300 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute top-4 left-4 text-gray-500 peer-focus:top-[-0.5rem] peer-focus:left-2 peer-focus:text-[#7F8CAA] peer-focus:bg-[#EAEFEF] peer-focus:px-2 peer-focus:text-sm peer-placeholder-shown:top-[-0.5rem] peer-placeholder-shown:left-2 peer-placeholder-shown:text-[#7F8CAA] peer-placeholder-shown:bg-[#EAEFEF] peer-placeholder-shown:px-2 peer-placeholder-shown:text-sm transition-all duration-300"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative mb-6">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 border-2 border-[#B8CFCE] rounded-xl bg-[#f8f9fa] text-[#333446] focus:border-[#7F8CAA] focus:bg-white focus:shadow-lg transition-all duration-300 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute top-4 left-4 text-gray-500 peer-focus:top-[-0.5rem] peer-focus:left-2 peer-focus:text-[#7F8CAA] peer-focus:bg-[#EAEFEF] peer-focus:px-2 peer-focus:text-sm peer-placeholder-shown:top-[-0.5rem] peer-placeholder-shown:left-2 peer-placeholder-shown:text-[#7F8CAA] peer-placeholder-shown:bg-[#EAEFEF] peer-placeholder-shown:px-2 peer-placeholder-shown:text-sm transition-all duration-300"
                  >
                    Password
                  </label>
                </div>
                <div className="flex gap-4 mb-6">
                  <motion.button
                    onClick={handleLogin}
                    className="flex-1 bg-[#7F8CAA] text-white p-4 rounded-xl font-semibold"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(127, 140, 170, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    onClick={handleRegister}
                    className="flex-1 bg-gradient-to-r from-[#7F8CAA] to-[#B8CFCE] text-white p-4 rounded-xl font-semibold"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(127, 140, 170, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    Register
                  </motion.button>
                </div>
                <p className="text-center text-gray-500">Secure • Reliable • Always Watching</p>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen bg-[#EAEFEF]"
          >
            {/* Sidebar */}
            <motion.nav
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              className="w-72 bg-gradient-to-b from-[#333446] to-[#16213e] p-6 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-[#7F8CAA] to-[#B8CFCE] rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Shield className="w-6 h-6 text-white" />
                </motion.div>
                <h2 className="text-xl font-bold text-white">SecureWatch</h2>
              </div>
              <ul className="space-y-2">
                {[
                  { name: 'Dashboard', section: 'dashboard', icon: <BarChart2 className="w-5 h-5" /> },
                  { name: 'Device Management', section: 'devices', icon: <Camera className="w-5 h-5" /> },
                  { name: 'Live Feed', section: 'live-feed', icon: <Video className="w-5 h-5" /> },
                  { name: 'Alerts', section: 'alerts', icon: <AlertTriangle className="w-5 h-5" /> },
                  { name: 'Analytics', section: 'analytics', icon: <BarChart2 className="w-5 h-5" /> },
                  { name: 'Settings', section: 'settings', icon: <Settings className="w-5 h-5" /> },
                ].map(item => (
                  <li key={item.section}>
                    <motion.a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveSection(item.section);
                      }}
                      className={`flex items-center gap-4 p-4 text-white/80 rounded-xl transition-all ${
                        activeSection === item.section ? 'bg-[#7F8CAA] text-white' : 'hover:bg-[#7F8CAA]/20'
                      }`}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.nav>
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              <motion.header
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="bg-[#333446] p-6 shadow-lg flex justify-between items-center"
              >
                <h1 className="text-2xl font-bold text-white">
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('-', ' ')}
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-white">{email}</span>
                  <motion.button
                    onClick={handleLogout}
                    className="bg-[#7F8CAA] text-white p-3 rounded-lg flex items-center gap-2"
                    whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(127, 140, 170, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </motion.button>
                </div>
              </motion.header>
              <motion.div
                className="flex-1 p-8 overflow-y-auto"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                key={activeSection}
              >
                {sections[activeSection]}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;