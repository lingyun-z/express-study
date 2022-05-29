import { Socket } from "socket.io";
import { ChatMessageContent } from "../types";

export const chatMessageHandler = (
  socket: Socket,
  payload: ChatMessageContent
) => {
  const { message, to } = payload;
  const parsedMessage = {
    message: message,
    from: socket.request.session.user?.userName,
    to: to,
    timestamp: new Date().getTime(),
  };
  socket.to(to).emit("chatMessage", parsedMessage);
};
