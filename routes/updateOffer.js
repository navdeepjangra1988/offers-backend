const express = require("express");
const router = express.Router();
const Place = require("../models/Place"); // Ensure the Place model is correct

// Update offer route
router.post("/updateOffer", async (req, res) => {
    const { placeId, offer } = req.body;

    if (!placeId || !offer) {
        return res.status(400).json({ error: "placeId and offer are required" });
    }

    try {
        // Update or create a place with the offer
        const updatedPlace = await Place.findOneAndUpdate(
            { placeId },
            { offer },
            { new: true, upsert: true } // Create new entry if it doesn't exist
        );

        res.status(200).json({
            message: "Offer updated successfully",
            updatedPlace,
        });
    } catch (error) {
        console.error("Error updating offer:", error);
        res.status(500).json({ error: "Failed to update offer" });
    }
});

module.exports = router;
