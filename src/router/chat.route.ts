import { Router } from "express";
import controller from "../controller/chat.controller";

const router = Router();
router.get("/online-users", controller.getOnlineUsers);

export default router;
