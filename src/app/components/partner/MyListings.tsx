import { Plus, Edit, EyeOff } from 'lucide-react';
import { useState } from 'react';

const listings = [
  {
    id: 1,
    name: 'Indie Live Night at The Barn',
    date: 'Tonight 7:00 PM',
    originalPrice: 20,
    discountPrice: 8,
    available: 45,
    total: 60,
    status: 'active' as const
  },
  {
    id: 2,
    name: 'Jazz & Wine Evening',
    date: 'Tomorrow 8:00 PM',
    originalPrice: 25,
    discountPrice: 15,
    available: 12,
    total: 40,
    status: 'active' as const
  },
  {
    id: 3,
    name: 'Open Mic Night',
    date: 'Yesterday 9:00 PM',
    originalPrice: 15,
    discountPrice: 10,
    available: 0,
    total: 30,
    status: 'expired' as const
  },
  {
    id: 4,
    name: 'Blues Monday Special',
    date: 'Dec 1, 6:00 PM',
    originalPrice: 18,
    discountPrice: 12,
    available: 0,
    total: 50,
    status: 'soldout' as const
  }
];

export function MyListings() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'expired' | 'soldout'>('all');

  const filteredListings = listings.filter(listing => {
    if (activeTab === 'all') return true;
    return listing.status === activeTab;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      expired: 'bg-gray-100 text-gray-700',
      soldout: 'bg-red-100 text-red-700'
    };
    const labels = {
      active: 'Active',
      expired: 'Expired',
      soldout: 'Sold Out'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="ml-[220px] min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">My Listings</h1>
        <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Create New Listing
        </button>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Active Listings</p>
            <p className="text-3xl font-bold text-gray-900">4</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Tickets Sold Today</p>
            <p className="text-3xl font-bold text-gray-900">23</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Views</p>
            <p className="text-3xl font-bold text-gray-900">142</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-8">
              {[
                { id: 'all' as const, label: 'All' },
                { id: 'active' as const, label: 'Active' },
                { id: 'expired' as const, label: 'Expired' },
                { id: 'soldout' as const, label: 'Sold Out' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`
                    py-4 border-b-2 transition-colors text-sm font-medium
                    ${activeTab === id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tickets
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{listing.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {listing.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm">${listing.originalPrice}</span>
                        <span className="text-green-600 font-semibold">${listing.discountPrice}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {listing.available} / {listing.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(listing.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <button className="text-teal-600 hover:text-teal-700 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 transition-colors">
                          <EyeOff className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
