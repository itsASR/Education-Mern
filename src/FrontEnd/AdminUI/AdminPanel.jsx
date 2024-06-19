import React from "react";
import { Link } from "react-router-dom";

function AdminPanel() {
  return (
    <>
      <div className=" ">
        <div className="grid grid-cols-3 gap-4 justify-center items-center  py-10 container mx-auto">
          <Link to="/adminpage/article">
            <div className="w-80 h-40 rounded-lg bg-red-300 mx-auto text-center flex justify-center items-center hover:bg-gray-200">
              <span className="text-4xl font-semibold">Create Article</span>
            </div>
          </Link>
          <Link to="/adminpage/college">
            <div className="w-80 h-40 rounded-lg bg-blue-300 mx-auto text-center flex justify-center items-center hover:bg-gray-200">
              <span className="text-4xl font-semibold">
                Create College Blog
              </span>
            </div>
          </Link>


          <Link to="/adminpage/be"><div className="w-80 h-40 rounded-lg bg-yellow-300 mx-auto text-center flex justify-center items-center hover:bg-gray-200">
            <span className="text-4xl font-semibold">
              Create Board and Exam Article
            </span>
          </div></Link>

          <Link to="/adminpage/addcategory">
            <div className="w-80 h-40 rounded-lg bg-green-300 mx-auto text-center flex justify-center items-center hover:bg-gray-200">
              <span className="text-4xl font-semibold">Add Category</span>
            </div>
          </Link>
          <Link to="/addpages">
            <div className="w-80 h-40 rounded-lg bg-purple-300 mx-auto text-center flex justify-center items-center hover:bg-gray-200">
              <span className="text-4xl font-semibold">Edit Pages & Images</span>
            </div>
          </Link>
          <Link to="/all">
            <div className="w-80 h-40 rounded-lg bg-indigo-300 mx-auto text-center flex justify-center items-center hover:bg-gray-200">
              <span className="text-4xl font-semibold">All Articles</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
