import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../../../App';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TrendingCollegeList() {
    const [myarray, setMyarray] = useState([])
    const { allcollegeinfo } = useContext(ContextData)
    const [trendingCollegeList, setTrendingCollegeList] = useState([])
    const [abhi, setAbhi] = useState([])





    let arr = [];

    useEffect(() => {
        setTrendingCollegeList(abhi);
    }, [abhi])

    function checkSubboxFunc(target) {
        target.preventDefault();
        const { value, checked } = target.target;

        if (checked) {
            console.log('Checked', value)
            setTrendingCollegeList([...trendingCollegeList, value]);

        } else {
            console.log('unChecked', value)
            setTrendingCollegeList(trendingCollegeList.filter((e) => e !== value));
        }
    }

    // i have to work here abhishek 

    function checking() {
        allcollegeinfo.map((college) => {
            let oo = arr.includes(college.ArticleTitle)
            if (!oo) {
                arr.push(college.ArticleTitle)
                setMyarray(arr)


            }
        })
    }

    useEffect(() => {
        checking();
    }, [allcollegeinfo])


    // *******Send data to Server************

    const handeldatasend = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:3000/trending/college", { name: trendingCollegeList })
            toast.success(res.data.msg)
        } catch (error) {
            toast.error("Server Error 0002")
        }
    }


    const handeldataget = async () => {
        try {
            const datas = await axios.get("http://127.0.0.1:3000/trending/college")
            datas.data.map((name) => {
                setAbhi(name.name)


            })

        } catch (error) {
            console.log("error in frontend", error)
        }
    }



    useEffect(() => {
        handeldataget();
    }, [])

    return (
        <>
            <h1 className='text-4xl font-semibold text-center py-4'>Add Colleges to Trending List</h1>
            <div className='container bg-green-200 mx-auto flex flex-wrap justify-center gap-6 p-6 rounded-lg shadow-lg'>

                {myarray && myarray.map((names, index) => (
                    <div key={index} className='flex items-center space-x-2'>

                        {abhi && <input
                            type='checkbox'
                            value={names}
                            checked={abhi.includes(names)}

                            onChange={(e) => {
                                const { value, checked } = e.target;
                                setAbhi(prevState =>
                                    checked ? [...prevState, value] : prevState.filter(item => item !== value)
                                );
                            }}
                            className='form-checkbox h-5  w-5 text-blue-600'
                        />}
                        <label className='text-lg'>{names}</label>
                    </div>
                ))}


            </div>
            <div className='flex justify-center text-center container mt-4'>
                <button
                    onClick={handeldatasend}
                    className='bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors'
                >
                    Submit
                </button>
            </div>
            <ToastContainer />
        </>

    )
}

export default TrendingCollegeList