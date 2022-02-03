
import Link from 'next/link';
import {useAuth} from '../components/Firebase/Context/authUserContext.js';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
    let { user } = useAuth();

    return (
        <div>
            { user? <div className={styles.DashboardWrapper}>
                <nav>
                    <button>
                        <Link href={"/"}>
                            <img src='/svg/Logo.jpg' alt="Logo of Webdesign Used for Home Navigation"/>
                        </Link>
                    </button>

                    <div className={styles.UserProfile}>
                            
                    </div>
                    
                </nav>
            </div> : <h1>Acesss Denied</h1>}
        </div>  
    )
}