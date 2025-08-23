// Load environment variables
require('dotenv').config();

// Core dependencies
const express = require("express");
const cors = require("cors");

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
app.use(cors());

// Route handlers
app.use("/", indexRouter);
app.use("/posts", postRouter);
app.use("/admin", adminRouter);


// Authentication routes
app.post("/auth/login", (req, res) => {
  // TODO: Add proper JWT config
  const { username, password } = req.body;

  if (username === "admin" && password === "nice") {
    res.json({ token: "fake-jwt-token" });
  } else {
    res.status(401).json({ error: "Forbidden" });
  }

});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});