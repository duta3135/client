import React from 'react';
import { deleteArticle } from '../helpers/deleteArticle';
import styles from '../styles/AdminArticleCard.module.css'

function AdminArticleCard({article,headers, setModalState}) {
  const status = article.published ? <div>published</div> : <div>draft</div>
  const href = article.published ? `/articles/${article._id}` : "#"
  function edit(path){
    location.replace(path)
  }
  return (
    <div className={styles.wrapper}>
      <a className={styles.cover} href={href} >
        <img src={article.cover}></img>
      </a>
        <div>
          <h3>{article.title}</h3>
          <p>by {article.writers.map(writer=><a href={writer.insta}>{writer.name},</a>)}</p>
        </div>
        <p>{status}</p>
        <button onClick={()=>edit(`/admin/article-editor/${article._id}`)}>
          <img src='https://res.cloudinary.com/duta3135/image/upload/v1645856480/assets/edit_icon_f8pkzo.png' />
        </button>
        <button onClick={()=>{
          setModalState({
            text: `Delete ${article.title}?`,
            mainAction: ()=>deleteArticle(article._id, headers).then(setModalState({
              text: `Deleted Article`,
              mainAction: ()=>location.reload(),
              show: true
            })),
            show: true
          })
        }}>
          <img  src='https://res.cloudinary.com/duta3135/image/upload/v1645856480/assets/trashcan_icon_bif2p4.png'/>
        </button>
    </div>
  )
}

export default AdminArticleCard;
