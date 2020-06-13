import React, { useEffect, useContext, useState } from "react";
import "../../styles/editUserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../context/userContext";
import Home from "../Home";
import axiosInstance from "../../API/axiosInstance";
const EditUserProfile = () => {
  const {
    data: { user: currentUser },
  } = useContext(UserContext);
  const [profileData, updateProfileData] = useState({});
  const [firstName, updateFirstName] = useState(profileData.first_name);
  const [lastName, updateLasttName] = useState(profileData.last_name);
  const [username, updateUserName] = useState(profileData.username);
  const [fileData, updateFileData] = useState(profileData.pictur);
  const [originalFile,updateOriginalFile]=useState();

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
      const url = await axiosInstance.post(`api/auth/users/edit`, formData);
      console.log(url);
    } catch (error) {
      console.error(error);
    }
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    // this.fileUpload(this.state.image);
    // console.log(fileData);
    fileUpload(originalFile);
  };
  return (
    <div class="container bootstrap snippets">
      <div class="row">
        <div class="col-sm-12">
          <form
            class="form-horizontal"
            onSubmit={onFormSubmit}
            encType="multipart/form-data"
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
                <div class="form-group">
                  <div class="col-sm-10">
                    <label class=" control-label">First name</label>
                    <input
                      onChange={(e) => {updateFirstName(e.target.value)}}
                      type="text"
                      class="form-control"
                    defaultValue={firstName}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-10">
                    <label class="control-label">Last name</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        updateLasttName(e.target.value);
                        console.log(lastName)
                      }}
                      class="form-control"
                      defaultValue={lastName}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-10">
                    <label class=" control-label">username</label>
                    <input
                      type="text"
                      class="form-control"
                      onChange={(e) => {
                        updateUserName(e.target.value);
                      }}
                      defaultValue={username}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-10 col-sm-offset-2">
                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>

                  </div>
                </div>
           
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Home(EditUserProfile);
