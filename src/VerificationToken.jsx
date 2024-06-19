import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { ContextData } from './App';
import { useLocation } from 'react-router-dom';

function VerificationToken() {
    const { trutoken, setTrutoken } = useContext(ContextData)
    const { pathname, search } = useLocation();
    let token = localStorage.getItem("token");
    const myVerificationFunc = async () => {
        let token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await axios.post("http://127.0.0.1:3000/auth/protected", { token });
                if (response.data.message === "Valid") {
                    setTrutoken(true)
                }
                else {
                    localStorage.removeItem("token");
                    localStorage.removeItem("mail");
                    setTrutoken(false)
                }
            } catch (error) {
                console.log(error)
                setTrutoken(false)
            }
        } else {
            setTrutoken(false)
        }

    }

    useEffect(() => {
        myVerificationFunc();
    }, [pathname, search, token])





    return null
}

export default VerificationToken