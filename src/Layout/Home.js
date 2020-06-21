import React from "react";
import MyNav from "./MyNav";
import Chat from "../Chat/Chat";
import "../styles/home.css";
import EventNavBar from "../Event/EventNavbar"
import {
  Grid,
  Paper,
  makeStyles,
  Container,
  Typography,
  withStyles,
  createStyles,
} from "@material-ui/core";
import Trends from "../Trends/Trends";
const styles = createStyles((theme) => ({
  root: {
    flexGrow: 1,
    // paddingTop: 30,
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
          < EventNavBar />
          <Container>
     
            <Grid container>
              <Grid  xs={12} md={2} justify="center" className={classes.sticky}>
                <div style={{ height: "100%" }}>
                  <MyNav />
                </div>
              </Grid>
              <Grid xs={12} md={6} className="inner-grid">
                <Component {...props} />
              </Grid>
              <Grid xs={12} md={3} className={classes.sticky}>
                <Chat />
                <Trends />
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
