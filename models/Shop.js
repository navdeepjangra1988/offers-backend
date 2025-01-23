const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    offer: { type: String, required: true },
    location: {
        type: { type: String, default: "Point" },
        coordinates: [Number],
    },
});

shopSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Shop", shopSchema);
