import { Socket } from "socket.io";

export const authorizeMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
) => {
  if (!socket.request.session.user) {
    next(new Error("401"));
  } else {
    socket.data.user = { ...socket.request.session.user };
    next();
  }
};
