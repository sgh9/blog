import { createContext , useReducer, useRef, useEffect } from 'react';
import userReducer from './user.reducer';
import useAuth from '../../hooks/useAuth';

const initialState = {
    user: {
        details: {},
        auth: false,
        token: '',
    },
    loading: true,
}
export const userContext = createContext(initialState);

const UserContextProvider = ({ children })=> {
    const { token, userDetails } = useAuth();
    const [authState, dispatch] = useReducer(userReducer, initialState);

	useEffect(() => {
		getAuthStatus();
	}, []);

    const getAuthStatus = ()=> {
        console.log('Auth status');
        authRequest();

        if(!token){
            authLogout();
            console.log('Auth logout');
        } else {
            authSuccess(token, userDetails);
            console.log('Auth success');
        }
    }

    const authLogout = ()=> {

        dispatch({
            type: "AUTH_LOGOUT",
            payload: {
                user: {
                    details: {},
                    auth: false,
                    token: '',
                },
                loading: false,
            }
        })
    }

    const authRequest = ()=> {
        console.log('Auth request')
        dispatch({
            type: "AUTH_REQUEST",
            payload: {
                loading: true
            }
        })
    }
    const authSuccess = (token, userDetails )=> {
        dispatch({
            type: "AUTH_SUCCESS",
            payload: {
                user: {
                    details: userDetails,
                    auth: true,
                    token: token,
                },
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
                authState, 
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

export default UserContextProvider;