import React, { useState, useEffect } from 'react'
import { Button, Card, Typography, CardContent, CardActions, makeStyles, InputLabel, OutlinedInput, InputAdornment, FormControl, Tooltip, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axiosInstance from "../../../../API/axiosInstance";
import styles from './book.module.css'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

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
  Modalpaper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const Book = () => {
  let [newBook, setNewBook] = useState({ title: '', description: '', price: 0, coverImage: null })

  let [books, setBooks] = useState([])

  const getBooks = async () => {
    let booksData = await axiosInstance.get('api/user/books');
    setBooks(booksData.userBooks);
  }

  useEffect(() => {
    getBooks();
  }, [])

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadBookCover = (e) => {
    setNewBook({ ...newBook, coverImage: e.target.files[0] })
  }

  const removeBook = id => async (e) => {
    let data = await axiosInstance.delete(`/api/book/${id}`);
    setBooks(books.filter(b=>b.id !== id));
  }

  const submitNewBook = (e) => {
    e.preventDefault();
    if (newBook.coverImage.type.split('/')[0] !== "image")
      return alert('wrong file type')

    const formData = new FormData();
    formData.append("price", newBook.price);
    formData.append("title", newBook.title);
    formData.append("description", newBook.description);
    formData.append("coverImage", newBook.coverImage);
    formData.append("enctype", "multipart/form-data");

    axiosInstance.post('/api/book', formData)
      .then(data => {
        setOpen(false); setBooks([...books, data.newBook])
      })
      .catch(err => console.log(err))
  }
  return (
    <>
      <div className={styles.newBook}>
        <button type="button" onClick={handleOpen}>
          Add New Book
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
              <h2 id="transition-modal-title">New Book</h2>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.Modalpaper}>
                  <form className={classes.form} validate="true" onSubmit={submitNewBook}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="fname"
                          name="title"
                          variant="outlined"
                          required
                          fullWidth
                          value={newBook.title}
                          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                          id="title"
                          label="Title"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            name='price'
                            value={newBook.price}
                            onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            labelWidth={60}
                            type='number'
                            required
                          />

                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          multiline
                          id="description"
                          label="Description"
                          name="description"
                          value={newBook.description}
                          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          component="label"
                          style={{ marginRight: 7 }}
                        >
                          Upload Cover Image
                        <input
                            name="coverImage"
                            accept="image/*"
                            onChange={uploadBookCover}
                            required
                            type="file"
                            style={{ display: "none" }}
                          />
                        </Button>
                        {newBook.coverImage !== null && newBook.coverImage.type.split('/')[0] === "image" ?
                          <CheckCircleOutlineIcon style={{ color: '#4caf50' }} /> :
                          <ErrorOutlineIcon style={{ color: '#f44336' }} />
                        }
                      </Grid>

                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Add New Book
                    </Button>
                  </form>
                </div>
              </Container>
            </div>
          </Fade>
        </Modal>
      </div>
      <div className={styles.grid}>
        {books.length === 0 ? 'no books found' : books.slice(0).reverse().map((book) => {
          return (
            <Card className={styles.item} variant="outlined" key={book.id}>
              <HtmlTooltip
                placement="left-start"
                title={
                  <React.Fragment>
                    <p className={styles.tooltipText} color="inherit">{book.description}</p>
                  </React.Fragment>
                }
              >
                <CardContent>
                  <img src={book.coverImagePath} alt="" />
                  <Typography variant="body2" component="p">
                    {book.title}
                  </Typography>
                  <p className={styles.price}>${book.price}</p>
                </CardContent>
              </HtmlTooltip>
              <CardActions>
                <Link size="small" to={`/book/${book.id}`}> Get a Copy!</Link>
                <DeleteForeverIcon className={styles.delete} onClick={removeBook(book.id)} />
              </CardActions>
            </Card>
          )
        })}
      </div>
    </>
  )
}

export default Book
