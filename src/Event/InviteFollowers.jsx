import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import axiosInstance from '../API/axiosInstance';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
const InviteUsers = (props) => {
    const [open, setOpen] = React.useState(false);
    const [followers, setFollowers] = React.useState([]);
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const eventName = props.eventName;
    const eventId = props.eventId;
    const getEvent = props.getEvent;
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const inviteFollowers = async () => {
    setOpen(false);
    const participants = checked.map(elem => elem.followed_id);
    await axiosInstance.post(`api/event/${eventId}/participants`, {participants});
    getEvent();
  };
  const getFollowers = async () => {
      const userFollowers = await axiosInstance.get(`api/persons-i-follow`);
      setFollowers(userFollowers);
  }
  React.useEffect(() => {
    getFollowers();
  }, []);

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        size={"medium"}
        startIcon={<PersonAddIcon/>}
        onClick={handleClickOpen}
      >
        Invite
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Invite Friends to "+ eventName}</DialogTitle>
        <DialogContent>
        <List dense className={classes.root}>
          {followers.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem key={value.id} button>
                <ListItemAvatar>
                  <Avatar
                    alt={value.full_name}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={value.full_name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        </DialogContent>
        <DialogActions>
        <Button onClick={inviteFollowers} color="primary">
            Invite
          </Button>
        <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
export default InviteUsers;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));