import ChattingMessageItem from "../chattingMessageItem/ChattingMessageItem";

const ChattingMessage = ({ chattingMessages, toUser }) => {
  return (
    <div>
      {chattingMessages &&
        chattingMessages.map((chattingMessage, i) => (
          <ChattingMessageItem
            key={i}
            id={chattingMessage.id}
            message={chattingMessage.message}
            user={chattingMessage.user.name}
            sendDate={chattingMessage.sendDate}
            toUser={toUser}
          />
        ))}
    </div>
  );
};
export default ChattingMessage;
