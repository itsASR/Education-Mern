const express = require("express");
const InformativeNavBarRouter = express.Router();
const InformativeNavBar = require("./InformativeNavBar");

InformativeNavBarRouter.use(express.json());

InformativeNavBarRouter.post("/informativebar", async (req, res) => {
    const { name } = req.body;
    try { 
        const nav = await InformativeNavBar.create({ name });
        return res.json({ msg: "Name Saved", nav })
    } catch (error) {
        return res.json({ msg: "Found Error on Server", error })
    }
})

InformativeNavBarRouter.get("/informativebar", async (req, res) => {
    try {
        const Navdata = await InformativeNavBar.find()
        return res.json({ msg: "Informative navBar Data", Navdata })
    } catch (error) {
        return res.json({ msg: "error getting Data from Server", error })
    }
})

InformativeNavBarRouter.delete("/informativebar/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const nav = await InformativeNavBar.findByIdAndDelete(id)
        return res.json({ msg: "Name deleted", nav })
    } catch (error) {
        return res.json({ msg: "Error in Deleting | Found Error on Server", error })
    }
})





module.exports = InformativeNavBarRouter;