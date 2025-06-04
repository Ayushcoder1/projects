import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Todos from './Todos.jsx';
import './index.css'
// lazy sends network request again for the specific files required in the component

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/account/todos' element={<Todos /> }></Route>
            <Route path='/user/login' element={<Login />}></Route>
            <Route path='/user/signup' element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App