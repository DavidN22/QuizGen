"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const quizRoutes_js_1 = __importDefault(require("./routes/quizRoutes.js"));
const db_mongoose_js_1 = require("./db.mongoose.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, db_mongoose_js_1.connectDB)();
// Routes
app.use("/", quizRoutes_js_1.default);
app.get("/api", (req, res) => {
    res.json({ server: "Hello, this is your Express server!" });
});
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const messages = err.message || err.error || "An unexpected error occurred.";
    res.status(status).json({ error: messages });
});
// Start the server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
