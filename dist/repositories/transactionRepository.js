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
exports.generateTransactionReportRepo = exports.countTransactionsRepo = exports.searchTransactionsRepo = exports.getTransactionByIdRepo = exports.createTransactionRepo = void 0;
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
const createTransactionRepo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newTransaction = new transactionModel_1.default(data);
    return yield newTransaction.save();
});
exports.createTransactionRepo = createTransactionRepo;
const getTransactionByIdRepo = (transactionID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transactionModel_1.default.findOne({ transactionID });
});
exports.getTransactionByIdRepo = getTransactionByIdRepo;
const searchTransactionsRepo = (filterQuery, sortQuery, page, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transactionModel_1.default.find(filterQuery)
        .sort(sortQuery)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
});
exports.searchTransactionsRepo = searchTransactionsRepo;
// Count the total number of documents matching the filter query
const countTransactionsRepo = (filterQuery) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transactionModel_1.default.countDocuments(filterQuery);
});
exports.countTransactionsRepo = countTransactionsRepo;
const generateTransactionReportRepo = (filters, calculateTotal) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (calculateTotal) {
        // Calculate the total transaction amount
        const totalAmount = yield transactionModel_1.default.aggregate([
            { $match: filters },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        return { totalAmount: ((_a = totalAmount[0]) === null || _a === void 0 ? void 0 : _a.total) || 0 };
    }
    else {
        const transactions = yield transactionModel_1.default.find(filters).select("transactionID amount description dateTime");
        return { transactions };
    }
});
exports.generateTransactionReportRepo = generateTransactionReportRepo;
