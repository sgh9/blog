import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/user/user.context.provider'; 
import useAuth from '../../hooks/useAuth';
import { ajax } from '../../services/ajax';

const Home = () => {
    let navigate = useNavigate();
    const { authLogout, authState, loading  } = useContext(userContext);
    const [articles, setArticles] = useState([]);

    useEffect(()=> {
           ajax.get('/articles').then((res)=> {
               setArticles(res)
           }).catch((err)=> {
   
           });
    },[]);

    return (
        <>
            <Link to='/login'>Login</Link>
            {articles && articles.map(article=> <div>{article.title}</div>)}

        </>
    )
}
export default Home;