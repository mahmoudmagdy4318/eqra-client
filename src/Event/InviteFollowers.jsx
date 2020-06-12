import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const InviteUsers = (props) => {
    const [open, setOpen] = React.useState(false);
    const [followers, setFollowers] = React.useState([]);
    const eventName = props.eventName;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
  });

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
          <ul>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
          </ul>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleClose} color="primary">
            Invite
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