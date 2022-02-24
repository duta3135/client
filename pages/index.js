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
        <h3>The Curious Mind</h3>
      </header>
      <main className={styles.main}>
        <section className={styles.hero}>
          <Link href={`/articles/${newestArticle[0]._id}`}>
            <div className={styles.newestArticle}>
              <img src={newestArticle[0].cover}/>
              <h2>{newestArticle[0].title}</h2>
              <p>{newestArticle[0].description}</p>
              <p>written by {newestArticle[0].writers.map(writer=><Link href={writer.insta}>{writer.name}</Link>)}</p>
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
            {articles.map(article=><ArticleCard props={article}/>)}
          </div>
          <Link href='/articles'><button>See more articles</button></Link>
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
