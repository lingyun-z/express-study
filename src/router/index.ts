import { Router } from "express";
import loginRouter from "./login.route";
import pingRouter from "./ping.route";
import redisRouter from "./redis.route";
import chatRouter from "./chat.route";

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
  }
}

export default new IndexRouter();
