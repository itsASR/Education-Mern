const mongoose = require("mongoose");

const BandEschema = new mongoose.Schema({
    Title: String,
    Body: [],
    Tags: [],
    ExamName: String,
    BoardName: String
})

const ExamNamesSchema = new mongoose.Schema({
    ExamNames: String
})


const BoardNamesSchema = new mongoose.Schema({
    BoardNames: String
})

const BandE = mongoose.model("BandE", BandEschema);
const ExamnameModel = mongoose.model("ExamnameModel", ExamNamesSchema);
const BoardnameModel = mongoose.model("BoardnameModel", BoardNamesSchema);


module.exports = {BandE , ExamnameModel , BoardnameModel};