import React from 'react';
import styles from '../styles/ArticleCard.module.css'
export default function ArticleCard({props}) {
    const {_id, category, title, description, writers, content, cover, published} = props
    
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
