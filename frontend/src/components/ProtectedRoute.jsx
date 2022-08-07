import React, { useContext, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { userContext } from '../context/user/user.context.provider';

const ProtectedRoute = () => {
    const { authState, getAuthStatus } = useContext(userContext);
    const { user : { auth, details, token }, loading } = authState;
    console.log("auth from protected route",loading, auth);

	if(loading) {
		return <div>Loading...</div>;
	}
    
    return  auth ? <Outlet/> : <Navigate to="/login"/>
}
export default ProtectedRoute;