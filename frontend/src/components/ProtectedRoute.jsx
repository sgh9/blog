import React, { useContext, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { userContext, useUser } from '../context/user/UserContextProvider';

const ProtectedRoute = () => {
    const { user } = useUser();
    const {  auth, token , loading } = user;

	if(loading) {
		return <div>Loading...</div>;
	}
    
    return  auth ? <Outlet/> : <Navigate to="/login"/>
}
export default ProtectedRoute;