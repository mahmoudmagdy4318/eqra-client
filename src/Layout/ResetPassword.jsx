import React, { useEffect, Profiler, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  makeStyles,
  Button,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axiosInstance from "../API/axiosInstance";
import Snack from "../utils/Snackbar";
const ResetPassword = (props) => {
    const {token} =props
  // console.log(token)
  let history = useHistory();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [confirmValues, setConfirmValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [invlidToken, setInvalidToken] = useState(false);
  const [invlidTokenMsg, setInvalidTokenMsg] = useState("");
  const[severity,updateServity]=useState("");
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPasswordConfirm = () => {
    setConfirmValues({
      ...confirmValues,
      showPassword: !confirmValues.showPassword,
    });
  };

  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleChangeConfirm = (prop) => (event) => {
    setConfirmValues({ ...confirmValues, [prop]: event.target.value });
  };
  const sumbitForm = async(e) =>{
    e.preventDefault();
    try{
      const checkToken = await axiosInstance.get(`api/password/find/${token}`)
      console.log(checkToken);
      resetPass(checkToken.email);
    }catch(error){
      console.log(error.response.data.message)
      setInvalidToken(true);
      setInvalidTokenMsg(error.response.data.message)

    }

  }
  const resetPass =async(mail) =>{
 const   resettingData={
      email:mail,
      password:values.password,
      password_confirmation:confirmValues.password,
      token:token
    }
    if (values.password == "") {
      updateServity("error");
      setInvalidToken(true);
      setInvalidTokenMsg("you should enter a valid password")

    
    } else if (values.password  == confirmValues.password) {
    try{  
    const sendResetting= await axiosInstance.post(`api/password/reset`,resettingData)
     
      updateServity("success")
      setInvalidToken(true);
      setInvalidTokenMsg("password updated successfully")
      history.push('/login');

    }catch(error){
      console.log(error.response.data.message)
    }
    } else {
      updateServity("error")
      setInvalidToken(true);
      setInvalidTokenMsg("password doesn't match")
    }
  }
  return (
    <div class="row justify-content-md-center align-items-md-center">
      <div class="col-md-4">
        <div class="card mt-md-5 ">
          <div class="card-header text-center text-white">
            <h5 class="card-title" style={{ 'color':'#EE4956'}}>Reset password</h5>
          </div>
          <div class="card-body ">
            <form role="form">
           
                <div class="form-group">
                <div class="input-group" class=" d-flex flex-column justify-content-md-center">
                    <InputLabel htmlFor="outlined-adornment-password">
                     Enter new password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={130}
                    />
                  </div>
                </div>
                <div class="form-group">
                <div class="input-group" class=" d-flex flex-column justify-content-md-center">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm new password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={confirmValues.showPassword ? "text" : "password"}
                      value={confirmValues.password}
                      onChange={handleChangeConfirm("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordConfirm}
                            onMouseDown={handleMouseDownPasswordConfirm}
                            edge="end"
                          >
                            {confirmValues.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={130}
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    {/* <button type="submit" class="btn btn-primary btn-block" onClick={(e) =>{sumbitForm(e)}}>Reset Password</button> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(e) => { sumbitForm(e) }}
                    name="recover-submit"

                  >
                    Reset Password
                      </Button>
                  </div>
               
                </div>
          
            </form>
          </div>
          <Snack
            open={invlidToken}
            setOpen={setInvalidToken}
            severity={severity}
          messege={invlidTokenMsg}
            />
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
