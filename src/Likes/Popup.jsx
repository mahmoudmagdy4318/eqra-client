import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CircularProgress from "@material-ui/core/CircularProgress";
import _ from "lodash";

import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  ListSubheader,
} from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    display: "flex",
    justifyContent: "center",
  },
  typography: {
    padding: theme.spacing(2),
    height: 400,
    width: 400,
    overflow: "scroll",
    overflowX: "hidden",
  },
  typography2: {
    padding: theme.spacing(2),
    height: 400,
    width: 400,
    overflow: "scroll",
    overflowX: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  UserDiv: {
    marginBottom: 10,
  },
  userImage: {},
  image: {
    width: 70,
    height: 70,
    border: "1px",
    borderRadius: "50%!important",
  },
  subHeader: {
    height: 100,
    display: "flex",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
}));

export default function SimplePopover(props) {
  const classes = useStyles();
  // const [likes, setLikes] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // useEffect(() => {
  //   console.log(likes);
  //   setLikes(props.content);
  // }, [props]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    props.setPopupVisible(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = open ? "simple-popover" : undefined;
  const history = useHistory();
  const handleUserClick = (user) => {
    debugger;
    history.push(`/profile/${user.role}/${user.id}`);
  };
  return (
    <div>
      <a
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        {props.noOfLikes && <strong>{props.noOfLikes}</strong>}
      </a>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        anchorEl
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Paper className={classes.mainContainer}>
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            className={classes.subHeader}
          >
            Likes
            <FavoriteIcon style={{ color: "red" }} />
            <small>{props.noOfLikes}</small>
          </ListSubheader>
          <Divider />
          {props.content ? (
            <List
              className={classes.typography}
              onScroll={props.scroll}
              onMouseEnter={() => {
                document.body.style.cursor = "pointer";
              }}
              onMouseLeave={() => {
                document.body.style.cursor = "default";
              }}
            >
              {props.content.map((l) => (
                <Fragment key={l.full_name}>
                  <ListItem
                    onClick={() => handleUserClick(l)}
                    className={classes.UserDiv}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <img
                          className={classes.image}
                          src={
                            l.pictur
                              ? l.pictur
                              : require("../assets/avatar.jpg")
                          }
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={l.full_name} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Fragment>

                //   <Paper
                //     className={classes.UserDiv}
                //     onClick={() => handleUserClick(l.id)}
                //   >
                //     <div className={classes.userImage}>
                //       <img className={classes.image} src="/favicon.ico" />
                //     </div>
                //     <strong key={l.name}>{l.name}</strong>
                //   </Paper>
              ))}
            </List>
          ) : (
            <div className={classes.typography2}>
              <CircularProgress />
            </div>
          )}
        </Paper>
      </Popover>
    </div>
  );
}
