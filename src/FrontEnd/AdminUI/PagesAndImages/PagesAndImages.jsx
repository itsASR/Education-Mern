import React, { useState } from 'react'
import Pages from './Pages';


function PagesAndImages() {
    const [showSubCat, setShowSubCat] = useState(false);
    const [showSubCat2, setShowSubCat2] = useState(false);
    const [CatOption, setCatOption] = useState(0)
    const Components = [<Pages></Pages>]


    function showdivfunc() {
        setShowSubCat(!showSubCat);
    }

    function showdivfunc2() {
        setShowSubCat2(!showSubCat2);
    }

    return (
        <>
           
            <div className="flex justify-evenly">
                <div id="left" className="min-h-96 min-w-56 px-10 border-r-2 border-gray-500 text-nowrap">
                    

                    <span
                        className="text-2xl font-semibold text-center mx-auto flex items-center justify-center border-y-2 border-gray-200 py-5 cursor-pointer"
                        onClick={() => setCatOption(0)}
                    >
                        Pages
                    </span>
                    <span
                        className="text-2xl font-semibold text-center mx-auto flex items-center justify-center border-y-2 border-gray-200 py-5 cursor-pointer"
                        onClick={() => setCatOption(6)}
                    >
                        Edit Images
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

export default PagesAndImages;
