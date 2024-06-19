const mongoose = require("mongoose");


const ParentSchema = new mongoose.Schema({
    GrandCategoryName: String,
    ParentName: []
})

const ParentCategory = mongoose.model("ParentCategory", ParentSchema)


module.exports = ParentCategory;