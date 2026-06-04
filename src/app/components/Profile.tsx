import { Settings, Edit, Wallet, Accessibility, ChevronRight, Bell, Lock, HelpCircle, LogOut } from 'lucide-react';
import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as Switch from '@radix-ui/react-switch';

const interestOptions = ['Food', 'Music', 'Sports', 'Nightlife', 'Outdoors', 'Study', 'Sightseeing'];

const accountOptions = [
  { icon: Bell, label: 'Notifications', color: 'text-gray-700' },
  { icon: Lock, label: 'Privacy', color: 'text-gray-700' },
  { icon: HelpCircle, label: 'Help & Feedback', color: 'text-gray-700' },
  { icon: LogOut, label: 'Log Out', color: 'text-red-600' }
];

export function Profile() {
  const [selectedInterests, setSelectedInterests] = useState(['Music', 'Food', 'Nightlife']);
  const [maxBudget, setMaxBudget] = useState([20]);
  const [accessibleOnly, setAccessibleOnly] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200 flex-shrink-0">
        <div className="w-10" />
        <h1 className="font-semibold text-gray-900">Profile</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Settings className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* User Info Card */}
        <div className="bg-white rounded-2xl mx-4 mt-4 p-6 shadow-sm relative">
          <button className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit className="w-4 h-4 text-gray-600" />
          </button>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 border-4 border-white shadow-lg flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-white">AC</span>
            </div>
            <h2 className="font-semibold text-gray-900 mb-1">Alex Chen</h2>
            <p className="text-sm text-gray-500">NYU · Student</p>
          </div>
        </div>

        {/* My Preferences Section */}
        <div className="mx-4 mt-6">
          <h3 className="font-semibold text-gray-900 mb-3 px-1">My Preferences</h3>

          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-6">
            {/* Interests */}
            <div>
              <label className="block mb-3 text-gray-900 font-medium">Interests</label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`
                      px-4 py-2 rounded-full text-sm transition-colors
                      ${selectedInterests.includes(interest)
                        ? 'bg-teal-500 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                      }
                    `}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-5 h-5 text-gray-600" />
                <label className="text-gray-900 font-medium">Max Budget</label>
              </div>
              <div className="relative pt-6">
                <Slider.Root
                  className="relative flex items-center select-none touch-none w-full h-5"
                  value={maxBudget}
                  onValueChange={setMaxBudget}
                  max={50}
                  step={1}
                >
                  <Slider.Track className="bg-gray-200 relative grow rounded-full h-1.5">
                    <Slider.Range className="absolute bg-teal-500 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-5 h-5 bg-white border-2 border-teal-500 rounded-full hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 relative"
                    aria-label="Budget"
                  >
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-teal-500 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
                      ${maxBudget[0]}
                    </div>
                  </Slider.Thumb>
                </Slider.Root>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>$0</span>
                <span>$50</span>
              </div>
            </div>

            {/* Accessibility */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-gray-600" />
                <label className="text-gray-900 font-medium">Accessible venues only</label>
              </div>
              <Switch.Root
                checked={accessibleOnly}
                onCheckedChange={setAccessibleOnly}
                className="w-11 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-teal-500 transition-colors outline-none cursor-pointer"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="mx-4 mt-6 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3 px-1">Account</h3>

          <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
            {accountOptions.map(({ icon: Icon, label, color }, index) => (
              <button
                key={index}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className={`font-medium ${color}`}>{label}</span>
                </div>
                <ChevronRight className={`w-5 h-5 ${color === 'text-red-600' ? 'opacity-0' : 'text-gray-400'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
