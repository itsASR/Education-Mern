import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ContextData } from "../../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddSubCourse() {
  const { courseList, setRefreshPage } = useContext(ContextData);
  const [CourseName, setCourseName] = useState("");
  const [SubCourseName, setSubCourseName] = useState("");

  const addcourseName = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/categoryapi/addcourse",
        { CourseName, SubCourseName }
      );
      if(response.data.msg === "Created Successful"){
        toast.success(response.data.msg || "Sub-Course added successfully!");
        setCourseName("");
        setSubCourseName("");
        setRefreshPage(Math.random());
      }
      else{
        toast.warn(response.data.msg)
      }
    } catch (error) {
      toast.error("Error on Server");
      // console.log("Error:", error);
    }
  };
 
  const removeCourseName = async (courseId, subCourseName) => {
    try {
      await axios
        .put("http://127.0.0.1:3000/categoryapi/removesubcourse", {
          courseId,
          subCourseName,
        })
        .then((res) => console.log("res", res));
      toast.success("Course deleted successfully!");
      setRefreshPage(Math.random());
    } catch (error) {
        toast.error("Error deleting Sub-Course.");
        console.log("Error:", error); 
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => setCourseName(e.target.value)}
          value={CourseName}
        >
          <option value="" disabled>
            Select Course
          </option>
          {courseList.map((data) => (
            <option key={data._id} value={data.CourseName}>
              {data.CourseName}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2 text-center">
        <input
          type="text"
          placeholder="Enter Branch/Subject Name like-CS, IT, ME"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          onChange={(e) => setSubCourseName(e.target.value)}
          value={SubCourseName}
        />
        <button
          className="ml-3 w-20 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={addcourseName}
        >
          Save
        </button>
      </div>
      <div id="Current Course" className="space-y-2">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Current Courses
        </label>
        <div className="border border-gray-300 w-full p-3 flex flex-wrap gap-4">
          {courseList.map((data) =>
            data.SubCourseName.map((subCourse, index) => (
              <span
                key={`${data._id}-${index}`}
                className="p-2 rounded-md  flex items-center"
              >
                {subCourse}
                <button
                  className="ml-1 px-2 bg-gray-200 rounded-full"
                  onClick={() => removeCourseName(data._id, subCourse)}
                >
                  x
                </button>
              </span>
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddSubCourse;
