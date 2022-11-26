import React, { useContext, useEffect, useState } from 'react';
import { userContext, useUser } from '../../context/user/UserContextProvider'; 
import { useParams, useNavigate } from 'react-router-dom';
import { ajax } from '../../services/ajax';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

/*
logout
get all articles - admin,
user aricles - user
profile - edit and update.
users - user delete, update, block,
article update , delete, post
*/

const Dashboard = () => {
    let navigate = useNavigate();
    
    const { authLogout, getAuthStatus, user, loading } = useUser();
    const [articles, setArticles] = useState([]);

    useEffect(()=> {
       if(user.token) {
           ajax.get('/articles/user',{
               "X-Auth-token": user.token
           }).then((res)=> {
               setArticles(res)
           }).catch((err)=> {
   
           });
       }
    },[user]);
    return (
        <>
            <Header/>
            <div className='flex bg-slate-50'>
                <SideBar/>
                <div className='center w-full bg-white rounded-xl shadow-sm'>
                    {articles && articles.map(article=> <div key={article.title}>{article.title}</div>)}
                </div>
            </div>
        </>
    )
}
export default Dashboard; 
