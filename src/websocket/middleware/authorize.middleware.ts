import { Request } from "express";
import { Socket } from "../types";

export const authorizeMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
) => {
  const req = socket.request as Request;
  if (!req.session.user) {
    next(new Error("401"));
  } else {
    socket.data.user = { ...req.session.user };
    next();
  }
};
