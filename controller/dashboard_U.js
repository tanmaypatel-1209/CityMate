const express = require('express');
const app = express.Router();
const Services = require('../Entity/serviceDetail');
const PGs = require('../Entity/PGs.java');
const Gym = require('../Entity/Gym');
const Hospital = require('../Entity/Hospital');
const Education = require('../Entity/Education');
const Restaurant = require('../Entity/Restaurant & Cafe');
const User = require('../Entity/user');
const { decrypt } = require('../services/encode');

app.get('/', (req, res, next) => {
    return res.render("dashboard_U.ejs");
});
app.get('/display', async (req, res, next) => {
    try {
        const usercity = req.cookies.city || "";
        const filter = usercity ? { city : new RegExp('^' + usercity +'$' , 'i')} : {};

        const services = await Services.find(filter);
        return res.json({
            usercity: usercity || "All Locations",
            services: services
        });
    } catch (err) {
        console.error("Error fetching services:", err);
        return res.status(500).json({ error: "Failed to fetch services" });
    }
});

module.exports = app;
