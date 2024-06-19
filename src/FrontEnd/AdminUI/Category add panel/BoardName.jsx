import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BoardName() {
    const [informativeBar, setInformativeBar] = useState("")
    const {boarditems, setboarditems , setRefreshPage} = useContext(ContextData)

    const callingNav = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:3000/boardexam/boardnames");
            setboarditems(res.data.data);
            // setNamewithoutdata(res.data.Navdata[0].name);
        } catch (error) {
            console.log("error in getting Board Names", error);
        }
    }; 

    useEffect(() => {
        callingNav();
    }, []);

    

    const senddata = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:3000/boardexam/boardnames", { BoardNames: informativeBar })
            if (response.data.msg === "Exam Name Created Succesful") {
                toast.success(response.data.msg || "Exam Name Created Succesful");
                setInformativeBar("");
                setRefreshPage(Math.random())
            } else {
                toast.warn(response.data.msg)
            }
        } catch (error) {
            toast.error("Server Error", error)
        }
    }


    const handleDelete = async (id) => {
       
        try {
            await axios.delete(`http://127.0.0.1:3000/boardexam/boardnames/${id}`);
            toast.success("Board Name deleted successfully!");
            setRefreshPage(Math.random())
        }catch (error) {
            toast.error("Error deleting Board Name.");
        }
    }

    return (
        <>
            <div className=' bg-yellow-300 text-center py-5'>
                <input type='text' value={informativeBar} placeholder='enter name' onChange={(e) => setInformativeBar(e.target.value)} className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'></input>
                <button className='bg-blue-500 text-white px-4 py-2 ml-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' onClick={() => senddata()}>Save</button>
            </div>
            <div className='bg-white container mx-auto flex justify-center flex-wrap gap-5 py-5'>
                {boarditems.map((names, index) => (
                    <div key={index} className='bg-white shadow-md border border-gray-200 rounded-lg p-4 flex items-center justify-between'>
                        <span className='text-gray-700'>{names.BoardNames}</span>
                        <button
                            className='text-black rounded-full p-2 ml-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                            onClick={() => handleDelete(names._id)}
                        >
                            X
                        </button>
                    </div>
                ))}
                <ToastContainer />
            </div>
        </>
    )
}

export default BoardName