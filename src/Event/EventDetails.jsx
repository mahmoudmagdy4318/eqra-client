import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../API/axiosInstance";
import Home from "../Layout/Home";
import { UserContext } from "../context/userContext";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import "./EventDetails.css";
// Component
import EventPosts from './EventPosts';
import UserEventState from "./UserEventState";
const EventDetails = (props) => {
  const eventId = props.match.params.id;
  const {
    data: { user: currentUser },
  } = useContext(UserContext);
  const [event, setEvent] = useState({});

  const getEvent = async () => {
    const event = await axiosInstance.get(`api/event/${eventId}`);
    setEvent(event.data);
  };
  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div class="">
      <div class="col-lg-12 p-0">
        <div class="panel profile-cover">
          <div class="profile-cover__img eventHeader">
            <CalendarTodayIcon
              fontSize={"large"}
              color={"error"}
            ></CalendarTodayIcon>
            <p className="eventDate">
              {event.start_date} – {event.end_date}
            </p>
            <h3 class="h3">{event.name}</h3>
          </div>
          <div class="profile-cover__action bg--img" data-overlay="0.3">
            {/* User State Component (Pending, Interested, Going) */}
            <UserEventState
              getEvent={getEvent}
              user={currentUser}
              eventId={eventId}
              eventName={event.name}
            />
          </div>
          <div class="profile-cover__info">
            <ul class="nav">
              <li className="eventList">
                <strong>{event.event_going_users}</strong>Going
              </li>
              <li className="eventList">
                <strong>{event.event_interested_users}</strong>Interested
              </li>
              <li className="eventList">
                <strong>{event.event_pending_users}</strong>Invited
              </li>
            </ul>
          </div>
        </div>
        <div class="panel">
          <div class="panel-heading">
            <h3>Description</h3>
            {event.description}
          </div>
          <div class="panel-heading">
            <h3 class="panel-title">Discssion</h3>
          </div>
          {/* Event Posts Component */}
          <EventPosts eventId={eventId} />
        </div>
      </div>
    </div>
  );
};

export default Home(EventDetails);
