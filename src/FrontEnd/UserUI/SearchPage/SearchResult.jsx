import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ContextData } from '../../../App';
import { useNavigate, useLocation } from "react-router-dom";
import LowerFooter from '../Landing Pages/LowerFooter';

function SearchResult() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name'); 
    const { setShowbar, allBlogs, SearchResultdata, setSearchResultdata, setSearchQuery, SearchQuery } = useContext(ContextData);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const singleblogfnc = (blogId) => {
        navigate("/blog?id=" + blogId);
    }

    

    useEffect(() => {
        if (name) {
            setSearchQuery(name);
        }
        else{
            setSearchQuery(" ")
        }
    }, [name, setSearchQuery]);

    useEffect(() => {
        if (!SearchResultdata.length) {
            setError('No results found');
        } else {
            setError('');
        }
    }, [SearchResultdata]);

 

    return (
        <>
            
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-8">All Blogs</h1>
                {error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    SearchResultdata.map((blog, index) => (
                        <div key={index} className="flex bg-white shadow-md rounded-lg p-6 mb-6 cursor-pointer" onClick={() => singleblogfnc(blog._id)}>
                            <div>
                                <img src={blog.file} alt="Blog" className="w-20 h-20 rounded-lg object-cover" />
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
            <LowerFooter></LowerFooter>
        </>
    );
}

export default SearchResult;
