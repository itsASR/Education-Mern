import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextData } from '../../App';

function UserDashboardSidebar() {
  const { loginemail } = useContext(ContextData)
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <ul className="mt-4">
          <li className="mb-2">
          <Link to="/userpage/userdashboard?name=Manage Profile" className="block py-2 px-4 rounded hover:bg-gray-200">Manage Profile</Link>
          </li>
          <li>
            <Link to="/userpage/userdashboard?name=Admin" className="block py-2 px-4 rounded hover:bg-gray-200" style={{display:loginemail?.isAdmin?"block":"none"}}>Admin</Link>
          </li>
        </ul>
      </div>
    </div> 
  );
}

export default UserDashboardSidebar;
