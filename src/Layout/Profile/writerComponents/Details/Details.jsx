import React, { useState, useEffect, useContext } from 'react'
import styles from './Details.module.css';
import EditWriterData from './EditWriterData';
import axiosInstance from '../../../../API/axiosInstance';
import { UserContext } from '../../../../context/userContext';


const Details = ({ name, email, image, followers, following, visitorId, isVisitor }) => {
  console.log('followers', followers);
  const {
    data: { user: currentUser },
  } = useContext(UserContext);
  const [followersList, setFollowersList] = useState([])

  useEffect(() => {
    followers ?
      setFollowersList(Array.from(followers, item => item.follower_id)) : setFollowersList([]);
  }, [followers])

  const followHandler = () => {
    followersList.includes(currentUser.id) ? unfollow() : sendFollow();
  }
  const unfollow = async () => {
    try {
      const sendUnfollow = axiosInstance.delete(`api/unfollow/${visitorId}`);
      setFollowersList(followersList.filter(id => id !== currentUser.id));
      console.log('sendUnfollow', sendUnfollow);
    } catch (error) {
      console.error(error);
    }
  };
  const sendFollow = async () => {
    try {
      const sendfollow = axiosInstance.post(`api/follow/${visitorId}`);
      setFollowersList([...followersList, currentUser.id]);
      console.log('sendfollow', sendfollow)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className={styles.details}>
      <div className={styles.information}>
        <img src={image} alt={`${name}'s profile`} />
        <div className={styles.data}>
          <h3> {name} </h3>
          <p className={styles.sidedata}> you can email me @ {email} </p>
        </div>
      </div>

      <EditWriterData image={image} />

      <div>
        <p className={styles.sidedata}>
          {isVisitor ?
            <button onClick={followHandler} className={styles.button}>
              {!followersList.includes(currentUser.id) ? 'follow +' : 'unfollow'}
            </button>
            : 'followers'
          }
          <span className={isVisitor ? '' : styles.spanMargin}> {followersList?.length} </span>
        </p>
        <p className={styles.sidedata}> following <span className={styles.spanMargin}> {following?.length} </span> </p>
      </div>
    </section>
  )
}

export default Details
