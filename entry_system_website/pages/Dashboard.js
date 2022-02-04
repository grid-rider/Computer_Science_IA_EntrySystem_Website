
import Link from 'next/link';
import { useState } from 'react';
import {useAuth} from '../components/Firebase/Context/authUserContext.js';
import styles from '../styles/Dashboard.module.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Dashboard() {
    let { user } = useAuth();

    let [checked_InSchool, SetChecked_InSchool] = useState("true");
    let [checked_OutOfSchool, SetChecked_OutOfSchool] = useState("true");
    let [studentList, setStudentList] = useState([]);


    function Handlecheck_InSchool_SchoolQuery(event){
        SetChecked_InSchool(event.target.checked)
    }

    function Handlecheck_OutofSchool_SchoolQuery(event){
        SetChecked_OutOfSchool(event.target.checked)
    }

    if(user) {
        return(
            <div className={styles.DashboardWrapper}>
                <nav>
                    <button className={styles.HomeButton}>
                        <Link href={"/"}>
                            <img src='/svg/Logo.jpg' alt="Logo of Webdesign Used for Home Navigation"/>
                        </Link>
                    </button>

                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={Handlecheck_InSchool_SchoolQuery} />} label="In School" />
                        <FormControlLabel control={<Checkbox onChange={Handlecheck_OutofSchool_SchoolQuery} />} label="Out of School" />
                    </FormGroup>

                    <div className={styles.UserProfile}>
                            
                    </div>
                </nav>

                <section>
                    
                </section>
            </div> 
        )
    } else {
        return(
            <h1>Acesss Denied</h1>
        )
    }
}