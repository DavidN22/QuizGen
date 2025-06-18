import { useState } from 'react';
import { gradeQuiz } from '../util/api';
import QuizQuestions from './QuizQuestions';
import QuizResults from './QuizResults';
import { motion } from 'framer-motion';
import { ClipboardCheck, Loader2 } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface QuizData {
  quizId: string;
  questions: Question[];
}

interface FeedbackItem {
  id: number;
  yourAnswer: string;
  correctAnswer: string;
  questions: string;
}

interface GradeResponse {
  correct: number;
  total: number;
  feedback: FeedbackItem[];
}

interface QuizTakerProps {
  quiz: QuizData;
  onReset: () => void;
}

function QuizTaker({ quiz, onReset }: QuizTakerProps) {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (qid: number, option: string) => {
    setAnswers((a) => ({ ...a, [qid]: option }));
  };

  const handleSubmit = async () => {
    setGrading(true);
    setError(null);
    try {
      const data = await gradeQuiz(quiz.quizId, answers);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setGrading(false);
    }
  };

  if (result) {
    return <QuizResults result={result} quizData = {quiz} onReset={onReset} />;
  }

  const isReady = Object.keys(answers).length === quiz.questions.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white rounded-3xl border border-gray-200 shadow-xl px-8 py-10 w-full max-w-3xl"
    >
      <div className="flex items-center gap-3 text-purple-700 mb-6">
        <ClipboardCheck className="w-6 h-6" />
        <h2 className="text-2xl font-bold tracking-tight">Take the Quiz</h2>
      </div>

      <QuizQuestions
        questions={quiz.questions}
        answers={answers}
        grading={grading}
        onChange={handleChange}
      />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="mt-8 w-full px-6 py-3 bg-green-600 text-white text-sm font-semibold rounded-xl shadow hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        onClick={handleSubmit}
        disabled={grading || !isReady}
      >
        {grading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Grading...
          </>
        ) : (
          <>
            Submit Quiz
          </>
        )}
      </motion.button>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm text-center"
        >
          {error}
        </motion.div>
      )}
    </motion.div>
  );
}

export default QuizTaker;
