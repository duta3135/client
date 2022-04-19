import { useState } from 'react';
import React from 'react';
import axios from 'axios'
import Head from 'next/head'
import ArticleCard from '../../components/ArticleCard';
import styles from '../../styles/ArticlesPage.module.css'
import { ArticlesLayout } from '../../components/ArticlesLayout';
import MenuModal from '../../components/MenuModal';
function Index({articles}) {
  const [show, setShow] = useState(false)
  return <div className={styles.container}>
      <Head>
          <title>Health</title>
      </Head>
      <ArticlesLayout setModalState={setShow}>
        <main>
          {articles.map((article)=><ArticleCard props={article}/>)}
        </main>
      </ArticlesLayout>
      <MenuModal show={show} setModalState={setShow}/>

  </div>;
}

export default Index;
export async function getStaticProps(){
    const res = await axios.get(`${process.env.API_URL}/articles?published=true&category=Health`)
    const articles = res.data
    return{
        props:{
            articles
        },revalidate: 3600
    }
}