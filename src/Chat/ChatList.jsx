import React, { useEffect, useState } from 'react';
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



export default function FollowList({openChatBox}) {
    const classes = useStyles();
    const [follows, setFollows] = useState([]);
    const getMyFollows=async()=>{
      const follows=await getFollows();
      setFollows(follows);
    }
    
    useEffect(() => {
      getMyFollows();
    }, []);


    return (
      <React.Fragment>
        <CssBaseline />
        <Paper square className={classes.paper}>
          <List className={classes.list}>
            {follows.map(({ followed_id, full_name, pictur}) => (
              <React.Fragment key={followed_id} >
                <ListItem button onClick={()=>openChatBox({ followed_id, full_name, pictur})}>
                  <ListItemAvatar>
                    <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        variant="dot"
                    >
                        {pictur && <Avatar alt="Profile Picture" src={pictur}/>}
                        <AccountCircleIcon/>
                    </StyledBadge>
                  </ListItemAvatar>
                  <ListItemText secondary={full_name}/>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </React.Fragment>
    );
  }