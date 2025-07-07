 
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// Add this after middleware
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


//tick routes
const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

// test route
app.get('/', (req, res) => {
  res.send('API is running...');
});


const protect = require('./middleware/authMiddleware');

app.get('/api/protected', protect, (req, res) => {
  res.json({
    msg: `Hello ${req.user.role}, your ID is ${req.user.id}`,
    user: req.user,
  });
});

const adminOnly = require('./middleware/roleMiddleware');

app.get('/api/admin-only', protect, adminOnly, (req, res) => {
  res.json({ msg: 'Welcome Admin 👑' });
});


// start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
