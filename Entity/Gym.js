const mongoose= require('mongoose');
const Service = require('./serviceDetail');
const gymSchema = new mongoose.Schema({
    gymType: {
        type: String,
        enum: ["Gym", "Fitness Center", "Yoga Studio", "CrossFit"]
    },
    monthlyFee: Number,
    personalTrainerAvailable: Boolean,
    facilities: [String],
    openingTime: String,
    closingTime: String
});
module.exports = Service.discriminator("Gym & Fitness Center", gymSchema);