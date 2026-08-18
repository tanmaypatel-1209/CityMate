const mongoose = require("mongoose");
const serviceDetail = require("./serviceDetail");
const OfferShecma = new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    description: {
            type: String,
            required: true
    },
    discountType: {
            type: String,
            enum: ["Percentage", "Fixed"],
            required: true
    },
    expiresAt: {
            type: Date,
            required: true,
            index: true,
            expireAfterSeconds: 0
    },
    whenApply:{
        type : String
    },
    serviceDetail:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "Service"
    }
})
module.exports = mongoose.model("Offer",OfferShecma);