import { CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PurchaseSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
}

export function PurchaseSuccess({ isOpen, onClose, eventName }: PurchaseSuccessProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Success Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[340px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Content */}
            <div className="px-5 py-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>

              <h3 className="font-semibold text-gray-900 mb-2">Ticket Purchased!</h3>
              <p className="text-sm text-gray-600 mb-6">
                Your ticket for <span className="font-medium text-gray-900">{eventName}</span> has been confirmed.
              </p>

              <button
                onClick={onClose}
                className="w-full px-4 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors"
              >
                View My Tickets
              </button>

              <p className="text-xs text-gray-400 mt-4">
                Check your email for confirmation details
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
