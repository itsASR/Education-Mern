const express = require("express");
const TrendingListrouter = express.Router();
const TrendingListModel = require("./Trendinglist");

TrendingListrouter.post("/college", async (req, res) => {
    const { name } = req.body;
    const finddatas = await TrendingListModel.find();
    
   if(finddatas.length > 0){
    
    try {
        const result = await TrendingListModel.updateOne({ index: 0 }, { name: name })
        return res.json({ msg: "List Added" });
    } catch (error) {
        console.error(error);
        return res.json({ msg: "Error in Creating List" });
    }
   }else{
    const resultCreating = await TrendingListModel.create({name , index:0})
    return res.json({ msg: "List Added" });
   }
}) 


// TrendingListrouter.put("/college", async (req, res) => {
//     const { name } = req.body;
//     console.log(name);

//     try {
//         const result = await TrendingListModel.replaceOne({ _id: '666ab4af638d357a299f4fc0' }, { name: name })
//         return res.json({ msg: "List Added", result });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ msg: "Error in Creating List" });
//     }
// });


TrendingListrouter.get("/college", async (req, res) => {
    try {
        const a = await TrendingListModel.find();
        return res.send(a)
    } catch (error) {
        return res.send("error on Server")
    }
})

module.exports = TrendingListrouter;
