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
const express = require("express")
const app = express.Router();
app.use("/",(req,res,next)=>{
    console.log("hello")
    let email = req.cookies.email
    let role =  req.cookies.user
    if (email && role) {
        console.log("he")
        if (check(email) && check(role)) {
            return next();
        }
        else{
            return res.render('login.ejs')
        }
    }
    else{
            return res.render('login.ejs')
    }
    next()
})
module.exports = app;