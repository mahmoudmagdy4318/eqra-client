import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Moment from 'react-moment';
import axiosInstance from '../API/axiosInstance';
// Included Component
import UserEvents from  './UserEvents';
import './AllEvents.css';
import { Link } from 'react-router-dom';
import Home from '../Layout/Home';
const AllEvents = (props) => {
    const classes = useStyles();
    const [events, setEvents] = React.useState([]);

    const getEvents = async () => {
        const allEvents = await axiosInstance.get("api/event");
        setEvents(allEvents.data);
    }
    React.useEffect(() => {
        getEvents();
    },[]);
  return (
    <React.Fragment>
      <main>
        <div>
          <Container  class="eventsContainers container" maxWidth="lg">
          <Typography  component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              <h1>Events Content</h1>
            </Typography>
            <div>
              <h3>Upcoming Events</h3>
              <UserEvents {...props}/>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <h2>Events You Many Interested In</h2>
          <Grid container spacing={4}>
            {events.map((event) => (
              <Grid item key={event.id} xs={12} sm={6} md={6}>
                <Card className={classes.card} onClick={() => props.history.push(`/event/${event.id}`)}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={event.cover_image ? event.cover_image : "https://source.unsplash.com/random"}
                    title={event.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {event.name}
                    </Typography>
                    <Typography>
                    <p className="eventDate">
                      <Moment format="D MMM YYYY" withTitle>{event.start_date}</Moment> - <Moment format="D MMM YYYY" withTitle>{event.end_date}</Moment>
                    </p>
                    </Typography>
                    <br/>
                    <Typography>
                    {event.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                <Button variant="contained"
                  color="secondary"
                  size="small">
                  <Link className="disable-link " to={`/event/${event.id}`}>See More..</Link>
                </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

export default Home(AllEvents);

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));