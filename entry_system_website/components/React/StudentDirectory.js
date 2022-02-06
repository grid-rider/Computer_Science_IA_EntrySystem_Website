import { useEffect } from "react";
import { useState } from "react"
import { useAuth } from "../Firebase/Context/authUserContext";
import StudentRow from "./StudentRow";
import styles from '../../styles/StudentDirectory.module.css';

export default function StudentDirectory(props) {

    let { studentList } = useAuth();



    function getListFromUserArray(){
        let updatedArray = studentList.filter((student) => {
            let studentData = student.data();
            switch (props.query) {
                case "in":
                    return studentData.entry_status == true;
                case "out":
                    return studentData.entry_status == false;            
                case "both": 
                    return true;            
            }
        });

        let listItems = updatedArray.map((student) => {
            let studentData = student.data();
            return (<li className={styles.listItem} key={student.id}><StudentRow entryStatus={studentData.entry_status} src="svg/profile_image_placeholder.png" email={studentData.email} firstName={studentData.first_name} lastName={studentData.last_name} key_value={student.id}/></li>)
        })

        return listItems
    }

    return(
        <ul className={styles.list}>
            {getListFromUserArray()}
        </ul>
    )

}