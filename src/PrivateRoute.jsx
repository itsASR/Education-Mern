import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ContextData } from './App';
import NotFound from './FrontEnd/UserUI/ExtraPages/NotFound';





function PrivateRoute() {
    const {trutoken} = useContext(ContextData);

    if(trutoken){
        return <Outlet></Outlet>
    }else return <NotFound></NotFound>
}

export default PrivateRoute