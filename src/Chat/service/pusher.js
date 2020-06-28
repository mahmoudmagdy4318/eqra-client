import Pusher from "pusher-js";


export const pusher = new Pusher("0e0882c25b1299c47bdb", {
    cluster: "mt1",
    authEndpoint: "/broadcasting/auth",
    auth: {
      headers: {
        Accept: "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
    },
});