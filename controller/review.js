const express = require("express");
const app = express.Router();
const review = require("../Entity/Review");

// Render the review webpage
app.get('/:ID', (req, res, next) => {
    return res.render("review.ejs");
});

// Post a new review
app.post('/:ID', async (req, res, next) => {
    try {
        const r = new review({
            coment: req.body.Coment || req.body.coment || req.body.Comment,
            rating: req.body.rating,
            service: req.params.ID
        });
        await r.save();
        return res.json({
            success: true
        });
    } catch (err) {
        console.error("Error saving review:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

// JSON API endpoint to get all reviews for a service
app.get('/display/:ID', async (req, res, next) => {
    try {
        const arr = await review.find({
            service: req.params.ID
        });
        return res.json(arr);
    } catch (err) {
        console.error("Error fetching reviews:", err);
        return res.status(500).json({ error: "Failed to fetch reviews" });
    }
});

module.exports = app;

