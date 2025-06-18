import mongoose, { Schema } from 'mongoose';

export interface IQuizQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

const QuizQuestionSchema = new Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
});

const QuizSchema = new Schema({
  questions: { type: [QuizQuestionSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Quiz', QuizSchema);
