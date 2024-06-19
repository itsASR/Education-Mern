const express = require("express");
const app = express();
const db = require("./Dbase")
const GrandCategory = require("./Schema/GrandCategorySchema")
const ParentCategory = require("./Schema/ParentcategorySchema")
const cors = require("cors")
const AricleModel = require("./Schema/Article")
const {router , middlebox } = require("./Schema/Auth Schema/Auth")
const AllCategoryRouter = require("./CategoryAddLogic/AllCategoryLogic")
// const CollegeRouter = require("./Schema/College Schema and js/CollegeBrocherLogic")
const InformativeNavBarRouter = require("./Schema/InformativeNav Schema/InformativeNavBarLogic")
const BandERouter = require("./Schema/Exam and Board Schema/BandElogic")
const TrendingListrouter = require("./Schema/TrendingListSchema/TrendingListLogic")
const multer = require('multer');
const UserDasboardRouter = require("./Schema/UserDashBoardserver/UserDasboardLogic")
const PagesRouter = require("./Schema/Pages Schema/PagesLogic")


const port = 3000;

app.use(express.json());
app.use(cors());

 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../public"); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

app.use("/auth",router);
app.use("/categoryapi", AllCategoryRouter)
app.use("/nav", InformativeNavBarRouter)
app.use("/boardexam", BandERouter)
app.use("/trending", TrendingListrouter)
app.use("/user", UserDasboardRouter)
app.use("/pagerouter", PagesRouter)



app.get("/", (req, res) => {
    return res.send("Hello, I am Node");
});

app.post("/grandcategory", async (req, res) => {
    const { GrandName } = req.body;

    try {
        const newGrandCategory = await GrandCategory.create({ GrandName });
        return res.json({msg:"Grand Category Created"})
        // res.status(201).send(newGrandCategory);
    } catch (error) {
        return res.status(500).send({ error: "Error creating grand category" });
    }
});

app.post("/grandcategorys", async (req, res) => {
   
    try {
        const grandCategories = await GrandCategory.find();
        return res.status(200).send(grandCategories);
    } catch (error) {
        return res.status(500).send({ error: "Error fetching grand categories" });
    }
});

app.delete("/grandcategory/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        await GrandCategory.findByIdAndDelete(id);
        return res.status(200).send({ message: "GrandCategory deleted successfully" });
    } catch (error) {
        return res.status(500).send({ error: "Error deleting grand category" });
    }
});

// **********Parent category***************



app.post("/parentcategory", async (req, res) => {
    const { ParentName, GrandCategoryName } = req.body;

    try {
        const parentCategory = await ParentCategory.findOne({ GrandCategoryName: GrandCategoryName });
        if (parentCategory) {

            parentCategory.ParentName.push(ParentName);
            await parentCategory.save();
            // return res.status(200).send(parentCategory);
            return res.json({msg:"Parent Category Created"})
        }
        else {

            const newParentCategory = await ParentCategory.create({ ParentName, GrandCategoryName });
            return res.json({msg:"Parent Category Created"})
        }
    } catch (error) {
        return res.json({ error: "Error creating Parent category" });
    }
});

app.post("/parentcategorys", async (req, res) => {
    try {
        const parentCategories = await ParentCategory.find();
        return res.status(200).send(parentCategories);
    } catch (error) {
        return res.status(500).send({ error: "Error fetching Parent categories" });
    }
});



app.put("/parentcategory", async (req, res) => {
    const { Id, ParentName } = req.body;
    try {
        let parent = await ParentCategory.findById(Id);
        if (!parent) {
            return res.status(404).json({ msg: "parent not found" });
        }
        parent.ParentName = parent.ParentName.filter(sub => sub !== ParentName);
        await parent.save();
        return res.status(200).json({ msg: "Sub-course removed successfully", parent });
    } catch (error) {
        return res.status(500).json({ msg: "Error in removing sub-course", error });
    }
});

// ****************Article ********************

app.post("/createArticle" , upload.single('file') , async (req, res) => {
    const { ArticleTitle, ArticleSubTitle, ArticleGrandCategory, ArticleParentCategory, ArticleBody, ArticleTags , course, subcourse , ExamName , BoardName , shortdescription} = req.body;
    const file = req.file.path;  
    try {
        const NewArticleCreate = await AricleModel.create({ file , ArticleTitle, ArticleSubTitle, ArticleGrandCategory, ArticleParentCategory, ArticleBody, ArticleTags , course, subcourse , ExamName , BoardName , shortdescription })
        return res.json({ msg: "Article Created" });
    } catch (error) {
        return res.json({ msg: "Error in creating  Article on Database", error });
    } 
  
})
app.get("/createArticle", async (req, res) => {
    try {
        let articles = await AricleModel.find();
        return res.send(articles);
    } catch (error) {
        return res.status(500).send(error);
    }
});


app.post("/createArticles", async (req, res) => {
    try {
        let articles = await AricleModel.find();
        return res.send(articles);
    } catch (error) {
        return res.status(500).send(error);
    }
});


app.delete("/article/:id",middlebox, async (req, res) => {
    const { id } = req.params;
    
    try {
        await AricleModel.findByIdAndDelete(id);
        return res.send({ msg: "Deleted successfully" });
    } catch (error) {
        return res.send({ msg: "Error Deleting Article" });
    }
});



app.listen(port, () => {
    console.log("Server is live at port", port);
});
