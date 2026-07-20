const express = require("express")
const User = require('../Entity/user');
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
app.get("/",(req, res, next)=>{
    return res.render("login")
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
            maxAge: 24 * 60 * 60 * 1000
        })

        res.cookie("user", encrypt(await user.role || "User"), {
            maxAge: 24 * 60 * 60 * 1000
        })
         
        
        if(user.role=="BusinessOwner"){
            return res.redirect(302,"/dashboard")
        }
        else if(user.role=="User"){
            return res.redirect(302,"/userdashboard")
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