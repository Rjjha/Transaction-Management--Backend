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
exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
/**
 * Register controller
 */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const message = yield (0, authService_1.registerUser)(name, email, password);
        res.status(201).json({ message });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        res.status(400).json({ message: errorMessage });
    }
});
exports.register = register;
/**
 * Login controller
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const token = yield (0, authService_1.loginUser)(email, password);
        res.status(200).json({ token });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        res.status(400).json({ message: errorMessage });
    }
});
exports.login = login;
