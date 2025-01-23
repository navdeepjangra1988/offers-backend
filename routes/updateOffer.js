const express = require("express");
const router = express.Router();
const Place = require("../models/Place"); // Ensure this model exists and is correct

// Route to update offer for a place
router.post("/updateOffer", async (req, res) => {
    const { placeId, offer } = req.body;

    if (!placeId || !offer) {
        return res.status(400).json({ error: "Both placeId and offer are required" });
    }

    try {
        const updatedPlace = await Place.findOneAndUpdate(
            { placeId },
            { offer },
            { new: true, upsert: true } // Create if it doesn't exist
        );

        res.status(200).json({
            message: "Offer updated successfully",
            updatedPlace,
        });
    } catch (error) {
        console.error("Error updating offer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
