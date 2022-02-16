import axios from 'axios';
import React , {useState} from 'react';
import ArticleCard from '../../components/ArticleCard';
import Head from 'next/head';
import {Editor, EditorState, convertFromRaw} from 'draft-js';
import { useRouter } from 'next/router'
import styles from '../../styles/DynamicArticle.module.css'
import { route } from 'next/dist/server/router';
import Link from 'next/link';

function DynamicArticle({article, articleRecs}) {
    const {_id, category, title, description, writers, content, cover, published} = article
    const convertedState = convertFromRaw(JSON.parse(content))
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertedState))
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
            <h1>{title}</h1>
            <h4>written by {writers.map(writer=><Link href={writer.insta}>{writer.name}</Link>)}</h4>
            <article >
                <Editor
                    editorState={editorState}
                    readOnly={true}
                />
            </article>
                <h2>Articles you might like</h2>
            <section>
                {articleRecs.map((article)=><ArticleCard props={article}/>)}
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
    const recommendationArticles = await axios.get(`${process.env.API_URL}/articles?published=true&limit=4&exclude=${article._id}&category=${article.category}`)
    const articleRecs = recommendationArticles.data

    return{
        props: {article, articleRecs}
    }
}
