"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cronController_1 = require("../controller/cronController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const cronService_1 = require("../services/cronService");
const router = express_1.default.Router();
// GET : api/v1/program?pragram=0  stop the cron
// GET : api/v1/program?program=1  start the cron
router.get("/", authMiddleware_1.authMiddleware, cronController_1.controlCronJobController);
router.get("/status", authMiddleware_1.authMiddleware, (req, res) => {
    try {
        const status = (0, cronService_1.getCronStatus)();
        res.status(200).json(status);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch CRON status" });
    }
});
exports.default = router;
