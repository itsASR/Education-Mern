const mongoose = require("mongoose");


const AboutusSchema = new mongoose.Schema({
    ArticleBody:[],
    index:Number
});


const PolicySchema = new mongoose.Schema({
    ArticleBody:[],
    index:Number
});


const AboutusModel = mongoose.model("AboutusModel" , AboutusSchema);
const PolicyModel = mongoose.model("PolicyModel" , PolicySchema);


module.exports = {AboutusModel , PolicyModel};