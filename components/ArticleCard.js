import React from 'react';
import Link from 'next/link'
import styles from '../styles/ArticleCard.module.css'

export default function ArticleCard({props}) {
    const {_id, category, title, description, writers, content, cover, published} = props
    return (
        <Link href={`/articles/${_id}`}>
        <div className={styles.container}>
            <img src={cover}/>
            <div className={styles.text}>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>written by {writers}</p>
            </div>
        </div>
        </Link>)
}
