const express = require("express");
const router = express.Router();

router.get("/nearbyplaces", async (req, res) => {
    const { location, radius, type } = req.query;
    if (!location || !radius || !type) {
        return res.status(400).json({ error: "Missing required query parameters" });
    }

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location,
                radius,
                type,
                key: process.env.GOOGLE_MAPS_API_KEY,
            },
        });
        const places = response.data.results.map((place) => ({
            name: place.name,
            latitude: place.geometry?.location?.lat,
            longitude: place.geometry?.location?.lng,
            placeId: place.place_id,
            offer: "", // Default no offer
        }));
        res.json(places);
    } catch (error) {
        console.error("Error fetching places:", error.message);
        res.status(500).json({ error: "Failed to fetch places" });
    }
});

module.exports = router;
