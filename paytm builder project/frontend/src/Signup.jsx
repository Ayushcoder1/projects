import Signin from './components/Signin.jsx'

function Signup(){
    return (
        <div className='flex flex-col items-center'>
            <div className='w-100 mt-10'>
                <Signin isSignin={0}/>
            </div>
        </div>
    )
}

export default Signup