"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeQuiz = exports.generateQuiz = void 0;
const axios_1 = __importDefault(require("axios"));
const Quiz_1 = __importDefault(require("../models/Quiz"));
const generateQuiz = async (req, res, next) => {
    try {
        const { topic } = req.query;
        if (!topic || typeof topic !== 'string') {
            res.status(400).json({ error: 'Missing or invalid topic' });
            return;
        }
        // Use different URL based on environment
        const quizGenUrl = process.env.NODE_ENV === 'production'
            ? 'https://quiz-gen-phi.vercel.app/generate-quiz'
            : 'http://localhost:5000/generate-quiz';
        const response = await axios_1.default.post(quizGenUrl, { topic });
        const { questions } = response.data;
        // Save quiz to MongoDB
        const quizDoc = new Quiz_1.default({ questions });
        await quizDoc.save();
        const quizId = quizDoc._id.toString();
        // Remove correctAnswer before sending to frontend
        const frontendQuestions = questions.map((q) => ({
            id: q.id,
            text: q.text,
            options: q.options,
        }));
        res.json({ quizId, questions: frontendQuestions });
    }
    catch (error) {
        next(error);
    }
};
exports.generateQuiz = generateQuiz;
const gradeQuiz = async (req, res, next) => {
    try {
        const { quizId } = req.query;
        const { answers } = req.body;
        if (!quizId || typeof quizId !== 'string' || !answers || typeof answers !== 'object') {
            res.status(400).json({ error: 'Missing quizId or answers' });
            return;
        }
        // Fetch quiz from MongoDB
        const quiz = await Quiz_1.default.findById(quizId);
        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found' });
            return;
        }
        let correct = 0;
        const feedback = quiz.questions.map((q) => {
            const yourAnswer = answers[q.id];
            const correctAnswer = q.correctAnswer;
            if (yourAnswer === correctAnswer)
                correct++;
            return { id: q.id, yourAnswer, correctAnswer };
        });
        res.json({ correct, total: quiz.questions.length, feedback });
    }
    catch (error) {
        next(error);
    }
};
exports.gradeQuiz = gradeQuiz;
