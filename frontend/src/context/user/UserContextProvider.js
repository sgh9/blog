import { createContext , useReducer, useRef, useEffect, useContext } from 'react';
import userReducer from './user.reducer';
import { parseJwt } from '../../helpers/utils';

const initialState = {
    name: '',
    email: '',
    auth: false,
    token: '',
    loading: true,
}
export const userContext = createContext(initialState);

const UserContextProvider = ({ children })=> {
    const token = JSON.parse(localStorage.getItem('token'));
    const [user, dispatch] = useReducer(userReducer, initialState);

	useEffect(() => {
		getAuthStatus();
	}, []);

    const getUserDetails = (jwt)=>  parseJwt(jwt);

    const getAuthStatus = ()=> {
        authRequest();
        if(!token){
            authLogout();
            console.log('Auth logout');
        } else {
            authSuccess(token);
            console.log('Auth success');
        }
    }

    const authLogout = ()=> {
        localStorage.removeItem('token');
        dispatch({
            type: "AUTH_LOGOUT",
            payload: {
                ...initialState,
                auth: false,
                token: '',
                loading: false,
            }
        })
    }

    const authRequest = ()=> {
        dispatch({
            type: "AUTH_REQUEST",
            payload: {
                loading: true
            }
        })
    }
    const authSuccess = (token )=> {
        localStorage.setItem('token', JSON.stringify(token));

        dispatch({
            type: "AUTH_SUCCESS",
            payload: {
                ...getUserDetails(token),
                auth: true,
                token: token,
                loading: false   
            }
        })
    }

    const authError = (error)=> {
        dispatch({
            type: "AUTH_ERROR",
            payload: {
                error: error,
                loading: false
            }
        })
    }

    return (
        <userContext.Provider 
            value={{
                user, 
                authSuccess,
                authError, 
                authRequest, 
                getAuthStatus,
                authLogout
            }}> 
            {children}
        </userContext.Provider>
    );
}

export const useUser = ()=> useContext(userContext);

export default UserContextProvider;