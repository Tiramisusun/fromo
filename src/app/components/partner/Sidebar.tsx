import { LayoutDashboard, List, Plus, BarChart3, Settings } from 'lucide-react';

interface SidebarProps {
  activePage: 'dashboard' | 'listings' | 'create' | 'analytics' | 'settings';
  onNavigate: (page: 'dashboard' | 'listings' | 'create' | 'analytics' | 'settings') => void;
}

const navItems = [
  { id: 'dashboard' as const, icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'listings' as const, icon: List, label: 'My Listings' },
  { id: 'create' as const, icon: Plus, label: 'Create Listing' },
  { id: 'analytics' as const, icon: BarChart3, label: 'Analytics' },
  { id: 'settings' as const, icon: Settings, label: 'Settings' }
];

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <div className="w-[220px] bg-slate-800 h-screen flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-white">FROMO</h1>
        <p className="text-xs text-slate-400 mt-1">Partner Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map(({ id, icon: Icon, label }) => (
            <li key={id}>
              <button
                onClick={() => onNavigate(id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                  ${activePage === id
                    ? 'bg-teal-500 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Venue Info */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
            <span className="text-sm font-bold text-white">TB</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">The Barn</p>
            <p className="text-xs text-slate-400">Venue Partner</p>
          </div>
        </div>
      </div>
    </div>
  );
}
