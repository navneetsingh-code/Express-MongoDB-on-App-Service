const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const User = require('../models/User');
const telemetryClient = require('../utils/telemetry');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      telemetryClient.trackEvent({
        name: 'UserRegisterFailed',
        properties: { email }
      });
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Track successful registration
    telemetryClient.trackEvent({
      name: 'UserRegistered',
      properties: { email, userId: user._id.toString() }
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    telemetryClient.trackException({
      exception: error,
      properties: { operation: 'registerUser' }
    });
    console.error('[Register Error]', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      telemetryClient.trackEvent({
        name: 'UserLoginFailed',
        properties: { email }
      });
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      telemetryClient.trackEvent({
        name: 'UserLoginFailed',
        properties: { email }
      });
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!config.jwtSecret) {
      console.error('[Login Error] Missing JWT secret');
      return res.status(500).json({ error: 'Server misconfiguration: Missing JWT secret.' });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    telemetryClient.trackEvent({
      name: 'UserLoginSuccess',
      properties: { email, userId: user._id.toString() }
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    telemetryClient.trackException({
      exception: error,
      properties: { operation: 'loginUser' }
    });
    console.error('[Login Error]', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      telemetryClient.trackEvent({
        name: 'UserUpdateFailed',
        properties: { userId }
      });
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name || user.name;
    await user.save();

    telemetryClient.trackEvent({
      name: 'UserUpdated',
      properties: { userId, newName: user.name }
    });

    res.json({ message: 'User updated', user });
  } catch (error) {
    telemetryClient.trackException({
      exception: error,
      properties: { operation: 'updateUser' }
    });
    console.error('[Update Error]', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
