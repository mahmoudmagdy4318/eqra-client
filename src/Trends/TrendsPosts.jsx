import React, { useEffect, useState } from "react";
import Home from "../Layout/Home";
import { useLocation } from "react-router-dom";
import Test from "../Layout/test";

function TrendsPosts() {
  const [writer, setwriter] = useState("");
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  useEffect(() => {
    debugger;
    setwriter(query.get("q"));
  }, [query]);
  return <>{writer ? <Test writer={writer} /> : <></>}</>;
}

export default TrendsPosts;
