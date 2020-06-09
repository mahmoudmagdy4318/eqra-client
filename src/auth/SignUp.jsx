import React, {useState } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { validate, validateProperty } from "../services/validateRegister";
import { register } from "../services/userService";
import auth from "../services/authService";
import http from "../services/httpService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
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
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password1: "",
    password2: "",
    username: "",
  });

  const [errors, setErrors] = useState({});

  const updateUser = (e) => {
    const errorMessage = validateProperty(e.target);
    if (errorMessage) errors[e.target.name] = errorMessage;
    else delete errors[e.target.name];
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setErrors(errors);
    if (errors) setOpen(true);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    let newUser = {
      email: user.email,
      password: user.password1,
      password_confirmation: user.password2,
      full_name: `${user.firstName} ${user.lastName}`,
      last_name: user.last_name,
      first_name: user.first_name,
      username: user.username,
    };
    const {data} = await register(newUser);
    auth.loginWithJwt(data.access_token);
    http.setJwt(data.access_token)
    window.location = "/";
  };

  if(auth.getJwt())return <Redirect to="/"/>

  return (
    <Container component="main" maxWidth="xs">
      {errors.first_name && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errors.first_name}
          </Alert>
        </Snackbar>
      )}
      {errors.last_name && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errors.last_name}
          </Alert>
        </Snackbar>
      )}
      {errors.email && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errors.email}
          </Alert>
        </Snackbar>
      )}
      {errors.password1 && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errors.password1}
          </Alert>
        </Snackbar>
      )}
      {errors.password2 && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errors.password2}
          </Alert>
        </Snackbar>
      )}
      {errors.username && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errors.username}
          </Alert>
        </Snackbar>
      )}
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
                name="first_name"
                id="firstName"
                fullWidth
                autoFocus
                required
                value={user.first_name}
                onChange={updateUser}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lname"
                variant="outlined"
                label="Last Name"
                name="last_name"
                id="lastName"
                fullWidth
                required
                value={user.last_name}
                onChange={updateUser}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="User Name"
                autoComplete="user name"
                variant="outlined"
                name="username"
                id="username"
                fullWidth
                required
                value={user.username}
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
            disabled={validate(user)}
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
