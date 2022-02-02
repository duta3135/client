import React from 'react';
import axios from 'axios'
import ArticleCard from '../../components/ArticleCard';
import styles from '../../styles/ArticlesPage.module.css'
import { ArticlesLayout } from '../../components/ArticlesLayout';
function Index({articles}) {
  return <div className={styles.container}>
      <ArticlesLayout>
        <main>
          {articles.map((article)=><ArticleCard props={article}/>)}
        </main>
      </ArticlesLayout>
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