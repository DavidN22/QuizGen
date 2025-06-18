import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface QuizQuestionsProps {
  questions: Question[];
  answers: { [key: number]: string };
  grading: boolean;
  onChange: (qid: number, letter: string) => void;
}

function getOptionLetter(idx: number) {
  return String.fromCharCode(65 + idx);
}

function QuizQuestions({ questions, answers, grading, onChange }: QuizQuestionsProps) {
  return (
    <div className="w-full space-y-6">
      {questions.map((q, qIdx) => (
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: qIdx * 0.05 }}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm"
        >
          <div className="font-semibold text-gray-800 mb-4 flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
            <span>{q.text}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt, idx) => {
              const letter = getOptionLetter(idx);
              const selected = answers[q.id] === letter;
              return (
                <label
                  key={opt}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm cursor-pointer transition
                    ${selected ? 'bg-purple-50 border-purple-300 text-purple-800' : 'bg-white hover:bg-gray-100 border-gray-200'}`}
                >
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={letter}
                    checked={selected}
                    onChange={() => onChange(q.id, letter)}
                    disabled={grading}
                    className="accent-purple-600"
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default QuizQuestions;
