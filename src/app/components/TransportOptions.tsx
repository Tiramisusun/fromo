import { ArrowLeft, MapPin, Navigation, Bus, Footprints, Bike, Car, ArrowDown, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

type TransportMode = 'bus' | 'walk' | 'bike' | 'rideshare';

interface Route {
  name: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  cost: number;
  transfers?: string;
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
      transfers: '1 transfer'
    },
    {
      name: 'Route 15',
      departTime: '7:20 PM',
      arriveTime: '7:48 PM',
      duration: '28 min',
      cost: 2.50,
      transfers: 'Direct'
    },
    {
      name: 'Route 42A',
      departTime: '7:44 PM',
      arriveTime: '8:06 PM',
      duration: '22 min',
      cost: 2.50,
      transfers: '1 transfer'
    }
  ],
  walk: [
    {
      name: 'Via 3rd Street',
      departTime: 'Anytime',
      arriveTime: '7:36 PM',
      duration: '18 min',
      cost: 0,
      transfers: 'Direct route'
    },
    {
      name: 'Via Campus Path',
      departTime: 'Anytime',
      arriveTime: '7:38 PM',
      duration: '20 min',
      cost: 0,
      transfers: 'Scenic route'
    }
  ],
  bike: [
    {
      name: 'Via Bike Lane',
      departTime: 'Anytime',
      arriveTime: '7:25 PM',
      duration: '7 min',
      cost: 0,
      transfers: 'Protected bike lane'
    },
    {
      name: 'Via Campus Route',
      departTime: 'Anytime',
      arriveTime: '7:27 PM',
      duration: '9 min',
      cost: 0,
      transfers: 'Less traffic'
    }
  ],
  rideshare: [
    {
      name: 'Uber X',
      departTime: '3 min wait',
      arriveTime: '7:26 PM',
      duration: '8 min',
      cost: 12.00,
      transfers: 'Door to door'
    },
    {
      name: 'Lyft',
      departTime: '5 min wait',
      arriveTime: '7:28 PM',
      duration: '8 min',
      cost: 11.50,
      transfers: 'Door to door'
    },
    {
      name: 'Uber Pool',
      departTime: '7 min wait',
      arriveTime: '7:32 PM',
      duration: '12 min',
      cost: 6.50,
      transfers: 'Shared ride'
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
        <div className="flex items-start gap-3">
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
        {routes.map((route, index) => (
          <button
            key={index}
            onClick={() => handleRouteClick(route, selectedMode)}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer w-full text-left"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
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

            <div className="flex items-center justify-center gap-2 text-sm text-teal-600 font-medium">
              <Navigation className="w-4 h-4" />
              <span>View on Map</span>
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}
