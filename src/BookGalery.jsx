import React, { useState, useEffect } from 'react'
import Home from './Layout/Home'
import InfiniteScroll from "react-infinite-scroll-component";
import axiosInstance from './API/axiosInstance'
import styles from './booksGalery.module.css'
import { Card, CardContent, CardActions,} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Payment from './ExternalApis/Payment';


const BookGalery = () => {
  const [books, setBooks] = useState([])
  let [currPage, setCurrPage] = useState(1);
  let [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    axiosInstance.get(`api/book?page=${currPage}`)
      .then((data) => {
        setBooks([...data.data]);
        setLastPage(data.meta.last_page);
      })
      .catch(err => console.log(err));
  }, [currPage]);

  return (
    <div>
      {/* coverImagePath: description: id: price: title: */}
      <InfiniteScroll
        dataLength={books.length} //This field to render the next data
        next={() => setCurrPage(currPage + 1)}
        hasMore={currPage < lastPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className={styles.grid}>
          {books.length === 0 ? 'no books found' : books.map((book) => {
            return (
              <Card className={styles.item} variant="outlined" key={book.id}>
                <CardContent className={styles.content}>
                  <img src={book.coverImagePath} alt="" />
                  <h4>{book.title}</h4>
                  <p className={styles.tooltipText} color="inherit">{book.description}</p>
                  <p className={styles.price}>${book.price}</p>
                </CardContent>
                <CardActions className={styles.action}>
                  <Payment product={book}/>
                </CardActions>
              </Card>
            )
          })}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default Home(BookGalery)
