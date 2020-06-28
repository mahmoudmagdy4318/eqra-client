import React, { useContext, useEffect, Fragment } from "react";
import Pusher from "pusher-js";
import { UserContext } from "../context/userContext";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import {
  Popover,
  Typography,
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@material-ui/core";
import useStyles from "./styles/FollowNotificationStyle";
// Component
import FollowersService from "../services/FollowersService";
import Snack from "../utils/Snackbar";
import { Link } from "react-router-dom";
const FollowNotification = (props) => {
  const {
    data: { user: currentUser },
  } = useContext(UserContext);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [followers, setFollowers] = React.useState([]);
  const [
    unseenFollowNotifications,
    setunseenFollowNotifications,
  ] = React.useState(0);
  const [successOpen, setSuceesOpen] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");

  const getMyFollowers = async () => {
    const result = await FollowersService.getFollowersData();
    setFollowers(result.myFollowers);
    setunseenFollowNotifications(result.seen);
  };
  useEffect(() => {
    getMyFollowers();
  }, []);
  Pusher.logToConsole = true;
  const pusher = new Pusher("72450be663ca31a2c7b3", {
    cluster: "us2",
    authEndpoint: "/broadcasting/auth",
    auth: {
      headers: {
        Accept: "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
    },
  });

  const classes = useStyles();
  useEffect(() => {
    if (!currentUser.id) return;
    const channel = pusher.subscribe("followed." + currentUser.id);
    channel.bind("followed", function (data) {
      getMyFollowers();
      setSuceesOpen(true);
      setSuccessMsg(JSON.stringify(data.message));
    });
  }, [JSON.stringify(currentUser)]);
  // Right Drop Downmenu Functionality
  const handleClick = async (event) => {
    setAnchorEl2(event.currentTarget);
    setunseenFollowNotifications(0);
    await FollowersService.setUserFollowersAsSeen();
    await getMyFollowers();
  };
  const handleClose = () => {
    setAnchorEl2(null);
  };
  const open = Boolean(anchorEl2);
  const id = open ? "simple-popover" : undefined;

  return (
    <Fragment>
      <Snack
        open={successOpen}
        setOpen={setSuceesOpen}
        severity="success"
        messege={successMsg}
      />
      <IconButton
        onClick={handleClick}
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Badge badgeContent={unseenFollowNotifications} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        className={classes.NotificationDropDown}
        id={id}
        open={open}
        anchorEl={anchorEl2}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List className={classes.root}>
          {followers.length === 0 ? (
            <ListItem alignItems="flex-start">
              <ListItemText primary="You Have no New Notifications Yet" />
            </ListItem>
          ) : (
            ""
          )}
          {followers.map((follower, index) => {
            return (
              <Fragment>
                <Link
                  className="disable-link"
                  to={`/profile/user/${follower.followed_id}`}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      {follower.pictur ? (
                        <Avatar alt="Remy Sharp" src={follower.pictur} />
                      ) : (
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={follower.full_name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {follower.full_name} Has Followed You
                          </Typography>
                          <br />
                          Since {follower.created_at}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Link>
                {index !== followers.length - 1 ? (
                  <Divider variant="inset" component="li" />
                ) : (
                  ""
                )}
              </Fragment>
            );
          })}
        </List>
      </Popover>
    </Fragment>
  );
};
export default FollowNotification;
