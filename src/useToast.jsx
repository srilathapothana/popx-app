import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'default') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const ToastComponent = (
    <AnimatePresence>
      {toast && (
        <motion.div
          className={`toast ${toast.type}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
        >
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return { showToast, ToastComponent };
}
