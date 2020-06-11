import React from 'react'
import styles from './leftBar.module.css'
import { Link } from 'react-router-dom'

const Event = () => {
  let events = [
    { id: 1, title: 'The art of art' },
    { id: 2, title: 'get riiiiiich' },
    { id: 3, title: '1000 way to kill a fly' },
    { id: 4, title: 'kill a fly every day for health life' },
  ]
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
