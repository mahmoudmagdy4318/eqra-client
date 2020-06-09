import React, {
  useEffect,
  useState,
  Fragment,
  useRef,
  useCallback,
} from "react";
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
import Post from "./Post";
import axiosInstance from "../API/axiosInstance";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import Home from "./Home";

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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Test = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [posts, setPosts] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const history = useHistory();

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  function increseHeight() {
    textarea.style.height = "";
    textarea.style.height = Math.min(textarea.scrollHeight, limit) + "px";
  }

  const getPosts = async () => {
    console.log("call");
    const postsData = await axiosInstance.get(`api/post?page=${currPage}`);
    setPosts([...posts, ...postsData.data]);
    setLastPage(postsData.meta.last_page);
  };
  useEffect(() => {
    getPosts();
    console.log(currPage);
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
  return (
    <div className={classes.maincontainer}>
      <div className="con">
        <div className="post-con mt-md-2 mb-md-1">
          <img
            src={require("../assets/download.png")}
            className="avatar ml-2"
            alt=""
          />
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={3}
            rowsMax={8}
            placeholder="Write a post"
            class="write-area ml-4"
          />
        </div>
        <div className="post-con-last ml-md-2 mb-2">
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <FontAwesomeIcon
                icon="upload"
                size="1x"
                style={{ color: "#EE4956" }}
                className="ml-5 mt-3"
              />
            </IconButton>
          </label>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">
              Select a category or more
            </InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Grid
          container
          xs={12}
          justify={"flex-end"}
          style={{ color: "#b1bbc3" }}
          className="mb-2"
        >
          <button className=" btn-primary mr-md-4  px-4 py-2 post">Post</button>
        </Grid>
      </div>
      <hr className="line"></hr>

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
              onLike={() => handleLike(p.id)}
            />
          );
        })}
      </InfiniteScroll>
      {/* ******************************************************** */}
    </div>
  );
};

export default Home(Test);
