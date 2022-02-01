import React from 'react';
import axios from 'axios'
import a from 'next/link'
import ArticleCard from '../../components/ArticleCard';
import styles from '../../styles/ArticlesPage.module.css'
function Index({articles}) {
  return <div className={styles.container}>
      <header>
        <a className={styles.navLinks} href='/entertainment'>Entertainment</a>
        <a className={styles.navLinks} href='/food'>Food</a>
        <a className={styles.navLinks} href='/health'>Health</a>
        <a className={styles.navLinks} href='/politics'>Politics</a>
        <button>Surpise me!</button>
      </header>
      <main>
        {articles.map((article)=><ArticleCard props={article}/>)}
      </main>
      
  </div>;
}

export default Index;
export async function getStaticProps(){
    const res = await axios.get('http://localhost:3001/articles?published=true')
    const articles = res.data
    return{
        props:{
            articles
        }
    }
}