import React, { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
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
import auth from "../services/authService";
import http from "../services/httpService";
import axiosInstance from "../API/axiosInstance";
import { UserContext } from "../context/userContext";
import GoogleLogin from "react-google-login";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  let [user, setUser] = useState({
    email: "",
    password: "",
    remember_me: false,
  });
  const {
    actions: { setAuthData },
  } = useContext(UserContext);
  const [warning, setWarning] = React.useState(false);
  const [error, setError] = React.useState(false);
  const histoy = useHistory();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setWarning(false);
  };
  const updateField = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const logIn = async (e) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") setWarning(true);
    else
      try {
        const data = await auth.login(user.email, user.password);
        http.setJwt("Bearer " + data.access_token);
        setAuthData();
        histoy.push("/");
      } catch (error) {
        setError(true);
      }
  };
  // const responseGoogle = (response) => {
  //   console.log(response);
  // };
 
  const classes = useStyles();

  if (auth.getJwt()) {
    return <Redirect to="/" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={warning} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Please Fill All Fields.
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Wrong Credentials.
        </Alert>
      </Snackbar>

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={logIn} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={user.email}
            onChange={updateField}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={user.password}
            onChange={updateField}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
       

          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
