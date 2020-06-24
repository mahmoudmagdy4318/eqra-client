import React, { useState } from "react";
import clsx from "clsx";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./style/SearchPageStyle";
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from "@material-ui/lab/Alert";
import Axios from "axios";
// Component & Service
import Home from "../Layout/Home";
import SearchPageResult from "./SearchPageResult";
import SearchService from "../services/SearchService";

const SearchPage = (props) => {
  const classes = useStyles();
  const [search, setSearch] = useState({
    query: "",
    loading: false,
    results: [],
  });
  const [errorMessage, setErrorMessage] = useState("Search For Your Friends");
  var cancel = "";
  const fetchAllPossibleResult = async (searchQuery) => {
    try {
      if (cancel) cancel.cancel();
      cancel = Axios.CancelToken.source();
      const searchResult = await SearchService.MassiveSearch(
        searchQuery,
        cancel.token
      );
      setSearch({ loading: false, results: searchResult.data.users });
      SearchService.setResultMsgIfMsgEmpty(
        searchResult.data.users,
        setErrorMessage
      );
    } catch (err) {
      if (Axios.isCancel(err) || err) {
        setSearch({ loading: false });
        setErrorMessage("Failed to fetch results.Please check network");
      }
    }
  };
  const SearchBtnClick = (e) => {
    const query = search.query;
    if (!query) {
      setErrorMessage("Search For Your Friends");
      setSearch({ query: "", results: [] });
    } else {
      setSearch({ query, loading: true });
      fetchAllPossibleResult(query);
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.middleItems}>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">
            Search....
          </InputLabel>
          <Input onChange={(e) => setSearch({...search, query: e.target.value })} />
        </FormControl>
        <Button
          className={classes.marginBtn}
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={SearchBtnClick}
        >
          Search
        </Button>
        {errorMessage ? (
          <Alert
            className={classes.alertMargin}
            severity="info"
            variant="filled"
            icon={false}
          >
            {errorMessage}
          </Alert>
        ) : (
          ""
        )}
        {search.loading ? <div className={classes.loadingSpinner}>
        <CircularProgress/>
        </div>: ""}
      </div>
      <SearchPageResult searchResult={search.results} />
    </div>
  );
};

export default Home(SearchPage);
