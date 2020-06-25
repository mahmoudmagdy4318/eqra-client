import React, { useEffect, useContext, useState } from "react";
import "../../../../styles/editUserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../../../context/userContext";
import axiosInstance from "../../../../API/axiosInstance";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormDialog from "../../../../utils/formDialog";
import { Modal, Fade } from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';

import styles from './Details.module.css'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
const EditWriterData = ({image}) => {
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const classes = useStyles();
  const {
    data: { user: currentUser },
  } = useContext(UserContext);
  const [profileData, updateProfileData] = useState({});
  const [firstName, updateFirstName] = useState(profileData.first_name);
  const [lastName, updateLasttName] = useState(profileData.last_name);
  const [username, updateUserName] = useState(profileData.username);
  const [fileData, updateFileData] = useState(profileData.pictur);
  const [originalFile, updateOriginalFile] = useState();
  const [open, setOpen] = useState(false);
  const [successMsg, setSuccessMessage] = useState("");
  const [firstNameVal, setFirstNameVal] = useState({
    error: false,
    helper: "",
  });
  const [lastNameVal, setLastNameVal] = useState({ error: false, helper: "" });
  const [usernameVal, setUsernameVal] = useState({ error: false, helper: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdatePass, setOpenUpdatePass] = useState(false);
  const [successMsgPass, setSuccessMessagePass] = useState("");
  const [errOpen, seterrOpen] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  // const [password, setpassword] = React.useState({ error: false, helper: "" });


  useEffect(() => {
    updateProfileData(currentUser);
  });
  useEffect(() => {
    updateFirstName(currentUser.first_name);
    updateLasttName(currentUser.last_name);
    updateUserName(currentUser.username);
    updateFileData(currentUser.pictur);
    updateOriginalFile("");
  }, [profileData]);
  const onChange = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    createImage(files[0]);
  };
  const createImage = (file) => {
    //sent file
    updateOriginalFile(file);
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
      setOpen(true);
      setSuccessMessage(data.message);
    } catch (formErr) {
      // console.error(formErr.response.data.errors);
      const { errors } = formErr.response.data;
      handelErrors(errors);
    }
  };
  const handelErrors = (errors) => {
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
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenUpdatePass(false);
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const sendUpdatedPassword = async (mypassword, confirm) => {
    if (mypassword == "") {
      seterrOpen(true);
      seterrMsg("you should enter a valid password")

    } else if (mypassword == confirm) {
      try {
        const data = await axiosInstance.put(`api/auth/updatepassword`, {
          newPassword: mypassword,
          newPassword_confirmation: confirm,
        });
        setOpenUpdatePass(true);
        setSuccessMessagePass(data.msg);
      } catch (error) {
        const { errors } = error.response.data;
      }
    } else {
      seterrOpen(true);
      seterrMsg("password doesn't match")
    }
  };
  const handleErrClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    seterrOpen(false);

  }
  return (
    <>
      <button type="button" className={styles.EditUser} onClick={handleOpenModal}>
        Edit Profile
      </button>
      <Modal
        aria-labelledby="Edit Writer Data"
        aria-describedby="Modal for Writer To Edit his Data With Ease"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        
      >
        <Fade in={openModal}>
          <div className={`container bootstrap snippets mt-2 ${styles.modalContainer}`}>
            <div className="row">
              <form
                className={`form-horizontal ${styles.formStyle}`}
                onSubmit={onFormSubmit}
                encType="multipart/form-data"
                noValidate
                autoComplete="off"
              >
                <div className="panel panel-default row">
                  <div className="panel-body text-center col-md-4">
                    {fileData === null && (
                      <img
                        clases={`img-circle profile-avatar ${styles.EditUserImage}`}
                        src={image}
                        alt="User avatar"
                      />
                    )}
                    {fileData != null && (
                      <img
                        className="img-circle profile-avatar"
                        src={
                          toString(fileData).startsWith("/storage")
                            ? `http://localhost:8000${fileData}`
                            : fileData
                        }
                        alt="User avatar"
                      />
                    )}

                    <div className="p-image">
                      <input
                        type="file"
                        onChange={(e) => {
                          onChange(e);
                        }}
                        accept="image/*"
                        style={{ display: "none" }}
                        id="icon-camera-file"
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
                  <div className="col-md-6">
                    <div className="panel-heading">
                      <h4 className="panel-title">Information</h4>
                    </div>
                    <TextField
                      id="outlined-full-width"
                      error={firstNameVal.error}
                      label="First name"
                      style={{ margin: 8 }}
                      defaultValue={currentUser.first_name}
                      value={firstName}
                      onChange={(e) => {
                        updateFirstName(e.target.value);
                      }}
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
                      onChange={(e) => {
                        updateLasttName(e.target.value);
                      }}
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
                      onChange={(e) => {
                        updateUserName(e.target.value);
                      }}
                      helperText={usernameVal.helper}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      variant="outlined"
                    />
                    <div className="form-group">
                      <div className="col-sm-3">
                        <button
                          type="submit"
                          className="btn btn-primary button-sumbit  mt-md-2"
                        >
                          Submit
                    </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="row">
              <div className="form-group">
                <div className="col-sm-10 col-sm-offset-2">
                  <button
                    className="btn btn-info button-sumbit ml-md-2 mt-md-2"
                    onClick={handleClickOpen}
                  >
                    update password
            </button>
                  <FormDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                    sendUpdatedPassword={sendUpdatedPassword}
                  />
                </div>
              </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                {successMsg}
              </Alert>
            </Snackbar>
            <Snackbar
              open={openUpdatePass}
              autoHideDuration={6000}
              onClose={handleCloseSnack}
            >
              <Alert onClose={handleCloseSnack} severity="success">
                {successMsgPass}
              </Alert>
            </Snackbar>
            <Snackbar open={errOpen} autoHideDuration={6000} onClose={handleErrClose}>
              <Alert onClose={handleErrClose} severity="error">
                {errMsg}
              </Alert>
            </Snackbar>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
export default EditWriterData;
