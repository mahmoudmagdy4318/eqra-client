import React,{ useEffect, useState }  from "react";
import { Typography } from "@material-ui/core";
import Pusher from 'pusher-js'

const Test = () => {
  const [posts,setPosts]=useState([]);

  Pusher.logToConsole = true;

  let pusher = new Pusher('0e0882c25b1299c47bdb', {
    cluster: 'mt1',
    authEndpoint: 'http://localhost:8000/api/auth/login'
  });

  let channel = pusher.subscribe('private-my-channel');
  channel.bind('post-added', function(data) {
    // alert(JSON.stringify(data));
    console.log(data);
  });

  return (
    <div>
      <Typography paragraph>
      </Typography>
    </div>
  );
};

export default Test;
