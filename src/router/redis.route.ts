import { Router } from "express";
import controller from "../controller/redis.controller";

const router = Router();
router.get("/add/:key/:id", controller.add);
router.get("/get/:key", controller.get);
router.get("/flushAll", controller.flushAll);

export default router;
