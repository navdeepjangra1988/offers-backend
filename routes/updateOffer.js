const express = require("express");
const router = express.Router();
const Place = require("../models/Place");

// Route to update offers
router.post("/updateOffer", async (req, res) => {
    try {
        const { placeId, offer } = req.body;

        if (!placeId || !offer) {
            return res.status(400).json({ error: "Missing placeId or offer in the request body" });
        }

        console.log("Updating offer for:", { placeId, offer });

        const updatedPlace = await Place.findOneAndUpdate(
            { placeId },
            { offer },
            { new: true, upsert: true } // Upsert ensures the record is created if it doesn't exist
        );

        console.log("Updated Place:", updatedPlace);

        res.json({ message: "Offer updated successfully", updatedPlace });
    } catch (error) {
        console.error("Error in /updateOffer:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
