import React from 'react';
import styles from '../styles/ArticlesPage.module.css'

export function ArticlesLayout({children}) {
  return (
  <div>
      <header>
        <a className={styles.navLinks} href='/articles/entertainment'>Entertainment</a>
        <a className={styles.navLinks} href='/articles/food'>Food</a>
        <a className={styles.navLinks} href='/articles/health'>Health</a>
        <a className={styles.navLinks} href='/articles/politics'>Politics</a>
        <button>Surpise me!</button>
      </header>
      {children}
  </div>)
}
