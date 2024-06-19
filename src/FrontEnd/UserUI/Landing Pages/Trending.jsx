import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Trending() {
  const [universities, setUniversities] = useState([])
  const navigate = useNavigate();

  const singleblogfnc = (name) => { 
    try {
        let decodedName = decodeURIComponent(name);
        let encodedName = encodeURIComponent(decodedName);
        navigate("/search?name=" + encodedName);
    } catch (error) {
        console.error("Error decoding/encoding name:", error);
    }
}



  const handeldataget = async () => {
    try {
      const datas = await axios.get("http://127.0.0.1:3000/trending/college")
      datas.data.map((name ,index) => {
        setUniversities(name.name)

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
      <div className='bg-gray-300 py-10 px-28'>
        <h1 className='pb-10 text-2xl font-semibold '>Trending Colleges & Universities</h1>
        <div className='container mx-auto flex justify-center flex-wrap gap-2'>

          {
            universities.map((exam , index) => (
                <span className='px-4 py-2 border text-sm  border-black rounded-3xl' onClick={() =>singleblogfnc(exam)} key={index}>{exam}</span>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Trending