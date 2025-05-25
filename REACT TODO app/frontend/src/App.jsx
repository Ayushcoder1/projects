import './App.css'
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
const Todos = React.lazy(() => import('./Todos.jsx'));
// var token = localStorage.getItem('token');
// lazy sends network request again for the specific files required in the component

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/todos' element={<Suspense> <Todos /> </Suspense>}></Route>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App