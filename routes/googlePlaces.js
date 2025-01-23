router.get("/nearbyplaces", async (req, res) => {
    try {
        const { location, radius, type } = req.query;

        if (!location || !radius || !type) {
            return res.status(400).json({ error: "Missing required query parameters." });
        }

        // Simulate fetching nearby places (Replace this with actual logic)
        const nearbyPlaces = []; // Replace this with actual API/service logic

        if (!nearbyPlaces || nearbyPlaces.length === 0) {
            return res.status(200).json([]); // Return an empty array for no results
        }

        res.status(200).json(nearbyPlaces); // Return places if available
    } catch (error) {
        console.error("Error fetching nearby places:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
