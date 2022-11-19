import { useState, useEffect, useRef } from 'react';
import { parseJwt } from '../helpers/utils';

function useAuth() {
    const token = JSON.parse(localStorage.getItem('token'));
    const [userDetails, setUserDetails] = useState({});
    const [auth, setAuth] = useState(false);
    
    useEffect(()=> {
      if(token && token.length > 0) { 
        const user = parseJwt(token);
        setUserDetails(user);
        setAuth(true);
      } 
    },[]);

  return {token, userDetails, auth };
}

export default useAuth;