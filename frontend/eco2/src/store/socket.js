import SockJS from "sockjs-client";
import Stomp from "stompjs";

let url = process.env.REACT_APP_BE_HOST + "socket";
let sockJS = new SockJS(url, null, { transports: ["websocket", "xhr-streaming", "xhr-polling"] });

export let getStompClient = () => {
  return Stomp.over(sockJS);
};
