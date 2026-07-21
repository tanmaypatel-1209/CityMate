const express = require('express')
const Services = require('../Entity/serviceDetail')
const app = express.Router();
const {
    maping,
    maping2,
    reverseMaping,
    reverseMaping2,
    shuffle,
    check,
    encrypt,
    decrypt
} = require("../services/encode")
const user = require('../Entity/user');
const { model } = require('mongoose');

app.get('/', (req, res, next) => {
    return res.render("dashboard.ejs");
})
app.post('/adddetail', async (req, res, next) => {
    const S = new Services({
        serviceName: req.body.serviceName,
        serviceType: req.body.serviceType,
        description: req.body.description,
        contect_no: req.body.contect_no,
        duration: req.body.duration,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        website: req.body.website,
        Urls:req.body.Urls,
        user: await user.findOne({
            email: decrypt(req.cookies.email)
        })._id
        
    });
    await S.save();
    
    return res.json({
        success: true
    });

})
app.get('/display', async (req, res, next) => {
    console.log(req.url);
    const cu = decrypt(req.cookies.email)
    let u=await user.findOne({email:cu});
    let arr = [];
    arr = await Services.find({user:u._id})
    res.json(arr)

})
module.exports = app;