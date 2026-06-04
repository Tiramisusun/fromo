import { ArrowLeft, Upload } from 'lucide-react';
import { useState } from 'react';

export function CreateListing() {
  const [originalPrice, setOriginalPrice] = useState('20');
  const [discountPrice, setDiscountPrice] = useState('8');

  const calculateDiscount = () => {
    const original = parseFloat(originalPrice) || 0;
    const discount = parseFloat(discountPrice) || 0;
    if (original === 0) return 0;
    return Math.round(((original - discount) / original) * 100);
  };

  return (
    <div className="ml-[220px] min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Create New Listing</h1>
      </div>

      {/* Main Content */}
      <div className="p-8 flex justify-center">
        <div className="w-full max-w-[720px]">
          <form className="space-y-8">
            {/* Basic Info */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Info</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Live Jazz Night"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none">
                    <option>Music</option>
                    <option>Food</option>
                    <option>Sports</option>
                    <option>Nightlife</option>
                    <option>Outdoors</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your event..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Date & Time */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Date & Time</h2>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Location */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    value="The Barn"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main St, Manhattan, NY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Tickets & Pricing */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tickets & Pricing</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Original Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={discountPrice}
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-green-300 bg-green-50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">= {calculateDiscount()}% off</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Tickets Available
                  </label>
                  <input
                    type="number"
                    placeholder="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Offer Ends At
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="time"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Listing will auto-hide after this time</p>
                </div>
              </div>
            </section>

            {/* Accessibility */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Accessibility</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 text-teal-500 rounded focus:ring-teal-500" />
                  <span className="text-sm text-gray-700">Venue is wheelchair accessible</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 text-teal-500 rounded focus:ring-teal-500" />
                  <span className="text-sm text-gray-700">Accessible route available</span>
                </label>
              </div>
            </section>
          </form>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-[220px] right-0 bg-white border-t border-gray-200 px-8 py-4 flex justify-end gap-4">
        <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Save as Draft
        </button>
        <button className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
          Publish Listing
        </button>
      </div>
    </div>
  );
}
