import Link from 'next/link'
import styles from './sidebar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a>Register</a>
      </Link>
      <Link href="/about">
        <a>Login</a>
      </Link>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
      <Link href="/contact">
        <a>About</a>
      </Link>
    </nav>
  )
}