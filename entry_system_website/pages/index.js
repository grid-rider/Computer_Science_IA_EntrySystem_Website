import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useAuth } from '../components/Firebase/Context/authUserContext'
import { useEffect } from 'react'



export default function Home() {
  let { user, Firebase_signOut , signIn} = useAuth();

  return (
    <div className={styles.HomePageWrapper}>


      <nav>
        <div className={styles.Icon}></div>

        <ul>
          <li><Link className = {styles.SignIn} href={user ? "Dashboard":"SignInPage"}>Dashboard</Link></li>
        </ul>
      </nav>

      <section>
        <div className={styles.Lock}></div>
        <div className={styles.BottomLeftPeople}></div>
      </section>


    </div>
  )
}
