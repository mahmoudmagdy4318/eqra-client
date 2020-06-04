import React from 'react'
import { Grid, Paper, makeStyles, Container, Typography } from "@material-ui/core";
import Test from "./test";
import Tester from "./Tester";

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
      backgroundColor: "red",
      height:85+"vh",
    },
    sticky: {
      alignSelf: 'flex-start',
      position: 'sticky',
      top: 30,
    }
  }));
  const classes = useStyles();
  return (
    <>
      {/* <PrimarySearchAppBar /> */}
      {/* <Grid container direction="row" justify="center" alignItems="center">
        <MiniDrawer />
      </Grid> */}
      <div className={classes.root}>
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={2} className={classes.sticky} >
              {/* <Paper classNarme={props.classes.paper}> */}
              <div>
                <Typography paragraph>xddddddddddddd</Typography>
              </div>
              {/* </Paper> */}
            </Grid>
            <Grid item xs={6}>
              {/* <Paper className={classes.paper}>xs</Paper> */}
              <Test />
            </Grid>
            <Grid item xs={4} className={classes.sticky}>
              <Paper className={classes.paper}>xs</Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  )
}

export default Home
