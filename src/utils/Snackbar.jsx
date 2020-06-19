import React, { useState, useEffect} from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Snack = (props) => {
    const classes = useStyles();
    let {open,severity,messege}=props
    const [openSnack,updateOpenSnack]=useState(open);
    useEffect(
        () =>{
            updateOpenSnack(open)
        }
    )
    const handleErrClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        updateOpenSnack(false)
    };
    
  return(
    <Snackbar open={openSnack} autoHideDuration={1000} onClose={handleErrClose}>
          <Alert onClose={handleErrClose} severity={severity}>
              {messege}
      </Alert>
    </Snackbar>
  );
};
export default Snack;
