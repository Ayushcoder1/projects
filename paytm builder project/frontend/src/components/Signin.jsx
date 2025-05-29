function Signin({isSignin}){
    return (
        <div>
            <div>
                <div>
                    
                </div>
                <div>
                    <p>{(isSignin ? Login : Signup)}</p>
                </div>
            </div>
            <Card>
                <div>
                {
                    !isSignin && 
                    <div>
                        <p>Username</p>
                        <input type="text"/>
                    </div>
                }
                <div>
                    <p>Email address</p>
                    <input type="text"/>
                </div>
                <div>
                    <p>Password</p>
                    <input type="text"/>
                </div>
                <div>
                    <button>Sign up</button>
                </div>
                </div>
            </Card>
            <Card>
                <div id='redirect'>
                <p>Already have an account? <Link to="/">Log in</Link></p>
                </div>
            </Card>
        </div>
    )
}

export default Signin