"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const transactionRoute_1 = __importDefault(require("./routes/transactionRoute"));
const cronRoutes_1 = __importDefault(require("./routes/cronRoutes"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, dbConfig_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3030;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Authorization routes
app.use("/api/v1", authRoutes_1.default);
//transaction routes
app.use("/api/v1/transaction", transactionRoute_1.default);
app.use("/api/v1/program", cronRoutes_1.default);
// REST  API for root testing
app.get("/", (req, res) => {
    res.send("This is flagright assignment");
});
// Start server
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
