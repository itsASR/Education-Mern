import React, { useContext } from 'react'
import { ContextData } from './App'
import { Outlet } from 'react-router-dom';
import NotFound from './FrontEnd/UserUI/ExtraPages/NotFound';

function PrivateAdminRoute() {
    const {loginemail} = useContext(ContextData);
    if(loginemail?.isAdmin){
        return <Outlet></Outlet>
    } else return <NotFound></NotFound>
  
}

export default PrivateAdminRoute