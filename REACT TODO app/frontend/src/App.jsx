import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Todos from './Todos.jsx';
import './index.css';

const Analyse = lazy(() => import('./Analyse.jsx'));

function App() {
  return (
    <BrowserRouter>
      {/* You need a Suspense boundary around any lazy component */}
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path="/account/todos"   element={<Todos />}   />
          <Route path="/account/analyse" element={<Analyse />} />
          <Route path="/user/login"      element={<Login />}   />
          <Route path="/user/signup"     element={<Signup />}  />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
