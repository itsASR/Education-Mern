import React, { useContext, useEffect } from 'react';
import UserDashboardSidebar from './UserDashboardSidebar';
import UserDashboardProfile from './UserDashboardProfile';
import { ContextData } from '../../App';
import axios from 'axios';
import AdminPanel from '../AdminUI/AdminPanel';
import { useLocation } from 'react-router-dom';

function UserDashboard() {

    const { loginemail, setLoginemail, isEditing } = useContext(ContextData)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');

    const getuserdata = async () => {
        try {
            let useremail = localStorage.getItem("mail");
            const singleuser = await axios.post("http://127.0.0.1:3000/user/userdashboard", { email: useremail })
            setLoginemail(singleuser.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getuserdata();
    }, [])

    useEffect(() => {
        getuserdata();
    }, [isEditing])


    return (
        <div className="flex min-h-screen bg-gray-100">
            <UserDashboardSidebar />
            <div className="flex-1 p-6">
                {name === "" && <UserDashboardProfile />}
                {name === "Admin" && <AdminPanel />}
                {name === "Manage Profile" && <UserDashboardProfile />}

            </div>
        </div>


    );
}

export default UserDashboard;
