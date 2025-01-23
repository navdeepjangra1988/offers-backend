require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1); // Exit the process on MongoDB connection error
    });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", require("./routes/googlePlaces")); // Nearby places route
app.use("/api", require("./routes/updateOffer")); // Update offer route

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
