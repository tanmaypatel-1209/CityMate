// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({
//     username:String,
//     email:String,
//     password:String
// })
// module.exports = mongoose.model('User',userSchema);
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type:String, enum: ['User', 'BusinessOwner'] },
    city: String,
    state:String,

})
module.exports = mongoose.model('User', userSchema)