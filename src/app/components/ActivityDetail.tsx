import { ArrowLeft, Bookmark, Clock, Sparkles, Accessibility, AlertCircle, Bus, Footprints, Car, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { PurchaseConfirmation } from './PurchaseConfirmation';
import { PurchaseSuccess } from './PurchaseSuccess';

interface TransportOption {
  mode: 'transit' | 'walk' | 'rideshare';
  label: string;
  time: string;
  cost: number;
}

interface ActivityDetailProps {
  image: string;
  title: string;
  category: string;
  originalPrice?: number;
  discountedPrice: number;
  discountPercent?: number;
  offerEndsIn?: string;
  aiSummary: string;
  isAccessible: boolean;
  accessibilityConfirmed: boolean;
  transportOptions: TransportOption[];
  destination: string;
  onBack: () => void;
  onGetDirections: () => void;
}

export function ActivityDetail({
  image,
  title,
  category,
  originalPrice,
  discountedPrice,
  discountPercent,
  offerEndsIn,
  aiSummary,
  isAccessible,
  accessibilityConfirmed,
  transportOptions,
  destination,
  onBack,
  onGetDirections
}: ActivityDetailProps) {
  const [showPurchaseConfirm, setShowPurchaseConfirm] = useState(false);
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);

  const hasDiscount = originalPrice && discountedPrice < originalPrice;

  const cheapestTransport = Math.min(...transportOptions.map(t => t.cost));
  const totalCost = discountedPrice + cheapestTransport;
  const showTransportWarning = cheapestTransport > discountedPrice;

  const handlePurchaseClick = () => {
    setShowPurchaseConfirm(true);
  };

  const handlePurchaseConfirm = () => {
    setShowPurchaseConfirm(false);
    setShowPurchaseSuccess(true);
  };

  const handlePurchaseSuccessClose = () => {
    setShowPurchaseSuccess(false);
    onBack();
  };

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'transit':
        return Bus;
      case 'walk':
        return Footprints;
      case 'rideshare':
        return Car;
      default:
        return Bus;
    }
  };

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Hero Image with Overlay Controls */}
      <div className="relative w-full aspect-video flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />

        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <button className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors">
          <Bookmark className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-5 space-y-6">
          {/* Title & Category */}
          <div>
            <h1 className="mb-2 text-gray-900">{title}</h1>
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
              {category}
            </span>
          </div>

          {/* Price & Discount */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              {discountedPrice === 0 ? (
                <span className="font-semibold text-gray-900">Free</span>
              ) : (
                <>
                  <span className="font-semibold text-green-600">${discountedPrice}</span>
                  {hasDiscount && (
                    <>
                      <span className="text-gray-400 line-through">${originalPrice}</span>
                      {discountPercent && (
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium">
                          {discountPercent}% off
                        </span>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            {offerEndsIn && (
              <div className="flex items-center gap-1.5 text-amber-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Offer ends in {offerEndsIn}</span>
              </div>
            )}
          </div>

          {/* AI Summary */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-gray-500 uppercase tracking-wide">AI Summary</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {aiSummary}
            </p>
          </div>

          {/* Accessibility */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2">
              {accessibilityConfirmed && isAccessible ? (
                <>
                  <Accessibility className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    Venue is wheelchair accessible
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Accessibility info not confirmed
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Getting There */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-900">Getting There</h3>
              <button
                onClick={onGetDirections}
                className="text-sm text-teal-600 font-medium hover:text-teal-700"
              >
                See all options →
              </button>
            </div>
            <div className="space-y-2">
              {transportOptions.slice(0, 2).map((option, index) => {
                const Icon = getTransportIcon(option.mode);
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.time}</div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-900">
                      {option.cost === 0 ? 'Free' : `$${option.cost.toFixed(2)}`}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Transport Warning */}
            {showTransportWarning && (
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <span className="font-medium">Heads up:</span> travel (~${cheapestTransport.toFixed(2)}) costs more than the ticket. Total ~${totalCost.toFixed(2)}
                </div>
              </div>
            )}
          </div>

          {/* Bottom padding for sticky button */}
          <div className="h-20" />
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="border-t border-gray-200 bg-white px-5 py-4">
        <button
          onClick={handlePurchaseClick}
          className="w-full bg-teal-500 text-white py-3.5 rounded-xl font-semibold hover:bg-teal-600 transition-colors"
        >
          Get Tickets
        </button>
      </div>

      {/* Purchase Dialogs */}
      <PurchaseConfirmation
        isOpen={showPurchaseConfirm}
        onClose={() => setShowPurchaseConfirm(false)}
        eventName={title}
        price={discountedPrice}
        onConfirm={handlePurchaseConfirm}
      />
      <PurchaseSuccess
        isOpen={showPurchaseSuccess}
        onClose={handlePurchaseSuccessClose}
        eventName={title}
      />
    </div>
  );
}
