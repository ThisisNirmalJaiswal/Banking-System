const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String, required:[true, "name is mandatory"]},
    username:{type:String, unique:[true, "username must be unique"], required:[true, "username is mandatory"]},
    password: {type:String, required:[true, "password is mandatory"]},
    phone: {type:Number, required:[true, "phone is mandatory"]},
    email: {type:String, required:[true, "email is mandatory"]},
    DOB:{type:String, required:[true, "DOB is mandatory and should be in form of [dd-mm-yyyy]"]},
    Aadhar:{type:Number, required:[true, "Aadhar is mandatory"]}
},{timestamps: true});


module.exports = mongoose.model("user", userSchema);