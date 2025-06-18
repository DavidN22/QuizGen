import express from 'express';
import { generateQuiz, gradeQuiz } from '../controllers/quizController.js';

const router = express.Router();

// GET /generate?topic=...
router.get('/generate', generateQuiz);

// POST /grade?quizId=...
router.post('/grade', gradeQuiz);

export default router;
