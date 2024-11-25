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
exports.generateTransactionReport = exports.searchTransactions = exports.getTransactionById = exports.createTransaction = void 0;
const transactionRepository_1 = require("../repositories/transactionRepository");
const createTransaction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, transactionRepository_1.createTransactionRepo)(data);
});
exports.createTransaction = createTransaction;
const getTransactionById = (transactionID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, transactionRepository_1.getTransactionByIdRepo)(transactionID);
});
exports.getTransactionById = getTransactionById;
const searchTransactions = (filters, sorting, page, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield (0, transactionRepository_1.searchTransactionsRepo)(filters, sorting, page, pageSize);
    const totalCount = yield (0, transactionRepository_1.countTransactionsRepo)(filters);
    return { transactions, totalCount };
});
exports.searchTransactions = searchTransactions;
const generateTransactionReport = (filters, calculateTotal) => __awaiter(void 0, void 0, void 0, function* () {
    const report = yield (0, transactionRepository_1.generateTransactionReportRepo)(filters, calculateTotal);
    return report;
});
exports.generateTransactionReport = generateTransactionReport;
