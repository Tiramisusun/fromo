import { useEffect, useRef } from 'react';
import L from 'leaflet';
import '../../styles/leaflet.css';

interface Activity {
  id: number;
  title: string;
  lat: number;
  lng: number;
  price: number;
  isLastMinuteDeal?: boolean;
}

interface MapViewProps {
  activities: Activity[];
  selectedActivityId: number | null;
  onActivitySelect: (id: number) => void;
}

const manhattanCenter = { lat: 40.7580, lng: -73.9855 };

const heatmapData = [
  { lat: 40.7580, lng: -73.9855, intensity: 0.9 },
  { lat: 40.7614, lng: -73.9776, intensity: 0.95 },
  { lat: 40.7527, lng: -73.9772, intensity: 0.85 },
  { lat: 40.7489, lng: -73.9680, intensity: 0.7 },
  { lat: 40.7282, lng: -73.9942, intensity: 0.6 },
  { lat: 40.7831, lng: -73.9712, intensity: 0.5 },
  { lat: 40.7419, lng: -74.0059, intensity: 0.4 }
];

export function MapView({ activities, selectedActivityId, onActivitySelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([manhattanCenter.lat, manhattanCenter.lng], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    L.circle([manhattanCenter.lat, manhattanCenter.lng], {
      color: '#14b8a6',
      fillColor: 'transparent',
      fillOpacity: 0,
      weight: 2,
      dashArray: '5, 10',
      radius: 5000
    }).addTo(map);

    heatmapData.forEach(point => {
      const color = point.intensity > 0.8 ? '#ef4444' :
                   point.intensity > 0.6 ? '#f97316' :
                   point.intensity > 0.4 ? '#eab308' :
                   '#84cc16';

      L.circle([point.lat, point.lng], {
        color: 'transparent',
        fillColor: color,
        fillOpacity: 0.2,
        radius: 800
      }).addTo(map);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    activities.forEach(activity => {
      const isSelected = activity.id === selectedActivityId;
      const priceText = activity.price === 0 ? 'Free' : `$${activity.price}`;
      const bgColor = activity.isLastMinuteDeal ? '#f59e0b' : '#0ea5e9';

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background: ${bgColor};
            color: white;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            white-space: nowrap;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
            border: ${isSelected ? '2px solid white' : 'none'};
            transition: transform 0.2s;
            cursor: pointer;
          ">
            ${priceText}
          </div>
        `,
        iconSize: [60, 24],
        iconAnchor: [30, 12]
      });

      const marker = L.marker([activity.lat, activity.lng], { icon })
        .addTo(mapInstanceRef.current!);

      marker.on('click', () => onActivitySelect(activity.id));

      markersRef.current.push(marker);
    });
  }, [activities, selectedActivityId, onActivitySelect]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />

      {/* Legend - Always visible */}
      <div className="absolute bottom-3 left-3 bg-white rounded-lg px-3 py-2 shadow-lg border border-gray-200 text-xs z-[1000]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-gray-700 font-medium">Busy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-gray-700 font-medium">Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-gray-700 font-medium">Quiet</span>
          </div>
        </div>
      </div>
    </div>
  );
}
