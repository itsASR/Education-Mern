import React from 'react'
import { Link } from 'react-router-dom'

function Pages() {
  return (
    <>
      <div className=" ">
        <div className="grid grid-cols-3 gap-4 justify-center items-center  py-10 container mx-auto">

          <Link to="/adminpage/createaboutus"><div className="w-80 h-40 rounded-lg bg-red-300 mx-auto text-center flex justify-center items-center hover:bg-gray-200">
            <span className="text-4xl font-semibold">Create About Us</span>
          </div></Link>


          <Link to="/adminpage/createpolicy"><div className="w-80 h-40 rounded-lg bg-blue-300 mx-auto text-center flex justify-center items-center hover:bg-gray-200">
            <span className="text-4xl font-semibold">
              Create Privacy Policy
            </span>
          </div></Link>



          <div className="w-80 h-40 rounded-lg bg-gray-300 mx-auto text-center flex justify-center items-center hover:bg-gray-200">
            <span className="text-4xl font-semibold">
              Comming Soon
            </span>




          </div>
        </div>
        </div>
      </>
      )
}

      export default Pages