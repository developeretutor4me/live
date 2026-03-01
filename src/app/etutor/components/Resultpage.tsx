import React from 'react';
import Link from 'next/link';

const ResultsPage = () => {
  return (
    <div className="bg-[#f3eeff] min-h-screen p-6">
      <h1 className="text-[#6949ff] text-2xl font-bold mb-4">Search Results</h1>
      
      <div className="space-y-4">
        {/* Example result item */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-[#6949ff] text-xl font-semibold">eTutor Name</h2>
          <p className="text-[#6949ff]">Subjects: Math, Art</p>
          <p className="text-[#6949ff]">Level: 5</p>
          <button className="mt-2 bg-[#6949ff] text-white px-4 py-2 rounded-md hover:bg-[#5a3dd8] transition-colors">
            Book Session
          </button>
        </div>
        
        {/* Add more result items as needed */}
      </div>
      
      <Link href="/" className="block mt-6 text-[#6949ff] hover:underline">
        Back to Search
      </Link>
    </div>
  );
};

export default ResultsPage;