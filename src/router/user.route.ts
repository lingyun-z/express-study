import { Router } from "express";
import controller from "../controller/user.controller";

const router = Router();
router.get("/info", controller.currentUser);

export default router;
