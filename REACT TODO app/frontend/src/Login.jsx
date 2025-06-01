import Signin from './components/Signin.jsx';

function Login(){
    return (
        <>
            <div className='flex flex-col items-center'>
                <Signin isSignin={1}/>
            </div>
        </>
    )
}

export default Login