import React, { useState } from 'react'
import { Button, Card, Typography, CardContent, CardActions } from '@material-ui/core';
import { Link } from 'react-router-dom';

import styles from './book.module.css'

const Book = () => {
  let [books, setBooks] = useState([
    { id: 1, title: 'the arsonist', img: 'https://www.booktopia.com.au/blog/wp-content/uploads/2018/12/the-arsonist.jpg' },
    { id: 2, title: 'the water cube', img: 'https://s26162.pcdn.co/wp-content/uploads/2019/01/81SBy9jbbHL.jpg' },
    { id: 3, title: 'the Institute', img: 'https://images-na.ssl-images-amazon.com/images/I/81pA6-hv+2L.jpg' },
    { id: 34, title: 'the Institute', img: 'https://images-na.ssl-images-amazon.com/images/I/81pA6-hv+2L.jpg' },
    { id: 5, title: 'the Institute', img: 'https://images-na.ssl-images-amazon.com/images/I/81pA6-hv+2L.jpg' },
  ])

  return (
    <div className={styles.grid}>
      {books.slice(0).reverse().map((book) => {
        return (
          <Card className={styles.item} variant="outlined" key={book.id}>
            <CardContent >
              <img src={book.img} alt="" />
              <Typography variant="body2" component="p">
                {book.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Link size="small" to={`/book/${book.id}`}> Check this book </Link>
            </CardActions>
          </Card>
        )
      })}
    </div>
  )
}

export default Book
