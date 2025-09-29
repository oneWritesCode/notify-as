require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./Routes/userRoute');
const postRouter = require('./Routes/postsRoute');
const taskRouter = require('./Routes/tasksRoute');
const noteRouter = require('./Routes/notesRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fullstack-app')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routers
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/notes', noteRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});