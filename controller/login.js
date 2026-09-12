const express = require("express")
const User = require('../Entity/user');
const app = express.Router();
const {

    check,
    encrypt,
    decrypt
} = require("../services/encode")
app.get("/", (req, res, next) => {
    const email = req.cookies.email;
    const role = req.cookies.user;
    if (email && role && check(email) && check(role)) {
        console.log("ENTERED........");
        return res.json({
            success: true,
            role : decrypt(role)
        })
    }
    return res.json({
        success: false
    })
})
app.post("/", async (req, res, next) => {

    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return res.json({
            success: false,
            error: "user not exist"
        })
    }
    else if (await user.password !== req.body.password) {
        return res.json({
            success: false,
            error: "wrong password"
        })
    }
    else {
        res.cookie("email", encrypt(await user.email), {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        res.cookie("user", encrypt(await user.role || "User"), {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        res.cookie("city", await user.city, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        res.cookie("state", await user.state, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        if (user.role == "BusinessOwner") {
            return res.redirect(302, "/dashboard")
        }
        else if (user.role == "User") {
            return res.redirect(302, "/userdashboard")
        }

    }

}
    // else{
    //     res.json({
    //         username:req.cookies.username,
    //         email:req.cookies.email
    //     })
    // }
)
module.exports = app;