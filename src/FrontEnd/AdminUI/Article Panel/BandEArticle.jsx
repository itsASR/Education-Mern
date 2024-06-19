import React, { useState, useRef, useContext } from "react";
import JoditEditor from "jodit-react";
import { ContextData } from "../../../App";
import axios from "axios";

function BandEArticle() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { boarditems, examitems } = useContext(ContextData);
  const [ArticleTitle, setArticleTitle] = useState("");
  const [ExamName, setExamName] = useState("");
  const [BoardName, setBoardName] = useState("");
  const [subOption, setSubOption] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showChild, setShowChild] = useState(false);
  const [Body, setBody] = useState([]);
  const [ArticleTags, setArticleTags] = useState([]);
  const [warning, setWarning] = useState("");
  const [file, setFile] = useState(null);
  const [successmodel, setSuccessmodel] = useState(false);
  const [swarning, setSwarning] = useState("");

//   const Boardnames = [
//     "board name 1",
//     "board name 2",
//     "board name 3",
//     "board name 4",
//     "board name 5",
//   ];

  const SubmitArticleBody = async () => {
     
    const formData = new FormData();
    formData.append("file", file);
    formData.append("ArticleTitle", ArticleTitle);
    formData.append("ArticleBody", content);
    formData.append("ArticleTags", ArticleTags);
    formData.append("ExamName", ExamName);
    formData.append("BoardName", BoardName);
    if (ExamName || BoardName) {
        try {
            let articleresdata = await axios.post(
              "http://127.0.0.1:3000/createArticle",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if (articleresdata.data.msg === "Article Created") {
              setSuccessmodel(true);
            }else{
              setSwarning(articleresdata.data.msg);
              Sewarningfunc();
      
            }
          } catch (error) {
            console.log("frontend axios error creating article", error);
          }
    }
    
    else {
              setWarning("You Need to Select minimum one category");
            }
          };




//   const SubmitArticleBody = async () => {
//     if (ExamName || BoardName) {
//       try {
//         await axios
//           .post("http://127.0.0.1:3000/boardexam/be", {
//             Title,
//             ExamName,
//             BoardName,
//             Body: content,
//             Tags,
//           })
//           .then((res) => console.log("response is ", res));
//       } catch (error) {
//         console.log("article create error", error);
//       }
//     } else {
//       setWarning("You Need to Select minimum one category");
//     }
//   };


const Sewarningfunc = () => {
    console.log("mera set time out")
    setTimeout(() => {
        setSwarning("");
    }, 10000);
};

const handleSubmit = (e) => {
    SubmitArticleBody();
    e.preventDefault();  
  };

  function setBack() {
    setSuccessmodel(false);
    window.location.reload();
  }


  function ExamNamefunc(e) {
    setExamName(e.target.value);
    setWarning("");
  }

  function BoardNamefunc(e) {
    setBoardName(e.target.value);
    setWarning("");
  }

  return (
    <>    <div
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">
        Share About Exam and Board
      </h1>

      <form onSubmit={(e) => handleSubmit(e)}>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Post Title
        </label>
        <input
        required
          id="title"
          type="text"
          placeholder="Enter Title Here"
          className="border border-gray-300 w-full h-10 px-3"
          onChange={(e) => setArticleTitle(e.target.value)}
        />
      </div>
      <div className="py-5">
            <label>Upload Cover Picture Here</label>
            <br />
            <input
            required
              type="file"
              accept="image/png, image/gif, image/jpeg"
              className="pt-1"
              onChange={(e) => setFile(e.target.files[0])}
            ></input>
          </div>

      <div className="mb-6">
        <div className="flex space-x-4">
          <select onChange={(e) => ExamNamefunc(e)}>
            <option value="">Exam Name not Needed</option>
            {examitems.map((names , index) => (
              <option key={index}>{names.ExamNames}</option>
            ))}
          </select>
          <select onChange={(e) => BoardNamefunc(e)}>
            <option value="">Board Name not Needed</option>
            {boarditems.map((names , index) => (
              <option key={index}>{names.BoardNames}</option>
            ))}
          </select>
        </div>
        <p className="text-[red] font-bold animate-bounce pt-1">{warning}</p>
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="content"
        >
          Post Content
        </label>
        <JoditEditor
          ref={editor}
          value={content}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="tags"
        >
          Enter tags here with comma-separated values
        </label>
        <textarea
        required
          id="tags"
          placeholder="Enter tags here"
          className="border border-gray-300 w-full h-24 p-3"
          onChange={(e) => setArticleTags(e.target.value)}
        ></textarea>
      </div>
      <p className="flex justify-end text-red-500 text-2xl font-semibold">{swarning}</p>
      <div className="flex justify-end">
        <button
        type="submit"
        //   onClick={handleSubmit}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
      </form>
    </div>
    </>

  );
}

export default BandEArticle;
