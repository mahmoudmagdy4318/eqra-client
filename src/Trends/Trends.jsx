import React, { useState } from "react";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import {
  Paper,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListSubheader,
} from "@material-ui/core";
import { useEffect } from "react";
import axiosInstance from "../API/axiosInstance";
import _ from "lodash";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  trendsContainer: {
    // display: "flex",
    // justifyContent: "center",
  },
  header: {
    fontSize: 25,
  },
  subHeader: {
    height: 100,
    display: "flex",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
}));

function Trends() {
  const classes = useStyles();
  const [trendings, setTrendings] = useState([]);

  const getTrends = async () => {
    const trends = await axiosInstance.get("api/trends");
    setTrendings(trends.data);
  };
  useEffect(() => {
    getTrends();
  }, []);
  const history = useHistory();
  const handleClick = (name) => {
    history.push(`/search?q=${name}`);
  };
  return (
    <Paper className={classes.trendsContainer}>
      <ListSubheader
        component="div"
        id="nested-list-subheader"
        className={classes.subHeader}
      >
        <TrendingUpIcon style={{ color: "blue", fontSize: 40 }} />
        Trending Writers
      </ListSubheader>
      <Divider />
      <div>
        {trendings.map((t) => (
          <div
            className={classes.root}
            key={_.get(t, "writer.id")}
            onClick={() => handleClick(_.get(t, "writer.full_name"))}
          >
            <List component="nav" aria-label="main mailbox folders">
              {_.get(t, "posts.length") > 0 && (
                <ListItem button>
                  <ListItemText primary={_.get(t, "writer.full_name")} />
                  <small>
                    {_.get(t, "posts.length") > 1
                      ? `${_.get(t, "posts.length")} are talking about`
                      : `${_.get(t, "posts.length")} is talking about`}
                  </small>
                </ListItem>
              )}
            </List>
            <Divider />
          </div>
        ))}
      </div>
    </Paper>
  );
}

export default Trends;
