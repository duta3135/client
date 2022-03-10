import React from 'react';
import styles from '../styles/ArticleCard.module.css'
import styless from '../styles/AdminArticleCard.module.css'
export default function ArticleCard({props, size}) {
    const {_id, category, title, description, writers, content, cover, published} = props
    var scrSize = size!=undefined?size: 800
    
    if (scrSize>767){
        return (
            <div className={styles.container}>
                <a href={`/articles/${_id}`}>
                    <img src={cover}/>
                </a>
                <a href={`/articles/${_id}`}>
                    <div className={styles.text}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <p>written by {writers.map((writer, index)=><a href={writer.insta}>{writers.length-1===index?writer.name:`${writer.name}, `}</a>)}</p>
                    </div>
                </a>
            </div>
    )
    }
    else{
        return(
            <div className={styles.wrapper}>
                <a className={styles.cover} href={`/articles/${_id}`}>
                    <img src={cover}/>
                </a>
                    <div>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <p>written by {writers.map((writer, index)=><a href={writer.insta}>{writers.length-1===index?writer.name:`${writer.name}, `}</a>)}</p>
                    </div>
            </div>
        )
    }
}
