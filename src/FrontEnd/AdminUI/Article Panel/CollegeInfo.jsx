import React, { useState, useRef, useContext, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { ContextData } from '../../../App';
import axios from 'axios';


function CollegeInfo() {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const { courseList } = useContext(ContextData);
    const [ArticleTags, setArticleTags] = useState([])
    const [course, setCourse] = useState([]);
    const [subcourse, setSubCourse] = useState([]);
    const [showSubcatname, setShowSubcatname] = useState([]);
    const [ArticleTitle, setArticleTitle] = useState("")
    const [file, setFile] = useState(null)
    const [successmodel, setSuccessmodel] = useState(false);
    const [warning , setWarning] = useState("")
    const [shortdescription , setShortdescription] = useState('')
  

  

    function ShowSubCat() {
        const selectedSubCourses = [];
        courseList.forEach((alldata) => {
            if (course.includes(alldata.CourseName)) {
                selectedSubCourses.push(...alldata.SubCourseName);
            }
        });
        setShowSubcatname(selectedSubCourses);
    }

    useEffect(() => {
        ShowSubCat();
    }, [course]);

    function checkboxFunc(target) {
        const { value, checked } = target;
        if (checked) {
            setCourse([...course, value]);
        } else {
            setCourse(course.filter((e) => e !== value));
        }

    }


    function checkSubboxFunc(target) {
        const { value, checked } = target;
        if (checked) {
            setSubCourse([...subcourse, value]);
        } else {
            setSubCourse(subcourse.filter((e) => e !== value));
        }
    }

   

    const SubmitCollegeArticleBody = async () => {
        
        const formData = new FormData();
        formData.append("file", file);
        formData.append("ArticleTitle", ArticleTitle);
        formData.append("ArticleBody", content);
        formData.append("ArticleTags", ArticleTags);
        formData.append("course", course);
        formData.append("subcourse", subcourse);
        formData.append("shortdescription", shortdescription);
        try {
            let articleresdata =await axios.post("http://127.0.0.1:3000/createArticle", formData, {
                
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (articleresdata.data.msg === "Article Created") {
                setSuccessmodel(true);
              }else{
                setWarning(articleresdata.data.msg);
                Sewarningfunc();
        
              }

        } catch (error) {
            console.log("frontend axios error creating college brocher", error)
        }
    }

    const Sewarningfunc = () => {
        setTimeout(() => {
            setWarning("");
        }, 10000);
    };

    const handleSubmit = (e) => {
        SubmitCollegeArticleBody();
        e.preventDefault();
    };

    function setBack() {
        setSuccessmodel(false);
        window.location.reload();
      }
    

    return (
        <>
        <div
        className="bg-red-800"
        style={{ display: successmodel ? "block" : "none" }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative transform transition-all duration-300 ease-in-out">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              &times;
            </button>
            <img
              src="https://tradebrains.in/wp-content/uploads/2021/09/shiksha.png"
              className="w-40 mx-auto mb-4"
              alt="Logo"
            />
            <h2 className="text-2xl text-black font-bold mb-4 text-center">
              Created Successful
            </h2>

            <p
              className="mt-2  text-center cursor-pointer px-4 py-2 bg-purple-500 hover:underline"
              onClick={() => setBack()}
            >
              OK
            </p>
          </div>
        </div>
      </div>
        <div className='container mx-auto p-6'>
            <h1 className='text-3xl font-semibold mb-6'>Share Thoughts About Your College</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
            <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>
                    College Name
                </label>

                <input
                    id='title'
                    type='text'
                    placeholder='Enter Title Here'
                    className='border border-gray-300 w-full h-10 px-3'
                    onChange={(e) => setArticleTitle(e.target.value)}
                    required
                />
                <div className='py-5'>
                    <label>Upload College Picture Here</label><br />
                    <input type='file' accept="image/png, image/gif, image/jpeg" className='pt-1' onChange={(e) => setFile(e.target.files[0])} required></input>

                </div>
            </div>

            <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='shortDescription'>
                    Enter Short Description
                </label>
                <textarea
                    id='ShortDescription'
                    placeholder='Type here...'
                    className='border border-gray-300 w-full h-24 p-3'
                    onChange={(e) => setShortdescription(e.target.value)}
                    required
                ></textarea>
            </div>

            <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='content'>
                    Post Content
                </label>
                <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={newContent => setContent(newContent)}
                />
            </div>

            <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='tags'>
                    Enter tags here with comma-separated values
                </label>
                <textarea
                    id='tags'
                    placeholder='Enter tags here'
                    className='border border-gray-300 w-full h-24 p-3'
                    onChange={(e) => setArticleTags(e.target.value)}
                    required
                ></textarea>
            </div>

            <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='tags'>
                    Select Course Name
                </label>
                <div className='border border-gray-300 w-full p-3 grid grid-cols-8 gap-2'>
                    {
                        courseList.map((data) => (
                            <div key={data.CourseName}>
                                <input  type='checkbox' className='mr-1' required value={data.CourseName} onChange={(e) => checkboxFunc(e.target)}></input>
                                <label>{data.CourseName}</label><br></br>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='mb-6' style={{ display: showSubcatname.length > 0 ? "block" : "none" }}>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='tags'>
                    Select Sub-Course Name
                </label>
                <div className='border border-gray-300 w-full p-3 grid grid-cols-8 gap-4'>
                    {showSubcatname.map((data, index) => (
                        <div key={index} className='flex items-center'>
                            <input
                            
                                type='checkbox'
                                className='mx-1'
                                value={data}
                                onChange={(e) => checkSubboxFunc(e.target)}
                            />
                            <label className='ml-2'>{data}</label>
                        </div>
                    ))}
                </div>
            </div>
            <p className="flex justify-end text-red-500 text-2xl font-semibold">{warning}</p>
            <div className='flex justify-end'>
                <button
                 type="submit"
                    // onClick={handleSubmit}
                    className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700'
                >
                    Submit
                </button>
            </div>
            </form>
        </div>
        </>
    );
}

export default CollegeInfo;
