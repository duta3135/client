import Link from 'next/link';
import React from 'react';
import styles from '../styles/Admin.module.css'

function AdminLayout({children}) {
  return (
      <div className={styles.wrapper}>
          <nav>
              <Link href='admin/article-editor'>
                  <button>+ Create article</button>
              </Link>
              <a href='/admin'>Articles</a>
              <a href='/admin/published'>Published</a>
              <a href='/admin/drafts'>Drafts</a>
              <a href='/admin/podcasts'>Podcasts</a>
              <a href='/admin/writers'>Writers</a>
          </nav>
          <section>{children}</section>
          
      </div>
  )
}

export default AdminLayout;
