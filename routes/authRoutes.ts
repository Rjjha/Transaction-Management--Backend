import express from "express";
import { register, login } from "../controller/authController";

const router = express.Router();


// POST : api/v/register
// {
//     "name":"Rajesh Jha",
//     "email":"rj848jha@gmail.com",
//     "password":"rajujha"
// }
router.post("/register", register);

// POST : api/v/login
// {
//     "email":"rj848jha@gmail.com",
//     "password":"rajujha"
// }
router.post("/login", login);


export default router;
