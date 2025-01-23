const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop");
const Joi = require("joi");

// Validation schema for shop
const shopSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    offer: Joi.string().required(),
});

// Get all shops with optional pagination
router.get("/shops", async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const shops = await Shop.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.json(shops);
    } catch (err) {
        res.status(500).json({ message: "Error fetching shops", error: err.message });
    }
});

// Get a shop by ID
router.get("/shops/:id", async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id);
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }
        res.json(shop);
    } catch (err) {
        res.status(500).json({ message: "Error fetching shop", error: err.message });
    }
});

// Add a new shop
router.post("/shops", async (req, res) => {
    // Validate request body
    const { error } = shopSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const newShop = new Shop(req.body);
        const savedShop = await newShop.save();
        res.status(201).json(savedShop);
    } catch (err) {
        res.status(500).json({ message: "Error adding shop", error: err.message });
    }
});

// Update a shop by ID
router.put("/shops/:id", async (req, res) => {
    // Validate request body
    const { error } = shopSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const updatedShop = await Shop.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedShop) {
            return res.status(404).json({ message: "Shop not found" });
        }
        res.json(updatedShop);
    } catch (err) {
        res.status(500).json({ message: "Error updating shop", error: err.message });
    }
});

// Delete a shop by ID
router.delete("/shops/:id", async (req, res) => {
    try {
        const deletedShop = await Shop.findByIdAndDelete(req.params.id);
        if (!deletedShop) {
            return res.status(404).json({ message: "Shop not found" });
        }
        res.json({ message: "Shop deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting shop", error: err.message });
    }
});

module.exports = router;
