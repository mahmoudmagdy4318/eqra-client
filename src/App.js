import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Button from "@material-ui/core/Button";
import PrimarySearchAppBar from "./Layout/NavBar";
import MiniDrawer from "./Layout/SideBar";
import { Grid, Paper, makeStyles, Container } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import Test from "./Layout/test";
import Tester from "./Layout/Tester";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

const App = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingTop: 30,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      backgroundColor: "red",
      height: 1000,
    },
  }));
  const classes = useStyles();
  return (
    <div>
      {/* <PrimarySearchAppBar /> */}
      {/* <Grid container direction="row" justify="center" alignItems="center">
        <MiniDrawer />
      </Grid> */}
      <div className={classes.root} >
        <Container fixed>
          <Grid container spacing={1} >
            <Grid item xs={2} wrap="nowrap" position="sticky">
              <Tester classes={classes} />
            </Grid>
            <Grid item xs={6}>
              {/* <Paper className={classes.paper}>xs</Paper> */}
              <Test />
            </Grid>
            <Grid item xs={4} >
              <Paper className={classes.paper}>xs</Paper>
            </Grid>
          </Grid>
        </Container>
      </div>

      <BrowserRouter>
        <Route key="login" exact path="/login" render={() => <Login />} />
        <Route key="signup" exact path="/register" render={() => <SignUp />} />
        {/* <Route key="home" exact path="/" render={() => <Home />} /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
