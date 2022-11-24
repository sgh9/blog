import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../context/user/user.context.provider'; 
import { useParams, useNavigate } from 'react-router-dom';
import { ajax } from '../../services/ajax';

const Dashboard = () => {
    let navigate = useNavigate();
    
    const { authLogout, getAuthStatus, authState, loading } = useContext(userContext);
    const [articles, setArticles] = useState([]);

    useEffect(()=> {
       if(authState.user.token) {
           ajax.get('/articles/user',{
               "X-Auth-token": authState.user.token
           }).then((res)=> {
               setArticles(res)
           }).catch((err)=> {
   
           });
       }
    },[authState.user]);
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
            {articles && articles.map(article=> <div>{article.title}</div>)}
            </div>
        </>
    )
}
export default Dashboard; 
