const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/nearbyplaces", async (req, res) => {
    const { location, radius, type } = req.query;

    if (!location || !radius || !type) {
        return res.status(400).json({ error: "location, radius, and type are required" });
    }

    const [lat, lng] = location.split(",");
    const googleApiKey = process.env.GOOGLE_MAPS_API_KEY; // Use your Google Maps API Key

    try {
        const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${googleApiKey}`;
        const response = await axios.get(googlePlacesUrl);
        const places = response.data.results;

        // Optionally save places to MongoDB or process them
        res.status(200).json(places);
    } catch (error) {
        console.error("Error fetching places from Google API:", error.message);
        res.status(500).json({ error: "Failed to fetch places from Google API" });
    }
});

module.exports = router;
