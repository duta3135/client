import React from 'react';
import styles from '../styles/ArticlesPage.module.css'
import axios from 'axios'
import { useRouter } from 'next/router';

export function ArticlesLayout({children}) {
  const router = useRouter()
  async function surpriseMe(){
    axios.get('http://localhost:3001/articles?sample=true').then(res=>router.push(`/articles/${res.data[0]._id}`))
  }
  return (
  <div className={styles.layoutContainer}>
      <header>
        <a className={styles.navLinks} href='/articles/entertainment'>Entertainment</a>
        <a className={styles.navLinks} href='/articles/food'>Food</a>
        <a className={styles.navLinks} href='/articles/health'>Health</a>
        <a className={styles.navLinks} href='/articles/politics'>Politics</a>
        <button className={styles.headerSurpriseMe} onClick={()=>surpriseMe()}>Surpise me!</button>
      </header>
        <button className={styles.floatingSurpriseMe} onClick={()=>surpriseMe()}>Surpise me!</button>
      {children}
  </div>)
}
