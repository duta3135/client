import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'
import Link from 'next/link'

export default function Home({articles, newestArticle}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Curious Mind</title>
        <meta name="description" content="a youth-run journalism NGO dedicated to the pursuit of the student voice established in 2020" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h2>The Curious Mind</h2>
      </header>
      <main className={styles.main}>
        <section className={styles.hero}>
          <Link href={`/articles/${newestArticle[0]._id}`}>
            <div className={styles.newestArticle}>
              <img src={newestArticle[0].cover}/>
              <h3>{newestArticle[0].title}</h3>
              <p>{newestArticle[0].description}</p>
              <p>written by {newestArticle[0].writers.map((writer, index)=><a href={writer.insta}>{newestArticle[0].writers.length-1===index?writer.name:`${writer.name}, `}</a>)}</p>
            </div>
          </Link>
          <div className={styles.heroText}>
            <h1>A gateway to a world of curiosity</h1>
            <p>a youth-run journalism NGO dedicated to the pursuit of the student voice established in 2020</p>
            <a href='linktree'>
            </a>
            <button>More About Us</button>
          </div>
        </section>
        <section className={styles.articles}>
          <h1>Our Articles</h1>
          <div className={styles.articleContainer}>
            {articles.map(article=><ArticleCard size={size.width}props={article}/>)}
          </div>
          <a href='/articles'><button className={styles.seeMoreBtn}>See more articles</button></a>
        </section>
        <section className={styles.podcast}></section>
      </main>
    </div>
  )
}
export async function getStaticProps(){
  const articles = await axios.get(`${process.env.API_URL}/articles?published=true&limit=4`)
  const newestArticle= await axios.get(`${process.env.API_URL}/articles?published=true&limit=1`)
  return{
    props:{
      articles: articles.data,
      newestArticle: newestArticle.data
    }
  }
}
