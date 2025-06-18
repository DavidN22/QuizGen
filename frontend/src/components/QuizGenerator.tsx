import { useState } from 'react';
import { generateQuiz } from '../util/api';
import { Brain, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface QuizData {
  quizId: string;
  questions: Question[];
}

interface QuizGeneratorProps {
  onQuizGenerated: (quiz: QuizData) => void;
}

const suggestions = ['JavaScript', 'AWS', 'History', 'React', 'Python'];

function QuizGenerator({ onQuizGenerated }: QuizGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateQuiz(topic);
      onQuizGenerated(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTopic(suggestion);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-xl bg-white rounded-3xl border border-gray-200 shadow-xl px-8 py-10 flex flex-col items-center space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3 text-purple-700"
      >
        <Sparkles className="w-6 h-6" />
        <h2 className="text-2xl font-bold tracking-tight">Create Your Quiz</h2>
      </motion.div>

      <p className="text-gray-500 text-center text-sm">
        Just type a topic and we’ll generate a quiz using AI magic.
      </p>

      {/* Suggestions */}
      <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map((s, i) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={i}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => handleSuggestionClick(s)}
          >
            {s}
          </motion.button>
        ))}
      </div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full"
      >
        <input
          className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 px-4 py-3 text-base shadow-sm transition outline-none disabled:opacity-50"
          type="text"
          placeholder="Enter a topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={loading}
        />
      </motion.div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleGenerate}
        disabled={loading || !topic.trim()}
        className="w-full px-6 py-3 bg-purple-700 text-white text-sm font-semibold rounded-xl shadow hover:bg-purple-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" />
            Generating...
          </>
        ) : (
          <>
            <Brain className="w-4 h-4" />
            Generate Quiz
          </>
        )}
      </motion.button>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-red-50 border border-red-200 text-red-700 text-sm text-center rounded-xl px-4 py-2"
        >
          {error}
        </motion.div>
      )}
    </motion.div>
  );
}

export default QuizGenerator;
