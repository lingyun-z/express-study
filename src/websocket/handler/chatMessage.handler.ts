import { ChatMessageFromClient, Socket } from "../types";

export const chatMessageHandler = (
  socket: Socket,
  payload: ChatMessageFromClient
) => {
  const { content, to } = payload;
  const parsedMessage = {
    content,
    from: socket.data.user.userName,
    timestamp: new Date().getTime(),
  };
  socket.to(to).emit("chatMessage", parsedMessage);
};
