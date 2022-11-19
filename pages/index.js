import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { createClient } from 'next-sanity'
import ArticleCard from '../components/ArticleCard'
import Link from 'next/link'
import React, { useRef } from 'react'
const scrollToRef = (ref) => window.scrollTo({top: ref.current.offsetTop, behavior: 'smooth'})   

export default function Home({articles, newestArticle}) {
  const articlesRef=useRef(null)
  return (
    <div className={styles.container}>
      <Head>
        <title>The Curious Mind</title>
        <meta name="description" content="a youth-run journalism NGO dedicated to the pursuit of the student voice established in 2020" />
        <link rel="icon" href="https://res.cloudinary.com/duta3135/image/upload/v1650616277/assets/favicon_vgrh3i.jpg" />
      </Head>
      <header>
        <h2>The Curious Mind</h2>
        <button onClick={()=>scrollToRef(articlesRef)}>See Articles</button>
      </header>
      <main className={styles.main}>
        <section className={styles.hero}>
          {newestArticle?
          <Link href={`/articles/${newestArticle.slug.current}`}>
            <div className={styles.newestArticle}>
              <img src={newestArticle.cover}/>
              <h3>{newestArticle.title}</h3>
              <p>{newestArticle.description}{}</p>
              <p>written by {newestArticle.writers.map((writer, index)=><Link href={writer.slug.current}>{newestArticle.writers.length-1===index?writer.name:`${writer.name}, `}</Link>)}</p>
            </div>
          </Link>:null}
          <div className={styles.heroText}>
            <h1>A gateway to a world of curiosity</h1>
            <p>a youth-run journalism NGO dedicated to the pursuit of the student voice established in 2020</p>
            <a href='linktree'>
            </a>
            <button>More About Us</button>
          </div>
        </section>
        <section className={styles.articles} ref={articlesRef}>
          <h1>Our Articles</h1>
          <div className={styles.articleContainer}>
            {articles.map(article=><ArticleCard props={article}/>)}
          </div>
          <a href='/articles'><button className={styles.seeMoreBtn}>See more articles</button></a>
        </section>
        <section className={styles.podcast}></section>
      </main>
    </div>
  )
}

const client = createClient({
  projectId:"5dg3ygus",
  dataset: "production",
  useCdn: false
})
export async function getStaticProps(){
  const articles = await client.fetch(`*[_type=="post"]{
    title,
    slug,
    description,
    "writers": authors[]->{name, slug},
    "cover": cover.asset->url
  }`)
  const newestArticle= await client.fetch(`*[_type=="post"] | order(_createdAt desc)[0]{
    title,
    slug,
    description,
    "writers": authors[]->{name, slug},
    "cover": cover.asset->url
  }`)
  return{
    props:{
      articles,
      newestArticle
    },revalidate: 3600
  }
}
