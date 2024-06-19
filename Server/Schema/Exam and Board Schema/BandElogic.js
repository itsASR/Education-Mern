const express = require("express");
const BandERouter = express.Router();
const { BandE, ExamnameModel, BoardnameModel } = require("./BandESchema");
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../public"); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

// BandERouter.post("/be", async (req, res) => {
//     const { Title, Body, Tags, ExamName, BoardName } = req.body;
//     console.log(Title, Body, Tags, ExamName, BoardName)
//     try {
//         const mydata = await BandE.create({ Title, Body, Tags, ExamName, BoardName })
//         return res.json({ msg: "Created", mydata })
//     } catch (error) {
//         return res.json({ msg: "Found Error on Server while Creating Post", error })
//     }
// })


BandERouter.post("/be" , upload.single('file') , async (req, res) => {
    const { ArticleTitle, ArticleBody, ArticleTags , ExamName, BoardName } = req.body;
    const file = req.file.path;  
    try {
        const NewArticleCreate = await BandE.create({ Title:ArticleTitle, Body:ArticleBody, Tags:ArticleTags , ExamName, BoardName })
        return res.json({ msg: "Article Created" });
    } catch (error) {
        return res.json({ msg: "Error in creating  Article on Database", error });
    } 
  
})
 

BandERouter.get("/be", async (req, res) => {
    try {
        const data = await BandE.find();
        return res.json({data})
    } catch (error) {
        return res.json({msg:"Error in Getting"})
    }
})



// *******************exam name***************


BandERouter.post("/examnames", async (req, res) => {
    const { ExamNames } = req.body;
    console.log(ExamNames)
    try {
        const data = await ExamnameModel.create({ ExamNames })
        return res.json({ msg: "Exam Name Created Succesful", data })
    } catch (error) {
        return res.json({ msg: "Error in creating Exam Name" })
    }
})

BandERouter.get("/examnames", async (req, res) => {
    try {
        const data = await ExamnameModel.find();
        return res.json({ data })
    } catch (error) {
        return res.json({ msg: "Error in getting Exam Name" })
    }
})


BandERouter.delete("/examnames/:id" , async (req, res) => {
    const { id } = req.params;
    try {
        const nav = await ExamnameModel.findByIdAndDelete(id)
        return res.json({ msg: "Name deleted" })
    } catch (error) {
        return res.json({ msg: "Error in Deleting | Found Error on Server", error })
    }
})


// ******************Board Names*********************


BandERouter.post("/boardnames", async (req, res) => {
    const { BoardNames } = req.body;
    try {
        const data = await BoardnameModel.create({ BoardNames })
        return res.json({ msg: "Exam Name Created Succesful", data })
    } catch (error) {
        return res.json({ msg: "Error in creating Board Name" })
    }
})


BandERouter.get("/boardnames", async (req, res) => {
    try {
        const data = await BoardnameModel.find();
        return res.json({ data })
    } catch (error) {
        return res.json({ msg: "Error in getting Board Name" })
    }
})


BandERouter.delete("/boardnames/:id" , async (req, res) => {
    const { id } = req.params;
    try {
        const nav = await BoardnameModel.findByIdAndDelete(id)
        return res.json({ msg: "Name deleted" })
    } catch (error) {
        return res.json({ msg: "Error in Deleting | Found Error on Server", error })
    }
})




module.exports = BandERouter