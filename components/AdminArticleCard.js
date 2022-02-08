import Link from 'next/link';
import React from 'react';
import styles from '../styles/AdminArticleCard.module.css'

function AdminArticleCard({article}) {
  const status = article.published ? <div>published</div> : <div>draft</div>
  return (
  
    <div className={styles.wrapper}>
      <Link href={`/articles/${article._id}`}>
        <img src={article.cover}></img></Link>
        <span>
        <h3>{article.title}</h3>
        by {article.writers}
        </span>
        <h4>{status}</h4>
        <a href={`/admin/article-editor/${article._id}`} >
          <img src='https://res.cloudinary.com/duta3135/image/upload/v1644299955/edit_icon_mzmmm3.png' />
        </a>
        <button>
          <img src='https://res.cloudinary.com/duta3135/image/upload/v1644299948/trashcan_icon_lzdydl.png'/>
        </button>
    </div>
  )
}

export default AdminArticleCard;
