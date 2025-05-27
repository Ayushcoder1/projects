import { useState, useEffect } from 'react';
import todoImg from './assets/todo.png';
import Card from './components/Card'
import { useNavigate, Link } from 'react-router-dom';
import { session_Atom } from './store/atoms';
import { useAtom, useSetAtom } from 'jotai'

function Signup(){
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const server = useSetAtom(session_Atom);

    const session = function(){
        server({ username, password, name });
        navigate('/todos');
    }

    return (
        <>
        <div id='outer_login'>
            <div id='start'>
                <div>
                    <img src={todoImg} alt="TODO image" id='pic'/>
                </div>
                <div>
                    <p>Sign up to TODO App</p>
                </div>
            </div>
            <Card>
                <div id='login-form'>
                <div>
                    <p>Username</p>
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                </div>
                <div>
                    <p>Email address</p>
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div>
                    <p>Password</p>
                    <input type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <div>
                    <button onClick={session}>Sign up</button>
                </div>
                </div>
            </Card>
            <Card>
                <div id='redirect'>
                <p>Already have an account? <Link to="/">Log in</Link></p>
                </div>
            </Card>
        </div>
        </>
    )
}

export default Signup