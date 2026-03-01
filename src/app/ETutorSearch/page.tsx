'use client';
import React, { useState } from 'react';
import FindEtutor from './Components/FindEtutor';
import SearchTutor from './Components/SearchTutor';
import TutorDetails from './Components/TutorDetails';
import SeeTutorsList from './Components/SeeTutorsList';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [filteredTutors, setfilteredTutors] = useState<any>(null);

  return (
    <>
      <Navbar />
      <div className="px-10 mb:px-5">
        <FindEtutor />
        <SearchTutor setfilteredTutors={setfilteredTutors} />
        <TutorDetails filteredTutors={filteredTutors} />
        <SeeTutorsList filteredTutors={filteredTutors} />
      </div>
      <Footer />
    </>
  );
};

export default page;
