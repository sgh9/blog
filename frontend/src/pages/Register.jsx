import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate, Link} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { userContext, useUser } from '../context/user/UserContextProvider';
import { ajax } from '../services/ajax';

const defaultUser = {
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    country: ""
}

const Register = () => {
    const [user, setUser] = useState(defaultUser);
    const [Error, setError] = useState('');

    let navigate = useNavigate();
    const { authError, authRequest, authSuccess, user:userDetails } = useUser();
    const { auth } = userDetails ;

    const handleChange = (name, value)=> {
        setUser(prevUser => ({ ...prevUser, [name]: value}))
    }


    const handleRegister = async (e) => {
        e.preventDefault();
    
        authRequest();
        ajax.post('/users/register', user).then((response) => {
            console.log({response})
            navigate('/login');
        }).catch((error) => {
            toast.error(error.message)
            console.log('error', error.message);
        });
    }

    if (auth) return (<Navigate to="/dashboard" />);


    return (
        <section className="min-h-screen flex flex-col justify-center items-center ">

            <form className="card border border-slate-300 w-11/12 sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-1/3 py-10" onSubmit={handleRegister}>
                <h2 className='text-2xl text-center pb-1'>
                    Create a Account
                </h2>
                <div className="form-control">
                    <label htmlFor="firstName" className='label'>Name</label>
                    <input type="text"
                        id="firstName"
                        name="Name"
                        className="input"
                        value={user.name}
                        onChange={(e) => handleChange("name",e.target.value)}
                        placeholder="Enter your Name" />
                </div>
                <div className="form-control">
                    <label htmlFor="country" className='label'>Country</label>
                    <input type="text"
                        id="country"
                        name="country"
                        className="input"
                        value={user.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                        placeholder="Enter your Country" />
                </div>
                <div className="form-control">
                    <label htmlFor="phone" className='label'>Mobile Number</label>
                    <input type="text"
                        id="phone"
                        name="phone"
                        className="input"
                        value={user.phoneNumber}
                        onChange={(e) => handleChange("phoneNumber", e.target.value)}
                        placeholder="Enter your Mobile Number" />
                </div>
                <div className="form-control">
                    <label htmlFor="email" className='label'>Email</label>
                    <input type="text"
                        id="email"
                        name="email"
                        className="input"
                        value={user.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Email" />
                </div>
                <div className="form-control">
                    <label htmlFor="password" className='label'>Password</label>
                    <input type="text"
                        id="password"
                        name="password"
                        className="input"
                        value={user.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        placeholder="Password" />
                </div>
                <div className="form-control flex justify-between">
                    <Link to="/login" className='btn'>Have Account? login</Link>
                    <input type="submit" className="btn-primary" />
                </div>
            </form>
        </section>
    )
}

export default Register;