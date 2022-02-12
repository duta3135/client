import React from 'react';
import axios from 'axios'
import ArticleCard from '../../components/ArticleCard';
import Head from 'next/head'
import styles from '../../styles/ArticlesPage.module.css'
import { ArticlesLayout } from '../../components/ArticlesLayout';
function Index({articles}) {
  return <div className={styles.container}>
      <Head>
          <title>Food</title>
      </Head>
      <ArticlesLayout>
        <main>
          {articles.map((article)=><ArticleCard props={article}/>)}
        </main>
      </ArticlesLayout>
  </div>;
}

export default Index;
export async function getStaticProps(){
    const res = await axios.get(`${process.env.API_URL}/articles?published=true&category=Food`)
    const articles = res.data
    return{
        props:{
            articles
        }
    }
}