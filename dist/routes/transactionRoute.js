"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controller/transactionController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const transactionRouter = express_1.default.Router();
// POST : api/v1/transaction/create
// {
//     "amount": 800,
//     "description": "for buying pens",
//     "userId": "sdfgf",
//     "userName":"Mohan Das"
// }
transactionRouter.post("/create", transactionController_1.createTransactionController);
// GET: api/v1/transaction/get/:transactionID
transactionRouter.get("/get/:transactionID", authMiddleware_1.authMiddleware, transactionController_1.getTransactionByIdController);
// POST : api/v1/transaction/search?page=1&sortAmount=1&sortTime=0&userId=sdfgf&userName=Mohan&dateStart=2024-01-01&dateEnd=2024-12-31
// payload 
//{
//     "description": "pens",
//     "minAmount": 100,
//     "maxAmount": 1000
// }
transactionRouter.post("/search", authMiddleware_1.authMiddleware, transactionController_1.searchTransactionsController);
// GET : api/v1/transaction/report?totalAmount=true
// GET : api/v1/transaction/report?dateTimeStart=2024-01-01T00:00:00Z&dateTimeEnd=2024-12-31T23:59:59Z
transactionRouter.get("/report", authMiddleware_1.authMiddleware, transactionController_1.generateTransactionReportController);
exports.default = transactionRouter;
