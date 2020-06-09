import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
  const { toggle: open, onConfirm, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          You are trying to delete your great opinion!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            no
          </Button>
          <Button onClick={onConfirm} color="primary" autoFocus>
            yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
