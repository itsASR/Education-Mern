const express = require("express");
const PagesRouter = express.Router();
const {AboutusModel , PolicyModel} = require("./PagesSchema");



// ************ About US Logic ******************

PagesRouter.post(("/aboutus"), async (req, res) => {
    const { ArticleBody } = req.body;
    const finddatas = await AboutusModel.find();
    if (finddatas.length > 0) {
        try {
            await AboutusModel.updateOne({ index: 0 }, { ArticleBody: ArticleBody })
            return res.json({ msg: "Page Created" })
        } catch (error) {
            return res.json({ msg: "Error in Creating page", error: error })
        }

    } else {
        const resultCreating = await AboutusModel.create({ ArticleBody, index: 0 })
        return res.json({ msg: "Page Created" });
    }
})

PagesRouter.get("/aboutus", async (req, res) => {
    try {
        const aboutusdata = await AboutusModel.find();
        return res.send(aboutusdata)
    } catch (error) {
        return res.json({ msg: "Error in fetching Data" })
    }
})


// ********************* Policy Logic ***************

PagesRouter.post(("/policy"), async (req, res) => {
    const { ArticleBody } = req.body;
    const finddatas = await PolicyModel.find();
    if (finddatas.length > 0) {
        try {
            await PolicyModel.updateOne({ index: 0 }, { ArticleBody: ArticleBody })
            return res.json({ msg: "Page Created" })
        } catch (error) {
            return res.json({ msg: "Error in Creating page", error: error })
        }

    } else {
        const resultCreating = await PolicyModel.create({ ArticleBody, index: 0 })
        return res.json({ msg: "Page Created" });
    }
})

PagesRouter.get("/policy", async (req, res) => {
    try {
        const aboutusdata = await PolicyModel.find();
        return res.send(aboutusdata)
    } catch (error) {
        return res.json({ msg: "Error in fetching Data" })
    }
})



module.exports = PagesRouter;