import React, { useContext } from 'react'
import { ContextData } from '../../../../App'
import { useNavigate } from "react-router-dom";

function Blog2() {

  const navigate = useNavigate();
  const { cousenameforblog } = useContext(ContextData)
 

  const singleblogfnc = (blog) => {
        
    navigate("/blog?id="+blog);
} 



  return (
    <>
      <div className='grid grid-cols-3 gap-4 gap-y-20   mx-auto container py-5'>
        {

          cousenameforblog.slice(0,9).map((collegecard , index) => (
            <div className="max-w-sm rounded overflow-hidden shadow-lg " onClick={() => singleblogfnc(collegecard._id)} key={index}>
              <img className="w-full h-60 object-cover" src={collegecard.file} alt="College Picture" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">{collegecard.ArticleTitle}</div>
                <p className="text-gray-700 text-base">
                  {collegecard.shortdescription}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
               


              </div>
            </div>


          ))


        }






      </div>
    </>
  )
}

export default Blog2