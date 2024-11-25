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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCronStatus = exports.stopCronJob = exports.startCronJob = void 0;
const cron_1 = require("cron");
const transactionRepository_1 = require("../repositories/transactionRepository");
const slugify_1 = __importDefault(require("slugify"));
let cronJob = null;
let requestCount = 0;
const CRON_HIT_LIMIT = 6;
const generateRandomPayload = () => {
    const randomAmount = Math.floor(Math.random() * 1000) + 100;
    const descriptions = ["for pens", "for groceries", "for books", "for rent"];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    const userIds = ["user1", "user2", "user3"];
    const userNames = ["Alice", "Bob", "Charlie"];
    const timestamp = Date.now();
    const randomString = Math.random().toString(10).substring(2, 5).toUpperCase();
    const slug = (0, slugify_1.default)(randomDescription, { lower: true, strict: true });
    return {
        amount: randomAmount,
        description: randomDescription,
        userId: userIds[Math.floor(Math.random() * userIds.length)],
        userName: userNames[Math.floor(Math.random() * userNames.length)],
        transactionID: `TXN-${timestamp}-${randomString}`,
        slug: slug,
    };
};
const startCronJob = () => {
    if (cronJob) {
        console.log("CRON Job is already running.");
        return;
    }
    requestCount = 0;
    cronJob = new cron_1.CronJob("* * * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        if (requestCount >= CRON_HIT_LIMIT) {
            console.log("CRON Job limit exceeded. Stopping the job.");
            (0, exports.stopCronJob)();
            return;
        }
        try {
            const payload = generateRandomPayload();
            yield (0, transactionRepository_1.createTransactionRepo)(payload);
            requestCount++;
            console.log(`CRON Job executed. Request count: ${requestCount}`);
        }
        catch (error) {
            console.error("Error in CRON job execution:", error instanceof Error ? error.message : "Unknown error");
        }
    }), null, true, "America/Los_Angeles");
    console.log("CRON Job started successfully.");
};
exports.startCronJob = startCronJob;
const stopCronJob = () => {
    if (!cronJob) {
        console.log("No CRON Job is currently running.");
        return;
    }
    cronJob.stop();
    cronJob = null;
    requestCount = 0;
    console.log("CRON Job stopped successfully.");
};
exports.stopCronJob = stopCronJob;
// Get the current status of the CRON job
const getCronStatus = () => {
    return {
        isRunning: cronJob ? true : false,
        hitCount: requestCount,
        remainingExecutions: Math.max(CRON_HIT_LIMIT - requestCount, 0),
    };
};
exports.getCronStatus = getCronStatus;
