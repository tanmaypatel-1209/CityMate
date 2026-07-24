const mongoose = require('mongoose');
const Service = require('./serviceDetail');
const restaurantSchema = new mongoose.Schema({
    restaurantType: {
        type: String,
        enum: ["Restaurant", "Cafe", "Fast Food", "Bakery"]
    },
    cuisine: [String],
    takeaway: Boolean,
    dineIn: Boolean,
    openingTime: String,
    closingTime: String
});

module.exports = Service.discriminator(
    "Restaurant & Cafe",
    restaurantSchema
);