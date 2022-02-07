import styles from '../../styles/StudentRow.module.css';

export default function StudentRow(props) {

    let entryStatusIcon_style = {
        width: "4em",
        height: "4em",
        backgroundColor: props.entryStatus ? "#47DB82":"red",
        borderRadius: "5rem",
    }

    return(
        <div className={styles.StudentWrapper}>
            <img className={styles.userIcon} src={props.src} alt="Profile Icon"/>
            <div className={styles.userInformation}>
                <div className={styles.fullName}>{props.firstName + " " + props.lastName}</div>
                <div className={styles.email}>{props.email}</div>
            </div>
            <div className={styles.entryStatus}>
                <div className={styles.entryStatusTitle}>In Buildiung</div>
                <div style={entryStatusIcon_style} className={styles.entryStatusIcon}></div>
            </div>

        </div>
    )
}