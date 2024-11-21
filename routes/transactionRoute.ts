import express from "express";
import { createTransactionController, getTransactionByIdController } from "../controller/transactionController";
import { authMiddleware } from "../middleware/authMiddleware";
import { create } from "domain";

const transactionRouter = express.Router();


// POST : api/v1/transaction/create
// {
//     "amount": 800,
//     "description": "for buying pens",
//     "receiver":"Mohan Das"
// }
transactionRouter.post("/create", createTransactionController);


// GET: api/v1/transaction/get/:transactionID
transactionRouter.get("/get/:transactionID", authMiddleware, getTransactionByIdController);

export default transactionRouter;
