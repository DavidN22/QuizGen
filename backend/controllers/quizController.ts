import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import Quiz from '../models/Quiz';

export const generateQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { topic } = req.query;
    if (!topic || typeof topic !== 'string') {
      res.status(400).json({ error: 'Missing or invalid topic' });
      return;
    }

    const response = await axios.post('http://localhost:5000/generate-quiz', { topic });
    const { questions } = response.data;

    // Save quiz to MongoDB
    const quizDoc = new Quiz({ questions });
    await quizDoc.save();
    const quizId = quizDoc._id.toString();

    // Remove correctAnswer before sending to frontend
    const frontendQuestions = questions.map((q: any) => ({
      id: q.id,
      text: q.text,
      options: q.options,
    }));

    res.json({ quizId, questions: frontendQuestions });
  } catch (error) {
    next(error);
  }
};

export const gradeQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { quizId } = req.query;
    const { answers } = req.body;

    if (!quizId || typeof quizId !== 'string' || !answers || typeof answers !== 'object') {
      res.status(400).json({ error: 'Missing quizId or answers' });
      return;
    }

    // Fetch quiz from MongoDB
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      res.status(404).json({ error: 'Quiz not found' });
      return;
    }

    let correct = 0;
    const feedback = quiz.questions.map((q: any) => {
      const yourAnswer = answers[q.id];
      const correctAnswer = q.correctAnswer;
      if (yourAnswer === correctAnswer) correct++;
      return { id: q.id, yourAnswer, correctAnswer };
    });

    res.json({ correct, total: quiz.questions.length, feedback });
  } catch (error) {
    next(error);
  }
};
