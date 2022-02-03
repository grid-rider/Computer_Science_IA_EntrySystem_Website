import { Firebase_signIn, auth, Firebase_signOut} from '../components/Firebase/Firebase';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../components/Firebase/Context/authUserContext';
import Link from 'next/link';

export default function SignInPage (){

    let { signIn , user} = useAuth();
    let [ invalidLogin, setInvalidLogin] = useState(false);

    const router = useRouter();

    let email = useRef();
    let password = useRef();
    
    function signIn_ButtonHandler(){
        signIn(email.current.value,password.current.value).then((res) => {
            router.push("Dashboard");
        }).catch((error) => {
            console.log(error.message);
            setInvalidLogin(true);
        })
    }


    return (
        <div>
            <div>Logged in status: {user? "true" : "false"}</div>
            <div className='AccountFormWrapper'>
                <label >Enter Email: <br></br>
                    <input ref={email} type="text" id = "email" name = "email"/>
                </label>
                <label>Enter Password:<br></br>
                    <input ref={password} type="password" id = "password" name = "password" />
                </label>
                <button onClick={signIn_ButtonHandler}>Sign In</button>
                <div style={{color: "black", margin: "0 auto"}}>Need an Account? <Link href={"SignUpPage"}>Create Account</Link></div>
                <div style={{display: !invalidLogin ? "none" : "block", color: "red", fontSize: "1em", margin: "0 auto"}}>Wrong Email or Password</div>
            </div>
        </div>
    )
}