import React from 'react';
import styles from '../styles/ArticlesPage.module.css'
import axios from 'axios'
import Link from 'next/link'
export function ArticlesLayout({children, setModalState}) {
  async function surpriseMe(){
    axios.get('http://localhost:3001/articles?sample=true').then(res=>location.replace(`/articles/${res.data[0]._id}`))
  }
  return (
  <div className={styles.layoutContainer}>
      <header>
        <Link href='/articles/entertainment'><p className={styles.navLinks}>Entertainment</p></Link>
        <Link href='/articles/food'><p className={styles.navLinks}>Food</p></Link>
        <Link href='/articles/health'><p className={styles.navLinks}>Health</p></Link>
        <Link href='/articles/politics'><p className={styles.navLinks}>Politics</p></Link>
        <button className={styles.headerSurpriseMe} onClick={()=>surpriseMe()}>Surpise me!</button>
        <button onClick={()=>setModalState(true)}>
          <div className={styles.bar}></div>  
          <div className={styles.bar}></div>  
          <div className={styles.bar}></div>  
        </button>
      </header>
        <button className={styles.floatingSurpriseMe} onClick={()=>surpriseMe()}>Surpise me!</button>
      {children}
  </div>)
}

