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

    let services = null;
    if (redisServer.isOpen) {
        try {
            const cached = await redisServer.get(String(filter.city));
            if (cached) {
                services = JSON.parse(cached);
            }
        } catch (err) {
            console.warn("Redis get error:", err.message);
        }
    }

    if (page == 1 && !services) {
        services = await Services.find(filter).limit(20);
        if (redisServer.isOpen) {
            try {
                await redisServer.set(String(filter.city), JSON.stringify(services));
            } catch (err) {
                console.warn("Redis set error:", err.message);
            }
        }
        return res.json({
            usercity: usercity || "All Locations",
            services: services
        });

    }
    else if (page >= 2) {
        services = await Services.find(filter).skip((page-1) * 20).limit(20);
        return res.json({
            usercity: usercity || "All Locations",
            services: services
        });
    }

    if (services) {
        console.log("return from redis");
        return res.json({
            usercity: usercity || "All Locations",
            services: services
        });
    }

    services = await Services.find(filter).limit(20);
    return res.json({
        usercity: usercity || "All Locations",
        services: services
    });


});
app.get('/display/:ID', async (req, res, next) => {

    const offer = await Offer.find({
        serviceDetail: req.params.ID
    });
    return res.json(offer);
})

module.exports = app;
