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
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173/';

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: FRONTEND_URL || 'http://localhost:5173/',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
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

app.get("/", (req, res) => {
  res.json({
    "home": "/",
    "user routes": "here",
    "user register route": "/api/users/register",
    "login": "/api/users/login",
    "logout": "/api/users/logout",
    "gte user data": "/api/users/me",
    "delete user data": "/api/users/me",
    "tasks route": "here",
    "get route": "/api/tasks",
    "delete and patch route": "/api/tasks/:id",
    "same for posts and notes":" "
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});