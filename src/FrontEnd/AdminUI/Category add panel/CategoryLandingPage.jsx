import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GrandCategory from './GrandCategory';
import Parentcategory from './Parentcategory'
import AddCourse from './AddCourse';
import AddSubCourse from './AddSubCourse';
import InformativaNavAdmin from './InformativaNavAdmin';
import ExamName from './ExamName';
import BoardName from './BoardName';
import TrendingCollegeList from './TrendingCollegeList';

function CategoryLandingPage() {
    const [showSubCat, setShowSubCat] = useState(false);
    const [showSubCat2, setShowSubCat2] = useState(false);
    const categoriesOptionName = ["Add Grand Category", "Add Parent Category"]
    const [CatOption, setCatOption] = useState(0)
    const Components = [<GrandCategory/> , <Parentcategory/>, <AddCourse />, <AddSubCourse /> , <InformativaNavAdmin/> , <ExamName/> , <BoardName/> , <TrendingCollegeList/>]


    function showdivfunc() {
        setShowSubCat(!showSubCat);
    }

    function showdivfunc2() {
        setShowSubCat2(!showSubCat2);
    }

    return (
        <>
           
            <div className="flex justify-evenly">
                <div id="left" className="min-h-96 px-10 border-2 border-gray-500 text-nowrap">
                    <span
                        className="text-2xl font-semibold text-center mx-auto flex items-center justify-center border-y-2 border-gray-200 py-5 cursor-pointer"
                        onClick={showdivfunc}
                    >
                        Add Article category
                    </span>

                    <div
                        id="subcat"
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${showSubCat ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        {
                            categoriesOptionName.map((names, index) => (
                                <span className=" font-semibold text-center mx-auto flex items-center justify-center border-y-2 border-gray-200 py-5" onClick={() => setCatOption(index)}>
                                    {names}
                                </span>
                            ))
                        }

                    </div>

                    <span
                        className="text-2xl font-semibold text-center mx-auto flex items-center justify-center border-y-2 border-gray-200 py-5 cursor-pointer"
                        onClick={showdivfunc2}
                    >
                        Add College category
                    </span>

                    <div
                        id="subcat"
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${showSubCat2 ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <span className="font-semibold text-center mx-auto flex items-center justify-center border-y-2 border-gray-200 py-5" onClick={() => setCatOption(2)}>
                            Add Course for College
                        </span>
                        <span className="font-semibold text-center mx-auto flex items-center justify-center border-y-2 border-gray-200 py-5" onClick={() => setCatOption(3)} >
                            Add Subject/Branch List
                        </span>

                    </div>

                    <span
                        className="text-2xl font-semibold text-center mx-auto flex items-center justify-center border-y-2 border-gray-200 py-5 cursor-pointer"
                        onClick={() => setCatOption(4)}
                    >
                        Add Subjects in NavBar
                    </span>

                    <span
                        className="text-2xl font-semibold text-center mx-auto flex items-center justify-center border-y-2 border-gray-200 py-5 cursor-pointer"
                        onClick={() => setCatOption(5)}
                    >
                        Add Exam Name
                    </span>
                    <span
                        className="text-2xl font-semibold text-center mx-auto flex items-center justify-center border-y-2 border-gray-200 py-5 cursor-pointer"
                        onClick={() => setCatOption(6)}
                    >
                        Add Board Name
                    </span>

                    <span
                        className="text-2xl font-semibold text-center mx-auto flex items-center justify-center border-y-2 border-gray-200 py-5 cursor-pointer"
                        onClick={() => setCatOption(7)}
                    >
                        College Promotion
                    </span>
                </div>




                <div id="right" className=" w-[78vw] overflow-y-scroll">
                    {
                        Components[CatOption]
                    }
                </div>
            </div>
        </>
    );
}

export default CategoryLandingPage;
