
import Link from 'next/link';
import { useState } from 'react';
import {useAuth} from '../components/Firebase/Context/authUserContext.js';
import styles from '../styles/Dashboard.module.css';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import UserProfile from '../components/React/Profile';
import { useEffect } from 'react';
import StudentDirectory from '../components/React/StudentDirectory';

export default function Dashboard() {
    let { user, getFirestoreUser} = useAuth();
    let [userQuery, setUserQuery] = useState("both");
    let [firstName, setFirstname] = useState("Unknown");
    let [lastName, setLastname] = useState("Unknown");

    useEffect(() => {
        getUserExtraInformation()
    }, [user])


    async function getUserExtraInformation() {
        if (user) {
            try {
                let UserDoc = await getFirestoreUser(user.uid);
                if(UserDoc.exists()){
                    console.log(UserDoc.data().first_name);
                    setFirstname(UserDoc.data().first_name);
                    setLastname(UserDoc.data().last_name);
                }else{
                     console.log("User Doc Not Found");
                }
            } catch (error) {
               console.log(error) 
            }
        }

    }

    function handleMenuSelector(event) {
        setUserQuery(event.target.value);
    }

    if(user) {
        return(
            <div className={styles.DashboardWrapper}>
                <nav>
                    <button>
                        <Link href={"/"}>
                            <img src='/svg/Logo.jpg' alt="Logo of Webdesign Used for Home Navigation"/>
                        </Link>
                    </button>
                    
                    <section>


                        <div className={styles.StudentDirectoryTitle}>Student Directory</div>
                        <FormGroup>
                            <InputLabel>Entry Status Filter</InputLabel>
                            <Select onChange={handleMenuSelector}>
                                <MenuItem value="both">none</MenuItem>
                                <MenuItem value="in">In School</MenuItem>
                                <MenuItem value="out">out of School</MenuItem>
                            </Select>
                        </FormGroup>
                    </section>


                    <UserProfile src="svg/profile_image_placeholder.png" email={user.email} firstName={firstName} lastName={lastName}/>
                </nav>

                <section>
                    <div className={styles.StudentDirectorySecondaryTitle}>Student Directory</div>
                    <StudentDirectory query={userQuery}/>
                </section>


            </div> 
        )
    } else {
        return(
            <h1>Acesss Denied</h1>
        )
    }
}