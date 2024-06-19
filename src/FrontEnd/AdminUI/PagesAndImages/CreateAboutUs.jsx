import React, { useState, useRef, useContext } from "react";
import JoditEditor from "jodit-react";
import { ContextData } from "../../../App";
import axios from "axios";

function CreateAboutUs() {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const { datas, parentdatas } = useContext(ContextData);

    const [successmodel, setSuccessmodel] = useState(false);
    const [warning, setWarning] = useState("")



    const SubmitArticleBody = async () => {
        try {
            let articleresdata = await axios.post("http://127.0.0.1:3000/pagerouter/aboutus", {ArticleBody:content} )

            if (articleresdata.data.msg === "Page Created") {
                setSuccessmodel(true);
            } else {
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
                    About US
                </h1>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-6">

                        <JoditEditor
                            required
                            ref={editor}
                            value={content}
                            onBlur={(newContent) => setContent(newContent)}
                        />
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

export default CreateAboutUs;
