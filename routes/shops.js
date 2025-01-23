const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop");

// GET all shops
router.get("/", async (req, res) => {
    try {
        const shops = await Shop.find();
        res.json(shops);
    } catch (error) {
        res.status(500).json({ message: "Error fetching shops", error: error.message });
    }
});

module.exports = router;
