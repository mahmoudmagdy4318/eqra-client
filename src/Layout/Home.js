import React from "react";
import Test from "./test";
import MyNav from "./MyNav";
<<<<<<< HEAD
import "../styles/home.css";
=======
import Profile from './Profile'
import '../styles/home.css'
>>>>>>> 8c5297c0721d30b678885fcb5239b81a7ef35333
import {
  Grid,
  Paper,
  makeStyles,
  Container,
  Typography,
  withStyles,
  createStyles,
} from "@material-ui/core";
import Tester from "./Tester";
import PostLikes from "../Likes/Post_Likes";
const styles = createStyles((theme) => ({
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
    height: "100vh",
    backgroundColor: "#fff",
    borderLeft: "1px solid #e1e8ed",
    borderRight: "1px solid #e1e8ed",
    borderTop: "1px solid #e1e8ed",
    borderRadius: "5px",
  },
}));

const Home = (Component) => {
  const Home = (props) => {
    const { classes } = props;
    return (
      <>
        <div className={classes.root}>
          <Container>
            <Grid container>
              <Grid md={2} className={classes.sticky}>
                <div style={{ height: "100%" }}>
                  <MyNav />
                </div>
              </Grid>
              <Grid md={6} className="inner-grid">
                <Component {...props} />
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
  return withStyles(styles)(Home);
};

export default Home;
