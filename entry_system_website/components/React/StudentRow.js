import {css} from '@emotion/react';
import styles from '../../styles/StudentRow.module.css';

export default function StudentRow(props) {

    let entryStatusIcon_style = {
        width: "2em",
        height: "2em",
        backgroundColor: props.entryStatus ? "green":"red",
        borderRadius: "5rem",
    }

    return(
        <li key={props.key_value}>
            <img className={styles.userIcon} src={props.src} alt="Profile Icon"/>
            <div className={styles.userInformation}>
                <div className={styles.fullName}>{props.firstName + " " + props.lastName}</div>
                <div className={styles.email}>{props.email}</div>
            </div>
            <div>In Buildiung</div>
            <div style={entryStatusIcon_style} className={styles.entryStatusIcon}></div>
        </li>
    )
}