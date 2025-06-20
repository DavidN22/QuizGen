import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import Quiz from '../models/Quiz';

// Generates a quiz based on a topic and saves it to the database
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

    // Choose quiz generator URL based on environment
    const quizGenUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://quiz-gen-phi.vercel.app/generate-quiz'
        : 'http://localhost:5000/generate-quiz';

    // Request quiz questions from external service
    const response = await axios.post(quizGenUrl, { topic });
    const rawQuestions = response.data.questions;

    // Define the type for a question
    type Question = {
      id: number;
      text: string;
      options: string[];
      correctAnswer: string;
    };

    // Format questions with id, text, options, and correct answer
    const questions: Question[] = rawQuestions.map(
      (q: any, index: number): Question => {
        const id = index + 1;
        // Ensures options are formatted as A, B, C, etc.
        const options = q.options.map((opt: string, i: number) => {
          const letter = String.fromCharCode(65 + i);
          return `${letter}. ${opt}`;
        });

        return {
          id,
          text: q.text,
          options,
          correctAnswer: q.correctAnswer,
        };
      }
    );

    // Save quiz to database
    const quizDoc = new Quiz({ questions });
    await quizDoc.save();
    const quizId = quizDoc._id.toString();

    // Strip correctAnswer before sending to frontend
    const frontendQuestions = questions.map(({ id, text, options }) => ({
      id,
      text,
      options,
    }));

    res.json({ quizId, questions: frontendQuestions });
  } catch (error:any) {
    next(error.response?.data || { message: 'Failed to generate quiz' });
  }
};

// Grades a quiz submission and returns feedback
export const gradeQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { quizId } = req.query;
    const { answers } = req.body;

    if (
      !quizId ||
      typeof quizId !== 'string' ||
      !answers ||
      typeof answers !== 'object'
    ) {
      res.status(400).json({ error: 'Missing quizId or answers' });
      return;
    }

    // Find quiz in database
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      res.status(404).json({ error: 'Quiz not found' });
      return;
    }

    let correct = 0;
    // Compare submitted answers to correct answers
    const feedback = quiz.questions.map((q: any) => {
      const yourAnswer = answers[q.id]; // e.g., "A"
      const correctAnswer = q.correctAnswer;
      if (yourAnswer === correctAnswer) correct++;
      return { id: q.id, yourAnswer, correctAnswer };
    });

    res.json({ correct, total: quiz.questions.length, feedback });
  } catch (error) {
    next(error);
  }
};
