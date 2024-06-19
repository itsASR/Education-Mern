import React, { useContext, useEffect, useState } from 'react';
import { ContextData } from '../../../App';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ParentCategory() {
    const { datas, parentdatas , setRefreshPage } = useContext(ContextData);
    const [parentCatName, setParentCatName] = useState("");
    const [grandCategoryName, setGrandCategoryName] = useState("");

    const dataSend = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:3000/parentcategory", {
                ParentName: parentCatName,
                GrandCategoryName: grandCategoryName
            });
            if(response.data.msg === "Parent Category Created"){
                toast.success(response.data.msg || "Parent Category Created successfully!");
                setParentCatName("");
                setGrandCategoryName("");
            setRefreshPage(Math.random())
            }else{
                toast.warn(response.data.msg)
            }
            
        } catch (error) {
            toast.error("Server Not Working");
        }
    };

    

    const handleDelete = async (Id, ParentName) => {
        try {
            await axios.put(`http://127.0.0.1:3000/parentcategory`, { Id, ParentName })
                .then((res) => toast.success("Deleted Successful"))
                setRefreshPage(Math.random())
        } catch (error) {
            console.error("Error deleting data", error);
        }
    };

 
    return (
        <div className='bg-gray-100 min-h-screen p-5'>
            <div className='text-center mb-5 flex items-center justify-between'>
                <select
                    className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'
                    onChange={(e) => setGrandCategoryName(e.target.value)}
                    value={grandCategoryName}
                >
                    <option >Select a Category</option>
                    {datas.map((item, index) => (
                        <option key={index} value={item.GrandName}>{item.GrandName}</option>
                    ))}
                </select>
                <br />
                <div>
                    <input
                        type='text'
                        placeholder='Enter parent category name'
                        value={parentCatName}
                        onChange={(e) => setParentCatName(e.target.value)}
                        className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 '
                    />
                    <button
                        className='bg-blue-500 text-white px-4 py-2 ml-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-3'
                        onClick={dataSend}
                    >
                        Save
                    </button>
                </div>
            </div>
            <div className='bg-white container mx-auto flex justify-center flex-wrap gap-5 py-5'>
                {parentdatas.map((item, index) => (
                    <React.Fragment key={index}>
                        {item.ParentName.map((finalName, subIndex) => (
                            <div key={subIndex} className='bg-green-400 shadow-md border border-gray-200 rounded-lg p-4 flex items-center justify-between'>
                                <span className='text-gray-700'>{finalName}</span>
                                <button
                                    className='rounded-full p-2 ml-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                                    onClick={() => handleDelete(item._id, finalName)}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}

export default ParentCategory;
