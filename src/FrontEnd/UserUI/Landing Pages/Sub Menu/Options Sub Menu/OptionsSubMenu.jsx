import React, { useContext, useEffect, useState } from 'react';
import { ContextData } from '../../../../../App';
import { useNavigate } from 'react-router-dom';

function OptionsSubMenu() {
  const { subParentTemp, allBlogs, subCatData, setTempSubHeading, tempSubHeading, showArrow, setShowArrow } = useContext(ContextData);
  const [Abhi, setAbhi] = useState([]);
  const navigate = useNavigate();
  // Initialize pop with the first element of subCatData
  const pop = subCatData[0];

  const getSubTitleFunc2 = () => {
    const SubTitleArr2 = allBlogs
      .filter(blog => blog.ArticleParentCategory === pop)
      .map(blog => blog.ArticleSubTitle);
    setAbhi(SubTitleArr2);
  };

  const getIDfunc = (ee) => {
    console.log(ee)
    const myId = allBlogs && allBlogs.filter(blog => blog.ArticleSubTitle?.trim() === ee);
    if (myId.length > 0) {
      let IDData = (myId[0]._id);
      singleblogfnc(IDData);
      setShowArrow(false)
      return
    }
    console.log("No filter")
  };

  useEffect(() => {
    const getSubTitleFunc = () => {
      const SubTitleArr = allBlogs
        .filter(blog => blog.ArticleParentCategory === subParentTemp)
        .map(blog => blog.ArticleSubTitle);
      setTempSubHeading(SubTitleArr);
    };

    if (tempSubHeading.length < 1) {
      getSubTitleFunc2();
    }
    getSubTitleFunc();
  }, [subParentTemp, allBlogs, subCatData, tempSubHeading.length]);

  // Navigate with this function
  const singleblogfnc = (blog) => {
    navigate("/blog?id=" + blog);
  };

  return (
    <div className='pl-2 bg-gray-200 min-h-96 '>
      <ul className=' pt-2'>
        {tempSubHeading.length < 1
          ? Abhi.map((rt, index) => (
            <li key={index} className='cursor-pointer hover:font-bold pb-2' onClick={(e) => getIDfunc(e.target.innerText)}>{rt}</li>
          ))
          : tempSubHeading.map((subHead, index) => (
            <li key={index} className='cursor-pointer hover:font-bold pb-2' onMouseLeave={(e) => console.log("mouse gya", e.target)} onClick={(e) => getIDfunc(e.target.innerText)}>{subHead}</li>
          ))}
      </ul>
    </div>
  );
}

export default OptionsSubMenu;
