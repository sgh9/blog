import React, { useContext, useEffect } from 'react';
import { userContext } from '../../context/user/user.context.provider'; 
import { useParams, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    let navigate = useNavigate();
    
    const { authLogout, getAuthStatus, authState } = useContext(userContext);
    return (
        <>
            <button onClick={() => {
                localStorage.removeItem('token');
                authLogout();
                // navigate('/');
                window.location.reload();
            }} >
                Logout
            </button>

            <div>
                Dashboard
            </div>
        </>
    )
}
export default Dashboard; 
