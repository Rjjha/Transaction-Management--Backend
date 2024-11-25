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
exports.generateTransactionReportController = exports.searchTransactionsController = exports.getTransactionByIdController = exports.createTransactionController = void 0;
const transactionService_1 = require("../services/transactionService");
const slugify_1 = __importDefault(require("slugify"));
const createTransactionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, description, userId, userName } = req.body;
        if (!amount || !description || !userId || !userName) {
            res.status(400).json({ error: "Required fields: amount, description, userId, userName." });
            return;
        }
        const timestamp = Date.now();
        const randomString = Math.random().toString(10).substring(2, 5).toUpperCase();
        const slug = (0, slugify_1.default)(description, { lower: true, strict: true });
        const newTransaction = {
            amount,
            description,
            userId,
            userName,
            transactionID: `TXN-${timestamp}-${randomString}`,
            slug: slug
        };
        const result = yield (0, transactionService_1.createTransaction)(newTransaction);
        res.status(201).json({ message: "Transaction created successfully.", data: result });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        res.status(500).json({ message: errorMessage });
    }
});
exports.createTransactionController = createTransactionController;
const getTransactionByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { transactionID } = req.params;
        const result = yield (0, transactionService_1.getTransactionById)(transactionID);
        if (!result) {
            res.status(404).json({ error: "Transaction not found." });
            return;
        }
        res.status(200).json({ data: result });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        res.status(500).json({ message: errorMessage });
    }
});
exports.getTransactionByIdController = getTransactionByIdController;
const searchTransactionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, sortAmount, sortTime, userId, userName, dateStart, dateEnd } = req.query;
        const { description, minAmount, maxAmount } = req.body;
        // Convert query parameters to appropriate data types
        const pageNumber = parseInt(page, 10) || 1;
        const pageSizeNumber = 5;
        const sortAmountValue = parseInt(sortAmount, 10);
        const sortTimeValue = parseInt(sortTime, 10);
        // Construct the filter query dynamically
        const filters = {};
        if (userId)
            filters.userId = userId;
        if (userName)
            filters.userName = { $regex: userName, $options: "i" };
        if (description)
            filters.slug = { $regex: description, $options: "i" };
        if (dateStart || dateEnd) {
            filters.dateTime = Object.assign(Object.assign({}, (dateStart && { $gte: new Date(dateStart) })), (dateEnd && { $lte: new Date(dateEnd) }));
        }
        if (minAmount || maxAmount) {
            filters.amount = Object.assign(Object.assign({}, (minAmount && { $gte: parseFloat(minAmount) })), (maxAmount && { $lte: parseFloat(maxAmount) }));
        }
        // Construct the sorting query dynamically
        const sorting = {};
        if (!isNaN(sortAmountValue))
            sorting.amount = sortAmountValue === 0 ? 1 : -1;
        if (!isNaN(sortTimeValue))
            sorting.dateTime = sortTimeValue === 0 ? 1 : -1;
        // Fetch transactions from the service
        const result = yield (0, transactionService_1.searchTransactions)(filters, sorting, pageNumber, pageSizeNumber);
        // Send response
        res.status(200).json({
            data: result.transactions,
            totalCount: result.totalCount,
            currentPage: pageNumber,
            totalPages: Math.ceil(result.totalCount / pageSizeNumber),
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        res.status(500).json({ message: errorMessage });
    }
});
exports.searchTransactionsController = searchTransactionsController;
const generateTransactionReportController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { totalAmount, dateTimeStart, dateTimeEnd } = req.query;
        // Construct filter based on query parameters
        const filters = {};
        if (dateTimeStart || dateTimeEnd) {
            filters.dateTime = Object.assign(Object.assign({}, (dateTimeStart && { $gte: new Date(dateTimeStart) })), (dateTimeEnd && { $lte: new Date(dateTimeEnd) }));
        }
        // Call the service to generate the report
        const report = yield (0, transactionService_1.generateTransactionReport)(filters, !!totalAmount);
        res.status(200).json({
            success: true,
            report,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        res.status(500).json({ message: errorMessage });
    }
});
exports.generateTransactionReportController = generateTransactionReportController;
