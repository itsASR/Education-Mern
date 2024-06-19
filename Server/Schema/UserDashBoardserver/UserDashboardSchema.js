const mongoose = require("mongoose");


const UserDashboardSchema = new mongoose.Schema({
    email:String,
    Education:String,
    DOB:String,
    Interest:String
});

const UserDashboardModel = mongoose.model("UserDashboardModel" , UserDashboardSchema);