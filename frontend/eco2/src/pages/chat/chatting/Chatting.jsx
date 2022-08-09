import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ChattingList from "../../../components/chat/chattingList/ChattingList";
import { chattingList } from "../../../store/chat/chattingSlice";
import styles from "./Chatting.module.css";
const Chatting = () => {

  const [chattings, setChattings] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(chattingList({ userId: params.userId })).then((res) => {
      if (res.payload.status === 200) {
        console.log(res.payload.chatRoomList);
        setChattings(res.payload.chatRoomList);
        console.log(chattings);
      }
    });
  }, []);
  return (
    <div className={styles.signup}>
      sdsdsdsd
          <ChattingList chattings={chattings} />
    </div>
  );
};

export default Chatting;
