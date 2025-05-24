import { useState, useEffect } from 'react';
import todoImg from './assets/todo.png';
import Card from './components/Card'

function Signup(){
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    const session = async function(){
        // console.log(username, password);
        const res = await fetch('http://localhost:3000/signup', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({name, username, password})
        });
        // console.log(res);
        const data = await res.json();
        // console.log(data.token);
        if(res.status == 200){
            window.location.replace('/login');
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
                <p>Already have an account? <a href="/">Log in</a></p>
                </div>
            </Card>
        </div>
        </>
    )
}

export default Signup