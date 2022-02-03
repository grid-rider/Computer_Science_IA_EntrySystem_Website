import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useAuth } from '../components/Firebase/Context/authUserContext';

export default function AccountCreation() {

    let { createAccount } = useAuth();
    let [invalidSignUp, setInvalidSignUp] = useState(false);
    let router = useRouter();


    let email = useRef();
    let password = useRef();    

    function signUp_ButtonHandler(){
        createAccount(email.current.value, password.current.value).then(
            (res) => {
                console.log(res);
                router.push("SignInPage");
            }
        ).catch((err) => {
            setInvalidSignUp(true);
            console.log(err);
        })
    }

    return (
        <div className='AccountFormWrapper'>
            <label >Enter Email: <br></br>
                <input ref={email} type="text" id = "email" name = "email"/>
            </label>
            <label>Enter Password:<br></br>
                <input ref={password} type="password" id = "password" name = "password" />
            </label>
            <button onClick={signUp_ButtonHandler}>Sign Up</button>
            <div style={{display: !invalidSignUp ? "none" : "block", color: "red", fontSize: "1em", margin: "0 auto"}}>Invalid Email or Password</div>
        </div>

        
    )
}