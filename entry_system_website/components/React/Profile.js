import styles from '../../styles/Profile.module.css';



export default function UserProfile(props) {
    
    
    return (
        <div className={styles.profileWrapper}>
            <img className={styles.userIcon} src={props.src} alt="Profile Icon"/>
            <div className={styles.userInformation}>
                <div className={styles.fullName}>{props.firstName + " " + props.lastName}</div>
                <div className={styles.email}>{props.email}</div>
            </div>
        </div>
    )
}