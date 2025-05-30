import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import './App.css'
import Dashboard from './Dashboard.jsx';

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/user/login' element={<Login />}></Route>
            <Route path='/user/signup' element={<Signup />}></Route>
            <Route path='/user/dashboard' element={<Dashboard />}></Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
