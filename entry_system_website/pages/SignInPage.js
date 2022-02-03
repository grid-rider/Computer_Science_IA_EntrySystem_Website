import { Firebase_signIn, auth, Firebase_signOut} from '../components/Firebase/Firebase';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';

export default function SignInPage (){
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log("changed");
            console.log(user);
        })
    }, []);

    let email = useRef();
    let password = useRef();
    
    function signIn_ButtonHandler(){
        Firebase_signIn(email.current.value, password.current.value).then((returner) => {
            console.log(returner)
        })
    }

    function signOut_ButtonHandler(){
        Firebase_signOut();
    }

    return (
        <div>
            <div className='AccountFormWrapper'>
                <label >Enter Email: <br></br>
                    <input ref={email} type="text" id = "email" name = "email"/>
                </label>
                <label>Enter Password:<br></br>
                    <input ref={password} type="password" id = "password" name = "password"/>
                </label>
                <button onClick={signIn_ButtonHandler}>Sign In</button>
            </div>
            <button onClick={signOut_ButtonHandler}>Sign Out</button>
        </div>
    )
}