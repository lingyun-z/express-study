import { Router } from "express";
import loginRouter from "./login.route";
import pingRouter from "./ping.route";
import redisRouter from "./redis.route";
import chatRouter from "./chat.route";
import userRouter from "./user.route";

class IndexRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.use("/login", loginRouter);
    this.router.use("/ping", pingRouter);
    this.router.use("/redis", redisRouter);
    this.router.use("/chat", chatRouter);
    this.router.use("/user", userRouter);
  }
}

export default new IndexRouter();
