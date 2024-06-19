import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../../../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ExamName() {
    const [informativeBar, setInformativeBar] = useState("")
    const { examitems, setRefreshPage } = useContext(ContextData)



    const senddata = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:3000/boardexam/examnames", { ExamNames: informativeBar })
            // .then((res) => console.log("sent", res))
            if (response.data.msg === "Exam Name Created Succesful") {
                toast.success(response.data.msg || "Exam Name Created Succesful");
                setInformativeBar("");
                setRefreshPage(Math.random())
            } else {
                toast.warn(response.data.msg)
            }
        } catch (error) {
            toast.error("found error in Frontend Error", error)
        }
    }


    const handleDelete = async (id) => {
        console.log(id)
        try {
            await axios.delete(`http://127.0.0.1:3000/boardexam/examnames/${id}`);
            // console.log("Exam Name deleted successfully!");
            toast.success("Exam Name deleted successfully!");
            setRefreshPage(Math.random())
        } catch (error) {
            toast.error("Error deleting Exam Name.");
            // console.log("error in frontend axios")
        }
    }

    return (
        <>
            <div className=' bg-green-300 text-center py-5'>
                <input type='text' placeholder='enter name' value={informativeBar} onChange={(e) => setInformativeBar(e.target.value)} className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'></input>
                <button className='bg-blue-500 text-white px-4 py-2 ml-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' onClick={() => senddata()}>Save</button>
            </div>
            <div className='bg-white container mx-auto flex justify-center flex-wrap gap-5 py-5'>
                {examitems.map((names, index) => (
                    <div key={index} className='bg-white shadow-md border border-gray-200 rounded-lg p-4 flex items-center justify-between'>
                        <span className='text-gray-700'>{names.ExamNames}</span>
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

export default ExamName