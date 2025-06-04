import { Link, useNavigate } from 'react-router-dom'
import todoImg from '../assets/todo.png';
import { useRef } from 'react';
import { session_Atom } from '../store/atoms';
import { useSetAtom } from 'jotai';

function Signin({isSignin}){
    const warning = null;
    const usernameRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const navigate = useNavigate();
    const server = useSetAtom(session_Atom);

    function session(){
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const name = nameRef.current ? nameRef.current.value : null;
        server({ username, password, name });
        navigate('/account/todos');
    }
    return (
        <div className='flex flex-col items-center'>
            <img src={todoImg} className='w-40 h-40' alt="" />
            <div className='bg-blue-50 mt-4 shadow-xl rounded-lg px-10 py-8'>
                <h1 className='font-bold text-3xl text-center mb-2'>{isSignin ? "Log in" : "Sign up"}</h1>
                <p className='text-zinc-400 text-center text-lg mb-4'>{isSignin? "Enter your information to access your account" : 
                "Enter your information to create an account"}</p>

                {
                    warning &&
                    <p className='text-red-600 text-center text-sm'>{warning}</p>
                }

                {
                    !isSignin && 
                    <div>
                        <p className='text-lg font-semibold text-black mb-2'>Name</p>
                        <input ref={nameRef} type="text" placeholder='Hello there' className='border-black border-2 w-80 rounded-sm p-2 mb-2 bg-white'/>
                    </div>
                }
                <div>
                    <p className='text-lg font-semibold text-black'>Username</p>
                    <input ref={usernameRef} type="text" placeholder='abc@gmail.com' className='border-black border-2 w-80 rounded-sm p-2 mb-2 bg-white'/>
                </div>
                <div>
                    <p className='text-lg font-semibold text-black'>Password</p>
                    <input ref={passwordRef} type="text" placeholder='12345678' className='border-black border-2 w-80 rounded-sm p-2 mb-6 bg-white'/>
                </div>
                <div>
                    <button className='border-black border-2 w-80 rounded-full p-2 mb-2 text-white bg-green-500 text-lg font-bold' onClick={session}>{isSignin ? "Log in" : "Sign up"}</button>
                </div>
                <p className='text-center text-zinc-400 italic font-semibold'>{isSignin ? "New user?  " : "Already have an account?  "} <Link className='text-blue-400 underline' to={isSignin ? "/user/signup" : "/user/login"}>{isSignin ? "Sign up" : "Log in"}</Link></p>
            </div>
        </div>
    )
}

export default Signin