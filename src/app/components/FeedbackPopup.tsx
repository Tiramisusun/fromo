import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface FeedbackPopupProps {
  isOpen: boolean;
  featureName: string;
  onClose: () => void;
}

export function FeedbackPopup({ isOpen, featureName, onClose }: FeedbackPopupProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFeedback = (positive: boolean) => {
    setShowConfirmation(true);
    setTimeout(() => {
      onClose();
      setTimeout(() => setShowConfirmation(false), 300);
    }, 1500);
  };

  const handleSkip = () => {
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setShowConfirmation(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dimmed Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSkip}
            className="fixed inset-0 bg-black/20 z-40"
          />

          {/* Feedback Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[340px]"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <AnimatePresence mode="wait">
                {!showConfirmation ? (
                  <motion.div
                    key="feedback"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">
                      How was this experience?
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                      {featureName}
                    </p>

                    <div className="flex items-center justify-center gap-4 mb-4">
                      <button
                        onClick={() => handleFeedback(true)}
                        className="w-16 h-16 bg-gray-50 hover:bg-teal-50 border-2 border-gray-200 hover:border-teal-400 rounded-2xl flex items-center justify-center text-4xl transition-all hover:scale-105 active:scale-95"
                      >
                        👍
                      </button>
                      <button
                        onClick={() => handleFeedback(false)}
                        className="w-16 h-16 bg-gray-50 hover:bg-red-50 border-2 border-gray-200 hover:border-red-400 rounded-2xl flex items-center justify-center text-4xl transition-all hover:scale-105 active:scale-95"
                      >
                        👎
                      </button>
                    </div>

                    <button
                      onClick={handleSkip}
                      className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      Skip
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-4"
                  >
                    <div className="text-5xl mb-3">✨</div>
                    <p className="font-semibold text-gray-900">
                      Thanks for your feedback!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
