import React, { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import useStyles from "./style/SearchStyle";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import MenuList from "@material-ui/core/MenuList";
import Axios from "axios";
import { Link } from "react-router-dom";
// Component & Service
import SearchMessage from "./SearchMessage";
import SearchService from "../services/SearchService";

const Search = (props) => {
  const [search, setSearch] = useState({
    query: "",
    loading: false,
    results: [],
  });
  const [errorMessage, setErrorMessage] = useState("Search For Your Friends");
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  var cancel = "";
  const fetchSearchResults = async (searchQuery) => {
    try {
      if (cancel) cancel.cancel();
      cancel = Axios.CancelToken.source();
      const searchResult = await SearchService.searchForUser(
        searchQuery,
        cancel.token
      );
      setSearch({ loading: false, results: searchResult.data.users });
     SearchService.setResultMsgIfMsgEmpty(searchResult.data.users, setErrorMessage);
    } catch (err) {
      if (Axios.isCancel(err) || err) {
        setSearch({ loading: false });
        setErrorMessage("Failed to fetch results.Please check network");
      }
    }
  };
  const onChangeSearch = (e) => {
    const query = e.target.value;
    if (!query) {
      setErrorMessage("Search For Your Friends");
      setSearch({ query: "", results: [] });
    } else {
      setSearch({ query, loading: true });
      fetchSearchResults(query);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onClick={handleToggle}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onChange={onChangeSearch}
      />
      <Popper
        className={classes.searchContainer}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            className={classes.searchList}
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <List dense className={classes.listRoot}>
                    {search.results?.map((user) => {
                      const labelId = `checkbox-list-secondary-label-${user.id}`;
                      return (
                        <Link className="disable-link" to={`/profile/user/${user.id}`}>
                        <ListItem key={user.id} button onClick={handleClose}>
                          <ListItemAvatar>
                            <Avatar
                              alt={`Avatar n°${user.full_name + 1}`}
                              src={user.pictur}
                            />
                          </ListItemAvatar>
                          <ListItemText id={labelId} primary={user.full_name} />
                        </ListItem>
                        </Link>
                      );
                    })}
                    <SearchMessage handleClose={handleClose} errorMessage={errorMessage}/>
                  </List>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default Search;
