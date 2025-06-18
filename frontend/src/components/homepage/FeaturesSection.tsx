import { motion } from 'framer-motion';
import { Bot, FileText, Star } from 'lucide-react';

const FeaturesSection = () => (
  <motion.section
    id="features"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    viewport={{ once: true }}
    className="py-24 px-6 bg-gradient-to-br from-white via-purple-50 to-gray-100 text-gray-900 rounded-3xl shadow-lg mx-6 my-20 border border-gray-200"
  >
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="text-4xl font-bold text-center mb-16 text-purple-800 tracking-tight"
    >
      Simple. Smart. Instant.
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {/* Feature 1 */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center text-center border border-gray-200"
      >
        <div className="mb-4 bg-purple-50 text-purple-700 rounded-full w-16 h-16 flex items-center justify-center">
          <Bot className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">AI-Generated Exams</h3>
        <p className="text-gray-500 text-base leading-relaxed">
          Just enter a topic — our AI creates a fresh multiple-choice quiz instantly.
        </p>
      </motion.div>

      {/* Feature 2 */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center text-center border border-gray-200"
      >
        <div className="mb-4 bg-purple-50 text-purple-700 rounded-full w-16 h-16 flex items-center justify-center">
          <FileText className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">No Setup Needed</h3>
        <p className="text-gray-500 text-base leading-relaxed">
          No forms, no configs — just type a topic and get testing. It’s that fast.
        </p>
      </motion.div>

      {/* Feature 3 */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center text-center border border-gray-200"
      >
        <div className="mb-4 bg-purple-50 text-purple-700 rounded-full w-16 h-16 flex items-center justify-center">
          <Star className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Instant Results</h3>
        <p className="text-gray-500 text-base leading-relaxed">
          Submit your answers and see your score immediately — no waiting or guessing.
        </p>
      </motion.div>
    </div>
  </motion.section>
);

export default FeaturesSection;
