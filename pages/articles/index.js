import React from 'react';
import axios from 'axios'
import Head from 'next/head'
import ArticleCard from '../../components/ArticleCard';
import styles from '../../styles/ArticlesPage.module.css'
import { useState } from 'react';
import { ArticlesLayout } from '../../components/ArticlesLayout';
import MenuModal from '../../components/MenuModal';
import {useWindowSize} from '../../helpers/useWindowSize'
function Index({articles}) {
  const [show, setShow] = useState(false)
  const size = useWindowSize()
  return <div className={styles.container}>
    <Head>
          <title>Articles</title>
      </Head>
      <ArticlesLayout setModalState={setShow}>
        <main>
          {articles.map((article)=><ArticleCard props={article} size={size.width}/>)}
        </main>
      </ArticlesLayout>
      <MenuModal show={show} setModalState={setShow}/>
  </div>;
}

export default Index;
export async function getStaticProps(){
    const res = await axios.get(`${process.env.API_URL}/articles?published=true`)
    const articles = res.data
    return{
        props:{
            articles
        }
    }
}