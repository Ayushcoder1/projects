import { useState, useEffect } from 'react';
import './App.css'
import TODO from './components/TODO'
import Form from './components/Form'
import Card from './components/Card'


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Todos from './Todos.jsx';

// var token = localStorage.getItem('token');

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/todos' element={<Todos />}></Route>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App