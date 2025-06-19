"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quizController_js_1 = require("../controllers/quizController.js");
const router = express_1.default.Router();
// GET /generate?topic=...
router.get('/generate', quizController_js_1.generateQuiz);
// POST /grade?quizId=...
router.post('/grade', quizController_js_1.gradeQuiz);
exports.default = router;
