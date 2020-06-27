import React, { Fragment } from 'react';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import useStyles from "./style/SearchStyle";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from 'react-router-dom';

const SearchMessage = (props) => {
    const classes = useStyles();
    const errorMessage = props.errorMessage;
    const handleClose = props.handleClose;
    return(
        <Fragment>
            {errorMessage && errorMessage === "Search For Your Friends" ? (
              <Link className="disable-link" to="/search">
              <ListItem
                alignItems="flex-start"
                key={errorMessage}
                button
                onClick={handleClose}
              >
                <ListItemIcon>
                  <PeopleAltIcon fontSize="large" color="primary" />
                </ListItemIcon>
                <ListItemText
                  id={errorMessage}
                  primary={errorMessage}
                />
              </ListItem>
              </Link>
            ) : errorMessage ? (
              <ListItem
                alignItems="flex-start"
                key={errorMessage}
                button
                onClick={handleClose}
              >
                <ListItemIcon>
                  <ErrorOutlineIcon fontSize="large" color="primary" />
                </ListItemIcon>
                <ListItemText
                  id={errorMessage}
                  primary={errorMessage}
                />
              </ListItem>
            ) : (
              <ListItem
                alignItems="flex-start"
                key={errorMessage}
                button
                onClick={(handleClose)}
                className={classes.seeMore}
              >
                <Link to="/searchUsers">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SearchIcon fontSize="large" />}
                >
                  See More
                </Button>
                </Link>
              </ListItem>
            )}
        </Fragment>
    )
}
export default SearchMessage;