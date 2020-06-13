import React, { useState, useEffect, useContext, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Home from "../Home";
import Post from "../Post";
import axiosInstance from "../../API/axiosInstance";
import "../../styles/profile.css";
import { UserContext } from "../../context/userContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory, Link } from "react-router-dom";
import {
  FormControl,
  MenuItem,
  makeStyles,
  ListItemText,
  Input,
  InputLabel,
  Button,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

// import "..
const limit = 80;
/// ...
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    maxWidth: 400,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  maincontainer: {
    overFlow: "scroll",
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const User = (props) => {
  const {
    data: { user: currentUser },
  } = useContext(UserContext);
  const classes = useStyles();
  const { id } = props;
  const [personName, setPersonName] = React.useState([]);
  const [posts, setPosts] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [newPostData, setNewPostData] = useState({});
  const [newPostFile, setNewPostFile] = useState(null);
  const[myfollowers,updateFollowers]=useState(0)
  const [myfollowing, updateFollowing] = useState(0)

  const history = useHistory();
  useEffect(() => {
    console.log(id);
  });

  const handleInput = (e) => {
    setNewPostData({ ...newPostData, [e.target.name]: e.target.value });
  };
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  const handleFileInput = (e) => {
    createImage(e.target.files[0]);
  };

  function createImage(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      setNewPostFile(e.target.result);
    };
    reader.readAsDataURL(file);
  }
  const categoryMenu = useMemo(
    () =>
      categories.slice(0, 20).map((cat) => (
        <MenuItem key={cat.name} value={cat.name}>
          <Checkbox checked={checkedCategories.indexOf(cat.name) > -1} />
          <ListItemText primary={cat.name} />
        </MenuItem>
      )),
    [categories.length, checkedCategories.length]
  );
  const submitPost = (e) => {
    e.preventDefault();
    const obj = {};
    checkedCategories.forEach((element) => {
      obj[element] = element;
    });
    const cats = categories.reduce((acc, curr) => {
      if (obj[curr.name]) acc.push(curr.id);
      return acc;
    }, []);

    axiosInstance
      .post("api/post", {
        ...newPostData,
        genres: cats,
        postFiles: newPostFile,
      })
      .then((res) => {
        console.log({ res });

        setPosts([res.data, ...posts]);
      })
      .catch((err) => console.log({ err }));
  };
  const getPosts = async () => {
    const postsData = await axiosInstance.get(`api/userposts?page=${currPage}`);
    console.log(postsData);
    setPosts([...posts, ...postsData.data]);
    setLastPage(postsData.meta.last_page);
  };
  useEffect(() => {
    getPosts();
  }, [currPage]);

  const handlePostClick = (id) => {
    history.push(`/post/${id}`);
  };

  const handleDeletePost = (id) => async () => {
    try {
      await axiosInstance.delete(`api/post/${id}`);
      setPosts(posts.filter((p) => p.id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (id) => {
    try {
      const like = await axiosInstance.post("api/post/like", {
        post_id: id,
        user_id: 22,
      });
      setPosts(
        posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
      );
      console.log(like);
    } catch (error) {
      console.log(error);
    }
  };
  const editProfile = () => {
    history.push(`/editprofile`);
  };
  const bringFollowers=async() =>{
    try{ 
    const followers = await axiosInstance.get(`api/my-followers`);
    // console.log(followers);
      updateFollowers(followers.length)
    }catch(error){
      console.log(error)
    }
  }
  const following = async () => {
    try {
      const following = await axiosInstance.get(`api/persons-i-follow`);
      updateFollowing(following.length)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() =>{
    bringFollowers()
    following()
  })
  const submitEditingPost = (postData) => {
    console.log(postData);
    return axiosInstance
      .patch(`/api/post/${postData.id}`, postData)
      .then((res) => {
        console.log(res);
        setPosts([...posts.map((p) => (p.id === postData.id ? postData : p))]);
      });
  };
  const handleSubmitAddingComment = (newComment) => {
    console.log(newComment);
    return axiosInstance.post("api/comment", newComment);
 
  };
  return (
    <div class="">
      <div class="col-lg-12 p-0">
        <div class="panel profile-cover">
          <div class="profile-cover__img">
            {currentUser.pictur == null && (
              <img
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt=""
              />
            )}
            {currentUser.pictur != null && (
              <img
                src={`http://localhost:8000${currentUser.pictur}`}

                alt=""
              />
            )}
            <h3 class="h3">{currentUser.full_name}</h3>
          </div>
          <div class="profile-cover__action bg--img" data-overlay="0.3">
            {id == currentUser.id && (
              <button
                class="btn btn-rounded btn-info"
                onClick={() => {
                  editProfile();
                }}
              >
                <FontAwesomeIcon
                  item
                  icon="edit"
                  size="1x"
                  className="mt-3 mx-1"
                />
                <span>Edit profile</span>
              </button>
            )}
            {id != currentUser.id && (
              <button>
                <FontAwesomeIcon
                  item
                  icon="plus"
                  size="1x"
                  className="mt-3 mx-1"
                />
                <span>Follow</span>
              </button>
            )}
            <button class="btn btn-rounded btn-info">
              <FontAwesomeIcon
                item
                icon="comment"
                size="1x"
                className="mt-3 mx-1"
              />
              <span>Message</span>
            </button>
          </div>
          <div class="profile-cover__info">
            <ul class="nav">
              <li>
            <strong>{myfollowers}</strong>Followers
              </li>
              <li>
            <strong>{myfollowing}</strong>Following
              </li>
            </ul>
          </div>
        </div>
        <div class="panel">
          <div class="panel-heading">
            <h3 class="panel-title">Activity Feed</h3>
          </div>
          <div class="panel-content panel-activity">
            <form action="#" class="panel-activity__status mb-2">
              <textarea
                name="user_activity"
                placeholder="Share what you've been up to..."
                class="form-control"
                name="body_content"
                onChange={handleInput}
              ></textarea>
              <div class="actions">
                <input accept="image/*" type="file"  style={{ display: 'none' }} id="icon-button-file" />
                <label htmlFor="icon-button-file">
                  <FontAwesomeIcon
                    item
                    icon="image"
                    size="2x"
                    className="mt-3 mx-1"
                  />
                </label>
                  <div>
                  <FormControl className={classes.formControl} >
                    <InputLabel id="demo-mutiple-checkbox-label">
                      Select a category or more
                    </InputLabel>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      multiple
                      value={checkedCategories}
                      onChange={handleChange}
                      input={<Input />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {categoryMenu}
                    </Select>
                  </FormControl>
                </div>
                {/* </div> */}
                <div>
                <button
                  type="submit"
                  class="btn btn-sm btn-rounded btn-info"
                  onClick={(e)=>{submitPost(e)}}
                >
                  Post
                </button>
                </div></div>
            </form>
            <InfiniteScroll
              dataLength={posts.length} //This field to render the next data
              next={() => setCurrPage(currPage + 1)}
              hasMore={currPage < lastPage}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {posts.map((p) => {
                return (
                  <Post
                    key={p.id}
                    data={p}
                    click={handlePostClick}
                    handleDeletePost={handleDeletePost}
                    onLike={() => handleLike(p.id)}
                    submitEditingPost={submitEditingPost}
                    onSubmitAddingComment={handleSubmitAddingComment}
                  />
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home(User);
