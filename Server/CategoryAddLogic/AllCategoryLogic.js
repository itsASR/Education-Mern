const express = require("express");
const mongoose = require("mongoose");
const Courses = require("../Schema/CourseSchema")
const AllCategoryRouter = express.Router();


AllCategoryRouter.use(express.json());
AllCategoryRouter.use(express.urlencoded({ extended: true }));


AllCategoryRouter.post("/addcourse", async (req, res) => {
    const { CourseName, SubCourseName } = req.body;
    try {
        let findcoursename = await Courses.findOne({ CourseName: CourseName })
        if (!findcoursename) {
            const storeCourse = await Courses.create({ CourseName, SubCourseName })
            res.json({ msg: "Created Successful", storeCourse })
        }
        else {
            findcoursename.SubCourseName.push(SubCourseName);
            await findcoursename.save();
            res.json({ msg: "Created Successful", findcoursename });
        }

    } catch (error) {
        res.json({ msg: "Error in Creating Name", error })
    }
})

AllCategoryRouter.get("/addcourse", async (req, res) => {
    try {
        const courseList = await Courses.find();
        res.json({ msg: "CourseList", courseList })
    } catch (error) {
        res.json({ error })
    }
})


AllCategoryRouter.delete("/addcourse", async (req, res) => {
    const { id } = req.body;
    
    try {
        let deliting = await Courses.findByIdAndDelete(id)
        res.json({ msg: "deleted", deliting })
    } catch (error) {
        res.json({ msg: "error in deleting", error })
    }

})
 

AllCategoryRouter.put("/removesubcourse", async (req, res) => {
    const { courseId, subCourseName } = req.body;
    try {
        let course = await Courses.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }
        course.SubCourseName = course.SubCourseName.filter(sub => sub !== subCourseName);
        await course.save();
        res.status(200).json({ msg: "Sub-course removed successfully", course });
    } catch (error) {
        res.status(500).json({ msg: "Error in removing sub-course", error });
    }
});

module.exports = AllCategoryRouter;