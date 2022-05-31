import { Socket } from "../types";
import { socketUserService } from "../../service";

export const connectHandler = async (socket: Socket) => {
  const userId = socket.data.user?.userName;

  if (userId) {
    const username = userId;
    socket.join(userId);
    await socketUserService.saveSocketUser(userId, {
      socketId: socket.id,
      username: username,
    });
    socket.broadcast.emit("userOnline", { userId });
  }
};
