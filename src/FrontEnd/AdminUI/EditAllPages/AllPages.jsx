import React, { useContext } from 'react'
import { ContextData } from '../../../App'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get } from 'mongoose';

function AllPages() {
    const { allBlogs , setRefreshPage } = useContext(ContextData)
   


    const handleDelete = async (id) => {
        let token = localStorage.getItem("token")
        console.log("token", token)
        try {
            const result = await axios.delete(`http://127.0.0.1:3000/article/${id}`, {
                data: {
                    token: token
                }
            });
            if(result.data.msg === "Deleted successfully"){
                toast.success("Article Deleted successfully!");
                setRefreshPage(Math.random())
                
            }
            else{
                toast.warn(result.data.msg);
            }
            

        } catch (error) {
            toast.error("Error in Deleting.");
            
        }
    };




    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
                <div className="grid grid-cols-1 gap-4">
                    {allBlogs.map((blog , index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md  ">
                            <div className='flex'>
                                <img src={blog.file} className='w-20 h-20 mr-5'></img>
                                <h2 className="text-xl font-semibold mb-2">{blog.ArticleTitle}</h2>
                            </div>
                            
                            <div className="flex justify-end">
                               
                                <button onClick={() => handleDelete(blog._id)} className="text-red-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <ToastContainer />
            </div>


        </>
    )
}

export default AllPages