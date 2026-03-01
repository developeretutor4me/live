
// pages/standard.js
import Head from 'next/head';
import Link from 'next/link';

export default function Standard() {
  return (
    <div className="min-h-screen bg-[#EDE8FA] py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Standard Plan Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#53497F] text-white py-4 px-6 flex items-center">
          <Link href="/">
            <span className="text-white mr-4 cursor-pointer">&lt;</span>
          </Link>
          <h1 className="text-2xl font-semibold">Standard</h1>
        </div>
        <div className="p-6">
          <h2 className="text-[#53497F] text-xl font-semibold mb-4">Choose your Preferences</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-[#5553C4] text-2xl font-bold">4 Sessions / month</p>
              <p className="text-[#53497F] text-2xl font-bold">$139 / month</p>
            </div>
            <div>
              <p className="text-[#53497F] text-sm">Session duration: 60 minutes</p>
              <p className="text-[#53497F] text-sm">Membership duration: Flexible</p>
              <p className="text-[#53497F] text-sm">Average cost per session: $34.75</p>
            </div>
          </div>
          {/* Add the same package duration, eTutor's Level, and other elements as in the Premium page */}
          <button className="w-full bg-[#53497F] text-white py-3 rounded-full text-lg font-semibold">
            Upgrade
          </button>
        </div>
      </main>
    </div>
  );
}