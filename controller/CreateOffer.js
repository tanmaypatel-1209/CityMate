const express = require('express')
const offer = require('../Entity/Offer');
const serviceDetail = require('../Entity/serviceDetail');
const mongoose = require("mongoose")
let service_id;
const app = express.Router()
app.get("/:id", (req, res, next) => {
    res.render("createoffer.ejs");
})
app.post(("/:ID"), async (req, res, next) => {
    const targetId = req.params.ID;
    const ExpiresAt = new Date();
    ExpiresAt.setDate(ExpiresAt.getDate() + Number(req.body.OfferDays));
    const Offer = new offer({
        title: req.body.title,
        description: req.body.description,
        discountType: req.body.discountType,
        expiresAt: ExpiresAt,
        whenApply: req.body.whenApply,
        serviceDetail: targetId
    })
    await Offer.save()
    return res.json({
        sucess: true
    });
})
app.get("/display/:ID", async (req, res, next) => {
    const objectId = new mongoose.Types.ObjectId(req.params.ID);
    return res.json(await offer.find({
        serviceDetail: objectId
    }))
})
module.exports = app;