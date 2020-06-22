import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
// Component
import Home from "../Layout/Home";
import SearchPageResult from "./SearchPageResult";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "45ch",
  },
  marginBtn: {
    marginTop: "21px",
    marginLeft: "-5px",
  },
  middleItems: {
    marginTop: "20px",
    marginBottom:"30px",
  },
}));
const SearchPage = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.middleItems}>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">
            Search....
          </InputLabel>
          <Input />
        </FormControl>
        <Button
          className={classes.marginBtn}
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </div>
      <SearchPageResult/>
    </div>
  );
};

export default Home(SearchPage);
