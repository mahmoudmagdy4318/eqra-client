import React, { useEffect, useContext, useState } from "react";
import "../../styles/editUserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../context/userContext";
import Home from "../Home";
import axiosInstance from "../../API/axiosInstance";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));
const EditUserProfile = () => {
  const classes = useStyles();
  const {
    data: { user: currentUser },
  } = useContext(UserContext);
  console.log(currentUser);
  const [profileData, updateProfileData] = useState({});
  const [firstName, updateFirstName] = useState(profileData.first_name);
  const [lastName, updateLasttName] = useState(profileData.last_name);
  const [username, updateUserName] = useState(profileData.username);
  const [fileData, updateFileData] = useState(profileData.pictur);
  const [originalFile,updateOriginalFile]=useState();
  const [open, setOpen] = useState(false);
  const[successMsg,setSuccessMessage]=useState("");
  const [firstNameVal, setFirstNameVal] = useState({ error: false, helper: "" })
  const [lastNameVal,setLastNameVal]=useState({error:false,helper:""})
  const [usernameVal, setUsernameVal] = useState({ error: false, helper: "" })

  useEffect(() => {
    updateProfileData(currentUser);
  });
  useEffect(() => {
    updateFirstName(currentUser.first_name);
    updateLasttName(currentUser.last_name)
    updateUserName(currentUser.username);
    updateFileData(currentUser.pictur);
    updateOriginalFile('');

  }, [profileData]);
  const onChange = (e) => {
    console.log(e.target.files);
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    createImage(files[0]);
  };
  const createImage = (file) => {
    //sent file
    updateOriginalFile(file)
    let reader = new FileReader();
    reader.onload = (e) => {
      updateFileData(e.target.result);
     
    };
    reader.readAsDataURL(file);
    //displayed file
    updateFileData(file);
  };
  const fileUpload = async () => {
    const formData = new FormData();
    formData.append("id", currentUser.id);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("full_name", `${firstName} ${lastName}`);
    formData.append("username", username);
    formData.append("pictur", originalFile);
    formData.append("_method", "PUT");

    try {
      const data = await axiosInstance.post(`api/auth/users/edit`, formData);
      console.log(data);
      setOpen(true);
      setSuccessMessage(data.message);
    }catch(formErr) {
      // console.error(formErr.response.data.errors);
      const { errors } = formErr.response.data;
      console.log(errors)
      handelErrors(errors);
    }
  }
  const handelErrors=(errors) =>{
    if (errors.first_name) {
      setFirstNameVal({ error: true, helper: errors.first_name[0] });
    }
    if (errors.last_name) {
      setLastNameVal({ error: true, helper: errors.last_name[0] });
    }
    if (errors.username) {
      setUsernameVal({ error: true, helper: errors.username[0] });
    }
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    fileUpload(originalFile);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <div class="container bootstrap snippets">
      <div class="row">
        <div class="col-sm-12">
       
          <form
            class="form-horizontal"
            onSubmit={onFormSubmit}
            encType="multipart/form-data"
             noValidate autoComplete="off"
          >
            <div class="panel panel-default">
              <div class="panel-body text-center">
                {fileData === null && (
                  <img
                    clases="img-circle profile-avatar"
                    src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    alt="User avatar"
                  />
                )}
                {fileData != null && (
                  <img
                    class="img-circle profile-avatar"
                    src={toString(fileData).startsWith('/storage')?`http://localhost:8000${fileData}`:fileData}
                    alt="User avatar"
                  />
                )}

                <div class="p-image">
             
                  <input
                    type="file"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    accept="image/*"
                    style={{ display: 'none' }} id="icon-camera-file"
                  />
                  <label htmlFor="icon-camera-file">
                    <FontAwesomeIcon
                      item
                      icon="camera"
                      size="1x"
                      className="mt-3 mx-1 upload-button"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">Information</h4>
              </div>
              <div class="panel-body">
            
                <TextField
                  id="outlined-full-width"
                  error={firstNameVal.error}
                  label="First name"
                  style={{ margin: 8 }}
                  defaultValue={currentUser.first_name}
                  value={firstName}
                  onChange={(e) => { updateFirstName(e.target.value) }}
                  helperText={firstNameVal.helper}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  variant="outlined"
                
                 
                />
              
                <TextField
                  id="outlined-full-width"
                  error={lastNameVal.error}
                  label="last name"
                  style={{ margin: 8 }}
                  value={lastName}
                  onChange={(e) => { updateLasttName(e.target.value) }}
                  helperText={lastNameVal.helper}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  variant="outlined"


                />
         
                <TextField
                  id="outlined-full-width"
                  error={usernameVal.error}
                  label="username"
                  style={{ margin: 8 }}
                  value={username}
                  onChange={(e) => { updateUserName(e.target.value) }}
                  helperText={usernameVal.helper}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  variant="outlined"
                />
                <div class="form-group">
                  <div class="col-sm-10 col-sm-offset-2">
                    <button type="submit" class="btn btn-primary button-sumbit ml-md-2 mt-md-2">
                      Submit
                    </button>

                  </div>
                </div>
           
              </div>
            </div>
          </form>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {successMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default Home(EditUserProfile);
