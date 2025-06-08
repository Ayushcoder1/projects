import { useSetAtom } from 'jotai';
import { Link } from 'react-router-dom'
import { get_data_Atom, tokenAtom } from '../store/atoms';

function Navbar({isTodos}){
    const setToken = useSetAtom(tokenAtom);
    const get_data = useSetAtom(get_data_Atom)
    function delData(){
        setToken(null);
        get_data();
        sessionStorage.removeItem('token');
    }
  return (
    <div className='flex justify-between bg-blue-50 m-1 my-2 rounded-lg px-4 py-2 font-mono shadow-md'>
      <h1 className='text-3xl font-semibold'>TODO APP</h1>
      <div className='flex'>
        <Link to={isTodos ? '/account/analyse' : '/account/todos'} className='flex items-center text-lg hover:underline hover:cursor-pointer pr-4'>{isTodos ? 'Analyse' : 'Todos'}</Link>
        <Link to="/user/login" className='flex items-center text-lg hover:underline hover:cursor-pointer pr-4' onClick={delData}>Log out</Link>
      </div>
    </div>
  )
}

export default Navbar;