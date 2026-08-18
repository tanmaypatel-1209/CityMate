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
    let email = req.cookies.email
    let role =  req.cookies.user
    if (email && role) {
        if (check(email) && check(role)) {
            console.log("email and role is valide");
            return next();
        }
        else{
            return res.render('login.ejs')
        }
    }
    else{
            return res.render('login.ejs')
    }
})
module.exports = app;