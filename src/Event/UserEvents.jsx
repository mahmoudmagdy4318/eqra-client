import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import axiosInstance from "../API/axiosInstance";
import { Link } from "react-router-dom";


const UserEvents = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [userEvents, setUserEvents] = React.useState([]);

  const getUserEvents = async () => {
    const eventsResult = await axiosInstance.get("api/user/event");
    console.log(eventsResult.data)
    setUserEvents(eventsResult.data);
  };
  React.useEffect(() => {
    getUserEvents();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {userEvents.map((event, index) => {
            return <Tab label={event.name} {...a11yProps(index)} />;
          })}
        </Tabs>
      </AppBar>
      {userEvents.map((event, index) => {
        return (
          <TabPanel value={value} index={index}>
            <Card onClick={() => props.history.push(`/event/${event.id}`)} className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://source.unsplash.com/random"
                  title="Contemplative Reptile"
                />
                <CardContent>
                <div className="eventRecords">
                <div class="profile-cover__info">
                  <ul class="nav myRecordsList">
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
                  <Typography gutterBottom variant="h5" component="h2">
                    {event.name}
                    <p className="eventDate">
                      {event.start_date} - {event.end_date}
                    </p>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {event.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <Link>Share</Link>
                </Button>
                <Button size="small" color="primary">
                  <Link to={`/event/${event.id}`}>See More..</Link>
                </Button>
              </CardActions>
            </Card>
          </TabPanel>
        );
      })}
    </div>
  );
};
export default UserEvents;

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    height: 100,
  },
}));
