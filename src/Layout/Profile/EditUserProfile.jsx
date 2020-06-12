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
  const [firstName, updateFirstName] = useState(currentUser.first_name);
  const [lastName, updateLasttName] = useState(currentUser.last_name);
  const [username, updateUserName] = useState(currentUser.username);
  // const [pictur, updatePictur] = useState(currentUser.pictur);
  const [fileData, updateFileData] = useState(currentUser.pictur);
  const [displayedPic, dispaly] = useState("http://localhost:8000");

  // console.log(currentUser);
  useEffect(() => {
    updateProfileData(currentUser);
  });
  // useEffect(() => {
  //   if(fileData != null &&  fileData instanceof File == false){
  //     updateFileData("http://localhost:8000")
  //   }
  // });
  const onChange = (e) => {
    console.log(e.target.files);
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    createImage(files[0]);
  };
  const createImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      updateFileData(e.target.result);
    };
    reader.readAsDataURL(file);
    updateFileData(file);
  };
  const fileUpload = async (image) => {
    const formData = new FormData();
    // formData.append("pictur", image);
    console.log(firstName);
    formData.append("id", currentUser.id);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("full_name", `${firstName} ${lastName}`);
    formData.append("username", username);
    // if (fileData instanceof File){
    formData.append("pictur", fileData);
    // }
    formData.append("_method", "PUT");

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
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
    console.log(fileData);
    fileUpload(fileData);
  };
  return (
    <div class="container bootstrap snippets">
      <div class="row">
        <div class="col-xs-12 col-sm-9">
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
                    src={fileData}
                    alt="User avatar"
                  />
                )}

                <div class="p-image">
                  <FontAwesomeIcon
                    item
                    icon="camera"
                    size="1x"
                    className="mt-3 mx-1 upload-button"
                  />

                  <input
                    type="file"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    accept="image/*"
                  />
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
                      onChange={(e) => {
                        updateFirstName(e.target.value);
                      }}
                      type="text"
                      class="form-control"
                      defaultValue={profileData.first_name}
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
                      }}
                      class="form-control"
                      defaultValue={profileData.last_name}
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
                      defaultValue={profileData.username}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-10 col-sm-offset-2">
                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                    <button type="reset" class="btn btn-default">
                      Cancel
                    </button>
                  </div>
                </div>
                {/* <div class="form-group">
                <label class="col-sm-2 control-label">Work address</label>
                <div class="col-sm-10">
                  <textarea rows="3" class="form-control"></textarea>
                </div>
              </div> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Home(EditUserProfile);
