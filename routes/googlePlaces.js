const express = require("express");
const router = express.Router();
const axios = require("axios");

// Route to fetch nearby places
router.get("/nearbyplaces", async (req, res) => {
    try {
        const { location, radius, type } = req.query;

        if (!location || !radius || !type) {
            return res.status(400).json({ error: "Missing required query parameters" });
        }

        console.log("Query Params:", { location, radius, type });

        const response = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
            params: {
                location, // Latitude and longitude
                radius,   // Search radius in meters
                type,     // Place type (e.g., restaurant, cafe)
                key: process.env.GOOGLE_API_KEY, // Your Google API Key
            },
        });

        if (response.data.status !== "OK") {
            console.error("Google API Error:", response.data.error_message || response.data.status);
            return res.status(500).json({ error: "Failed to fetch places from Google API" });
        }

        console.log("Google API Response Data:", response.data.results);

        const places = response.data.results.map((place) => ({
            placeId: place.place_id,
            name: place.name,
            latitude: place.geometry?.location?.lat || null,
            longitude: place.geometry?.location?.lng || null,
            offer: "No offer available", // Default offer
        }));

        res.json(places);
    } catch (error) {
        console.error("Error in /nearbyplaces:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
