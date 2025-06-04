import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, LogOut, AlertTriangle, Settings, BarChart2, Video, Shield, Plus, Edit2, Trash2 } from 'lucide-react';

const Dashboard = ({ email, handleLogout, devices: initialDevices, setDevices, activeSection, setActiveSection, subscription }) => {
  const [devices, setDevicesState] = useState([
    {
      _id: 'demo-camera-1',
      name: 'Demo Camera',
      url: 'http://192.168.1.7:8080/',
      type: 'IP Camera',
      location: 'Demo Location',
      status: 'Online',
      lastSeen: new Date().toISOString(),
      uptime: '24h',
    },
  ]);

  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDeviceUrl, setNewDeviceUrl] = useState('');
  const [newDeviceType, setNewDeviceType] = useState('');
  const [newDeviceLocation, setNewDeviceLocation] = useState('');
  const [deviceError, setDeviceError] = useState('');
  const [editDevice, setEditDevice] = useState(null);
  const [editName, setEditName] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [editType, setEditType] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [videos, setVideos] = useState([
    {
      _id: 'demo-video-1',
      deviceId: { name: 'Demo Camera' },
      createdAt: new Date().toISOString(),
      filePath: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  ]);

  useEffect(() => {
    // No backend fetch needed for demo
  }, [activeSection]);

  const handleAddDevice = async (e) => {
    e.preventDefault();
    if (!newDeviceName || !newDeviceUrl || !newDeviceType || !newDeviceLocation) {
      setDeviceError('All fields are required.');
      return;
    }

    const newDevice = {
      _id: `device-${Date.now()}`,
      name: `newDeviceName`,
      url: newDeviceUrl,
      type: newDeviceType,
      location: newDeviceLocation,
      status: 'Online',
      lastSeen: new Date().toISOString(),
      uptime: '0h',
    };

    setDevicesState([...devices, newDevice]);
    setDeviceError('');
    setNewDeviceName('');
    setNewDeviceUrl('');
    setNewDeviceType('');
    setNewDeviceLocation('');
  };

  const handleEditDevice = (device) => {
    setEditDevice(device);
    setEditName(device.name);
    setEditUrl(device.url);
    setEditType(device.type);
    setEditLocation(device.location);
  };

  const handleUpdateDevice = async (e) => {
    e.preventDefault();
    if (!editName || !editUrl || !editType || !editLocation) {
      setDeviceError('All fields are required.');
      return;
    }

    setDevicesState(devices.map((d) =>
      d._id === editDevice._id
        ? { ...d, name: editName, url: editUrl, type: editType, location: editLocation }
        : d
    ));
    setEditDevice(null);
    setEditName('');
    setEditUrl('');
    setEditType('');
    setEditLocation('');
    setDeviceError('');
  };

  const handleDeleteDevice = async (deviceId) => {
    if (!window.confirm('Are you sure you want to delete this device?')) return;

    setDevicesState(devices.filter((d) => d._id !== deviceId));
  };

  const handleRecordVideo = async (deviceId) => {
    const newVideo = {
      _id: `video-${Date.now()}`,
      deviceId: { name: devices.find(d => d._id === deviceId).name },
      createdAt: new Date().toISOString(),
      filePath: 'https://www.w3schools.com/html/mov_bbb.mp4',
    };
    setVideos([...videos, newVideo]);
    alert('Recording saved successfully!');
  };

  const getStreamUrl = (originalUrl) => {
    return originalUrl || 'https://via.placeholder.com/640x360?text=Feed+Not+Available';
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
            <p className="text-4xl font-bold text-[#7F8CAA]">0</p>
            <p className="text-gray-600">Active Alerts</p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map(device => (
            <motion.div
              key={device._id}
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
              <p className="text-gray-600">Type: {device.type}</p>
              <p className="text-gray-600">Location: {device.location}</p>
              <p className="text-gray-600">Last Seen: {new Date(device.lastSeen).toLocaleString()}</p>
              <p className="text-gray-600">Uptime: {device.uptime}</p>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    devices: (
      <div className="p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold text-[#333446] mb-4">Device Management</h2>
          <p className="text-gray-600 mb-6">View your demo device here.</p>
          <h3 className="text-xl font-semibold text-[#333446] mb-4">Connected Devices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.length === 0 ? (
              <p className="text-gray-600">No devices connected.</p>
            ) : (
              devices.map((device) => (
                <motion.div
                  key={device._id}
                  className="bg-[#EAEFEF] p-6 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-[#333446]">{device.name}</h4>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleEditDevice(device)}
                        className="text-blue-500 hover:text-blue-700"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Edit2 size={18} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteDevice(device._id)}
                        className="text-red-500 hover:text-red-700"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </div>
                  <p className="text-gray-600">Type: {device.type}</p>
                  <p className="text-gray-600">Location: {device.location}</p>
                  <p className="text-gray-600">Stream URL: {device.url}</p>
                </motion.div>
              ))
            )}
          </div>
          {editDevice && (
            <div className="mt-8 max-w-md bg-[#EAEFEF] p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-[#333446] mb-4">Edit Device</h3>
              <form onSubmit={handleUpdateDevice}>
                <input
                  type="text"
                  placeholder="Device Name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-3 mb-4 border border-[#B8CFCE] rounded-lg focus:outline-none focus:border-[#7F8CAA]"
                />
                <input
                  type="text"
                  placeholder="Stream URL"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="w-full p-3 mb-4 border border-[#B8CFCE] rounded-lg focus:outline-none focus:border-[#7F8CAA]"
                />
                <input
                  type="text"
                  placeholder="Device Type"
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                  className="w-full p-3 mb-4 border border-[#B8CFCE] rounded-lg focus:outline-none focus:border-[#7F8CAA]"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full p-3 mb-4 border border-[#B8CFCE] rounded-lg focus:outline-none focus:border-[#7F8CAA]"
                />
                {deviceError && <p className="text-red-500 mb-4">{deviceError}</p>}
                <div className="flex gap-2">
                  <motion.button
                    type="submit"
                    className="bg-[#7F8CAA] text-white p-3 rounded-lg flex-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    Update Device
                  </motion.button>
                  <motion.button
                    onClick={() => setEditDevice(null)}
                    className="bg-gray-400 text-white p-3 rounded-lg flex-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    ),
    'live-feed': (
      <div className="p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold text-[#333446] mb-4">Live Feed</h2>
          <p className="text-gray-600 mb-6">View live feed from your demo camera.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => (
              <div key={device._id} className="bg-[#EAEFEF] p-4 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-[#333446] mb-2">{device.name}</h3>
                <img
                  src={getStreamUrl(device.url)}
                  alt={`${device.name} live feed`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/640x360?text=Feed+Not+Available';
                  }}
                />
                <motion.button
                  onClick={() => handleRecordVideo(device._id)}
                  className="bg-[#7F8CAA] text-white p-3 rounded-lg flex items-center gap-2 w-full justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Video size={18} />
                  Record Clip
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    ),
    recordings: (
      <div className="p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold text-[#333446] mb-4">Recordings</h2>
          <p className="text-gray-600 mb-6">View your recorded clips here.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div key={index} className="bg-[#EAEFEF] p-4 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-[#333446] mb-2">
                  {video.deviceId?.name || 'Unknown Device'} - {new Date(video.createdAt).toLocaleString()}
                </h3>
                <video controls className="w-full h-48 object-cover rounded-lg">
                  <source src={video.filePath} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    ),
    alerts: (
      <div className="p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold text-[#333446] mb-4">Alerts</h2>
          <p className="text-gray-600 mb-6">View recent alerts (mocked for demo).</p>
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#EAEFEF] p-4 rounded-xl shadow-lg mb-4">
              <p className="text-[#333446] font-semibold">Motion detected by Demo Camera</p>
              <p className="text-gray-600 text-sm">2 mins ago</p>
            </div>
          </div>
        </motion.div>
      </div>
    ),
    analytics: (
      <div className="p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold text-[#333446] mb-4">Analytics</h2>
          <p className="text-gray-600 mb-6">View device activity and uptime (mocked for demo).</p>
          <div className="max-w-2xl mx-auto bg-[#EAEFEF] p-6 rounded-xl shadow-lg">
            <div className="bg-gray-300 h-48 flex items-center justify-center rounded-lg">
              <p className="text-gray-600">Uptime Chart for Demo Camera (Mock)</p>
            </div>
          </div>
        </motion.div>
      </div>
    ),
    settings: (
      <div className="p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold text-[#333446] mb-4">Settings</h2>
          <p className="text-gray-600 mb-6">Manage your account and subscription.</p>
          <div className="max-w-md mx-auto bg-[#EAEFEF] p-6 rounded-xl shadow-lg">
            <div className="mb-4">
              <p className="text-[#333446] font-semibold">Email: {email}</p>
            </div>
            <div className="mb-4">
              <p className="text-[#333446] font-semibold">Subscription Plan: {subscription.plan}</p>
              <p className="text-gray-600 text-sm">
                Expiry Date: {subscription.expiryDate ? new Date(subscription.expiryDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    ),
  };

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen bg-[#EAEFEF]"
    >
      <motion.nav
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
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
            { name: 'Recordings', section: 'recordings', icon: <Video className="w-5 h-5" /> },
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
      <div className="flex-1 flex flex-col">
        <motion.header
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
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
          transition={{ duration: 0.5 }}
          key={activeSection}
        >
          {sections[activeSection]}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;