import React, { useState, useRef, useContext } from "react";
import JoditEditor from "jodit-react";
import { ContextData } from "../../../App";
import axios from "axios";

function CreateArticle() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { datas, parentdatas } = useContext(ContextData);
  const [ArticleTitle, setArticleTitle] = useState("");
  const [ArticleSubTitle, setSubArticleTitle] = useState("");
  const [ArticleGrandCategory, setArticleGrandCategory] = useState("");
  const [ArticleParentCategory, setArticleParentCategory] = useState("");
  const [subOption, setSubOption] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showChild, setShowChild] = useState(false);
  const [ArticleBody, setArticleBody] = useState([]);
  const [ArticleTags, setArticleTags] = useState([]);
  const [file, setFile] = useState(null);
  const [successmodel, setSuccessmodel] = useState(false);
  const [warning , setWarning] = useState("")

  const SubmitArticleBody = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("ArticleTitle", ArticleTitle);
    formData.append("ArticleSubTitle", ArticleSubTitle);
    formData.append("ArticleBody", content);
    formData.append("ArticleTags", ArticleTags);
    formData.append("ArticleGrandCategory", ArticleGrandCategory);
    formData.append("ArticleParentCategory", ArticleParentCategory);
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
        setWarning(articleresdata.data.msg);
        Sewarningfunc();

      }
    } catch (error) {
      console.log("frontend axios error creating article", error);
    }
  };

  
  const Sewarningfunc = () => {
    console.log("mera set time out")
    setTimeout(() => {
        setWarning("");
    }, 10000);
};


  const handleSubmit = (e) => {
    SubmitArticleBody();
    e.preventDefault();  
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const [index, value] = selectedValue.split("|");
    setSubOption(value);
    setArticleGrandCategory(value);
    setSelectedIndex(parseInt(index, 10));
    setShowChild(true);
    console.log("Selected index:", index);
    console.log("Selected value:", value);
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
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">
          What's Going on in Your Mind!?
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
              id="title"
              type="text"
              placeholder="Enter Title Here"
              className="border border-gray-300 w-full h-10 px-3"
              onChange={(e) => setArticleTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subtitle"
            >
              Post Sub-Title
            </label>
            <input
              id="subtitle"
              type="text"
              placeholder="Enter Sub-Title Here"
              className="border border-gray-300 w-full h-10 px-3 mb-4"
              onChange={(e) => setSubArticleTitle(e.target.value)}
              required
            />

            <div className="flex space-x-4">
              <select onChange={handleSelectChange} required>
                <option value="" disabled={showChild}>
                  Select a Grand category
                </option>
                {parentdatas.map((names, index) => (
                  <option
                    key={index}
                    value={`${index}|${names.GrandCategoryName}`}
                  >
                    {names.GrandCategoryName}
                  </option>
                ))}
              </select>

              {showChild ? (
                <select
                  onChange={(e) => setArticleParentCategory(e.target.value)}
                  required
                >
                  <option value="">Select a Parent Category</option>
                  {parentdatas[selectedIndex]?.ParentName.map((ee, i) => (
                    <option key={i}>{ee}</option>
                  ))}
                </select>
              ) : (
                <select>
                  <option value="">Select a Parent Category</option>
                </select>
              )}
            </div>
          </div>

          <div className="py-5">
            <label>Upload Article Picture Here</label>
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Post Content
            </label>
            <JoditEditor
            required
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

            <p className="flex justify-end text-red-500 text-2xl font-semibold">{warning}</p>
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

export default CreateArticle;
