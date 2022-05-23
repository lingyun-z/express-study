import { Router } from "express";
import controller from "../controller/login.controller";

const router = Router();
router.post("/", controller.login);

export default router;
