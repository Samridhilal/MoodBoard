import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Attempting to connect to MongoDB:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('Please ensure MongoDB is running or update MONGODB_URI in server/.env');
  });

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// MoodBoard Schema
const moodBoardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  emojis: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  color: { type: String, required: true },
  note: { type: String, maxlength: 200 }
}, { timestamps: true });

// Index to ensure one mood board per user per day
moodBoardSchema.index({ userId: 1, date: 1 }, { unique: true });

const MoodBoard = mongoose.model('MoodBoard', moodBoardSchema);

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    console.log('Signup attempt:', { username: req.body.username, email: req.body.email });
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log('User already exists:', existingUser.email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    console.log('✅ User created successfully:', user.username);
    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body.email);
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// MoodBoard Routes
app.post('/api/moodboards', authenticateToken, async (req, res) => {
  try {
    const { emojis, imageUrl, color, note } = req.body;
    const userId = req.user.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if user already has a mood board for today
    const existingMoodBoard = await MoodBoard.findOne({
      userId,
      date: today
    });

    if (existingMoodBoard) {
      return res.status(400).json({ message: 'You can only create one mood board per day' });
    }

    // Create new mood board
    const moodBoard = new MoodBoard({
      userId,
      date: today,
      emojis,
      imageUrl,
      color,
      note
    });

    await moodBoard.save();
    res.status(201).json(moodBoard);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You can only create one mood board per day' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/moodboards', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const moodBoards = await MoodBoard.find({ userId }).sort({ date: -1 });
    res.json(moodBoards);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/moodboards/today', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const moodBoard = await MoodBoard.findOne({ userId, date: today });
    
    if (!moodBoard) {
      return res.status(404).json({ message: 'No mood board found for today' });
    }

    res.json(moodBoard);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});