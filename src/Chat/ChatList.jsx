import React, { useEffect, useState, useContext } from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Badge from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {getFollows} from './service/follows'
import { UserContext } from '../context/userContext';
import _ from 'lodash'
import { Typography, Box } from '@material-ui/core';

const log=console.log;

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
        '& > *': {
        margin: theme.spacing(1),
      },
    },
    inline: {
      display: 'inline',
    },
    
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
        display:''
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);



export default function FollowList({openChatBox,notifications}) {
    const classes = useStyles();
    const {
      data: { follows,followers },actions
    } = useContext(UserContext);
    
    useEffect(() => {
      actions.openChatBox=openChatBox;
      
    }, []);


    return (
      <React.Fragment>
        <CssBaseline />
        <Paper square className={classes.paper}>
          <List className={classes.list}>
            {follows.map(({ id,full_name,pictur},index) => (
              <React.Fragment key={index} >
                <ListItem button onClick={()=>openChatBox({ id, full_name, pictur})}>
                  <ListItemAvatar>
                        {!pictur && <AccountCircleIcon>
                        </AccountCircleIcon>}
                        {notifications[`notification.${id}`]&& !pictur &&<Badge badgeContent={'M'} color="error"/>} 

                        {pictur &&<Badge
                          overlap="circle"
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          badgeContent={notifications[`notification.${id}`]&&<Badge badgeContent={'M'} color="error"/>}
                        >
                          <Avatar alt={full_name} src={pictur} />
                        </Badge>}
                  </ListItemAvatar>
                  <Typography component="div">
                    {notifications[`notification.${id}`]&&<Box fontWeight={500} m={1}>
                        {full_name}
                    </Box>}
                    {!notifications[`notification.${id}`]&&<Box fontWeight='fontWeightLight' m={1}>
                        {full_name}
                    </Box>}
                  </Typography>
                </ListItem>
              </React.Fragment>
            ))}
            {followers.map((follower,index) => (
              ! _.some(follows,follower) && <React.Fragment key={index} >
                <ListItem button onClick={()=>openChatBox({ id:follower.id, full_name:follower.full_name, pictur:follower.pictur})}>
                  <ListItemAvatar>
                        {!follower.pictur && <AccountCircleIcon>
                          {notifications[`notification.${follower.id}`]&&<Badge badgeContent={'M'} color="error"/>}
                        </AccountCircleIcon>}
                        {follower.pictur &&<Badge
                          overlap="circle"
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          badgeContent={notifications[`notification.${follower.id}`]&&<Badge badgeContent={'M'} color="error"/>}
                        >
                          <Avatar alt={follower.full_name} src={follower.pictur} />
                        </Badge>}
                  </ListItemAvatar>
                  <Typography component="div">
                    {notifications[`notification.${follower.id}`]&&<Box  fontWeight={500} m={1}>
                        {follower.full_name}
                    </Box>}
                    {!notifications[`notification.${follower.id}`]&&<Box fontWeight="fontWeightLight" m={1}>
                      {follower.full_name}
                    </Box>}
                  </Typography>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </React.Fragment>
    );
  }