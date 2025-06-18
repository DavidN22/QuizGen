import { motion } from 'framer-motion';
import { BadgeCheck, ArrowLeftCircle } from 'lucide-react';

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

interface QuizResultsProps {
     quizData: {
        quizId: string;
        questions: { id: number; text: string; options: string[] }[];
    };
  result: GradeResponse;
  onReset: () => void;
}

function QuizResults({ result, quizData, onReset }: QuizResultsProps ) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white rounded-3xl border border-gray-200 shadow-xl px-8 py-10 w-full max-w-3xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 text-green-700 mb-6">
        <BadgeCheck className="w-6 h-6" />
        <h2 className="text-2xl font-bold tracking-tight">Your Results</h2>
      </div>

      {/* Score */}
      <div className="text-lg mb-6 text-gray-700">
        You scored <span className="text-green-700 font-semibold">{result.correct} / {result.total}</span>
      </div>

      {/* Feedback */}
      <ul className="space-y-4 mb-8">
        {result.feedback.map((fb, idx) => {
          const isCorrect = fb.yourAnswer === fb.correctAnswer;

          // Get corresponding question
          const question = quizData.questions.find(q => q.id === fb.id);

          // Convert letter to index (e.g., "A" => 0)
          const letterToIndex = (letter: string) => letter.charCodeAt(0) - 65;
          const yourAnswerFull = question?.options[letterToIndex(fb.yourAnswer)] || fb.yourAnswer;
          const correctAnswerFull = question?.options[letterToIndex(fb.correctAnswer)] || fb.correctAnswer;

          return (
            <motion.li
              key={fb.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`border rounded-xl p-4 text-sm ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
            >
              <div className="mb-1 font-semibold text-gray-800">
                Q{fb.id}: {question?.text || 'Question text not found'}
              </div>
              <div>
                Your answer:{' '}
                <span className={isCorrect ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
                  {yourAnswerFull}
                </span>
              </div>
              {!isCorrect && (
                <div>
                  Correct answer:{' '}
                  <span className="text-green-700 font-medium">{correctAnswerFull}</span>
                </div>
              )}
            </motion.li>
          );
        })}
      </ul>

      {/* Reset Button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onReset}
        className="w-full px-6 py-3 bg-purple-700 text-white text-sm font-semibold rounded-xl shadow hover:bg-purple-800 transition flex items-center justify-center gap-2"
      >
        <ArrowLeftCircle className="w-4 h-4" />
        Try Another Quiz
      </motion.button>
    </motion.div>
  );
}

export default QuizResults;
