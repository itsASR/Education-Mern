const mongoose = require("mongoose")

const InformativeNavBarSchema = new mongoose.Schema({
    name:String
})

const InformativeNavBar = mongoose.model("InformativeNavBar" , InformativeNavBarSchema)

module.exports = InformativeNavBar;