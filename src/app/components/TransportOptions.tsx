import { ArrowLeft, MapPin, Navigation, Bus, Footprints, Bike, Car, ArrowDown, AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import { useState, useMemo } from 'react';

type TransportMode = 'bus' | 'walk' | 'bike' | 'rideshare';

type TrafficStatus = 'clear' | 'moderate' | 'heavy';

interface Route {
  name: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  cost: number;
  transfers?: string;
  trafficStatus?: TrafficStatus;
  extraTime?: number; // Extra minutes due to traffic
}

interface TransportOptionsProps {
  eventName: string;
  destination: string;
  ticketPrice: number;
  destinationLat?: number;
  destinationLng?: number;
  onBack: () => void;
}

const routeData: Record<TransportMode, Route[]> = {
  bus: [
    {
      name: 'Route 42A',
      departTime: '7:14 PM',
      arriveTime: '7:36 PM',
      duration: '22 min',
      cost: 2.50,
      transfers: '1 transfer',
      trafficStatus: 'clear'
    },
    {
      name: 'Route 15',
      departTime: '7:20 PM',
      arriveTime: '7:48 PM',
      duration: '28 min',
      cost: 2.50,
      transfers: 'Direct',
      trafficStatus: 'moderate',
      extraTime: 3
    },
    {
      name: 'Route 42A',
      departTime: '7:44 PM',
      arriveTime: '8:06 PM',
      duration: '22 min',
      cost: 2.50,
      transfers: '1 transfer',
      trafficStatus: 'clear'
    }
  ],
  walk: [
    {
      name: 'Via 3rd Street',
      departTime: 'Anytime',
      arriveTime: '7:36 PM',
      duration: '18 min',
      cost: 0,
      transfers: 'Direct route',
      trafficStatus: 'clear'
    },
    {
      name: 'Via Campus Path',
      departTime: 'Anytime',
      arriveTime: '7:38 PM',
      duration: '20 min',
      cost: 0,
      transfers: 'Scenic route',
      trafficStatus: 'clear'
    }
  ],
  bike: [
    {
      name: 'Via Bike Lane',
      departTime: 'Anytime',
      arriveTime: '7:25 PM',
      duration: '7 min',
      cost: 0,
      transfers: 'Protected bike lane',
      trafficStatus: 'clear'
    },
    {
      name: 'Via Campus Route',
      departTime: 'Anytime',
      arriveTime: '7:27 PM',
      duration: '9 min',
      cost: 0,
      transfers: 'Less traffic',
      trafficStatus: 'clear'
    }
  ],
  rideshare: [
    {
      name: 'Uber X',
      departTime: '3 min wait',
      arriveTime: '7:26 PM',
      duration: '8 min',
      cost: 12.00,
      transfers: 'Door to door',
      trafficStatus: 'moderate',
      extraTime: 2
    },
    {
      name: 'Lyft',
      departTime: '5 min wait',
      arriveTime: '7:28 PM',
      duration: '8 min',
      cost: 11.50,
      transfers: 'Door to door',
      trafficStatus: 'heavy',
      extraTime: 5
    },
    {
      name: 'Uber Pool',
      departTime: '7 min wait',
      arriveTime: '7:32 PM',
      duration: '12 min',
      cost: 6.50,
      transfers: 'Shared ride',
      trafficStatus: 'moderate',
      extraTime: 3
    }
  ]
};

export function TransportOptions({
  eventName,
  destination,
  ticketPrice,
  destinationLat,
  destinationLng,
  onBack
}: TransportOptionsProps) {
  const [selectedMode, setSelectedMode] = useState<TransportMode>('bus');

  // Event starts at 7:00 PM (example - in real app, this would come from props)
  const eventStartTime = '7:00 PM';

  const getTrafficStatusInfo = (status: TrafficStatus) => {
    switch (status) {
      case 'clear':
        return { color: 'text-green-600', bg: 'bg-green-50', label: 'Clear', dotColor: 'bg-green-500' };
      case 'moderate':
        return { color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Moderate', dotColor: 'bg-yellow-500' };
      case 'heavy':
        return { color: 'text-red-600', bg: 'bg-red-50', label: 'Heavy traffic', dotColor: 'bg-red-500' };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-50', label: 'Unknown', dotColor: 'bg-gray-500' };
    }
  };

  const calculateSuggestedDeparture = (duration: string, extraTime?: number) => {
    // Parse duration (e.g., "22 min" -> 22)
    const minutes = parseInt(duration);
    const totalMinutes = minutes + (extraTime || 0) + 5; // Add 5 min buffer

    // Calculate departure time (simplified - assumes event at 7:00 PM)
    // In real app, parse eventStartTime and calculate properly
    const departureMinutes = 60 - totalMinutes; // 7:00 PM - travel time
    const hour = departureMinutes < 0 ? 5 : 6;
    const min = departureMinutes < 0 ? 60 + departureMinutes : departureMinutes;

    return `${hour}:${min.toString().padStart(2, '0')} PM`;
  };

  // Find the best route (fastest with clear traffic)
  const routes = routeData[selectedMode];
  const bestRouteIndex = useMemo(() => {
    let bestIdx = 0;
    let bestScore = Infinity;

    routes.forEach((route, idx) => {
      const baseMinutes = parseInt(route.duration);
      const extraMinutes = route.extraTime || 0;
      const trafficPenalty = route.trafficStatus === 'heavy' ? 10 : route.trafficStatus === 'moderate' ? 5 : 0;
      const score = baseMinutes + extraMinutes + trafficPenalty;

      if (score < bestScore) {
        bestScore = score;
        bestIdx = idx;
      }
    });

    return bestIdx;
  }, [selectedMode, routes]);

  const handleRouteClick = (route: Route, mode: TransportMode) => {
    // Build Google Maps URL with specific travel mode
    let travelMode = 'driving';
    if (mode === 'bus') travelMode = 'transit';
    if (mode === 'walk') travelMode = 'walking';
    if (mode === 'bike') travelMode = 'bicycling';

    const mapsUrl = destinationLat && destinationLng
      ? `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}&travelmode=${travelMode}`
      : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=${travelMode}`;

    window.open(mapsUrl, '_blank');
  };

  const modes: { id: TransportMode; label: string; icon: typeof Bus }[] = [
    { id: 'bus', label: 'Bus', icon: Bus },
    { id: 'walk', label: 'Walk', icon: Footprints },
    { id: 'bike', label: 'Bike', icon: Bike },
    { id: 'rideshare', label: 'Rideshare', icon: Car }
  ];

  const routes = routeData[selectedMode];
  const cheapestCost = Math.min(...routes.map(r => r.cost));
  const showWarning = cheapestCost > ticketPrice;
  const totalCost = cheapestCost + ticketPrice;

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="font-semibold text-gray-900">Getting There</h2>
        </div>
        <p className="text-sm text-gray-500 ml-9">{eventName}</p>
      </div>

      {/* Origin/Destination */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex flex-col items-center gap-1 pt-1">
            <MapPin className="w-4 h-4 text-teal-500 fill-teal-500" />
            <div className="w-0.5 h-4 bg-gray-300" />
            <Navigation className="w-4 h-4 text-orange-500 fill-orange-500" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <div className="text-sm text-gray-500">From</div>
              <div className="font-medium text-gray-900">My Location</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">To</div>
              <div className="font-medium text-gray-900">{destination}</div>
            </div>
          </div>
        </div>

        {/* Event Time Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <div className="text-sm text-blue-900">
            <span className="font-medium">Event starts at {eventStartTime}</span>
            <span className="text-blue-700 ml-1">• Suggested times include 5 min buffer</span>
          </div>
        </div>
      </div>

      {/* Transport Mode Tabs */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {modes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedMode(id)}
              className={`
                flex flex-col items-center gap-1.5 py-3 px-2 border-b-2 transition-colors whitespace-nowrap
                ${selectedMode === id
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Route Results */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Cost Warning */}
        {showWarning && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <span className="font-medium">Your travel cost (~${cheapestCost.toFixed(2)}) is higher than the ticket price (${ticketPrice.toFixed(2)}).</span>
              {' '}Total estimated spend: ~${totalCost.toFixed(2)}
            </div>
          </div>
        )}

        {/* Route Cards */}
        {routes.map((route, index) => {
          const isBestRoute = index === bestRouteIndex;
          const trafficInfo = getTrafficStatusInfo(route.trafficStatus || 'clear');
          const suggestedDeparture = calculateSuggestedDeparture(route.duration, route.extraTime);

          return (
            <button
              key={index}
              onClick={() => handleRouteClick(route, selectedMode)}
              className={`bg-white rounded-xl p-4 shadow-sm border transition-all cursor-pointer w-full text-left ${
                isBestRoute
                  ? 'border-teal-500 ring-2 ring-teal-100'
                  : 'border-gray-100 hover:border-teal-500 hover:shadow-md'
              }`}
            >
              {/* Best Route Badge */}
              {isBestRoute && (
                <div className="flex items-center gap-1.5 mb-2">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">
                    Best Time to Leave
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{route.name}</h3>
                  {route.transfers && (
                    <span className="text-xs text-gray-500">{route.transfers}</span>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {route.cost === 0 ? 'Free' : `$${route.cost.toFixed(2)}`}
                  </div>
                  <div className="text-xs text-gray-500">{route.duration}</div>
                </div>
              </div>

              {/* Traffic Status */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${trafficInfo.bg}`}>
                    <div className={`w-2 h-2 rounded-full ${trafficInfo.dotColor}`} />
                    <span className={`text-xs font-medium ${trafficInfo.color}`}>
                      {trafficInfo.label}
                    </span>
                  </div>
                  {route.extraTime && (
                    <span className="text-xs text-amber-600 font-medium">
                      +{route.extraTime} min delay
                    </span>
                  )}
                </div>
              </div>

              {/* Suggested Departure */}
              <div className={`flex items-center gap-2 p-2 rounded-lg mb-3 ${
                isBestRoute ? 'bg-teal-50' : 'bg-gray-50'
              }`}>
                <Clock className={`w-4 h-4 ${isBestRoute ? 'text-teal-600' : 'text-gray-600'}`} />
                <div className="flex-1">
                  <div className="text-xs text-gray-500">Leave by</div>
                  <div className={`text-sm font-semibold ${isBestRoute ? 'text-teal-700' : 'text-gray-900'}`}>
                    {suggestedDeparture}
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  to arrive on time
                </div>
              </div>

              {/* Departure and Arrival Times */}
              <div className="flex items-center gap-3 text-sm mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Departs</span>
                  <span className="font-medium text-gray-900">{route.departTime}</span>
                </div>
                <ArrowDown className="w-3 h-3 text-gray-400 rotate-[-90deg]" />
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Arrives</span>
                  <span className="font-medium text-gray-900">{route.arriveTime}</span>
                </div>
              </div>

              {/* View on Map CTA */}
              <div className="flex items-center justify-center gap-2 text-sm text-teal-600 font-medium">
                <Navigation className="w-4 h-4" />
                <span>View on Map</span>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
}
