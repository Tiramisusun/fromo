import { useState, useMemo } from 'react';
import { MapPin, Search, SlidersHorizontal } from 'lucide-react';
import { FilterChip } from './components/FilterChip';
import { ActivityCard } from './components/ActivityCard';
import { BottomNav } from './components/BottomNav';
import { FilterPanel, type FilterState } from './components/FilterPanel';
import { ActivityDetail } from './components/ActivityDetail';
import { TransportOptions } from './components/TransportOptions';
import { FeedbackPopup } from './components/FeedbackPopup';
import { MapView } from './components/MapView';
import { DragDivider } from './components/DragDivider';
import { Profile } from './components/Profile';
import { Sidebar } from './components/partner/Sidebar';
import { MyListings } from './components/partner/MyListings';
import { CreateListing } from './components/partner/CreateListing';
import { Analytics } from './components/partner/Analytics';

const filterCategories = ['All', 'Food', 'Music', 'Sports', 'Nightlife', 'Outdoors', 'Study'];

const allActivities = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=450&fit=crop',
    title: 'Indie Live Night at The Barn',
    summary: 'Local student jazz ensemble performing classic standards and original compositions',
    distance: 0.8,
    time: 'Tonight 7:00 PM',
    originalPrice: 20,
    discountedPrice: 8,
    isLastMinuteDeal: true,
    category: 'Music',
    isAccessible: false,
    destination: 'The Barn, Midtown Manhattan',
    lat: 40.7580,
    lng: -73.9855,
    aiSummary: 'Experience an intimate evening of live jazz featuring the UC Davis Student Jazz Collective. This talented ensemble will perform a mix of timeless standards and original compositions in a cozy, dimly-lit venue. Perfect for music lovers looking to unwind after a long week of classes.',
    accessibilityConfirmed: true,
    discountPercent: 60,
    offerEndsIn: '1h 45m',
    transportOptions: [
      { mode: 'transit' as const, label: 'Public Transit', time: '22 min', cost: 2.50 },
      { mode: 'walk' as const, label: 'Walking', time: '18 min', cost: 0 },
      { mode: 'rideshare' as const, label: 'Rideshare', time: '8 min', cost: 12.00 }
    ]
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=450&fit=crop',
    title: 'Ultimate Frisbee Pickup Game',
    summary: 'Casual ultimate frisbee game at the campus rec field, all skill levels welcome',
    distance: 1.2,
    time: 'Today 5:30 PM',
    discountedPrice: 0,
    isAccessible: true,
    category: 'Sports',
    destination: 'Central Park Field',
    lat: 40.7731,
    lng: -73.9712,
    aiSummary: 'Join fellow students for a friendly game of ultimate frisbee at the campus recreation field. No experience necessary – this is a welcoming environment for all skill levels. Great way to get some exercise, meet new people, and enjoy the outdoors.',
    accessibilityConfirmed: true,
    transportOptions: [
      { mode: 'walk' as const, label: 'Walking', time: '15 min', cost: 0 },
      { mode: 'transit' as const, label: 'Campus Shuttle', time: '10 min', cost: 0 },
      { mode: 'rideshare' as const, label: 'Rideshare', time: '5 min', cost: 6.00 }
    ]
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=450&fit=crop',
    title: 'Thai Street Food Popup',
    summary: 'Award-winning chef bringing authentic Bangkok street food to campus',
    distance: 0.5,
    time: 'Tomorrow 6:00 PM',
    discountedPrice: 12,
    category: 'Food',
    destination: 'Union Square',
    lat: 40.7359,
    lng: -73.9911,
    isAccessible: false,
    aiSummary: 'Award-winning Chef Somchai brings the vibrant flavors of Bangkok street food directly to campus. Sample authentic pad thai, som tam, and mango sticky rice prepared using traditional techniques and fresh ingredients. Limited seating available.',
    accessibilityConfirmed: false,
    transportOptions: [
      { mode: 'walk' as const, label: 'Walking', time: '8 min', cost: 0 },
      { mode: 'transit' as const, label: 'Public Transit', time: '12 min', cost: 2.50 },
      { mode: 'rideshare' as const, label: 'Rideshare', time: '4 min', cost: 8.00 }
    ]
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=450&fit=crop',
    title: 'Acoustic Open Mic Night',
    summary: 'Showcase your talent or enjoy performances by fellow students',
    distance: 1.5,
    time: 'Friday 8:00 PM',
    discountedPrice: 5,
    category: 'Music',
    destination: 'Greenwich Village Caffe',
    lat: 40.7335,
    lng: -74.0027,
    isAccessible: true,
    aiSummary: 'Intimate acoustic showcase featuring student musicians from across campus. Whether you want to perform or simply enjoy the show, this supportive environment celebrates all types of musical expression. Sign up at the door or just come to listen.',
    accessibilityConfirmed: true,
    transportOptions: [
      { mode: 'walk' as const, label: 'Walking', time: '20 min', cost: 0 },
      { mode: 'transit' as const, label: 'Public Transit', time: '15 min', cost: 2.50 },
      { mode: 'rideshare' as const, label: 'Rideshare', time: '7 min', cost: 9.00 }
    ]
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=450&fit=crop',
    title: 'Vegan Burger Cookout',
    summary: 'Learn to make delicious plant-based burgers with a professional chef',
    distance: 2.3,
    time: 'Saturday 12:00 PM',
    originalPrice: 18,
    discountedPrice: 10,
    isLastMinuteDeal: true,
    category: 'Food',
    destination: 'Brooklyn Community Kitchen',
    lat: 40.7489,
    lng: -73.9680,
    isAccessible: false,
    aiSummary: 'Learn the secrets to crafting mouth-watering plant-based burgers from a professional vegan chef. This hands-on cooking class covers everything from making the perfect patty to crafting unique sauces. All ingredients provided, and you get to eat what you make!',
    accessibilityConfirmed: false,
    discountPercent: 44,
    offerEndsIn: '3h 20m',
    transportOptions: [
      { mode: 'transit' as const, label: 'Public Transit', time: '28 min', cost: 2.50 },
      { mode: 'walk' as const, label: 'Walking', time: '35 min', cost: 0 },
      { mode: 'rideshare' as const, label: 'Rideshare', time: '12 min', cost: 15.00 }
    ]
  }
];

export default function App() {
  const [viewMode, setViewMode] = useState<'student' | 'partner'>('student');
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'saved' | 'profile'>('home');
  const [partnerPage, setPartnerPage] = useState<'dashboard' | 'listings' | 'create' | 'analytics' | 'settings'>('listings');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
  const [showTransportOptions, setShowTransportOptions] = useState(false);
  const [mapHeightPercent, setMapHeightPercent] = useState(45);
  const [feedbackPopup, setFeedbackPopup] = useState<{ isOpen: boolean; feature: string }>({
    isOpen: false,
    feature: ''
  });
  const [filters, setFilters] = useState<FilterState>({
    maxPrice: 50,
    distance: '5 km+',
    interests: [],
    accessibleOnly: false
  });

  const filteredActivities = useMemo(() => {
    return allActivities.filter(activity => {
      const price = activity.discountedPrice || activity.originalPrice || 0;
      if (price > filters.maxPrice) return false;

      const maxDistance = filters.distance === '5 km+' ? 100 : parseFloat(filters.distance);
      if (activity.distance > maxDistance) return false;

      if (filters.interests.length > 0 && !filters.interests.includes(activity.category)) {
        return false;
      }

      if (filters.accessibleOnly && !activity.isAccessible) return false;

      if (activeFilter !== 'All' && activity.category !== activeFilter) return false;

      return true;
    });
  }, [filters, activeFilter]);

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    setTimeout(() => {
      setFeedbackPopup({ isOpen: true, feature: 'Using filters' });
    }, 500);
  };

  const selectedActivity = selectedActivityId
    ? allActivities.find(a => a.id === selectedActivityId)
    : null;

  // Partner Dashboard
  if (viewMode === 'partner') {
    return (
      <>
        <Sidebar activePage={partnerPage} onNavigate={setPartnerPage} />
        {partnerPage === 'listings' && <MyListings />}
        {partnerPage === 'create' && <CreateListing />}
        {partnerPage === 'analytics' && <Analytics />}

        {/* View Mode Switcher */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setViewMode('student')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-lg"
          >
            Switch to Student View
          </button>
        </div>
      </>
    );
  }

  // Profile Tab
  if (activeTab === 'profile') {
    return (
      <div className="size-full flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-[375px] h-full bg-gray-50 shadow-2xl flex flex-col">
          <Profile />
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    );
  }

  if (selectedActivity && showTransportOptions) {
    return (
      <div className="size-full flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-[375px] h-full bg-gray-50 shadow-2xl relative">
          <TransportOptions
            eventName={selectedActivity.title}
            destination={selectedActivity.destination}
            ticketPrice={selectedActivity.discountedPrice}
            destinationLat={selectedActivity.lat}
            destinationLng={selectedActivity.lng}
            onBack={() => {
              setShowTransportOptions(false);
              setTimeout(() => {
                setFeedbackPopup({ isOpen: true, feature: 'Viewing directions' });
              }, 500);
            }}
          />
          <FeedbackPopup
            isOpen={feedbackPopup.isOpen}
            featureName={feedbackPopup.feature}
            onClose={() => setFeedbackPopup({ isOpen: false, feature: '' })}
          />
        </div>
      </div>
    );
  }

  if (selectedActivity) {
    return (
      <div className="size-full flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-[375px] h-full bg-gray-50 shadow-2xl">
          <ActivityDetail
            image={selectedActivity.image}
            title={selectedActivity.title}
            category={selectedActivity.category}
            originalPrice={selectedActivity.originalPrice}
            discountedPrice={selectedActivity.discountedPrice}
            discountPercent={selectedActivity.discountPercent}
            offerEndsIn={selectedActivity.offerEndsIn}
            aiSummary={selectedActivity.aiSummary}
            isAccessible={selectedActivity.isAccessible}
            accessibilityConfirmed={selectedActivity.accessibilityConfirmed}
            transportOptions={selectedActivity.transportOptions}
            destination={selectedActivity.destination}
            onBack={() => setSelectedActivityId(null)}
            onGetDirections={() => setShowTransportOptions(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="size-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-[375px] h-full bg-gray-50 flex flex-col shadow-2xl relative">
        {/* Top Bar */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200 flex-shrink-0">
          <button className="flex items-center gap-2 text-gray-900">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Manhattan, NY</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => setIsFilterPanelOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Map Section */}
        <div style={{ height: `${mapHeightPercent}%` }} className="flex-shrink-0">
          <MapView
            activities={filteredActivities.map(a => ({
              id: a.id,
              title: a.title,
              lat: a.lat,
              lng: a.lng,
              price: a.discountedPrice,
              isLastMinuteDeal: a.isLastMinuteDeal
            }))}
            selectedActivityId={selectedActivityId}
            onActivitySelect={(id) => setSelectedActivityId(id)}
          />
        </div>

        {/* Drag Divider */}
        <DragDivider
          onHeightChange={setMapHeightPercent}
          initialMapHeight={mapHeightPercent}
        />

        {/* Activity Feed Section */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Filter Chips */}
          <div className="bg-white px-4 py-3 border-b border-gray-200 flex-shrink-0">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {filterCategories.map((filter) => (
                <FilterChip
                  key={filter}
                  label={filter}
                  isActive={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                />
              ))}
            </div>
          </div>

          {/* Activity List */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {filteredActivities.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">No activities found</p>
                  <p className="text-sm text-gray-400">Try adjusting your filters</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    {...activity}
                    distance={`${activity.distance} km`}
                    onClick={() => setSelectedActivityId(activity.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* View Mode Switcher */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setViewMode('partner')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-lg"
          >
            Switch to Partner View
          </button>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          filters={filters}
          onApply={handleApplyFilters}
        />

        {/* Feedback Popup */}
        <FeedbackPopup
          isOpen={feedbackPopup.isOpen}
          featureName={feedbackPopup.feature}
          onClose={() => setFeedbackPopup({ isOpen: false, feature: '' })}
        />
      </div>
    </div>
  );
}