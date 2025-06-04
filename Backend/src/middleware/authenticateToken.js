// C:\surveillance-system\Backend\src\middleware\authenticateToken.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);
    req.user = decoded; // Attach user data to the request
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    console.error('Token verification failed:', err);
    return res.status(403).json({ message: 'Token is not valid' });
  }
};

module.exports = authenticateToken;