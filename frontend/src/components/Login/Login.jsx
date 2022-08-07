import React, { useState, useEffect, useContext } from 'react';
import { ajax } from '../../services/ajax';
import { useParams, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/user/user.context.provider'; 
import {  Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Error, setError] = useState('');
    let navigate = useNavigate();
    const { authError, authRequest, authSuccess, authState } = useContext(userContext);

    const handleLogin = async(e)=> {
        e.preventDefault(); 
        const user = { email, password };
        // {
        //     "email": "sgh280997@gmail.com",
        //     "password": "Sangamesh@123"
        // }
        authRequest();
        ajax.post('/users/login', user).then((response)=> {
            if(response.token) {
                localStorage.setItem('token', JSON.stringify(response.token));
                authSuccess(response.token);
                navigate('/dashboard');
                window.location.reload();
            }
        }).catch((error)=> {
            setError(error.message);
            authError(error.message);
            console.log('error', error.message);
        });
    }
    return (
        <section className="login__container">
            <form className="login__form" onSubmit={handleLogin}>
                <div className="login__controller">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" 
                        id="firstName" 
                        name="firstName"
                        className="border border-indigo-600"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        placeholder="First Name"/>
                </div>
                <div className="login__controller">
                <label htmlFor="password">First Name</label>
                    <input type="text" 
                        id="password" 
                        name="password"
                        className="border border-indigo-600"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        placeholder="Password"/>
                </div>
                <div className="login__controller">
                    <input type="submit" className ="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  />
                </div>
            </form>
        </section>
    )
}

export default Login;