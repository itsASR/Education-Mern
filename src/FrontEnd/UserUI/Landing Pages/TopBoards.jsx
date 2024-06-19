import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ContextData } from '../../../App';

function TopBoards() {
const [ myarray , setMyarray] = useState([])
const { allcollegeinfo } = useContext(ContextData)
  let arr = []; 
  const navigate = useNavigate();

  const singleblogfnc = (name) => {

    navigate("/search?name=" + name);
  }
 
  function checking(){
    const onlyshow = allcollegeinfo.slice(0, 20)
    onlyshow.map((names) => {
      let oo = arr.includes(names.BoardName)
      if (!oo) {
        if (names.BoardName !== "" && names.BoardName !== undefined) {
          arr.push(names.BoardName)
        }
        
      }
      }
      )
    setMyarray(arr)
  }

  useEffect(() => {
    checking()
  }, [allcollegeinfo])

 

  return (
    <>
      <div className='bg-gray-300 py-10 px-28 my-2'>
        <h1 className='pb-10 text-2xl font-semibold '>Top Boards in India</h1>
        <div className='container mx-auto flex justify-center flex-wrap gap-2'>

          {
            myarray.map((exam , index) => (
              <span className='px-4 py-2 border text-sm  border-black rounded-3xl' onClick={() =>singleblogfnc(exam)} key={index}>{exam}</span>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default TopBoards