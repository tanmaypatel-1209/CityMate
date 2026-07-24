const mongoose= require('mongoose');
const Service = require('./serviceDetail');
const hospitalSchema = new mongoose.Schema({
    hospitalType: {
        type: String,
        enum: ["Government", "Private", "Trust"]
    },
    emergencyAvailable: Boolean,
    ambulanceAvailable: Boolean,
    departments: [String],
    openingTime: String,
    closingTime: String,
    Notes: String
});

module.exports = Service.discriminator(
    "Hospital & Healthcare / Clinic",
    hospitalSchema
);