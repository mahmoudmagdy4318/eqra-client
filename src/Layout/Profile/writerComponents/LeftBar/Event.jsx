import React, { useEffect, useState } from 'react'
import styles from './leftBar.module.css'
import { Link } from 'react-router-dom'
import axiosInstance from "../../../../API/axiosInstance";

const Event = () => {
  const [events, setEvents] = useState([])
  useEffect(() => {
    axiosInstance.get(`api/user/event`)
      .then((data) => {
        setEvents([...data.data]);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <h3>Upcoming Events</h3>
        {/* <Link to="/newEvent" className={styles.newEvent}> New Event ?</Link> */}
      </div>

      <ul className={styles.events}>
        {events.map(event => {
          return (
            <li className={styles.events_event} key={event.id}>
              <Link to={`/event/${event.id}`} >
                {event.name?.length > 26 ? `${event.name.substring(0, 26)} ...` : event.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Event
