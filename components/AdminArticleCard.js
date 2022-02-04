import Link from 'next/link';
import React from 'react';
import styles from '../styles/AdminArticleCard.module.css'

function AdminArticleCard({article}) {
  const status = article.published ? <div>published</div> : <div>draft</div>
  return (
  <Link href={`/articles/${article._id}`}>
    <div className={styles.wrapper}>
        <img src={article.cover}></img>
        <span>
        <h3>{article.title}</h3>
        by {article.writers}
        </span>
        <h4>{status}</h4>
        
    </div>
  </Link>)
}

export default AdminArticleCard;
