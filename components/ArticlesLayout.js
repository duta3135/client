import React from 'react';
import styles from '../styles/ArticlesPage.module.css'

export function ArticlesLayout({children}) {
  return (
  <div>
      <header>
        <a className={styles.navLinks} href='/entertainment'>Entertainment</a>
        <a className={styles.navLinks} href='/food'>Food</a>
        <a className={styles.navLinks} href='/health'>Health</a>
        <a className={styles.navLinks} href='/politics'>Politics</a>
        <button>Surpise me!</button>
      </header>
      {children}
  </div>)
}
