import { motion } from 'framer-motion';
import { Keyboard, Sparkles, CheckCircle } from 'lucide-react';

const HowItWorksSection = () => (
  <motion.section
    id="how-it-works"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    viewport={{ once: true }}
    className="py-24 px-6 bg-gradient-to-br from-white via-purple-50 to-gray-100 text-gray-900 rounded-3xl shadow-lg mx-6 my-20 border border-gray-200"
  >
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="text-4xl font-bold text-center mb-20 text-purple-800 tracking-tight flex items-center justify-center gap-2"
    >
      <Sparkles className="w-6 h-6 text-purple-500" />
      How It Works
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center">
      {/* Step 1 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col items-center px-6"
      >
        <div className="mb-4 bg-purple-100 text-purple-700 p-3 rounded-full shadow-sm">
          <Keyboard className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Type a Topic</h3>
        <p className="text-base text-gray-500 leading-relaxed">
          Enter any subject or concept — from cloud computing to coffee history — no dropdowns, just your curiosity.
        </p>
      </motion.div>

      {/* Step 2 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col items-center px-6"
      >
        <div className="mb-4 bg-purple-100 text-purple-700 p-3 rounded-full shadow-sm">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">AI Builds Your Quiz</h3>
        <p className="text-base text-gray-500 leading-relaxed">
          Instantly generate a tailored quiz with questions and options — no templates, no waiting.
        </p>
      </motion.div>

      {/* Step 3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-col items-center px-6"
      >
        <div className="mb-4 bg-purple-100 text-purple-700 p-3 rounded-full shadow-sm">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Take It & Get Results</h3>
        <p className="text-base text-gray-500 leading-relaxed">
          Answer the quiz, submit, and get instant feedback with your score and breakdown of answers.
        </p>
      </motion.div>
    </div>
  </motion.section>
);

export default HowItWorksSection;
