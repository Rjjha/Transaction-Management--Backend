import express from "express";
import { controlCronJobController } from "../controller/cronController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();

// GET : api/v1/program?pragram=0  stop the cron
// GET : api/v1/program?program=1  start the cron
router.get("/",authMiddleware, controlCronJobController);

export default router;
