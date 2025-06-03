const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017/surveillance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));