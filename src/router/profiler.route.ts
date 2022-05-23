import { Router } from "express";
import controller from "../controller/profiler.controller";

const router = Router();
router.get("/", controller.cupProfiler);

export default router;
