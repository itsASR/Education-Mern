const express = require("express");
const router = express.Router();
const RegisterModel = require("./RegisterSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const JWT_SECRET = 'your_secret_key_here';

router.use(express.json());

// Register Route



router.post("/register", async (req, res) => {
    const { name, number, email, password } = req.body;
    try {
        const existingUser = await RegisterModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User Already Registered");
        }

        const hash_password = await bcrypt.hash(password, saltRounds);
        const registerdata = await RegisterModel.create({ name, number, email, password: hash_password, education:" ", interest:" ", DOB:" " , isAdmin:false});
        res.status(201).send("Created Successful");
    } catch (error) {
        res.status(500).send({ error: "Error creating user" });
    }
});


router.put("/register", async (req, res) => {
    const { email, education, interest, DOB } = req.body;
    console.log("helo");
    console.log(email, education, interest, DOB);
    try {
        // Using updateOne to update the specified fields
        let updateuser = await RegisterModel.updateOne(
            { email: email }, // Filter
            { $set: { education: education, interest: interest, DOB: DOB } } // Update fields
        );

        if (updateuser.nModified === 0) {
            return res.status(404).json({ msg: "User not found or no changes made" });
        }

        return res.json({ msg: "Added", updateuser });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error in adding List in register" });
    }
});


// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await RegisterModel.findOne({ email });
        if (!user) {
            return res.status(400).send("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: "Login successful", token, email });
        } else {
            res.json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).send({ error: "Error logging in" });
    }
});



const middlebox = (req, res, next) => {
    const { token,data } = req.body;
   
    try {
        if (token) {
            jwt.verify(token, JWT_SECRET, (err, result) => {
                if (err) {
                    return res.json({ msg: "Not Valid" })
                }
                next();


            })
        }else{
            return res.json({msg:"You are not Sign in "})
        }
    } catch (error) {
        // console.log("this is error in JWT ?protected error router.post")
    }
}

router.post("/protected", middlebox, (req, res) => {
    return res.json({ message: "Valid" })
})



module.exports = { router, middlebox };
