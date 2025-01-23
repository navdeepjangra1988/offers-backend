const express = require("express");
const connectDB = require("./config/db"); // Ensure this path is correct
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // To use .env variables

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json()); // Parses incoming JSON requests
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Routes
app.use("/api/shops", require("./routes/shops")); // Route for shop-related API endpoints

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
