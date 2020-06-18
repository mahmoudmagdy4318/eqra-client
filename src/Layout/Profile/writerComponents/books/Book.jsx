import React, { useState } from 'react'
import { Button, Card, Typography, CardContent, CardActions, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import styles from './book.module.css'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Book = () => {
  let [books, setBooks] = useState([
    { id: 1, title: 'the arsonist', img: 'https://www.booktopia.com.au/blog/wp-content/uploads/2018/12/the-arsonist.jpg' },
    { id: 2, title: 'the water cube', img: 'https://s26162.pcdn.co/wp-content/uploads/2019/01/81SBy9jbbHL.jpg' },
    { id: 3, title: 'the Institute', img: 'https://images-na.ssl-images-amazon.com/images/I/81pA6-hv+2L.jpg' },
    { id: 34, title: 'the Institute', img: 'https://images-na.ssl-images-amazon.com/images/I/81pA6-hv+2L.jpg' },
    { id: 5, title: 'the Institute', img: 'https://images-na.ssl-images-amazon.com/images/I/81pA6-hv+2L.jpg' },
  ])

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={styles.newBook}>
        <button type="button" onClick={handleOpen}>
          react-transition-group
      </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">react-transition-group animates me.</p>
            </div>
          </Fade>
        </Modal>
      </div>
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
    </>
  )
}

export default Book
