import { useEffect } from "react";
import { useState } from "react"
import { useAuth } from "../Firebase/Context/authUserContext";
import StudentRow from "./StudentRow";

export default function StudentDirectory(props) {

    let { studentList } = useAuth();



    function getListFromUserArray(){
        let updatedArray = studentList.filter((student) => {
            switch (props.query) {
                case "in":
                    return student.entry_status == true;
                case "out":
                    return student.entry_status == false;            
                case "both": 
                    return true;            
            }
        });

        let listItems = updatedArray.map((element) => {
            return (<StudentRow entryStatus={element.entry_status} src="svg/profile_image_placeholder.png" email={element.email} firstName={element.first_name} lastName={element.last_name} key_value={element.email}/>)
        })

        return listItems
    }

    return(
        <ul>
            {getListFromUserArray()}
        </ul>
    )

}