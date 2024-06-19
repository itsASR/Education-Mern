import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function InformativaNavAdmin() {
    const [informativeBar, setInformativeBar] = useState("")
    const [items, setItems] = useState([]);
    const [refreshdata , setRefreshdata] = useState("")


    const callingNav = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:3000/nav/informativebar");
            setItems(res.data.Navdata);
            // setNamewithoutdata(res.data.Navdata[0].name);
        } catch (error) {
            console.log("error in getting nav", error);
        }
    };

    useEffect(() => {
        callingNav();
    }, [refreshdata]);

    
    // useEffect(() => {
    //     callingNav();
    // }, []);

    // console.log("vitems", items)

    const senddata = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:3000/nav/informativebar", { name: informativeBar })
                // .then((res) => console.log("sent", res))
                if(response.data.msg === "Name Saved"){
                    toast.success(response.data.msg || "Name added successfully!");
                    setInformativeBar("");
                    setRefreshdata(Math.random());

                }else{
                    // console.log(response.data.error)
                    toast.warn("Error Found on Server", response.data.error)
                }
        } catch (error) {
            toast.warn("Not Able to Connect with Server", error)
        }
    }


    const handleDelete = async (id) => {
        // console.log(id)
        try {
            await axios.delete(`http://127.0.0.1:3000/nav/informativebar/${id}`);
            // console.log("Name deleted successfully!");
            toast.success("Name deleted successfully!");
            setRefreshdata(Math.random());
        }catch (error) {
            toast.warn("error in frontend axios")
        }
    }

    return (
        <>
            <div className=' bg-purple-300 text-center py-5'>
                <input type='text' placeholder='enter name' value={informativeBar} onChange={(e) => setInformativeBar(e.target.value)} className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'></input>
                <button className='bg-blue-500 text-white px-4 py-2 ml-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' onClick={() => senddata()}>Save</button>
            </div>
            <div className='bg-white container mx-auto flex justify-center flex-wrap gap-5 py-5'>
                {items.map((names, index) => (
                    <div key={index} className='bg-white shadow-md border border-gray-200 rounded-lg p-4 flex items-center justify-between'>
                        <span className='text-gray-700'>{names.name}</span>
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

export default InformativaNavAdmin