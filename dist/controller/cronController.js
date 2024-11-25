"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlCronJobController = void 0;
const cronService_1 = require("../services/cronService");
const controlCronJobController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { program } = req.query;
    try {
        if (program === "1") {
            yield (0, cronService_1.startCronJob)();
            res.status(200).json({ message: "CRON Job started successfully." });
        }
        else if (program === "0") {
            (0, cronService_1.stopCronJob)();
            res.status(200).json({ message: "CRON Job stopped successfully." });
        }
        else {
            res
                .status(400)
                .json({
                message: "Invalid program value. Use 1 to start or 0 to stop the CRON Job.",
            });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({
            message: error instanceof Error ? error.message : "An unknown error occurred.",
        });
    }
});
exports.controlCronJobController = controlCronJobController;
