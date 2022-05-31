import { NextFunction, Request, Response } from "express";
import * as session from "express-session";
import { Socket } from "../types";
import sessionStore from "../../lib/sessionStore";

export const sessionMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
) =>
  session({
    name: "login-session",
    secret: "LOCAL-TEST",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: "lax",
    },
  })(socket.request as Request, {} as Response, next as NextFunction);
