import express from "express";
import { createTransactionController, getTransactionByIdController, searchTransactionsController,generateTransactionReportController } from "../controller/transactionController";
import { authMiddleware } from "../middleware/authMiddleware";
import { create } from "domain";

const transactionRouter = express.Router();


// POST : api/v1/transaction/create
// {
//     "amount": 800,
//     "description": "for buying pens",
//     "userId": "sdfgf",
//     "userName":"Mohan Das"
// }
transactionRouter.post("/create", createTransactionController);


// GET: api/v1/transaction/get/:transactionID
transactionRouter.get("/get/:transactionID", authMiddleware, getTransactionByIdController);



// POST : api/v1/transaction/search?page=1&sortAmount=1&sortTime=0&userId=sdfgf&userName=Mohan&dateStart=2024-01-01&dateEnd=2024-12-31
// payload 
//{
//     "description": "pens",
//     "minAmount": 100,
//     "maxAmount": 1000
// }
transactionRouter.post("/search", authMiddleware, searchTransactionsController);

// GET : api/v1/transaction/report?totalAmount=true
// GET : api/v1/transaction/report?dateTimeStart=2024-01-01T00:00:00Z&dateTimeEnd=2024-12-31T23:59:59Z
transactionRouter.get("/report", authMiddleware, generateTransactionReportController);


export default transactionRouter;
