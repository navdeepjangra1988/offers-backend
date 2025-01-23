const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    offer: { type: String, required: true },
});

module.exports = mongoose.model("Shop", ShopSchema, "shops");
