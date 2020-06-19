import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@material-ui/core/TextField";
import "../styles/forgetPass.css";
import {
  Grid,
  Paper,
  Container,
  Typography,
  withStyles,
  createStyles,
  Snackbar,
  Button,
} from "@material-ui/core";
import axiosInstance from "../API/axiosInstance";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const [emailError, updateEmailError] = useState({ error: "", helper: "" });
  const [resetMail, updateResetMail] = useState("");
  const [successOpen, setSuceesOpen] = useState(false);
  const [errOpen, setErrOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const sendResetMail = async (e) => {
    e.preventDefault();
    if (validateEmail(resetMail)) {
      try {
        const email = { email: resetMail };
        const reset = await axiosInstance.post(`api/password/create`, email);
        console.log(reset);
        setSuceesOpen(true);
        setSuccessMsg(reset.message);
      } catch (error) {
        // console.log(error.response.data.message);
        const myError = error.response.data.message;
        if (myError) {
          setErrOpen(true);
          setErrMsg(myError);
        }
      }
    } else {
      updateEmailError({
        error: true,
        helper: "you should enter a valid email",
      });
    }
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuceesOpen(false);
  };
  const handleErrClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrOpen(false);
  };
  return (
    <div className="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-5 ">
          <div class="panel panel-default  mt-5">
            <div class="panel-body">
              <div class="text-center">
                <h3 className="forget">
                  <FontAwesomeIcon
                    item
                    icon="lock"
                    size="2x"
                    className="mt-3 mx-1"
                  />
                </h3>
                <h2 class="text-center">Forgot Password?</h2>
                <p>
                  Enter your email address below and we'll send you a link to
                  reset your password.
                </p>
                <div class="panel-body">
                  <form id="register-form" role="form" class="form">
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon"></span>

                        <TextField
                          id="outlined-full-width"
                          error={emailError.error}
                          label="Email"
                          style={{ margin: 8 }}
                          value={resetMail}
                          onChange={(e) => {
                            updateResetMail(e.target.value);
                            if (validateEmail(e.target.value)) {
                              updateEmailError({ error: false, helper: "" });
                            }
                          }}
                          helperText={emailError.helper}
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required
                          variant="outlined"
                          type="email"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      {/* <button
                        name="recover-submit"
                        class="btn form-control my-btn"
                        value="Reset Password"
                        type="submit"
                    
                        onClick={(e) => sendResetMail(e)}
                      >
                        Reset Password
                      </button> */}
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={(e) => sendResetMail(e)}
                        name="recover-submit"
                        
                      >
                        Reset Password
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar open={errOpen} autoHideDuration={6000} onClose={handleErrClose}>
        <Alert onClose={handleErrClose} severity="error">
          {errMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default ForgotPassword;
