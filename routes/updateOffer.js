const express = require("express");
const router = express.Router();
const Place = require("../models/Place"); // Ensure the Place model is correct

// POST route to update an offer
router.post("/updateOffer", async (req, res) => {
    const { placeId, offer } = req.body;

    if (!placeId || !offer) {
        return res.status(400).json({ error: "placeId and offer are required" });
    }

    try {
        // Update or insert the offer
        const updatedPlace = await Place.findOneAndUpdate(
            { placeId },
            { offer },
            { new: true, upsert: true }
        );

        res.status(200).json({
            message: "Offer updated successfully",
            updatedPlace,
        });
    } catch (error) {
        console.error("Error updating offer:", error);
        res.status(500).json({ error: "Failed to update the offer" });
    }
});

module.exports = router;
