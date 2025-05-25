import { useState, useEffect } from 'react';
import todoImg from './assets/todo.png';
import './Login.css'
import Card from './components/Card'
import { useNavigate, Link } from 'react-router-dom';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const session = async function(){
        // console.log(username, password);
        const res = await fetch('http://localhost:3000/login', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({username, password})
        });
        // console.log(res);
        const data = await res.json();
        // console.log(data.token);
        if(res.status == 200){
            localStorage.setItem('token', data.token);
            // window.location.replace('/todos');
            navigate('/todos');
        }
    }

    return (
        <>
        <div id='outer_login'>
            <div id='start'>
                <div>
                    <img src={todoImg} alt="TODO image" id='pic'/>
                </div>
                <div>
                    <p>Sign in to TODO App</p>
                </div>
            </div>
            <Card>
                <div id='login-form'>
                <div>
                    <p>Username or email address</p>
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div>
                    <p>Password</p>
                    <input type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <div>
                    <button onClick={session}>Sign in</button>
                </div>
                </div>
            </Card>
            <Card>
                <div id='redirect'>
                <p>New to TODO? <Link to='/signup'>Create an account</Link></p>
                </div>
            </Card>
        </div>
        </>
    )
}

export default Login