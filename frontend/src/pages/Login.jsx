import React, { useState, useEffect, useContext } from 'react';
import { ajax } from '../services/ajax';
import { toast } from 'react-toastify';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { userContext } from '../context/user/user.context.provider'; 
import {  Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Error, setError] = useState('');
    let navigate = useNavigate();
    const { authError, authRequest, authSuccess, authState } = useContext(userContext);
    const { user : { auth } } = authState;


    const handleLogin = async(e)=> {
        e.preventDefault(); 
        const user = { email, password };
        authRequest();
        ajax.post('/users/login', user).then((response)=> {
            if(response.token) {
                localStorage.setItem('token', JSON.stringify(response.token));
                authSuccess(response.token);
                navigate('/dashboard');
            }
        }).catch((error)=> {
            setError(error.message);
            authError(error.message);
            toast.error(error.message)
            console.log('error', error.message);
        });
    }
    
    if(auth) return(<Navigate to="/dashboard"/>);


    return (
        <section className="min-h-screen flex flex-col justify-center items-center ">

            <form className="card border border-slate-300 w-11/12 sm:w-4/5 md:w-3/4 xl:w-1/3 py-10" onSubmit={handleLogin}>
                <h2 className='text-2xl text-center pb-1'>
                    Sign in
                </h2>
                <div className="form-control">
                    <label htmlFor="firstName" className='label'>Email</label>
                    <input type="text" 
                        id="firstName" 
                        name="Email"
                        className="input"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        placeholder="Email"/>
                </div>
                <div className="form-control">
                <label htmlFor="password" className='label'>Password</label>
                    <input type="text" 
                        id="password" 
                        name="password"
                        className="input"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        placeholder="Password"/>
                </div>
                <div className="form-control flex justify-between">
                    <Link to="/register" className='btn'>Create new Account?</Link>
                    <input type="submit" className ="btn-primary"  />
                </div>
            </form>
        </section>
    )
}

export default Login;