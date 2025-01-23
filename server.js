require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1); // Exit if connection fails
    });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const googlePlacesRoute = require("./routes/googlePlaces"); // Import the googlePlaces route
const shopsRoute = require("./routes/shops"); // Import the shops route

app.use("/api", googlePlacesRoute); // Attach googlePlaces routes to /api
app.use("/api/shops", shopsRoute); // Attach shops routes to /api/shops

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
