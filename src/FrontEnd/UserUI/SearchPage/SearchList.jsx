import React, { useContext, useState, useEffect, useRef } from 'react';
import { ContextData } from '../../../App';
import { useNavigate } from 'react-router-dom';

function SearchList() {
    const navigate = useNavigate();
    const { showbar, setShowbar, SearchQuery, setSearchQuery, SearchResultdata } = useContext(ContextData);
    const inputRef = useRef(null);


    function keyFunc(e){
       
        if(e.key === "Enter"){

            SerchBtn();
        }
    }


    useEffect(() => {
        if (SearchQuery.length < 1 ) {
            inputRef.current.focus();
        }
    }, [showbar]);

    function SerchBtn() {
        if (SearchQuery.length > 0) {
            setShowbar(false);
            navigate("/search?name=" + SearchQuery);
        }
    }

    function Visitfunc(id) {
        navigate("/blog?id=" + id);
        setShowbar(false);
    }

    return (
        <div className="w-full h-full bg-gray-200 fixed top-0 z-10 pt-3 flex flex-col items-center justify-center text-white font-semibold">
            <button
                id='close-button'
                onClick={() => setShowbar(false)}
                className="text-2xl text-black font-bold absolute top-5 right-8 transition-transform transform hover:scale-110 hover:bg-[#FFA500] hover:p-3 p-3 rounded-xl"
            >
                ×
            </button>
            <div className="w-full max-w-xl flex justify-between px-4 mb-4 items-center">
                <div className="flex flex-col items-center flex-grow mx-4">
                    <div className="flex items-center">
                        <input
                            ref={inputRef}
                            type="text"
                            value={SearchQuery}
                            placeholder="Search here"
                            className="w-64 px-2 py-2 text-black rounded-l-md"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) =>keyFunc(e)}
                        />
                        <button
                            onClick={SerchBtn}
                            className="py-2 px-4 bg-orange-400 rounded-r-md hover:bg-orange-500 transition"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className={`bg-white w-full max-w-xl h-96 overflow-y-scroll text-black rounded-md shadow-lg p-4 mt-4 transition-opacity duration-500 ${SearchQuery.length > 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {SearchResultdata.map((data, index) => (
                    <p key={index} className="mb-2 border-b pb-2 text-green-500 cursor-pointer" onClick={() => Visitfunc(data._id)}>{data.ArticleTitle}</p>
                ))}
            </div>
        </div>
    );
}

export default SearchList;
