import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../../../App';
import { useNavigate } from 'react-router-dom';

function TredingCourse() {
  const [myarray, setMyarray] = useState([])
  const { allcollegeinfo } = useContext(ContextData)

  const navigate = useNavigate();

  const singleblogfnc = (name) => {

    navigate("/search?name=" + name);
  }
  let arr = [];
  let arr2 = [];

  function checking() {
    allcollegeinfo.forEach((college) => {
      let separatedArray = college.course.split(",");
      arr2.push(separatedArray)
      arr2.map((myarray) => {
        myarray.map((mysinglearr) => {
          let checkincudes = arr.includes(mysinglearr);
          if (!checkincudes) {
            if (mysinglearr !== '') {
              arr.push(mysinglearr)
              

            }
            
          }

        })
        const showonly = arr.slice(0, 20);
        setMyarray(showonly);
      })
    });
  }

  useEffect(() => {
    checking();
  }, [allcollegeinfo])

  return (
    <>
      <div className='bg-gray-300 py-10 px-28'>
        <h1 className='pb-10 text-2xl font-semibold '>Trending Courses</h1>
        <div className='container mx-auto flex justify-center flex-wrap gap-2'>

          {
            myarray.map((exam, index) => (
              <span className='px-4 py-2 border text-sm  border-black rounded-3xl' onClick={() => singleblogfnc(exam)} key={index}>{exam}</span>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default TredingCourse