import React, { useContext, useEffect, useState } from 'react';
import Blog1 from './Informative Sub Section/Blog1';
import Blog2 from './Informative Sub Section/Blog2';
import { ContextData } from '../../../App';
import axios from 'axios';

function InformationSection() {

    const [items, setItems] = useState([]);
    const [namewithoutdata, setNamewithoutdata] = useState("");
    const [indexNumber, setIndexNumber] = useState(0);
    const { allcollegeinfo, setAllcollegeinfo, cousenameforblog, setCousenameforblog } = useContext(ContextData);
    const [coursenameSearch, setCoursenameSearch] = useState(namewithoutdata);


  
  
    useEffect(() => {
        if (coursenameSearch.length < 1) {
            setCoursenameSearch(namewithoutdata);
        }
    }, [namewithoutdata]);

    const callingNav = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:3000/nav/informativebar");
            setItems(res.data.Navdata);
            setNamewithoutdata(res.data.Navdata[0].name);
        } catch (error) {
            console.log("error in getting nav", error);
        }
    };

    useEffect(() => {
        callingNav();

    }, []);


    const checking = () => {
        const filteredArr = allcollegeinfo.filter((items)=>items.course.split(',').includes(coursenameSearch))
        setCousenameforblog(filteredArr);  
    };


    function setStates(e, index) {
        setIndexNumber(index);
        setCoursenameSearch(e.target.innerText);

    }

    useEffect(() => {
        checking();
    }, [allcollegeinfo, items, indexNumber , namewithoutdata , coursenameSearch])



    return (
        <>
            <div className='pt-10 pb-5 border-b border-gray-400'>
                <ul className='flex justify-center [&>*]:mx-5 font-semibold'>
                    {items.map((name, index) => (
                        <li
                            key={index}
                            onClick={(e) => setStates(e, index)}
                            className={`cursor-pointer ${index === indexNumber ? 'border-b-2 border-green-800' : ''}`}
                        >
                            {name.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className='min-h-96 border-t-2 border-black'>
                <Blog2 />
            </div>
        </>
    );
}

export default InformationSection;
