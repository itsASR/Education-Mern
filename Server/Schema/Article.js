const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    ArticleTitle:String,
    ArticleSubTitle:String,
    ArticleGrandCategory:String,
    ArticleParentCategory:String,
    ArticleBody:[], 
    ArticleTags:{},
    course:{
        type:{},
        default:""
    },
    subcourse:{},
    ExamName: String,
    BoardName: String,
    file:String,
    shortdescription:String
}) 


const AricleModel = mongoose.model("AricleModel", ArticleSchema)

module.exports = AricleModel