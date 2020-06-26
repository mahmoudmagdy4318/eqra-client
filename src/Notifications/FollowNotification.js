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
import Snack from '../utils/Snackbar';
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
        console.log(result);
        setFollowers(result.myFollowers);
        setunseenFollowNotifications(result.seen);
    };
    useEffect(() => {
        getMyFollowers();
    }, []);
    Pusher.logToConsole = true;
    const pusher = new Pusher("0e0882c25b1299c47bdb", {
        cluster: "mt1",
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
        console.log("one", currentUser);
        const channel = pusher.subscribe("followed." + currentUser.id);
        channel.bind("followed", function (data) {
            setSuceesOpen(true);
            console.log("5555555555", JSON.stringify(data.message))
            setSuccessMsg(JSON.stringify(data.message))
        });
    }, [JSON.stringify(currentUser)]);
    // Right Drop Downmenu Functionality
    const handleClick = (event) => {
        setAnchorEl2(event.currentTarget);
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
                <Badge
                    badgeContent={unseenFollowNotifications}
                    color="secondary"
                >
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Popover
                className="dropDown"
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
                    {followers.map((follower) => {
                        return (
                            <Fragment>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        {follower.pictur ? (
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={follower.pictur}
                                            />
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
                                                    {follower.full_name} Has
                                                    Been Followed You
                                                </Typography>
                                                <br />
                                                Since {follower.created_at}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </Fragment>
                        );
                    })}
                </List>
            </Popover>
        </Fragment>
    );
};
export default FollowNotification;
