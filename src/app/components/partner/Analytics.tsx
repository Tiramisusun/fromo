import { TrendingUp, ChevronDown } from 'lucide-react';

const topListings = [
  { name: 'Indie Live Night', sold: 45, revenue: 360 },
  { name: 'Jazz & Wine Evening', sold: 28, revenue: 420 },
  { name: 'Blues Monday Special', sold: 50, revenue: 600 }
];

const performanceData = [
  { name: 'Indie Live Night', views: 142, sold: 45, revenue: 360, conversion: '31.7%', status: 'Active' },
  { name: 'Jazz & Wine Evening', views: 98, sold: 28, revenue: 420, conversion: '28.6%', status: 'Active' },
  { name: 'Open Mic Night', views: 67, sold: 30, revenue: 300, conversion: '44.8%', status: 'Expired' },
  { name: 'Blues Monday Special', views: 124, sold: 50, revenue: 600, conversion: '40.3%', status: 'Sold Out' }
];

export function Analytics() {
  return (
    <div className="ml-[220px] min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
          Last 7 days
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Total Views</p>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-bold text-gray-900">284</p>
              <div className="flex items-center gap-1 text-green-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+12%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Tickets Sold</p>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-bold text-gray-900">47</p>
              <div className="flex items-center gap-1 text-green-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+8%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Revenue</p>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-bold text-gray-900">$376</p>
              <div className="flex items-center gap-1 text-green-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+15%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Avg. Discount Given</p>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-bold text-gray-900">52%</p>
            </div>
          </div>
        </div>

        {/* Chart and Top Listings Row */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          {/* Chart */}
          <div className="col-span-3 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Ticket Sales</h3>
            <div className="h-64 flex items-end justify-between gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const heights = [60, 75, 55, 80, 70, 90, 65];
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-3">
                    <div className="w-full flex flex-col justify-end h-48">
                      <div
                        className="w-full bg-teal-500 rounded-t-lg relative group cursor-pointer hover:bg-teal-600 transition-colors"
                        style={{ height: `${heights[index]}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {Math.round(heights[index] / 10)} tickets
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Listings */}
          <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Listings</h3>
            <div className="space-y-4">
              {topListings.map((listing, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <p className="font-medium text-gray-900 mb-2">{listing.name}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{listing.sold} tickets</span>
                    <span className="font-semibold text-green-600">${listing.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Listing Performance</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tickets Sold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {performanceData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{row.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {row.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {row.sold}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${row.revenue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {row.conversion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${row.status === 'Active' ? 'bg-green-100 text-green-700' : ''}
                        ${row.status === 'Expired' ? 'bg-gray-100 text-gray-700' : ''}
                        ${row.status === 'Sold Out' ? 'bg-red-100 text-red-700' : ''}
                      `}>
                        {row.status}
                      </span>
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
