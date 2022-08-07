import React, { useState, useRef, useEffect, useContext } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import {
	Routes,
	BrowserRouter as Router,
	Route,
	Navigate,
} from 'react-router-dom';
import useAuth from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import UserContextProvider, {
	userContext,
} from './context/user/user.context.provider';


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
						<Route path='/dashboard' element={<ProtectedRoute />}>
							<Route path='/dashboard' element={<Dashboard />} />
						</Route>
					</Routes>
				</main>
				<footer className='footer'></footer>
			</div>
		</Router>
		</UserContextProvider>
	);
}

export default App;
