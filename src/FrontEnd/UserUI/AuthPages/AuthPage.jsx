import axios from 'axios';
import React, { useContext, useState } from 'react';
import RedirectModel from './RedirectModel';
import { ContextData } from '../../../App';
import { useNavigate } from 'react-router-dom';


function AuthModal({ isOpen, onClose }) {
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successmodel, setSuccessmodel] = useState(false)
    const {warning , setWarning ,  setLoginemail} = useContext(ContextData)
    const navigate = useNavigate();
    

    const RegisterFunc = async () => {
        try {
            console.log("this is register")
            const datas = await axios.post("http://127.0.0.1:3000/auth/register", { name, number, email, password })
            if (datas.data === "Created Successful") {
                console.log("hurray", datas)
                setSuccessmodel(true)
            }

        } catch (error) {
            console.log("axios use create error", error)
        }
    }
 


    const LoginFunc = async () => {
        try {
            console.log("this is login")
            await axios.post("http://127.0.0.1:3000/auth/login", { email, password })
                .then((res) => {
                    setWarning(res.data.message)
                    localStorage.setItem("token", res.data.token)
                    if(res.data.token){
                        onClose()
                        navigate("/")
                        localStorage.setItem("mail", res.data.email)
                    }
                })
        } catch (error) {
            setWarning(error.response.data)
        }

    }

    const toggleForm = () => {
        setIsRegister(!isRegister);
        setWarning("");
        
    };

    if (!isOpen){
        return null
        

    } 
    
        


    const authfunc = (e) => {
        e.preventDefault();
        isRegister ? RegisterFunc() : LoginFunc()
        console.log("auth making")
        
    }


    function setBack(){
        setIsRegister(false)
        setSuccessmodel(false)
    }


    return (
        <>
            <div className='bg-red-800' style={{ display: successmodel ? "block" : "none" }}>
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative transform transition-all duration-300 ease-in-out">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            &times;
                        </button>
                        <img src='https://tradebrains.in/wp-content/uploads/2021/09/shiksha.png' className='w-40 mx-auto mb-4' alt="Logo" />
                        <h2 className="text-2xl text-black font-bold mb-4 text-center">
                            Registered Successful
                        </h2>

                        <p className="mt-2  text-center cursor-pointer px-4 py-2 bg-purple-500 hover:underline" onClick={()=>setBack()}>
                            Login Now
                        </p>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out" style={{ display: successmodel ? "none" : "flex" }}>
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative transform transition-all duration-300 ease-in-out">
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                    
                    <img src='https://tradebrains.in/wp-content/uploads/2021/09/shiksha.png' className='w-40 mx-auto mb-4' alt="Logo" />
                    <h2 className="text-2xl text-black font-bold mb-4 text-center">
                        {isRegister ? 'Register' : 'Login'}
                    </h2>
                    <form onSubmit={(e) => authfunc(e)} className='text-black'>
                        {isRegister && (
                            <>
                                <div className="mb-2">
                                    <label htmlFor="name" className="block text-gray-700 font-semibold">Name</label>
                                    <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500" required onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="mobile" className="block text-gray-700 font-semibold">Mobile Number</label>
                                    <input type="tel" id="mobile" className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500" pattern="[0-9]{10}" required onChange={(e) => setNumber(e.target.value)} />
                                </div>
                            </>
                        )}
                        <div className="mb-2">
                            <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                            <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                            <input type="password" id="password" className="text-black w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500" required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <p className='text-red-500 text-sm'>{warning}</p>
                        <button type="submit" className="w-full bg-purple-500 text-white p-3 rounded mt-2 hover:bg-purple-600 transition duration-300 font-semibold">
                            {isRegister ? 'Register' : 'Login'}
                        </button>
                    </form>
                    <p onClick={toggleForm} className="mt-2 text-purple-500 text-center cursor-pointer hover:underline">
                        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                    </p>
                </div>
            </div>
        </>
    );
}

export default AuthModal;
