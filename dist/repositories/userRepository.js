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
exports.findUserByEmail = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
/**
 * Create a new user
 * @param {IUser} userData - User data
 * @returns {Promise<IUser>} - Newly created user
 */
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new userModel_1.default(userData);
    return yield user.save();
});
exports.createUser = createUser;
/**
 * Find a user by email
 * @param {string} email - User email
 * @returns {Promise<IUser | null>} - User or null if not found
 */
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.findOne({ email });
});
exports.findUserByEmail = findUserByEmail;
