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
const U = "User";
const B = "BusinessOwner"; 
function hasRole(url,role){
    if("/dashboard"==url && role==B){
        console.log("notwork")
        return true;
    }
    else if(url.startsWith("/userdashboard") && role == U){
        return true;
    }
    else if("/dashboard/display"==url && (role==B)){
        return true;
    }
    else if("/dashboard/adddetail"==url && (role==B)){
        return true;
    }
    else if(url.startsWith("/review") && role ==U){
        return true;
    }
    else if(url.startsWith("/review/display") && role ==U){
        return true;
    }
    return false;
}

const express = require('express')
const app = express.Router();
app.use((req,res,next)=>{
    let role =  decrypt(req.cookies.user) ;
    
    if(hasRole(req.url,role)){
        next();
    }
    else{
        return res.json({
            success:false,
            error:"unauthorize"
        })
    }
    
    
})
module.exports = app;