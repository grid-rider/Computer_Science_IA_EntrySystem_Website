import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <nav>
        <div className='icon'> </div>
        <ul>
          <li><Link className = {styles.SignIn} href="SignInPage">Sign In</Link></li>
          <li><Link className = {styles.SignOut} href="AccountCreationPage">Create Account</Link></li>
        </ul>
      </nav>

      <h1>School Entry System</h1>
    </div>
  )
}
