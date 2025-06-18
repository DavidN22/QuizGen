import { motion } from 'framer-motion';
import { Sparkles, Sparkle } from 'lucide-react';

const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="relative flex flex-col md:flex-row items-center justify-between py-28 px-8 bg-gradient-to-br from-white via-purple-50 to-gray-100 rounded-3xl shadow-xl mx-6 my-20 gap-20 border border-gray-200 overflow-hidden"
      style={{ minHeight: 500 }}
    >
      {/* Accent Glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl z-0"
      />

      {/* Left - Text */}
      <div className="flex-1 flex flex-col items-start justify-center space-y-6 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-purple-800 leading-tight tracking-tight flex items-center gap-3"
        >
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <Sparkles className="w-7 h-7 text-purple-500" />
          </motion.span>
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Build Quizzes in Seconds
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl"
        >
          Generate intelligent quizzes with AI. Whether you're studying or training a team—our tools make it fast, customizable, and efficient.
        </motion.p>

        <motion.a
          href="#features"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-3 bg-purple-700 text-white text-lg font-medium rounded-xl shadow-md hover:bg-purple-800 transition focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          Explore Features
        </motion.a>
      </div>

      {/* Right - Stylized Illustration */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
        className="flex-1 flex items-center justify-center z-10"
      >
        <div className="relative w-full max-w-sm p-6 rounded-2xl bg-white border border-gray-200 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm">
            <Sparkle className="w-5 h-5" />
            AI Generated Quiz
          </div>

          <div className="space-y-3">
            <div className="h-4 w-3/4 bg-gradient-to-r from-purple-200 to-purple-100 rounded" />
            <div className="h-3 w-full bg-gray-100 rounded" />
            <div className="h-3 w-11/12 bg-gray-100 rounded" />
            <div className="h-3 w-2/3 bg-gray-100 rounded" />
            <div className="h-3 w-1/2 bg-gray-100 rounded" />
          </div>

          <div className="mt-6 flex gap-2">
            <div className="h-8 w-1/2 bg-purple-600/90 text-white text-sm font-medium rounded-xl shadow-inner flex items-center justify-center">
              Option A
            </div>
            <div className="h-8 w-1/2 bg-purple-600/70 text-white text-sm font-medium rounded-xl shadow-inner flex items-center justify-center">
              Option B
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
