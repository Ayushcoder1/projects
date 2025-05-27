import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Todos from './Todos.jsx';
// lazy sends network request again for the specific files required in the component

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/todos' element={<Todos /> }></Route>
            <Route path='/' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App