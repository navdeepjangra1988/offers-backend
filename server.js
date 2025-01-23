require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", require("./routes/googlePlaces"));
app.use("/api", require("./routes/updateOffer"));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
