import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from './PageTransition';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="screen landing">
        <div className="landing__content">
          <motion.div
            className="landing__logo"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 4L24 9.5V18.5L14 24L4 18.5V9.5L14 4Z" fill="white" fillOpacity="0.9"/>
              <circle cx="14" cy="14" r="4" fill="white"/>
            </svg>
          </motion.div>

          <motion.h1
            className="landing__title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            Welcome to PopX
          </motion.h1>

          <motion.p
            className="landing__subtitle"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
          >
            Lorem ipsum dolor sit amet,<br />
            consectetur adipiscing elit.
          </motion.p>

          <motion.div
            className="landing__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
          >
            <button className="btn-primary" onClick={() => navigate('/signup')}>
              Create Account
            </button>
            <button className="btn-secondary" onClick={() => navigate('/login')}>
              Already Registered? Login
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
