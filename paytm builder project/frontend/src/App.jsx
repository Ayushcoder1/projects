import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import './App.css'
import Dashboard from './Dashboard.jsx';
import Navbar from './Navbar.jsx';
import Transactions from './Transactions.jsx';
import Settings from './Settings.jsx';
import Contacts from './Contacts.jsx';

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/user/login' element={<Login />}></Route>
            <Route path='/user/signup' element={<Signup />}></Route>
            <Route path="/user" element={<Navbar />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Transactions" element={<Transactions />} />
              <Route path="Settings" element={<Settings />} />
              <Route path="Contacts" element={<Contacts />} />
          </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
