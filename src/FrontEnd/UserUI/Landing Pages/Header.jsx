import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import SubMenu1 from './Sub Menu/Heaser Sub Menu/SubMenu1';
import { ContextData } from '../../../App';
import AuthModal from '../AuthPages/AuthPage';
import SearchList from '../SearchPage/SearchList';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAccountCircle } from "react-icons/md";


function Header() {
    // const [showArrow, setShowArrow] = useState({});
    const { trutoken, setTrutoken, showbar, setShowbar, setWarning, setSearchQuery, categories, setCategories, searchSub, setSearchSub, allBlogs, subCatData, setSubCatData, setTempSubHeading , showArrow, setShowArrow } = useContext(ContextData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const openModal = () => { setIsModalOpen(true); setWarning("") }
    const closeModal = () => setIsModalOpen(false);


    useEffect(() => {
        const extractCategories = () => {
            const uniqueCategories = Array.from(
                new Set(
                    allBlogs
                        .map(blog => blog.ArticleGrandCategory)
                        .filter(category => category) // Filter out falsy values
                )
            );
            setCategories(uniqueCategories);

        };

        extractCategories();
    }, [allBlogs, setCategories]);


    useEffect(() => {
        const findParentCategories = () => {
            const parentArr = allBlogs
                .filter(subCat => subCat.ArticleGrandCategory === searchSub)
                .map(subCat => subCat.ArticleParentCategory);
            const uniqueParentArr = Array.from(new Set(parentArr));
            setSubCatData(uniqueParentArr);
            setTempSubHeading([uniqueParentArr[0]])

        };

        if (searchSub) {
            findParentCategories();
        }
    }, [searchSub, allBlogs, setSubCatData]);

    const handleMouseEnter = (index, category) => {
        setSearchSub(category);
        setShowArrow(prev => ({ ...prev, [index]: true }));
        
    };

    const handleMouseLeave = (index) => {
        setShowArrow(prev => ({ ...prev, [index]: false }));
       
    };


    function searhbarfunction() {
        setShowbar(true);
        setSearchQuery("");
    }

    function funckbtn() {
        localStorage.removeItem("token");
        localStorage.removeItem("mail");
        setTrutoken(false);
        navigate("/");
    }


    return (
        <>
            <div className='' style={{ display: showbar ? "block" : "none" }}>
                <SearchList></SearchList>
            </div>
            <header className='relative animate-jump-in animate-delay-300  bg-[#2E004D] pt-3 flex justify-between px-4 text-white font-semibold'>
                <Link to="/"><img src='https://tradebrains.in/wp-content/uploads/2021/09/shiksha.png' className='w-40 h-16' alt='Logo' /></Link>
                <div className='w-3/5'>
                    <div className='w-full flex'>
                        <input type='text' placeholder='search here' className='w-full px-2' onClick={() => searhbarfunction()} />
                        <button className='py-2 px-8 bg-orange-400' onClick={() => searhbarfunction()}>Search</button>
                    </div>
                    <nav className='pt-4 relative '>
                        <ul className='flex justify-evenly text-sm '>
                            
                            {categories.slice(0,9).map((category, index) => (
                                <li key={index} className='flex items-center '>
                                    <div className='flex items-center pb-2 cursor-pointer'
                                        onMouseEnter={() => handleMouseEnter(index, category)}
                                        onMouseLeave={() => handleMouseLeave(index)}>
                                        <span>{category}</span>
                                        <p className='ml-2 mb-1' style={{ display: showArrow[index] ? "none" : "block" }}>
                                            <FontAwesomeIcon icon={faSortDown} />
                                        </p>
                                        <p className='ml-2 mt-1' style={{ display: showArrow[index] ? "block" : "none" }}>
                                            <FontAwesomeIcon icon={faCaretUp} />
                                        </p>

                                        {showArrow[index] && (
                                            <div className='text-black absolute top-0 left-1/2 transform -translate-x-1/2'>
                                                <SubMenu1 />
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className='pb-4 '>
                    <div>
                        <p>Ask a query on 9680415819</p>
                    </div>
                    {trutoken ? <div className='flex justify-center items-center pt-2'  >
                        <Link to="/userpage/userdashboard?name="><MdOutlineAccountCircle className='text-3xl mr-2 cursor-pointer' /></Link>
                        <button onClick={() => funckbtn()} >
                            Logout
                        </button>
                    </div> : <button onClick={openModal} className="ml-4 px-4 py-2 rounded "  >
                        Login / Register
                    </button>}

                </div>
                <AuthModal isOpen={isModalOpen} onClose={closeModal} />
            </header>
        </>
    );
}

export default Header;
