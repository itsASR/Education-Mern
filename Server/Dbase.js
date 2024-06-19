const mongoose = require("mongoose");

const db = async() => {
    await mongoose.connect("mongodb://127.0.0.1:27017/EasyEducation")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("Error in DB Connection", err));
}

db();

module.exports = db;