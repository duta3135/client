import React from 'react';
import styles from '../styles/AdminArticleCard.module.css'

function AdminArticleCard({article, setModalState}) {
  const status = article.published ? <div>published</div> : <div>draft</div>
  function edit(path){
    location.replace(path)
  }
  return (
    <div className={styles.wrapper}>
      <a className={styles.cover} href={`/articles/${article._id}`} >
        <img src={article.cover}></img>
      </a>
        <div>
          <h3>{article.title}</h3>
          <p>by {article.writers.map(writer=><a href={writer.insta}>{writer.name},</a>)}</p>
        </div>
        <h4>{status}</h4>
        <button onClick={()=>edit(`/admin/article-editor/${article._id}`)}>
          <img src='https://res.cloudinary.com/duta3135/image/upload/v1644299955/edit_icon_mzmmm3.png' />
        </button>
        <button onClick={()=>{
          setModalState({
            text: `Delete ${article.title}?`,
            mainAction: ()=>console.log(`deleted ${article.title}`),
            show: true
          })
        }}>
          <img  src='https://res.cloudinary.com/duta3135/image/upload/v1644299948/trashcan_icon_lzdydl.png'/>
        </button>
    </div>
  )
}

export default AdminArticleCard;
