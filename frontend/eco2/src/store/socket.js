import SockJS from "sockjs-client";
import Stomp from "stompjs";

let url = process.env.REACT_APP_BE_HOST + "socket";
let sockJS = new SockJS(url, null, {transports: ["websocket", "xhr-streaming", "xhr-polling"]});
// let stompClient = Stomp.over(sockJS);
// let options = {debug: false, protocols: SockJS.VERSIONS.supportedProtocols()};

export let getStompClient = () => {
  return Stomp.over(sockJS);
};
