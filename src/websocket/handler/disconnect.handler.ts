import { Socket } from "../types";
import { socketUserService } from "../../service";

export const disconnectHandler = (socket: Socket) => {
  const userId = socket.data.user?.userName;
  socket.broadcast.emit("userOffline", { userId });

  return socketUserService.deleteSocketUser(userId);
};
