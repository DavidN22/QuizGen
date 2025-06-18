import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CallToActionSection = () => {
  const navigate = useNavigate();
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="relative py-20 px-6 w-full flex flex-col items-center justify-center bg-gradient-to-br from-white via-purple-50 to-gray-50 rounded-2xl shadow-md mx-auto my-20 border border-gray-200"
      style={{ maxWidth: 700 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-3xl md:text-4xl font-semibold text-purple-800 text-center mb-4 tracking-tight"
      >
        Ready to get started?
      </motion.h2>

      <p className="text-lg md:text-xl text-gray-600 text-center mb-10 max-w-xl">
        Create your first quiz in seconds. No sign up required. Professional, fast, and distraction-free.
      </p>

      <motion.button
        type="button"
        onClick={() => navigate('/quiz')}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 px-8 py-3 bg-purple-700 text-white font-medium rounded-xl shadow-md hover:bg-purple-800 transition text-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
      >
        Start Now
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.section>
  );
};

export default CallToActionSection;
