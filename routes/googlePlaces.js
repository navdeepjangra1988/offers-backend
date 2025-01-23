const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/nearbyplaces", async (req, res) => {
    const { location, radius, type } = req.query;

    if (!location || !radius || !type) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Set your API key in `.env`
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
            {
                params: {
                    location,
                    radius,
                    type,
                    key: apiKey,
                },
            }
        );

        const places = response.data.results.map((place) => ({
            placeId: place.place_id,
            name: place.name,
            latitude: place.geometry?.location?.lat || null,
            longitude: place.geometry?.location?.lng || null,
            offer: "No offer available",
        }));

        res.json(places);
    } catch (error) {
        console.error("Error fetching places from Google:", error);
        res.status(500).json({ error: "Failed to fetch places from Google API" });
    }
});

module.exports = router;
