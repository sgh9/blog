import React, { useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/user/user.context.provider'; 
import useAuth from '../../hooks/useAuth';

const Home = () => {
    let navigate = useNavigate();
    const { authLogout, authState  } = useContext(userContext);

    return (
        <>
            Home
            <Link to='/login'>Login</Link>

        </>
    )
}
export default Home;