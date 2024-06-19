const express = require("express");
const RegisterModel = require("../Auth Schema/RegisterSchema");
const UserDashboardRouter = express.Router();
// const UserDashboardModel = require("./UserDashboardSchema");

UserDashboardRouter.post("/userdashboard", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await RegisterModel.findOne({ email });
        if (user) {
            res.status(200).send(user); // Send user data when found
        } else {
            console.log("User not found");
            res.status(404).send("User not found"); // Send response when user not found
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error"); // Send response in case of an error
    }
});

module.exports = UserDashboardRouter;
