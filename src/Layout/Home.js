import React from "react";
import MyNav from "./MyNav";
import Chat from "../Chat/Chat";
import "../styles/home.css";
import EventNavBar from "../Event/EventNavbar"
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  withStyles,
  createStyles,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  withWidth,
  Hidden,
} from "@material-ui/core";
import PropTypes from 'prop-types';
import Trends from "../Trends/Trends";
const styles = createStyles((theme) => ({
  root: {
    // flexGrow: 1,
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
    top: 0,
    height: "100vh",
    backgroundColor: "#fff",
    // borderLeft: "1px solid #e1e8ed",
    // borderRight: "1px solid #e1e8ed",
    // borderTop: "1px solid #e1e8ed",
    // borderRadius: "5px",
  },
}));

const Home = (Component) => {
  const Home = (props) => {
    const { classes ,width} = props;
    const [spacing, setSpacing] = React.useState(2);
    Home.propTypes = {
      width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
    };
    const handleChange = (event) => {
      setSpacing(Number(event.target.value));
    };
    return (
      <>
        <div className={classes.root}>
          < EventNavBar />
            <Grid container >
              <Hidden smDown>
              <Grid  item md={2} justify="center" className={classes.sticky}>
                <div style={{ height: "100%" }}>
                  <MyNav />
                </div>
              </Grid>
              </Hidden>
              <Grid xs={12} md={6} className="inner-grid">
                <Component {...props} />
              </Grid>
              <Grid xs={12} md={3} className={classes.sticky}>
              <Trends />
                <Chat />
              </Grid>
            </Grid>
        </div>
   
      </>
    );
  };
  return withStyles(styles)(Home);
};


export default Home;
