import { MapPin, Clock, Accessibility } from 'lucide-react';

interface ActivityCardProps {
  image: string;
  title: string;
  summary: string;
  distance: string;
  time: string;
  originalPrice?: number;
  discountedPrice?: number;
  isLastMinuteDeal?: boolean;
  isAccessible?: boolean;
  onClick?: () => void;
}

export function ActivityCard({
  image,
  title,
  summary,
  distance,
  time,
  originalPrice,
  discountedPrice,
  isLastMinuteDeal,
  isAccessible,
  onClick
}: ActivityCardProps) {
  const isFree = discountedPrice === 0 && !originalPrice;
  const hasDiscount = originalPrice && discountedPrice && originalPrice > discountedPrice;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm p-3 flex gap-3 cursor-pointer hover:shadow-md transition-shadow"
    >
      <img
        src={image}
        alt={title}
        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
            {title}
          </h3>
          {isAccessible && (
            <Accessibility className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          )}
        </div>

        <p className="text-xs text-gray-500 line-clamp-1 mb-2">
          {summary}
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{distance}</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{time}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isFree ? (
            <span className="text-sm font-semibold text-gray-900">Free</span>
          ) : hasDiscount ? (
            <>
              <span className="text-xs text-gray-400 line-through">${originalPrice}</span>
              <span className="text-sm font-semibold text-green-600">${discountedPrice}</span>
            </>
          ) : (
            <span className="text-sm font-semibold text-gray-900">${discountedPrice || originalPrice}</span>
          )}

          {isLastMinuteDeal && (
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs">
              Last-minute deal
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
