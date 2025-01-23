const express = require("express");
const router = express.Router();
const Place = require("../models/Place"); // Import Place model

router.post("/updateOffer", async (req, res) => {
    const { placeId, offer } = req.body;

    if (!placeId || !offer) {
        return res.status(400).json({ error: "placeId and offer are required" });
    }

    try {
        const updatedPlace = await Place.findOneAndUpdate(
            { placeId },
            { offer },
            { new: true, upsert: true } // Upsert creates a new record if it doesn't exist
        );

        res.json({ message: "Offer updated successfully", updatedPlace });
    } catch (error) {
        console.error("Error updating offer:", error);
        res.status(500).json({ error: "Failed to update the offer" });
    }
});

module.exports = router;
