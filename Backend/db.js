const mongoose = require("mongoose");
const Format = require("./models/schema");

const connectDB = async () => {
    try {
      const MONGO_URI = "mongodb://127.0.0.1:27017/MinaratUlHikmah";
  
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("MongoDB Connected Successfully!");
    } catch (error) {
      console.error("MongoDB Connection Error:", error.message);
      process.exit(1);
    }
  };
  
  module.exports = { connectDB, Format };
