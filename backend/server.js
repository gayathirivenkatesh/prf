import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import forgotPasswordRoutes from './routes/forgotPasswordRoutes.js';

import adminJobOffersRoutes from './routes/admin/postjobRoutes.js';
import studentJobRoutes from './routes/student/studentRoutes.js';
import studentProfileRoutes from './routes/student/studentProfile.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Built-in middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // Handle form submissions

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/forgot-password', forgotPasswordRoutes);

app.use('/api/admin/post-job', adminJobOffersRoutes);
app.use('/api/student', studentJobRoutes);
app.use('/api/student/student-profile', studentProfileRoutes);

// Serve static files (e.g., uploaded files)
app.use('/uploads', express.static('uploads'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
