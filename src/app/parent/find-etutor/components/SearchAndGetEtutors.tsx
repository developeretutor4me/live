import React, { useState } from 'react';
import SearchEtutor from './SearchEtutor';
import { useTeacher } from '@/app/admin/hooks/useTeacher';
import EtutorsList from './EtutorsList';
import EtutorProfileView from './EtutorProfileView';

interface SearchAndGetEtutorsProps {
  showFilteredEtutorList: boolean;
  setShowFilteredEtutorList: (showFilteredEtutorList: boolean) => void;
  setSearchEtutorForm: (searchEtutorForm: SearchEtutorFormInterface) => void;
  setFilteredEtutorList: (FilteredEtutorList: any) => void;
  filteredEtutorList: any;
  selectedTutor: any;
  setSelectedTutor: (selectedTutor: any) => void;
  showProfileEtutor: boolean;
  setShowProfileEtutor: (showProfileEtutor: boolean) => void;
  bookingRequests: any;
  session: any;
  isTrialSessionLeft: boolean;
  bookingSectionShowHandler: () => void;
  handleBackNavigationHandler: () => void;
}

interface SearchEtutorFormInterface {
  sortedBy: string;
  searchTerm: string;
  subjects: string[];
  level: string;
  gender: string;
}

const SearchAndGetEtutors = ({
  showFilteredEtutorList,
  setShowFilteredEtutorList,
  setSearchEtutorForm,
  setFilteredEtutorList,
  filteredEtutorList,
  selectedTutor,
  setSelectedTutor,
  showProfileEtutor,
  setShowProfileEtutor,
  bookingRequests,
  session,
  isTrialSessionLeft,
  bookingSectionShowHandler,
  handleBackNavigationHandler,
}: SearchAndGetEtutorsProps) => {
  const [isFetchingEtutors, setIsFetchingEtutors] = useState<boolean>(false);
  const { teacher, isLoading3, error3 } = useTeacher();

  const searchTeachers = (
    teachers: any,
    searchParams: {
      sortedBy: string | number;
      searchTerm: string | any;
      subjects: string[];
      level: any;
      gender: any;
    }
  ) => {
    let filteredTeachers = teachers;

    // Filter by sortBy
    if (searchParams.sortedBy) {
      switch (searchParams.sortedBy) {
        case 'createdAt':
          filteredTeachers = filteredTeachers.sort(
            (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
        case 'firstName':
          filteredTeachers = filteredTeachers.sort((a: any, b: any) =>
            a.contactInformation.firstName.localeCompare(b.contactInformation.firstName)
          );
          break;
        case 'lastName':
          filteredTeachers = filteredTeachers.sort((a: any, b: any) =>
            a.contactInformation.lastName.localeCompare(b.contactInformation.lastName)
          );
          break;
        case 'level':
          filteredTeachers = filteredTeachers.sort((a: any, b: any) => a.level - b.level);
          break;
        default:
          break;
      }
    }

    // Filter by searchTerm - handle both string and object cases
    if (searchParams.searchTerm) {
      let searchTerm = '';

      // If searchTerm is a string, use it directly
      if (typeof searchParams.searchTerm === 'string' && searchParams.searchTerm.trim()) {
        searchTerm = searchParams.searchTerm.toLowerCase().trim();
      }
      // If searchTerm is an object, extract the search term from it
      else if (typeof searchParams.searchTerm === 'object' && searchParams.searchTerm !== null) {
        // Look for common search term properties
        const possibleSearchTerms = [
          searchParams.searchTerm.searchTerm,
          searchParams.searchTerm.search,
          searchParams.searchTerm.term,
          searchParams.searchTerm.query,
        ];

        for (const term of possibleSearchTerms) {
          if (typeof term === 'string' && term.trim()) {
            searchTerm = term.toLowerCase().trim();
            break;
          }
        }
      }

      // Apply search filter if we have a valid search term
      if (searchTerm) {
        filteredTeachers = filteredTeachers.filter(
          (teacher: any) =>
            teacher?.contactInformation?.firstName?.toLowerCase()?.includes(searchTerm) ||
            teacher?.contactInformation?.lastName?.toLowerCase()?.includes(searchTerm) ||
            teacher?.education?.college?.toLowerCase()?.includes(searchTerm) ||
            teacher?.education?.major?.toLowerCase()?.includes(searchTerm)
        );
      }
    }

    // Filter by subjects
    if (
      searchParams.subjects &&
      Array.isArray(searchParams.subjects) &&
      searchParams.subjects.length > 0
    ) {
      filteredTeachers = filteredTeachers.filter((teacher: any) =>
        searchParams.subjects.every(subject =>
          teacher?.experience?.subjectsTutored?.includes(subject)
        )
      );
    }

    // Filter by level
    if (searchParams.level && searchParams.level !== '' && searchParams.level !== '0') {
      filteredTeachers = filteredTeachers.filter(
        (teacher: any) => teacher?.level?.toString() === searchParams.level.toString()
      );
    }

    // Filter by gender
    if (searchParams.gender && searchParams.gender !== '') {
      filteredTeachers = filteredTeachers.filter(
        (teacher: any) => teacher?.gender === searchParams.gender || !teacher?.gender
      );
    }

    return filteredTeachers;
  };

  const getEtutorsListHandler = async (searchParams: any) => {
    setIsFetchingEtutors(true);
    setSearchEtutorForm({
      sortedBy: searchParams.sortedBy,
      searchTerm: searchParams.searchTerm,
      subjects: searchParams.subjects,
      level: searchParams.level,
      gender: searchParams.gender,
    });
    const searchResults = await searchTeachers(teacher, searchParams);
    setFilteredEtutorList(searchResults);
    setShowFilteredEtutorList(true);
    setIsFetchingEtutors(false);
  };

  const handleViewProfile = (tutor: any) => {
    setSelectedTutor(tutor);
    setShowProfileEtutor(true);
  };

  const handleBackToSearch = () => {
    setFilteredEtutorList([]);
    setShowFilteredEtutorList(false);
    setShowProfileEtutor(false);
  };

  if (showProfileEtutor && showFilteredEtutorList) {
    return (
      <EtutorProfileView
        tutor={selectedTutor}
        bookingRequests={bookingRequests}
        session={session}
        isTrialSessionLeft={isTrialSessionLeft}
        bookingSectionShowHandler={bookingSectionShowHandler}
      />
    );
  }

  if (showFilteredEtutorList && !showProfileEtutor) {
    return (
      <EtutorsList
        filteredTutors={filteredEtutorList}
        handleViewProfile={handleViewProfile}
        setFilteredEtutorList={setFilteredEtutorList}
        handleBackToSearch={handleBackToSearch}
      />
    );
  }

  return (
    <div className="text-white">
      <SearchEtutor
        getEtutorsListHandler={getEtutorsListHandler}
        isFetchingEtutor={isFetchingEtutors}
      />
    </div>
  );
};

export default SearchAndGetEtutors;
