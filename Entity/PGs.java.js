const mongoose= require('mongoose');
const  service = require("./serviceDetail")
const PGs = new mongoose.Schema({
    rent:Number,
    totalRooms:Number,
    facilities:[String],
    Notes : String
})
module.exports = service.discriminator("PGs & Hostels / Co-living",PGs);