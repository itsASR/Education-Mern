import axios from "axios";
import React, { useContext, useState } from "react";
import { ContextData } from "../../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCourse() {
  const [CourseName, setCourseName] = useState("");
  const { courseList, datas, refreshPage, setRefreshPage } =
    useContext(ContextData);

  const addcourseName = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/categoryapi/addcourse",
        { CourseName }
      );
      if(response.data.msg === "Created Successful"){
        toast.success(response.data.msg || "Course added successfully!");
        setCourseName("");
        setRefreshPage(Math.random());

      }
      else{
        toast.warn(response.data.msg)
      }
    } catch (error) {
      toast.error("Error adding Course.");
      console.log("Error:", error);
    }
  };

  const removeCourseName = async (id) => {
    try {
      await axios.delete("http://127.0.0.1:3000/categoryapi/addcourse", {
        data: { id },
      });
      toast.success("Course deleted successfully!");
      setRefreshPage(Math.random());
    } catch (error) {
      toast.error("Error deleting Course.");
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="p-4 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
        <div className="space-y-2  text-center">
          <input
            type="text"
            value={CourseName}
            placeholder="Enter Course Name"
            className=" px-3 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setCourseName(e.target.value)}
          ></input>
          <button
            className="ml-3 w-20 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => addcourseName()}
          >
            Save
          </button>
        </div>
        <div id="Current Course">
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tags"
            >
              Current Courses
            </label>
            <div className="border border-gray-300 w-full  p-3 flex flex-wrap justify-center gap-4 text-center items-center">
              {courseList.map((data , index) => (
                <span className="p-2 rounded-md bg-red-200 h-10 " key={index}>
                  {data.CourseName}
                  <button
                    className=" ml-1 px-1 bg-gray-200 rounded-full"
                    onClick={() => removeCourseName(data._id)}
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default AddCourse;
