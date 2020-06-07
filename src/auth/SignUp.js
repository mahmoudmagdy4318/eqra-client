import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axiosInstance from '../API/axiosInstance';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import auth from './auth';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  let [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
  });

  const updateUser = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = e => {
    e.preventDefault();
    if (user.password1 !== user.password2) {
      setOpen(true);
    } else {
      let newUser = {
        email: user.email,
        password: user.password1,
        name: `${user.firstName} ${user.lastName}`,
        password_confirmation: user.password1
      }
      console.log(newUser);
      axiosInstance.post('api/auth/signup', newUser)
        .then(loggedUser => {
          auth.login(props, loggedUser.data.token)
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Password miss match !
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={registerUser} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                label="First Name"
                name="firstName"
                id="firstName"
                fullWidth
                autoFocus
                required
                value={user.firstName}
                onChange={updateUser}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lname"
                variant="outlined"
                label="Last Name"
                name="lastName"
                id="lastName"
                fullWidth
                required
                value={user.lastName}
                onChange={updateUser}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                autoComplete="email"
                variant="outlined"
                name="email"
                id="email"
                fullWidth
                required
                value={user.email}
                onChange={updateUser}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="current-password"
                variant="outlined"
                name="password1"
                label="Password"
                type="password"
                id="password1"
                fullWidth
                required
                value={user.password1}
                onChange={updateUser}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="current-password"
                label="Confirm Password"
                variant="outlined"
                name="password2"
                type="password"
                id="password2"
                fullWidth
                required
                value={user.password2}
                onChange={updateUser}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}