import axios from 'axios';
import React , {useState} from 'react';
import ArticleCard from '../../components/ArticleCard';
import Head from 'next/head';
import {Editor, EditorState, convertFromRaw} from 'draft-js';
import styles from '../../styles/DynamicArticle.module.css'
function DynamicArticle({article, otherArticleRecs, relatedArticleRecs}) {
    console.log(relatedArticleRecs)
    const {_id, category, title, description, writers, content, cover, published} = article
    const convertedState = convertFromRaw(JSON.parse(content))
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertedState))
    function copyLink(url) {
        navigator.clipboard.writeText(url);
        alert("copied to clipboard");
      } 
    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description}/>
                <meta name='keywords' content={category}/>
                <meta name='author' content={writers.map(writer=>writer.name)}/>
                <meta property="og:site_name" content='The Curious Mind'/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:type" content="article"/>
                <meta property="og:image" content={cover}/>
                <meta property="og:image:width" content="1080"/>
                <meta property="og:image:height" content="1080"/>
                <meta itemprop="name" content="The Curious Mind"/>
                <meta itemprop="thumbnailUrl" content={cover}/>
                <meta name="twitter:title" content={title}/>
                <meta name="twitter:image" content={cover}/>
                <meta name="twitter:card" content="summary"/>
            </Head>

            <main>
                <div className={styles.top}>
                    <h1>{title}</h1>
                    <button onClick={()=>copyLink(location.href)}>Copy Link</button>
                </div>
                <p>{description}</p>
                <p className={styles.writtenBy}>written by {writers.map((writer, index)=><a href={writer.insta}>{writers.length-1===index?writer.name:`${writer.name}, `}</a>)}</p>
                <article >
                <hr/>
                    <Editor
                        editorState={editorState}
                        readOnly={true}
                    />
                <hr/>
                </article>
                    <h2>Related Articles</h2>
                <section className={styles.relatedArticles}>
                    {relatedArticleRecs.map((article)=><ArticleCard props={article}/>)}
                </section>
            </main>
            <section className={styles.otherArticles}>
                <h2>Other Articles</h2>
                {otherArticleRecs.map((article)=><ArticleCard props={article}/>)}
            </section>
        </div>
    )
}

export default DynamicArticle;
export async function getStaticPaths(){
    const res = await axios.get(`${process.env.API_URL}/articles?published=true`)
    const articles = res.data
    const paths = articles.map((article)=>({
        params: {id: article._id}
    }))
    return{paths, fallback: true}
}
export async function getStaticProps({params}){
    const res = await axios.get(`${process.env.API_URL}/articles/${params.id}`)
    const article = res.data[0]
    const otherArticles = await axios.get(`${process.env.API_URL}/articles?published=true&limit=4&exclude=${article._id}`)
    const relatedArticles = await axios.get(`${process.env.API_URL}/articles?published=true&limit=4&exclude=${article._id}&category=${article.category}`)
    const relatedArticleRecs = relatedArticles.data
    const otherArticleRecs = otherArticles.data

    return{
        props: {article, otherArticleRecs, relatedArticleRecs}
    }
}
