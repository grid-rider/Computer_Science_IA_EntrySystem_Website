import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.HomePageWrapper}>
      
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,400;0,800;0,900;1,100&display=swap" rel="stylesheet"></link>


      <nav>
        <div className={styles.Icon}> </div>
        <ul>
          <li><Link className = {styles.SignIn} href="SignInPage">Sign In</Link></li>
          <li><Link className = {styles.SignOut} href="AccountCreationPage">Create Account</Link></li>
        </ul>
      </nav>
    </div>
  )
}
