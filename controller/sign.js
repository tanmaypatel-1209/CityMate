// const express = require('express');
// const app = express.Router();
// const User = require('../Entity/user');
// app.post('/', async (req, res, next)=>{
//     const user = new User({username: req.body.username, email: req.body.email, password: req.body.password});
//     await user.save();
//     res.send('User created successfully');
// });
// module.exports = app;
const express = require('express');
const User = require('../Entity/user');
const app = express.Router();
app.get("/",(req,res,next)=>{
    return res.render("index.ejs")
})
app.post('/',async(req,res,next)=>{
    console.log(req.body);
    const a = await User.findOne({
        email:req.body.email
    });
    
    if(a){
        return res.json({
            success:false
        })
    }
    const u = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role || 'User',
        city: req.body.location.split(', ')[0] || 'Unknown',
        state: req.body.location.split(', ')[1]
        
    });
    await u.save();
    console.log("saved");
    if(req.body.role==='User'){
        res.statusCode = 302;
        res.redirect('/userdashboard')
    }
    else{
        res.statusCode=302;
        res.redirect('/dashboard')
        
    }
})
module.exports = app;