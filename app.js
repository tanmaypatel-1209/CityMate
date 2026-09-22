const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const signup = require('./controller/sign');
const login = require('./controller/login');
const redis = require("redis");
const server = express();
const {connectRedis,redisServer} = require('./services/redis')
const security = require('./middleware/security')
const auth = require('./middleware/authorization')
const B_dash = require('./controller/dashboard_B')
const U_bash = require('./controller/dashboard_U')
const review = require('./controller/review');
const cors = require("cors");
const CreateOffer = require('./controller/CreateOffer')
const profile = require('./controller/profile')
const cp = require("cookie-parser");
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then(() => { console.log('Connected to MongoDB'); })
.catch((err) => { console.error('MongoDB connection error:', err); });
server.set('view engine','ejs')

server.set('views', ['views', 'views/business_view', 'views/user_view']);
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
server.use(cp());

server.use("/logout",(req,res,next)=>{
    res.clearCookie("email");
    res.clearCookie("user");
    res.render('login.ejs');
    return;
})
server.use('/signup',signup);
server.use('/login',login);
server.use(security);
server.use(auth);
server.use("/dashboard",B_dash)
server.use("/userdashboard",U_bash)
server.use("/review",review)
server.use("/Createoffer",CreateOffer);
server.use("/profile",profile);
// server.use('/detail',)
server.listen(3000,async()=>{
    connectRedis();
    
    console.log("radis server start on 6379")
});
