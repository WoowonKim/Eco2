import SockJS from "sockjs-client";
import Stomp from "stompjs";

let url = process.env.REACT_APP_BE_HOST + "socket";
let sockJS = new SockJS(url);
// let stompClient = Stomp.over(sockJS);

export let getStompClient = () => {
  return Stomp.over(sockJS);
};
