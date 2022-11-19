import React from 'react';
import styles from '../styles/ArticleCard.module.css'
export default function ArticleCard({props}) {
    const {slug, title, description, writers, cover} = props
    
        return (
            <div className={styles.container}>
                <a href={`/articles/${slug.current}`}>
                    <img src={cover}/>
                </a>
                <a href={`/articles/${slug.current}`}>
                    <div className={styles.text}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <p>written by {writers.map((writer, index)=><a href={writer.insta}>{writers.length-1===index?writer.name:`${writer.name}, `}</a>)}</p>
                    </div>
                </a>
            </div>
    )
}
