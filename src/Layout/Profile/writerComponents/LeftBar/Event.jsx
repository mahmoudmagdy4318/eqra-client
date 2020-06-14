import React, { useEffect, useState } from 'react'
import styles from './leftBar.module.css'
import { Link } from 'react-router-dom'
import axiosInstance from "../../../../API/axiosInstance";

const Event = () => {
  const [events, setEvents] = useState([])
  useEffect(() => {
    axiosInstance.get(`api/user/event`)
      .then((data) => {
        console.log("server response Events : ", data);
        // setFeaturedPostsList([...data.data]);
      })
      .catch(err=>console.log(err))
  }, [])
  
  return (
    <>
      <h3>Upcoming Events</h3>
      <ul className={styles.events}>
        {events.map(event => {
          return (
            <li className={styles.events_event} key={event.id}>
              <Link to={`/event/${event.id}`} >
                { event.title.length > 26 ? `${event.title.substring(0,26)} ...` : event.title }
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Event
