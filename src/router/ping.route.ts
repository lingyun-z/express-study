import { Router } from "express";
import controller from "../controller/ping.controller";

const router = Router();
router.get("/", controller.ping);

export default router;
