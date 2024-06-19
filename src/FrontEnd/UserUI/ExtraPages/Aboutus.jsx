import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Aboutus() {
const [aboutusapidata , setAboutusapidata] = useState("")


  const getaboutuspage = async () => {
    try {
      const aboutusdata = await axios.get("http://127.0.0.1:3000/pagerouter/aboutus")
      setAboutusapidata(aboutusdata.data)
    } catch (error) {
      console.log('error in about us ', error)
    }
  }


  useEffect(() => {
    getaboutuspage();
  }, [])


  return (
   <>
   <div className='container mx-auto py-5'>
   { aboutusapidata && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: aboutusapidata[0].ArticleBody }} />
        </div>
      )}
   </div>
   
   </>
  )
}

export default Aboutus