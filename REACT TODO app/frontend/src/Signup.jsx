import Signin from './components/Signin.jsx';

function Signup(){

    return (
        <>
            <div className='flex flex-col items-center'>
                <Signin isSignin={0}/>
            </div>
        </>
    )
}

export default Signup