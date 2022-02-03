import React from 'react';

function AdminArticleCard({article}) {
    
  return (
  <div>
      <img src={article.cover}></img>
      <h3>{article.title}</h3>
      <h4>by {article.writers}</h4>
      <h4>{JSON.stringify(article.published)}</h4>
      <button></button>
      <button></button>
  </div>)
}

export default AdminArticleCard;
