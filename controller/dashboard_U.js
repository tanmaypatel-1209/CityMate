const express = require('express');
const app = express.Router();
const Services = require('../Entity/serviceDetail');
const PGs = require('../Entity/PGs.java');
const Gym = require('../Entity/Gym');
const Hospital = require('../Entity/Hospital');
const Education = require('../Entity/Education');
const Restaurant = require('../Entity/Restaurant & Cafe');
const User = require('../Entity/user');
const Offre = require('../Entity/Offer')
const { decrypt } = require('../services/encode');
const Offer = require('../Entity/Offer');
const { connectRedis, redisServer } = require('../services/redis')
app.get('/', (req, res, next) => {
    return res.render("dashboard_U.ejs");
});
app.get('/display', async (req, res, next) => {
    const page = req.query.page;
    const usercity = req.cookies.city || "";
    const filter = usercity ? { city: new RegExp('^' + usercity + '$', 'i') } : {};
    // console.log(req.cookies.city+"......................")
    // console.log(req.cookies.state+"......................")
    // console.log("......"+filter.city);
    let services = await redisServer.get(String(filter.city));

    if (page == 1 && !services) {
        services = await Services.find(filter).limit(20);
        await redisServer.set(String(filter.city), JSON.stringify(services));
        return res.json({
            usercity: usercity || "All Locations",
            services: (services)
        });

    }
    else if (page >= 2) {
        services = await Services.find(filter).skip((page-1) * 20).limit(20);
        return res.json({
            usercity: usercity || "All Locations",
            services: (services)
        });
    }
    console.log("return from redis")
    return res.json({
        usercity: usercity || "All Locations",
        services: JSON.parse(services)
    });


});
app.get('/display/:ID', async (req, res, next) => {

    const offer = await Offer.find({
        serviceDetail: req.params.ID
    });
    return res.json(offer);
})

module.exports = app;
