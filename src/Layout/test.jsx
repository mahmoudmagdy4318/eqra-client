import React, { useEffect, useState, useContext, useMemo } from "react";
import { Typography, TextareaAutosize, Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import _ from "lodash";
import Post from "./Post";
import axiosInstance from "../API/axiosInstance";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Home from "./Home";
import "../styles/home.css";

const textarea = document.getElementById("textar ea");

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Test = (props) => {
  const {
    data: { user: currentUser },
  } = useContext(UserContext);
  // console.log("====================================");
  // console.log(currentUser);
  // console.log("====================================");
  const classes = useStyles();
  const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [newPostData, setNewPostData] = useState({});
  const [newPostFile, setNewPostFile] = useState(null);
  const history = useHistory();

  const handleChange = (event) => {
    setCheckedCategories(event.target.value);
    const obj = {};
    checkedCategories.forEach((element) => {
      obj[element] = element;
    });
    const cats = categories.reduce((acc, curr) => {
      if (obj[curr.name]) acc.push(curr.id);
      return acc;
    }, []);
    setNewPostData({ ...newPostData, genres: cats });
  };
  const handleInput = (e) => {
    setNewPostData({ ...newPostData, [e.target.name]: e.target.value });
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
  const submitPost = () => {
    const obj = {};
    checkedCategories.forEach((element) => {
      obj[element] = element;
    });
    const cats = categories.reduce((acc, curr) => {
      if (obj[curr.name]) acc.push(curr.id);
      return acc;
    }, []);
    const formData = new FormData();
    for (let i = 0; i < newPostData.postFiles?.length; i++) {
      formData.append(`postFiles[${i}]`, newPostData.postFiles[i]);
    }
    formData.append("genres", cats);
    formData.append("body_content", newPostData.body_content);
    formData.append("genres", cats);
    axiosInstance
      .post("api/post", formData)
      .then((res) => {
        console.log({ res });
        setPosts([res.data, ...posts]);
      })
      .catch((err) => console.log({ err }));
  };

  function increseHeight() {
    textarea.style.height = "";
    textarea.style.height = Math.min(textarea.scrollHeight, limit) + "px";
  }

  const getPosts = async () => {
    if (props.writer) {
      console.log({ props });
      const postsData = await axiosInstance.get(
        `api/trends/${props.writer}?page=${currPage}`
      );
      setPosts(
        _.get(posts[0], "user.id") === _.get(postsData, "data.user.id")
          ? [...posts, ...postsData.data]
          : postsData.data
      );
      setLastPage(postsData.last_page);
      console.log(postsData.data);
    } else {
      const postsData = await axiosInstance.get(`api/post?page=${currPage}`);
      if (currPage === 1) setPosts(postsData.data);
      else setPosts([...posts, ...postsData.data]);
      setLastPage(postsData.meta.last_page);
    }
  };
  const getCategories = async () => {
    const catData = await axiosInstance.get(`api/genre`);
    setCategories(catData);
  };

  useEffect(() => {
    getPosts();
  }, [currPage, props]);

  useEffect(() => {
    if (!props.writer) getCategories();
  }, []);
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

  const submitEditingPost = (postData) => {
    console.log(postData);
    return axiosInstance
      .patch(`/api/post/${postData.id}`, postData)
      .then((res) => {
        console.log(res);
        setPosts([...posts.map((p) => (p.id === postData.id ? postData : p))]);
      });
  };
  const handleLike = (id) => (currentUserLike) => {
    if (currentUserLike) {
      return axiosInstance
        .delete(`api/post/${id}/likes/${currentUser.id}`)
        .then(() => {
          setPosts(
            posts.map((p) => (p.id === id ? { ...p, likes: p.likes - 1 } : p))
          );
        });
    } else {
      return axiosInstance
        .post("api/post/like", {
          post_id: id,
          user_id: currentUser.id,
        })
        .then(() => {
          setPosts(
            posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
          );
        });
    }
  };

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

  const handleSubmitAddingComment = (newComment) => {
    console.log(newComment);
    return axiosInstance.post("api/comment", newComment);
  };
  return (
    <div className={classes.maincontainer}>
      {!props.writer ? (
        <div className="con py-md-2 mb-4">
          <div className="post-con mt-md-2 mb-md-1">
            {currentUser.pictur == null && (
              <img
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt=""
                width="60"
                height="60"
                className="ml-2 post-img"
                style={{ width: "80px", height: "80px" }}
              />
            )}
            {currentUser.pictur != null && (
              <img
                src={`http://localhost:8000${currentUser.pictur}`}
                width="60"
                height="60"
                alt=""
                className="ml-2 post-img"
                style={{ width: "80px", height: "80px" }}
              />
            )}
            {/* ****************************************** */}
            <TextareaAutosize
              aria-label="minimum height"
              rowsMin={5}
              rowsMax={8}
              placeholder="Write a post"
              class="write-area ml-2"
              name="body_content"
              onChange={handleInput}
            />
          </div>

          <div className="row ml-md-2 mb-2 mt-md-1 align-items-center">
            <div className="col-2">
              <input
                accept="image/*"
                multiple
                className={classes.input}
                id="icon-button-file"
                type="file"
                name="postFiles[]"
                onChange={(e) =>
                  setNewPostData({ ...newPostData, postFiles: e.target.files })
                }
              />
              <label htmlFor="icon-button-file">
                <FontAwesomeIcon
                  icon="image"
                  size="2x"
                  style={{ color: "#EE4956" }}
                  className=" image mt-md-4"
                />
              </label>
            </div>
            <div className="col-8">
              <FormControl className={classes.formControl}>
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
            <div className="col-2">
              <button
                className="px-4 py-2 post mt-md-3"
                onClick={submitPost}
                style={{ marginLeft: -15 }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* <hr className="line"></hr> */}
      {/* ************************************************ */}
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
              onLike={handleLike(p.id)}
              submitEditingPost={submitEditingPost}
              onSubmitAddingComment={handleSubmitAddingComment}
            />
          );
        })}
      </InfiniteScroll>
      {/* ******************************************************** */}
      {/* <Post /> */}
    </div>
    //
    // </>
  );
};

export default Home(Test);
