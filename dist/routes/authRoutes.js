"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const router = express_1.default.Router();
// POST : api/v/register
// {
//     "name":"Rajesh Jha",
//     "email":"rj848jha@gmail.com",
//     "password":"rajujha"
// }
router.post("/register", authController_1.register);
// POST : api/v/login
// {
//     "email":"rj848jha@gmail.com",
//     "password":"rajujha"
// }
router.post("/login", authController_1.login);
exports.default = router;
