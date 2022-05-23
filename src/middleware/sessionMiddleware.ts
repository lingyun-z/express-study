import * as session from "express-session";
import sessionStore from "../lib/sessionStore";

export const sessionMiddleware = session({
  name: "login-session",
  secret: "LOCAL-TEST",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    sameSite: "lax",
  },
});
