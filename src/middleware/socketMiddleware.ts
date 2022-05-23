import { NextFunction, Request, Response } from "express";

export const socketAuthorizeMiddleware = (socket, next: NextFunction) => {
  console.log("socketAuthorizeMiddleware", socket.request.session?.user);
  if (!socket.request.session?.user) {
    next(new Error("401"));
  } else {
    socket.data.user = { ...socket.request.session.user };
    next();
  }
};

export const wrap = (expressMiddleware) => (socket, next) =>
  expressMiddleware(
    socket.request as Request,
    {} as Response,
    next as NextFunction
  );
