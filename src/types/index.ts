import * as express from "express";
import * as core from "express-serve-static-core";
import { Session } from "express-session";

export interface Request<Query extends core.Query = core.Query>
  extends express.Request<core.ParamsDictionary, any, any, Query> {}

declare module "express-session" {
  interface SessionData {
    user?: {
      userName?: string;
    };
  }
}

declare module "http" {
  interface IncomingMessage {
    session: Session & {
      user?: {
        userName?: string;
      };
    };
  }
}
