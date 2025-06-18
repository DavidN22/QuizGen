import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollText, Sparkles, ArrowRight } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const scrollTo = (id?: string) => {
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

const handleLogoClick = () => {
  if (isHome) {
    scrollTo();
  } else {
    navigate('/');
  }
};


  const handleMainButton = () => {
    navigate(isHome ? '/quiz' : '/');
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={handleLogoClick}
          className="flex items-center space-x-2 text-xl font-bold text-gray-900 tracking-tight cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span>QuizGen</span>
        </div>

        {/* Nav - Homepage only */}
        {isHome && (
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
            <button
              onClick={() => scrollTo('features')}
              className="flex items-center gap-1 hover:text-gray-900 transition"
            >
              <ScrollText className="w-4 h-4" />
              Features
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="flex items-center gap-1 hover:text-gray-900 transition"
            >
              <Sparkles className="w-4 h-4" />
              How It Works
            </button>
          </nav>
        )}

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMainButton}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-700 text-white rounded-xl shadow hover:bg-purple-800 transition text-sm font-medium"
        >
          {isHome ? 'Start Quiz' : 'Back to Home'}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
