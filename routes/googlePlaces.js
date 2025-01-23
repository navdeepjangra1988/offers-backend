const express = require("express");
const router = express.Router();

// Example route for `/nearbyplaces`
router.get("/nearbyplaces", async (req, res) => {
    try {
        const { location, radius, type } = req.query;

        if (!location || !radius || !type) {
            return res.status(400).json({ error: "Missing required query parameters." });
        }

        // Simulating data (replace this with actual logic)
        const nearbyPlaces = [
            { name: "Sample Place", latitude: 28.6139, longitude: 77.209, offer: "10% Off" },
        ];

        res.status(200).json(nearbyPlaces);
    } catch (error) {
        console.error("Error fetching nearby places:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
