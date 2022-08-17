import React from "react";
import ChattingItem from "../chattingItem/ChattingItem";

const ChattingList = ({ chattings, setDeleteFlag }) => {
  return (
    <div>
      {chattings &&
        chattings.map((chatting) => (
          <ChattingItem
            key={chatting.id}
            id={chatting.id}
            toUser={chatting.toUser}
            fromUser={chatting.fromUser}
            lastSendTime={chatting.lastSendTime}
            lastSendMessage={chatting.lastSendMessage}
            setDeleteFlag={setDeleteFlag}
          />
        ))}
    </div>
  );
};

export default ChattingList;
