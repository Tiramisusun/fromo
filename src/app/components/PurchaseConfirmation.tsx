import { X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PurchaseConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  price: number;
  onConfirm: () => void;
}

export function PurchaseConfirmation({
  isOpen,
  onClose,
  eventName,
  price,
  onConfirm
}: PurchaseConfirmationProps) {
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

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[340px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Confirm Purchase</h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-6">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">
                  You're about to purchase a ticket for:
                </p>
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">{eventName}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ticket Price</span>
                    <span className="font-semibold text-teal-600">
                      {price === 0 ? 'Free' : `$${price}`}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  * This is a demo. No actual payment will be processed.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 px-4 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
