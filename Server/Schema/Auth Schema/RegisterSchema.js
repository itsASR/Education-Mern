const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
    name:String,
    number:String,
    email:String,
    password:String,
    education:String,
    DOB:String,
    interest:String,
    isAdmin:Boolean
})

const RegisterModel = mongoose.model("RegisterModel",RegisterSchema);

module.exports = RegisterModel;