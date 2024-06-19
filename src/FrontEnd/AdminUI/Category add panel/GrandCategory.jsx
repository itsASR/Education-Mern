import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ContextData } from '../../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GrandCategory() {
    const [GrandCatName, setGrandCatName] = useState("");
    const { datas, refreshPage, setRefreshPage } = useContext(ContextData);

    const DataSend = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:3000/grandcategory", {
                GrandName: GrandCatName
            });
            if (response.data.msg === "Grand Category Created") {
                toast.success(response.data.msg || "Grand Category added successfully!");
                setGrandCatName("");
                setRefreshPage(Math.random())
            } else {
                toast.warn(response.data.msg)
            }


        } catch (error) {
            toast.error("Server Error.");
            
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:3000/grandcategory/${id}`);
            toast.success("Grand Category deleted successfully!");
            setRefreshPage(Math.random())

        } catch (error) {
            toast.error("Error deleting Grand Category.");
            console.log("Error:", error);
        }
    }; 

    return (
        <div className='bg-white p-5'>
            <div className='pb-10 pt-5'>
                <h1 className='text-4xl text-center font-semibold'>Grand Category</h1>
                <div className='h-2'>
                   
                </div>
            </div>
            <div className='text-center mb-5'>
                <input
                    value={GrandCatName}
                    type='text'
                    placeholder='Enter Grand Category name'
                    onChange={(e) => setGrandCatName(e.target.value)}
                    className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'
                />
                <button
                    className='bg-blue-500 text-white px-4 py-2 ml-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    onClick={DataSend}
                >
                    Save
                </button>
            </div>
            <div className='bg-white container mx-auto flex justify-center flex-wrap gap-5 py-5'>
                {datas.map((names, index) => (
                    <div key={index} className='bg-white shadow-md border border-gray-200 rounded-lg p-4 flex items-center justify-between'>
                        <span className='text-gray-700'>{names.GrandName}</span>
                        <button
                            className='text-black rounded-full p-2 ml-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                            onClick={() => handleDelete(names._id)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}

export default GrandCategory;
