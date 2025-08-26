// Load environment variables
require('dotenv').config();

// Core dependencies
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Authentication
const passport = require('./config/passport');

// Route imports
const indexRouter = require("./routes/index");
const postRouter = require("./routes/post");
const adminRouter = require("./routes/admin");

// App initialization
const app = express();
const PORT = process.env.PORT || 3000;

// JSON parser middleware
app.use(express.json());

// cors config
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin ( Postman)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3001',  // Blog reader frontend
      'http://localhost:3002',  // Admin frontend  
      'http://localhost:5173',  // Vite dev server
      'https://myblog.com',   // Production blog reader
      'https://admin.myblog.com' // Production admin
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization'
  ],
  optionsSuccessStatus: 200
}));

// Route handlers
app.use("/", indexRouter);
app.use("/posts", postRouter);
app.use("/admin", adminRouter);

// Auth route
app.post("/auth/login", (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Authentication error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, username: user.username }
    });
  })(req, res);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
