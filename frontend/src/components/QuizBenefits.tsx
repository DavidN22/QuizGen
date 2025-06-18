import { motion } from 'framer-motion';
import { BookOpen, Clock, ThumbsUp } from 'lucide-react';

const QuizBenefits = () => (
  <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
    className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full px-4"
  >
    {[
      {
        icon: <BookOpen className="w-6 h-6 text-purple-600" />,
        title: 'Study Smarter',
        desc: 'Generate questions based on any topic!'
      },
      {
        icon: <Clock className="w-6 h-6 text-purple-600" />,
        title: 'Save Time',
        desc: 'No need to write questions — get full quizzes in seconds.'
      },
      {
        icon: <ThumbsUp className="w-6 h-6 text-purple-600" />,
        title: 'Instant Feedback',
        desc: 'Automatic grading and feedback!'
      }
    ].map(({ icon, title, desc }, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl shadow border border-gray-200 p-6 flex flex-col items-start space-y-3"
      >
        <div>{icon}</div>
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    ))}
  </motion.div>
);

export default QuizBenefits;
