const express = require("express");
const axios = require("axios");
const router = express.Router();
const Bottleneck = require("bottleneck");

// Create a limiter
const limiter = new Bottleneck({
    maxConcurrent: 1, // Only 1 request at a time
    minTime: 200, // 200ms between requests
});

// Wrap the API call using the limiter
const fetchGooglePlaces = (params) => {
    return limiter.schedule(() =>
        axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", { params })
    );
};

// Google Places API route
router.get("/nearbyplaces", async (req, res) => {
    const { location, radius, type } = req.query;

    if (!location || !radius || !type) {
        return res.status(400).json({ error: "Missing required query parameters." });
    }

    try {
        const response = await fetchGooglePlaces({
            location,
            radius,
            type,
            key: process.env.GOOGLE_API_KEY,
        });

        const places = response.data.results;
        res.json(places);
    } catch (error) {
        console.error("Error fetching nearby places:", error);
        res.status(500).json({ error: "Failed to fetch nearby places." });
    }
});

module.exports = router;
