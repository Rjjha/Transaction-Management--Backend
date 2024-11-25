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
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repositories/userRepository");
const registerUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield (0, userRepository_1.findUserByEmail)(email);
    if (existingUser) {
        throw new Error("User already exists.");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    yield (0, userRepository_1.createUser)({ name, email, password: hashedPassword, role: 0 });
    return "User registered successfully.";
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userRepository_1.findUserByEmail)(email);
    if (!user) {
        throw new Error("User not found.");
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password.");
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "5h" });
    return token;
});
exports.loginUser = loginUser;
