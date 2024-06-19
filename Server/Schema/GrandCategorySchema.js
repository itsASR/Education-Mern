const mongoose = require("mongoose");


const GrandSchema = new mongoose.Schema({
    GrandName: String
})

const GrandCategory = mongoose.model("GrandCategory", GrandSchema)


module.exports = GrandCategory;