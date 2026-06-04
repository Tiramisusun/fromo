import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Slider from '@radix-ui/react-slider';
import * as Switch from '@radix-ui/react-switch';

export interface FilterState {
  maxPrice: number;
  distance: string;
  interests: string[];
  accessibleOnly: boolean;
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
}

const interestOptions = ['Food', 'Music', 'Sports', 'Nightlife', 'Outdoors', 'Study', 'Sightseeing'];
const distanceOptions = ['0.5 km', '1 km', '2 km', '5 km+'];

export function FilterPanel({ isOpen, onClose, filters, onApply }: FilterPanelProps) {
  const [maxPrice, setMaxPrice] = useState([filters.maxPrice]);
  const [selectedDistance, setSelectedDistance] = useState(filters.distance);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(filters.interests);
  const [accessibleOnly, setAccessibleOnly] = useState(filters.accessibleOnly);

  useEffect(() => {
    setMaxPrice([filters.maxPrice]);
    setSelectedDistance(filters.distance);
    setSelectedInterests(filters.interests);
    setAccessibleOnly(filters.accessibleOnly);
  }, [filters]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      maxPrice: 50,
      distance: '2 km',
      interests: [],
      accessibleOnly: false
    };
    setMaxPrice([50]);
    setSelectedDistance('2 km');
    setSelectedInterests([]);
    setAccessibleOnly(false);
    onApply(resetFilters);
    onClose();
  };

  const handleApply = () => {
    onApply({
      maxPrice: maxPrice[0],
      distance: selectedDistance,
      interests: selectedInterests,
      accessibleOnly
    });
    onClose();
  };

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
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[80vh] flex flex-col"
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 py-3 border-b border-gray-200">
              <h2 className="text-center font-semibold text-gray-900">Filter</h2>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              {/* Budget Section */}
              <div>
                <label className="block mb-4 text-gray-900 font-medium">Max Price</label>
                <div className="relative pt-6">
                  <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={maxPrice}
                    onValueChange={setMaxPrice}
                    max={50}
                    step={1}
                  >
                    <Slider.Track className="bg-gray-200 relative grow rounded-full h-1.5">
                      <Slider.Range className="absolute bg-teal-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="block w-5 h-5 bg-white border-2 border-teal-500 rounded-full hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 relative"
                      aria-label="Price"
                    >
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-teal-500 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
                        ${maxPrice[0]}
                      </div>
                    </Slider.Thumb>
                  </Slider.Root>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>$0</span>
                  <span>$50</span>
                </div>
              </div>

              {/* Distance Section */}
              <div>
                <label className="block mb-3 text-gray-900 font-medium">Distance</label>
                <div className="grid grid-cols-4 gap-2">
                  {distanceOptions.map((distance) => (
                    <button
                      key={distance}
                      onClick={() => setSelectedDistance(distance)}
                      className={`
                        px-3 py-2 rounded-lg text-sm transition-colors
                        ${selectedDistance === distance
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                    >
                      {distance}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests Section */}
              <div>
                <label className="block mb-3 text-gray-900 font-medium">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`
                        px-4 py-2 rounded-full text-sm transition-colors
                        ${selectedInterests.includes(interest)
                          ? 'bg-teal-500 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                        }
                      `}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessibility Section */}
              <div className="flex items-center justify-between">
                <label className="text-gray-900 font-medium">Accessible venues only</label>
                <Switch.Root
                  checked={accessibleOnly}
                  onCheckedChange={setAccessibleOnly}
                  className="w-11 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-teal-500 transition-colors outline-none cursor-pointer"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-4 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
