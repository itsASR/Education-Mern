import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ContextData } from '../../../App';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LowerFooter from '../Landing Pages/LowerFooter';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import SubscribeForm from '../AuthPages/SubscribeForm';

const SocialMediaLinks = () => (
    <div className='bg-white border border-gray-200 sticky top-10 mt-10 text-2xl text-center mx-auto flex flex-col justify-between'>
        <a href='http://www.facebook.com/sharer/sharer.php?u=http://www.google.com/blog?id=6663eb2b9883ad96bd2ae8fc&title=i am title baby' target='_blank' rel="noopener noreferrer">
            <FaFacebookF className='text-blue-500 m-4 hover:scale-150 transition-transform duration-200' />
        </a>
        <FaTwitter className='text-blue-500 m-4 hover:scale-150 transition-transform duration-200' />
        <FaLinkedinIn className='text-blue-500 m-4 hover:scale-150 transition-transform duration-200' />
    </div>
);



 

const SingleBlogTemplate = () => {
    const [printBlog, setPrintBlog] = useState({});
    const [tags, setTags] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const { allBlogs } = useContext(ContextData);
    const navigate = useNavigate();

    const singleblogfnc = (blog) => {
        navigate("/blog?id="+blog);
      };
    

   
    useEffect(() => {
        const blog = allBlogs.find(blogdata => blogdata._id === id);
        if (blog) {
            setPrintBlog(blog);
            setTags(blog.ArticleTags?.split(',') || []);
        }
    }, [id, allBlogs]);

    return (
        <>
          
            <div className='flex'>
                <div id='left-widget'>
                    <SocialMediaLinks />
                </div>
                <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
                    <h1 className="text-3xl font-bold mb-4">{printBlog.ArticleTitle}</h1>
                    <div className="text-gray-700 mb-6">
                        <div dangerouslySetInnerHTML={{ __html: printBlog.ArticleBody }} />
                    </div>
                    <div className="flex space-x-2  flex-wrap gap-y-4">
                        {tags.map((tag, index) => (
                            <span className="bg-blue-100 text-blue-500 text-sm font-medium mr-2 px-2.5 py-0.5 rounded" key={index}>
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div id='right-div' className='w-96 mr-16  top-10 py-10'>
                    <div className=' border border-gray-200 px-10 pb-10'>
                        <h1 className='border-b-2 border-gray-300 pb-5 pt-5 text-xl font-semibold'>Latest Post</h1>
                        {allBlogs.slice(0,4).map((blogs, index) => (
                            <div key={index} className='flex  pt-5 border-b-2 border-gray-300 pb-5 ' onClick={() => singleblogfnc(blogs._id)}>
                                
                                  <img src= {blogs.file} className='w-14 h-14 rounded-xl mr-2 object-cover cursor-pointer' alt='Latest Post Thumbnail' />
                                <h1 className='text-gray-700 text-start cursor-pointer'>{blogs.ArticleTitle}</h1>
                            </div>
                        ))}
                        <Link to="/search?name="><span className='float-end pt-2 text-sm hover:text-blue-500'>Show All</span></Link>
                    </div>
                    <div className='  my-10' >
                    <SubscribeForm></SubscribeForm>
                        
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default SingleBlogTemplate;
