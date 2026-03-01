
// pages/premium.js
import Head from 'next/head';
import Link from 'next/link';

export default function Premium() {
  return (
    <div className="min-h-screen bg-[#EDE8FA] py-8 px-4 sm:px-6 lg:px-8">
      
      <main className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border-2 border-red-700">
        <div className="bg-[#5553C4] text-white py-4 px-6 flex items-center">
          <Link href="/">
            <span className="text-white mr-4 cursor-pointer">&lt;</span>
          </Link>
          <h1 className="text-2xl font-semibold">Premium</h1>
        </div>
        <div className="p-6">
          <h2 className="text-[#53497F] text-xl font-semibold mb-4">Choose your Preferences</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-[#5553C4] text-2xl font-bold">8 Sessions / month</p>
              <p className="text-[#53497F] text-2xl font-bold">$249 / month</p>
            </div>
            <div>
              <p className="text-[#53497F] text-sm">Session duration: 60 minutes</p>
              <p className="text-[#53497F] text-sm">Membership duration: Flexible</p>
              <p className="text-[#53497F] text-sm">Average cost per session: $30.75</p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-[#53497F] font-semibold mb-2">Package duration</h3>
            <div className="flex space-x-2">
              {['3 months', '6 months', '12 months'].map((duration) => (
                <button
                  key={duration}
                  className="bg-[#EDE8FA] text-[#53497F] py-2 px-4 rounded-full text-sm font-semibold"
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-[#53497F] font-semibold mb-2">eTutor s Level</h3>
            <div className="flex space-x-2">
              {[
                { name: 'Junior', level: 'Level 1-3' },
                { name: 'Senior', level: 'Level 4-7' },
                { name: 'Expert', level: 'Level 8-10' },
              ].map((tutor) => (
                <button
                  key={tutor.name}
                  className="bg-[#EDE8FA] text-[#53497F] py-2 px-4 rounded-full text-sm font-semibold"
                >
                  {tutor.name}
                  <span className="block text-xs">{tutor.level}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-[#EDE8FA] p-4 rounded-lg mb-6">
            <p className="text-[#53497F] font-semibold">Package duration: 12 months</p>
            <p className="text-[#53497F] font-semibold">eTutor s Level: Senior</p>
            <p className="text-[#53497F] font-semibold mt-2">Total: $259 / month</p>
          </div>
          <div className="flex items-center mb-6">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-[#53497F] text-sm">
              I agree with the <span className="underline">terms of service</span>
            </label>
          </div>
          <button className="w-full bg-[#5553C4] text-white py-3 rounded-full text-lg font-semibold">
            Upgrade
          </button>
        </div>
      </main>
    </div>
  );
}
