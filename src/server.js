const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const User = require('./models/User');

//dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: ['https://blog-nest-fe.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/blogs/:blogId/comments', commentRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to MongoDB Atlas using Mongoose
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if connection fails
  }
}

// Run the connection
connectDB();

// Example function to check user existence (if needed)
async function checkUser() {
  try {
    const user = await User.findOne({ email: "test@yopmail.com" });
    console.log("User table data accessed successfully:", user);
  } catch (error) {
    console.error("Error accessing user table:", error);
  }
}

// You can call the checkUser function as needed
// checkUser();

const PORT = process.env.NODE_ENV === 'production' ? undefined : process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

