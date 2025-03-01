const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json())

// Middleware
app.use(express.json()); // JSON Data Accept karne ke liye
app.use(cors()); // Cross-Origin Requests Allow

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/MinaratUlHikmah", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


// Routes
app.use('/api/auth' , require('./routes/auth.js'))
app.use('/api/fatawa' , require('./routes/fatawa.js'))

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
