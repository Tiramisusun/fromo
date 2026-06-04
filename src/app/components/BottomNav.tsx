import { Home, Search, Bookmark, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'search' | 'saved' | 'profile';
  onTabChange: (tab: 'home' | 'search' | 'saved' | 'profile') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'search' as const, icon: Search, label: 'Search' },
    { id: 'saved' as const, icon: Bookmark, label: 'Saved' },
    { id: 'profile' as const, icon: User, label: 'Profile' }
  ];

  return (
    <div className="border-t border-gray-200 bg-white px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`
              flex flex-col items-center gap-1 px-4 py-1
              ${activeTab === id ? 'text-teal-500' : 'text-gray-500'}
            `}
          >
            <Icon className="w-5 h-5" strokeWidth={activeTab === id ? 2.5 : 2} />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
