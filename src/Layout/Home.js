import React from 'react'
import Test from "./test";
import MyNav from "./MyNav";
import '../styles/home.css'
import { Grid, Paper, makeStyles, Container, } from "@material-ui/core";
// import Tester from "./Tester";
import PostLikes from "../Likes/Post_Likes";
import { Route, withRouter } from "react-router-dom";
import Writer from './Profile/Writer';

const Home = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingTop: 30,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      // backgroundColor: "red",
      height: 85 + "vh",
    },
    sticky: {
      alignSelf: "flex-start",
      position: "sticky",
      top: 30,
      height: '100vh',
      backgroundColor: '#fff',
      borderLeft: '1px solid #e1e8ed',
      borderRight: '1px solid #e1e8ed',
      borderTop: '1px solid #e1e8ed',
      borderRadius: '5px'
    },


  }));
  const classes = useStyles();
  return (
    <>
      <div className={classes.root} >
        <Container>
          <PostLikes id={1} type="comment" noOfLikes="56" />

          <Grid container >
            <Grid md={2} className={classes.sticky} >
              <div style={{ 'height': '100%' }}>
                <MyNav />
              </div>
            </Grid>
            <Grid md={6} className="inner-grid">
              <Route key="profile" path="/profile" component={Writer} />
              <Route key="home" exact path="/" component={Test} />
            </Grid>
            <Grid md={3} className={classes.sticky}>
              <Paper className={classes.paper}>xs</Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default withRouter(Home);
