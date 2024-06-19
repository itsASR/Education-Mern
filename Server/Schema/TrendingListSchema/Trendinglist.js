const mongoose = require("mongoose")

const TrendingListSchema = new mongoose.Schema({
    name:[],
    index:Number
    
})


const TrendingListModel = mongoose.model("TrendingListModel" , TrendingListSchema);


module.exports = TrendingListModel