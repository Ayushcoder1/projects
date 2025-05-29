import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/user/login' element={<Login />}></Route>
            <Route path='/user/signup' element={<Signup />}></Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
