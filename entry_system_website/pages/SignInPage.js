import { Firebase_signIn, auth} from '../components/Firebase/Firebase';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';

export default function SignInPage (){
    let email = useRef();
    let password = useRef();
    
    function submitButtonHandler(){
        Firebase_signIn(email.current.value, password.current.value).then((returner) => {
            console.log(returner)
        })
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
                <button onClick={submitButtonHandler}>Sign In</button>
            </div>
        </div>
    )
}