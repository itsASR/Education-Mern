import React, { useContext, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import OptionsSubMenu from '../Options Sub Menu/OptionsSubMenu';
import OptionsSubMenu1 from '../Options Sub Menu/OptionsSubMenu1';
import { ContextData } from '../../../../../App';



function SubMenu1() {


  let suboptions = [<OptionsSubMenu />]
  const [IndexValue, setIndexValue] = useState(0)
  const { tempSubHeading, setTempSubHeading, subParentTemp, setSubParentTemp, categories, setCategories, searchSub, setSearchSub, subCatData, setSubCatData, allBlogs, setAllBlogs, SingleBlog, setSingleBlog, datas, setDatas, parentdatas, setParentdatas } = useContext(ContextData)
  const ref = useRef()
  //console.log(searchSub)  //yh ho rha h change eske change hne par set Value krni bhai 0

  function changingdata() {
    setTempSubHeading("")
    // console.log("i am caaling")

  }

  function setmenuoptionsfunc(e) {

    setSubParentTemp(e.target.innerText)
    // setIndexValue(index)


  }

  useEffect(() => {
    changingdata();
  }, [searchSub])

  return (
    <>
      <div className='flex text-black fixed top-11 left-1/2 transform -translate-x-1/2 pt-1  mx-auto justify-center ' >
        <div className='text-center bg-white min-w-[300px]'>
          {

            subCatData.map((names, index) => (
              <div key={index} className=' cursor-pointer flex justify-between items-center px-10 py-2 border-b  border-gray-200 hover:bg-gray-100' onMouseEnter={(e) => setmenuoptionsfunc(e)} >
                <span> {names}</span>
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            ))
          }

        </div>
        <div className=' w-[600px]' >
          <p>{
            suboptions
          }</p>
        </div>
      </div>
    </>
  )
}

export default SubMenu1