const express = require('express')
const Services = require('../Entity/serviceDetail')
const PGs = require('../Entity/PGs.java')
const Gym = require('../Entity/Gym')
const Hospital = require('../Entity/Hospital')
const Education = require('../Entity/Education')
const Restaurant = require('../Entity/Restaurant & Cafe')
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
    let ModelClass = Services;
    const getSingleStr = (val) => Array.isArray(val) ? (val.find(v => v && String(v).trim()) || '') : (val || ''); // Added
    let parsedUrls = [];
    if (typeof req.body.Urls === 'string') {
        parsedUrls = JSON.parse(req.body.Urls);
    } else if (Array.isArray(req.body.Urls)) {
        parsedUrls = req.body.Urls;
    }


    let serviceData = {
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
        Urls: parsedUrls,
        user: (await user.findOne({
            email: decrypt(req.cookies.email)
        }))._id
    };
    if (req.body.serviceType === "PGs & Hostels / Co-living") {
        ModelClass = PGs;
        serviceData.rent = req.body.rent;
        serviceData.totalRooms = req.body.totalRooms;
        serviceData.facilities = req.body.facilities;
        serviceData.Notes = getSingleStr(req.body.Notes);
    } else if (req.body.serviceType === "Gym & Fitness Center") {
        ModelClass = Gym;
        serviceData.gymType = req.body.gymType;
        serviceData.monthlyFee = req.body.monthlyFee;
        serviceData.personalTrainerAvailable = req.body.personalTrainerAvailable;
        serviceData.facilities = req.body.facilities;
        serviceData.openingTime = getSingleStr(req.body.openingTime);
        serviceData.closingTime = getSingleStr(req.body.closingTime); // Added
    } else if (req.body.serviceType === "Hospital & Healthcare / Clinic") {
        ModelClass = Hospital;
        serviceData.hospitalType = req.body.hospitalType;
        serviceData.emergencyAvailable = req.body.emergencyAvailable;
        serviceData.ambulanceAvailable = req.body.ambulanceAvailable;
        serviceData.departments = req.body.departments;
        serviceData.openingTime = getSingleStr(req.body.openingTime);
        serviceData.closingTime = getSingleStr(req.body.closingTime);
        serviceData.Notes = getSingleStr(req.body.Notes);
    } else if (req.body.serviceType === "Educational & Coaching") {
        ModelClass = Education;
        serviceData.instituteType = req.body.instituteType;
        serviceData.courses = req.body.courses;
        serviceData.fees = req.body.fees;
        serviceData.openingTime = getSingleStr(req.body.openingTime);
        serviceData.closingTime = getSingleStr(req.body.closingTime);
    } else if (req.body.serviceType === "Restaurant & Cafe") {
        ModelClass = Restaurant;
        serviceData.restaurantType = req.body.restaurantType;
        serviceData.cuisine = req.body.cuisine;
        serviceData.takeaway = req.body.takeaway;
        serviceData.dineIn = req.body.dineIn;
        serviceData.openingTime = getSingleStr(req.body.openingTime);
        serviceData.closingTime = getSingleStr(req.body.closingTime);
    }

    const S = new ModelClass(serviceData);
    await S.save();

    return res.json({
        success: true
    });

})
app.get('/display', async (req, res, next) => {
    console.log(req.url);
    const cu = decrypt(req.cookies.email)
    let u = await user.findOne({ email: cu });
    let arr = [];
    arr = await Services.find({ user: u._id })
    res.json(arr)

})
module.exports = app;