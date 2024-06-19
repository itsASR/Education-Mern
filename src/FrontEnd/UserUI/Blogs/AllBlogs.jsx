import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ContextData } from '../../../App';
import { useNavigate } from "react-router-dom";


function AllBlogs() {
    
    
    const {  allBlogs } = useContext(ContextData)
    const navigate = useNavigate();
    const error = ''

 

    const singleblogfnc = (blog) => {
        
        navigate("/blog?id="+blog);
    } 


   
    return (
        <>
        
        <div className="container mx-auto p-6 ">
            <h1 className="text-3xl font-bold mb-8">All Blogs</h1>
            {error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                allBlogs.map((blog, index) => (
                    <div key={index} className="flex bg-white shadow-md rounded-lg p-6 mb-6 cursor-pointer" onClick={() => singleblogfnc(blog._id)}>
                        <div>
                            <img src="https://picsum.photos/200" alt="Blog" className="w-20 h-20 rounded-lg" />
                        </div>
                        <div className="ml-4">
                            <h2 className="text-xl font-bold">{blog.ArticleTitle}</h2>
                            <p className="text-gray-700 mt-2">
                                {blog.ShortDescription || 'This is a short description. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id tempora ad earum laborum modi sequi laudantium reprehenderit placeat sit sunt.'}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
        
        
        </>
    );
}

export default AllBlogs;
