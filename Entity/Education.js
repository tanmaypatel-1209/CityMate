const mongoose= require('mongoose');
const Service = require('./serviceDetail');
const educationSchema = new mongoose.Schema({
    instituteType: {
        type: String,
        enum: [
            "School Tuition",
            "College Tuition",
            "Competitive Exam",
            "Computer Training",
            "Language Classes",
            "Music",
            "Dance",
            "Other"
        ]
    },
    courses: [String],
    fees: Number,
    openingTime: String,
    closingTime: String
});
module.exports = Service.discriminator(
    "Educational & Coaching",
    educationSchema
);