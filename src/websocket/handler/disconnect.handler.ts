import { Socket } from "socket.io";
import { socketUserService } from "../../service";

export const disconnectHandler = (socket: Socket) => {
  const userId = socket.request.session.user?.userName;
  socket.broadcast.emit("userOffline", { userId });
  return socketUserService.deleteSocketUser(userId);
};
