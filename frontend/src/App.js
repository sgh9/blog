import React, { useState, useRef, useEffect, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import {
	Routes,
	BrowserRouter as Router,
	Route,
	Navigate,
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import UserContextProvider from './context/user/UserContextProvider';
import Register from './pages/Register';


// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
  injectStyle();
}


function App() {


	return (
		<UserContextProvider>
		<Router>
			<div className='main__container'>
				<header className='header'></header>
				<main className='main__content'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/dashboard' element={<ProtectedRoute />}>
							<Route path='/dashboard' element={<Dashboard />} />
						</Route>
						<Route path='*' element={<h2>404</h2>}/>
					</Routes>
				</main>
				<footer className='footer'></footer>
			</div>
		</Router>
		<ToastContainer/>
		</UserContextProvider>
	);
}

export default App;
