import React from 'react'
import styles from './leftBar.module.css'
import { Link } from 'react-router-dom'

const Featured = () => {
  let featuredPosts = [
    { id: 1, title: 'welcome to sban5 101' },
    { id: 2, title: 'why you should eat healthy' },
    { id: 3, title: 'why men love all kinds of food' },
  ]
  return (
    <>
      <h3>Featured Posts</h3>
      <ul className={styles.featured}>
        {featuredPosts.map(post => {
          return (
            <li className={styles.featured_item} key={post.id}>
              <Link to={`/post/${post.id}`} >
                { post.title.length > 26 ? `${post.title.substring(0,26)} ...` : post.title }
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Featured
