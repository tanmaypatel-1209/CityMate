const mongoose= require('mongoose');
const options = {
    discriminatorKey: "serviceType"
};
const detailSchema = new mongoose.Schema({
    serviceName:String,
    // serviceType:String,
    description:String,
    contect_no:String,
    address:String,
    city:String,
    state:String,
    pincode:String,
    website:String,
    Urls :[String],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

}, options);
module.exports = mongoose.model("Service",detailSchema);