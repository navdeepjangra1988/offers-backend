const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
    placeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    offer: { type: String }, // Optional
});

module.exports = mongoose.model("Place", PlaceSchema);
