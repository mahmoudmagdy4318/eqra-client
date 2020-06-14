import React from 'react'
import styles from './leftBar.module.css'
import { Link } from 'react-router-dom'

const Featured = ({featuredPosts}) => {
  return (
    <>
      <h3>Featured Posts</h3>
      <ul className={styles.featured}>
        {featuredPosts.map(post => {
          return (
            <li className={styles.featured_item} key={post.id}>
              <Link to={`/post/${post.id}`} >
                { post.body_content.length > 26 ? `${post.body_content.substring(0,26)} ...` : post.body_content }
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Featured
