const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    coment: String,
    rating: Number,
    date: {
        type: Date,
        default: Date.now
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    }
});

module.exports = mongoose.model("Review", reviewSchema);