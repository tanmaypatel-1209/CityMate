// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const Signup = require('./controller/login');
// dotenv.config();
// mongoose.connect(process.env.MONGO_URI).catch((err) => console.log(err)).then(() => {console.log('Connected to MongoDB')});
// const server = express();
// server.set('view engine', 'ejs')
// server.set('views', 'views');
// server.use(express.urlencoded({ extended: true }));
// server.get('/', (req, res, next)=>{
//     res.render('index.ejs');
// } );
// server.use('/signup', Signup);

// server.listen(8080, ()=>{
//     console.log('Server is running on port 8080');
// })
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const signup = require('./controller/sign');
const login = require('./controller/login');
const server = express();
const security = require('./middleware/security')
const auth = require('./middleware/authorization')
const B_dash = require('./controller/adddetail')
const cp = require("cookie-parser");
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then(() => { console.log('Connected to MongoDB'); })
.catch((err) => { console.error('MongoDB connection error:', err); });
server.set('view engine','ejs')
server.set('views','views');
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(cp());
server.use("/logout",(req,res,next)=>{
    res.clearCookie("email");
    res.clearCookie("user");
    res.render('login.ejs');
})
server.use('/signup',signup);
server.use('/login',login);
server.use(security);
server.use(auth);
server.use("/dashboard",B_dash)
// server.use('/detail',)
server.listen(3000,()=>{
    console.log("server run on 3000 port")
});
