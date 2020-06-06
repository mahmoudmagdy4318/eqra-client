import React from 'react'
import { Grid, Paper, makeStyles, Container } from "@material-ui/core";
import Test from "./test";
import MyNav from "./MyNav";
import '../styles/home.css'

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
      height: 85 + "vh",
    },
    sticky: {
      alignSelf: 'flex-start',
      position: 'sticky',
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
          <Grid container >
            <Grid md={2} className={classes.sticky} >
              <div style={{'height':'100%'}}>
              <MyNav/>
              </div>
            </Grid>
            <Grid md={6} className="inner-grid">
              <Test />
            </Grid>
            <Grid md={3} className={classes.sticky}>
              <Paper className={classes.paper}>xs</Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  )
}

export default Home
