const express = require("express")
const mongoose = require("mongoose")


const CourseSchema = new mongoose.Schema({
    CourseName: String,
    SubCourseName: []
});


const Courses = mongoose.model("Courses", CourseSchema);

module.exports = Courses;