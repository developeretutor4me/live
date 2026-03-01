import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { useTeacher } from '@/app/admin/hooks/useTeacher';
import { ITeacher } from '@/app/api/models/Teacher';
import { useBookedDate } from '@/app/admin/hooks/useBookedDate';
import SearchForm from './SearchForm';
import ResultsView from './ResultsView';
import ProfileView from './ProfileView';
import { options, memberships, durations } from './Data';
import BookingView from './BookingView';
import axios from 'axios';

interface ETutorSearchprops {
  sessiontutor: any;
  messagetutor: any;
  setActiveMYEtutor: (item: string) => void;
  parentdata: any;
  showchat: any;
  trialrequest: any;
  sessionData: any;
  showTerminateEngament: any;
}
const ETutorSearch = ({
  showchat,
  sessiontutor,
  messagetutor,
  setActiveMYEtutor,
  trialrequest,
  parentdata,
  sessionData,
  showTerminateEngament,
}: ETutorSearchprops) => {
  const { bookedDate, isLoading, error } = useBookedDate();
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const [loading, setloading] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [isOpentime, setIsOpentime] = useState(false);
  const [ismemberOpen, setIsmemberOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<any>([]);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedTutor, setSelectedTutor] = useState<ITeacher | any>(null);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(true);
  const [studentnote, setStudentnote] = useState('');
  const [searchParams, setSearchParams] = useState({
    sortBy: '',
    searchTerm: '',
    subjects: [],
    level: '',
    gender: '',
    tutorLevel: '',
  });
  const { teacher, isLoading3, error3 } = useTeacher();
  const [isOpendate, setIsOpendate] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [isTrialSession, setisTrialSession] = useState(trialrequest || false);
  const [bookingInfo, setBookingInfo] = useState({
    subject: '',
    level: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    setBookingInfo(prev => ({
      ...prev,
      subject: selectedSubjects.join(', '), // joining subjects as a comma-separated string
    }));
  }, [selectedSubjects]);

  if (sessiontutor) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const handleViewProfile = (tutor: ITeacher) => {
        setSelectedTutor(sessiontutor); // Store the selected tutor
        setShowProfile(true); // Show the profile view
        setShowResults(false); // Hide the results (list of teachers)
      };
      handleViewProfile(sessiontutor);
    }, [sessiontutor]);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const handleBackToSearch = () => {
        setShowResults(false);
        setShowProfile(false);
        setShowBooking(false);
      };

      handleBackToSearch();
    }, []);
  }

  console.log('session : ', session?.user);

  function onLevelChange(level: any) {
    setBookingInfo(prevBookingInfo => ({
      ...prevBookingInfo,
      level, // Update the level in bookingInfo
    }));
  }
  const subjectOptions = [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Algebra', label: 'Algebra' },
    { value: 'Geometry', label: 'Geometry' },
    { value: 'Calculus', label: 'Calculus' },
    { value: 'Trigonometry', label: 'Trigonometry' },
    { value: 'Statistics', label: 'Statistics' },
    { value: 'Science', label: 'Science' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Environmental Science', label: 'Environmental Science' },
    { value: 'Earth Science', label: 'Earth Science' },
    { value: 'English Language Arts', label: 'English Language Arts' },
    { value: 'Grammar', label: 'Grammar' },
    { value: 'Literature', label: 'Literature' },
    { value: 'Writing', label: 'Writing' },
    { value: 'Reading Comprehension', label: 'Reading Comprehension' },
    { value: 'Social Studies', label: 'Social Studies' },
    {
      value: 'History (World, U.S., Ancient)',
      label: 'History (World, U.S., Ancient)',
    },
    { value: 'Geography', label: 'Geography' },
    { value: 'Economics', label: 'Economics' },
    { value: 'Political Science', label: 'Political Science' },
    { value: 'Foreign Languages', label: 'Foreign Languages' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Chinese (Mandarin)', label: 'Chinese (Mandarin)' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Arabic', label: 'Arabic' },
    { value: 'Russian', label: 'Russian' },
    {
      value: 'Specialized & Advanced Subjects',
      label: 'Specialized & Advanced Subjects',
    },
    { value: 'Advanced Mathematics', label: 'Advanced Mathematics' },
    { value: 'Differential Equations', label: 'Differential Equations' },
    { value: 'Linear Algebra', label: 'Linear Algebra' },
    { value: 'Discrete Math', label: 'Discrete Math' },
    {
      value: 'Computer Science & Technology',
      label: 'Computer Science & Technology',
    },
    {
      value: 'Programming (Python, Java, C++)',
      label: 'Programming (Python, Java, C++)',
    },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Cybersecurity', label: 'Cybersecurity' },
    { value: 'AI and Machine Learning', label: 'AI and Machine Learning' },
    { value: 'Business & Economics', label: 'Business & Economics' },
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Entrepreneurship', label: 'Entrepreneurship' },
    {
      value: 'Microeconomics/Macroeconomics',
      label: 'Microeconomics/Macroeconomics',
    },
  ];

  const handleSelectduration = (duration: any) => {
    setSelectedDuration(duration);
    setIsDurationOpen(false);
  };

  const handleTimeSelect = (time: any) => {
    handleBookingInputChange('time', time);
    setSelectedTime(time);
    setIsOpentime(false);
  };
  // date picker-----------------------------------
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add previous month's days
    const prevMonthDays = firstDay;
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.push({
        day: new Date(currentDate.getFullYear(), currentDate.getMonth(), -i).getDate(),
        isCurrentMonth: false,
      });
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // Add next month's days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    const today = new Date();

    // Ensure currentDate is a valid Date object
    if (!currentDate || !(currentDate instanceof Date)) {
      console.error('currentDate is not defined or not a valid Date object');
      return;
    }

    // Calculate the previous month
    const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);

    // Prevent navigating to a date earlier than today's month and year
    if (
      previousMonthDate.getFullYear() < today.getFullYear() ||
      (previousMonthDate.getFullYear() === today.getFullYear() &&
        previousMonthDate.getMonth() < today.getMonth())
    ) {
      toast({
        title: 'Invalid Navigation',
        description: 'Cannot navigate to a previous month before the current date.',
        variant: 'default',
      });
      return; // Exit without updating
    }

    // Update state to the previous month
    setCurrentDate(previousMonthDate);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // -------------------------------------------

  const levelOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'level1', label: 'Level 1' },
    { value: 'level2', label: 'Level 2' },
    { value: 'level3', label: 'Level 3' },
    { value: 'level4', label: 'Level 4' },
    { value: 'level5', label: 'Level 5' },
    { value: 'level6', label: 'Level 6' },
    { value: 'level7', label: 'Level 7' },
    { value: 'level8', label: 'Level 8' },
    { value: 'level9', label: 'Level 9' },
    { value: 'level10', label: 'Level 10' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const togglememberDropdown = () => setIsmemberOpen(!isOpen);

  const handleSelect = (membership: React.SetStateAction<null>) => {
    setSelectedMembership(membership);
    setIsmemberOpen(false);
  };
  const toggleSubjectDropdown = () => {
    setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
    setIsOpen(false);
    setIsmemberOpen(false);
    setIsGenderOpen(false);
    setIsLevelOpen(false);
  };

  const handleSubjectClick = (subject: any) => {
    // Toggle the subject in selectedSubjects array
    // @ts-ignore
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((item: any) => item !== subject));
    } else {
      // @ts-ignore
      setSelectedSubjects([...selectedSubjects, subject]);
    }

    // Update searchParams to reflect the new selected subjects

    setSearchParams((prev: any) => ({
      ...prev,
      // @ts-ignore
      subjects: selectedSubjects.includes(subject)
        ? selectedSubjects.filter((item: any) => item !== subject)
        : [...selectedSubjects, subject],
    }));
  };

  const removeSubject = (subject: any) => {
    setSelectedSubjects(selectedSubjects.filter((item: any) => item !== subject));
  };
  const [filteredTutors, setFilteredTutors] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsSubjectDropdownOpen(false);
    setIsmemberOpen(false);
    setIsGenderOpen(false);
    setIsLevelOpen(false);
    setIsGenderOpen(false);
  };
  const toggleLevelDropdown = () => {
    setIsLevelOpen(!isLevelOpen);
    setIsmemberOpen(false);
    setIsGenderOpen(false);
    setIsOpen(false);
    setIsGenderOpen(false);
  };

  const handleOptionClick = (value: string) => {
    // Update selectedOption for UI display
    setSelectedOption(value);

    // Update the sortBy field in searchParams
    setSearchParams(prev => ({
      ...prev,
      sortBy: value,
    }));

    // Close dropdown after selecting an option
    setIsOpen(false);
  };

  const handleInputChange = (field: string, value: any[]) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  const handleLevelClick = (level: string) => {
    setSelectedLevel(level);
    setIsLevelOpen(false);
    onLevelChange(level);
  };

  const handleRemoveSubject = (subject: any) => {
    handleInputChange(
      'subjects',
      searchParams.subjects.filter(s => s !== subject)
    );
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const toggleGenderDropdown = () => {
    setIsGenderOpen(!isGenderOpen);
    setIsSubjectDropdownOpen(false);
    setIsmemberOpen(false);
    setIsOpen(false);
    setIsLevelOpen(false);
  };

  const handleGenderClick = (value: string) => {
    setSelectedGender(value); // Update the selected gender state
    setIsGenderOpen(false); // Close the gender dropdown

    // Update searchParams to reflect the selected gender
    setSearchParams(prev => ({
      ...prev,
      gender: value, // Set the selected gender in searchParams
    }));
  };

  const handleBackToSearch = () => {
    setisTrialSession(false);
    setShowResults(false);
    setShowProfile(false);
    setShowBooking(false);
  };

  const handleViewProfile = (tutor: ITeacher) => {
    setisTrialSession(false);
    setSelectedTutor(tutor); // Store the selected tutor
    setShowProfile(true); // Show the profile view
    setShowResults(false); // Hide the results (list of teachers)
  };

  const handleBackToResults = () => {
    setShowProfile(false);
    setShowResults(true);
  };

  const handleStartBooking = (tutor: ITeacher) => {
    if (isTrialSession === true) {
      setSelectedTutor(tutor);
      setShowBooking(true);
      setShowProfile(false);
      setBookingStep(1);
    } else {
      if (parentdata?.user?.sessionsPerMonth <= 0) {
        toast({
          title: 'Session Ended',
          description:
            'Your session has ended! Please subscribe to one of our plans to Book new sessions.',
          variant: 'default',
        });

        return;
      } else {
        const tutorLevel = parentdata.user.tutorLevel;

        if (tutorLevel === 'Junior' && tutor.level > 3) {
          toast({
            title: 'Invalid Selection',
            description: 'As a Junior Membership, you can only Book tutors under level 3.',
            variant: 'default',
          });
          return;
        } else if (tutorLevel === 'Senior' && (tutor.level < 1 || tutor.level > 7)) {
          toast({
            title: 'Invalid Selection',
            description: 'As a Senior, you can only Book tutors from level 1 to 7.',
            variant: 'default',
          });
          return;
        } else {
          setSelectedTutor(tutor);
          setShowBooking(true);
          setShowProfile(false);
          setBookingStep(1);
        }
      }
    }
  };
  // @ts-ignore
  const handleBookingInputChange = (field, value) => {
    setBookingInfo(prev => ({ ...prev, [field]: value }));
  };
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setBookingInfo(prev => ({ ...prev, date: date.toLocaleDateString() }));
    setIsOpen(false);
  };
  const checkAvailability = async () => {
    const { date, time } = bookingInfo;

    // Parse the selected date and time
    const selectedDateTime = new Date(date);
    const [selectedHours, selectedMinutes] = time.split(':').map(Number);
    selectedDateTime.setHours(selectedHours, selectedMinutes, 0, 0);

    // Get current date and time
    const currentDateTime = new Date();

    // Reset hours for date comparison
    const selectedDateOnly = new Date(date);
    selectedDateOnly.setHours(0, 0, 0, 0);

    const currentDateOnly = new Date();
    currentDateOnly.setHours(0, 0, 0, 0);

    // Check if selected date is in the past
    if (selectedDateOnly < currentDateOnly) {
      toast({
        title: 'Invalid Date',
        description: 'Cannot select a past date.',
        variant: 'default',
      });
      return false;
    }

    // If it's today, check if selected time is at least 1 hour in the future
    if (selectedDateOnly.getTime() === currentDateOnly.getTime()) {
      const oneHourFromNow = new Date();
      oneHourFromNow.setHours(currentDateTime.getHours() + 1);

      if (selectedDateTime < oneHourFromNow) {
        toast({
          title: 'Invalid Time Selection',
          description: 'Please select a time at least 1 hour from now.',
          variant: 'default',
        });
        return false;
      }
    }

    // Check for conflicts on the same date only
    const conflict = await sessionData.some((session: any) => {
      const sessionDateTime = new Date(session.date);

      // Compare dates first
      const sessionDateOnly = new Date(session.date);
      sessionDateOnly.setHours(0, 0, 0, 0);

      // If dates don't match, there's no conflict
      if (sessionDateOnly.getTime() !== selectedDateOnly.getTime()) {
        return false;
      }

      // If dates match, check if times conflict
      const [sessionHours, sessionMinutes] = session.time.split(':').map(Number);
      sessionDateTime.setHours(sessionHours, sessionMinutes, 0, 0);

      return !session.meetingCompleted && sessionDateTime.getTime() === selectedDateTime.getTime();
    });

    if (conflict) {
      toast({
        title: 'Time Not Available',
        description: 'This time slot is already booked on the selected date.',
        variant: 'default',
      });
      return false;
    }

    return true;
  };

  const validateSessionTime = (
    selectedDate: any,
    selectedTime: any,
    teacherId: any,
    bookedSessions: any[]
  ) => {
    // Convert selected date and time to Date object
    const [hours, minutes] = selectedTime.split(':');
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    // Filter sessions for the selected teacher and date
    const teacherSessions = bookedSessions.filter(session => {
      const sessionDate = new Date(session.date);
      return (
        session.teacher === teacherId &&
        sessionDate.getDate() === selectedDateTime.getDate() &&
        sessionDate.getMonth() === selectedDateTime.getMonth() &&
        sessionDate.getFullYear() === selectedDateTime.getFullYear()
      );
    });

    // Check each session time
    for (const session of teacherSessions) {
      const [sessionHours, sessionMinutes] = session.time.split(':');
      const sessionDateTime = new Date(session.date);
      sessionDateTime.setHours(parseInt(sessionHours), parseInt(sessionMinutes), 0, 0);

      // Calculate time difference in minutes
      const timeDifferenceInMinutes = Math.abs(
        (selectedDateTime.getTime() - sessionDateTime.getTime()) / (1000 * 60)
      );

      // If exact same time
      if (timeDifferenceInMinutes === 0) {
        return {
          isValid: false,
          message: 'This time slot is already booked.',
        };
      }

      // If selected time is within 1 hour after the session
      if (selectedDateTime > sessionDateTime && timeDifferenceInMinutes < 60) {
        return {
          isValid: false,
          message:
            'Cannot book within 1 hour after an existing session. Please select a time after ' +
            `${(parseInt(sessionHours) + 1).toString().padStart(2, '0')}:${sessionMinutes}`,
        };
      }

      // If selected time is within 1 hour before the session
      if (selectedDateTime < sessionDateTime && timeDifferenceInMinutes < 60) {
        return {
          isValid: false,
          message:
            'Cannot book within 1 hour before an existing session. Please select a different time.',
        };
      }
    }

    return {
      isValid: true,
      message: 'Time slot is available',
    };
  };

  const handleNextBookingStep = async () => {
    if (bookingStep === 1) {
      if (selectedSubjects.length === 0 || !selectedLevel) {
        toast({
          title: '',
          description: 'Kindly select both a subject and a level to proceed.',
          variant: 'default',
        });
        return; // Exit early to prevent proceeding
      }
    }
    if (bookingStep === 2) {
      if (!selectedTime || !selectedDate) {
        toast({
          title: '',
          description: 'Kindly select Date and Time to proceed.',
          variant: 'default',
        });
        return; // Exit early to prevent proceeding
      }
      const validation = validateSessionTime(
        selectedDate.toISOString(), // or however your date is formatted
        selectedTime,
        selectedTutor._id,
        bookedDate
      );
      if (!validation.isValid) {
        toast({
          title: 'Invalid Time Slot',
          description: validation.message,
          variant: 'destructive',
        });
        return false;
      }
      const isAvailable = await checkAvailability();
      if (!isAvailable) return;
    }
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    }
  };

  const handleConfirmBooking = async (teacherId: any) => {
    console.log('teacherId : ', teacherId);
    console.log('bookingInfo : ', bookingInfo);
    console.log('bookingInfo.subject : ', bookingInfo.subject.split(','));
    console.log('studentnote : ', studentnote);
    console.log('isTrialSession : ', isTrialSession);

    try {
      const response = await axios.post('/api/booking', {
        teacherId,
        subjects: bookingInfo.subject.split(','),
        level: bookingInfo.level,
        date: bookingInfo.date,
        time: bookingInfo.time,
        studentnote,
        IsTrialSession: isTrialSession,
      });

      console.log('response : ', response);

      toast({
        title: 'Success!',
        description: 'Request sent successfully!',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error booking session:', error);

      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'An error occurred while trying to book the session.',
        variant: 'destructive',
      });
    } finally {
      // setisTrialSession(false)
      setShowBooking(false);
      setShowResults(true);
      setShowProfile(false);
      setSelectedSubjects([]);
      setSelectedLevel('');
      await setBookingInfo({
        subject: '',
        level: '',
        date: '',
        time: '',
      });
    }
  };

  // search form -------------------------------------------------

  function searchTeachers(
    teachers: any,
    searchParams: {
      sortBy: string | number;
      searchTerm: string;
      subjects: any[];
      level: any;
      gender: any;
    }
  ) {
    let filteredTeachers = teachers;

    // Filter by sortBy
    if (searchParams.sortBy) {
      switch (searchParams.sortBy) {
        case 'createdAt':
          filteredTeachers = filteredTeachers.sort(
            // @ts-ignore
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          break;
        case 'firstName':
          // @ts-ignore
          filteredTeachers = filteredTeachers.sort((a, b) =>
            a.contactInformation.firstName.localeCompare(b.contactInformation.firstName)
          );
          break;
        case 'lastName':
          // @ts-ignore
          filteredTeachers = filteredTeachers.sort((a, b) =>
            a.contactInformation.lastName.localeCompare(b.contactInformation.lastName)
          );
          break;
        case 'age':
          // @ts-ignore
          filteredTeachers = filteredTeachers.sort((a, b) => a.age - b.age);
          break;
        case 'grade':
          // @ts-ignore
          filteredTeachers = filteredTeachers.sort((a, b) => a.grade - b.grade);
          break;
        default:
          break;
      }
    }

    // Filter by searchTerm
    if (searchParams.searchTerm) {
      filteredTeachers = filteredTeachers.filter(
        (teacher: any) =>
          teacher?.contactInformation.firstName
            .toLowerCase()
            .includes(searchParams.searchTerm.toLowerCase()) ||
          teacher?.contactInformation.lastName
            .toLowerCase()
            .includes(searchParams.searchTerm.toLowerCase()) ||
          teacher?.education.college
            .toLowerCase()
            .includes(searchParams.searchTerm.toLowerCase()) ||
          // @ts-ignore
          teacher?.education?.major?.some(subject =>
            subject.toLowerCase().includes(searchParams.searchTerm.toLowerCase())
          )
      );
    }

    // Filter by subjects
    if (searchParams.subjects.length > 0) {
      filteredTeachers = filteredTeachers.filter((teacher: any) =>
        searchParams.subjects.every(subject =>
          teacher?.experience.subjectsTutored.includes(subject)
        )
      );
    }

    // Filter by level
    if (searchParams.level) {
      filteredTeachers = filteredTeachers.filter(
        (teacher: any) => teacher?.level === searchParams.level
      );
    }

    // Filter by gender
    if (searchParams.gender) {
      filteredTeachers = filteredTeachers.filter(
        (teacher: any) => teacher?.contactInformation.gender === searchParams.gender
      );
    }

    return filteredTeachers;
  }

  const handleSearched = async () => {
    if (isLoading3) {
      setloading(true);
    }
    setloading(true);
    const searchResults = await searchTeachers(teacher, searchParams);
    setFilteredTutors(searchResults);
    setShowResults(true);
    setShowProfile(false);
    setShowBooking(false);
    setloading(false);
  };

  if (isLoading3) {
    return <p className="text-black">Loading...</p>;
  }

  return (
    <div className="text-white">
      {!showResults && !showProfile && !showBooking && (
        <SearchForm
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
          selectedOption={selectedOption}
          handleOptionClick={handleOptionClick}
          options={options}
          setIsOpen={setIsOpen}
          searchParams={searchParams}
          handleInputChange={handleInputChange}
          isSubjectDropdownOpen={isSubjectDropdownOpen}
          toggleSubjectDropdown={toggleSubjectDropdown}
          subjectOptions={subjectOptions}
          selectedSubjects={selectedSubjects}
          handleSubjectClick={handleSubjectClick}
          removeSubject={removeSubject}
          isLevelOpen={isLevelOpen}
          toggleLevelDropdown={toggleLevelDropdown}
          levelOptions={levelOptions}
          selectedLevel={selectedLevel}
          handleLevelClick={handleLevelClick}
          isGenderOpen={isGenderOpen}
          toggleGenderDropdown={toggleGenderDropdown}
          genderOptions={genderOptions}
          selectedGender={selectedGender}
          handleGenderClick={handleGenderClick}
          isLoading3={isLoading3}
          loading={loading}
          handleSearched={handleSearched}
          setIsSubjectDropdownOpen={setIsSubjectDropdownOpen}
          setIsLevelOpen={setIsLevelOpen}
        />
      )}

      {showResults && (
        <ResultsView
          toggleDropdown={toggleDropdown}
          isOpen={isOpen}
          options={options}
          selectedOption={selectedOption}
          handleOptionClick={handleOptionClick}
          searchTeachers={searchTeachers}
          teacher={teacher}
          searchParams={searchParams}
          handleInputChange={handleInputChange}
          filteredTutors={filteredTutors}
          handleBackToSearch={handleBackToSearch}
          handleViewProfile={handleViewProfile}
          setIsOpen={setIsOpen}
        />
      )}
      {showProfile && (
        <ProfileView
          tutor={selectedTutor}
          showTerminateEngament={showTerminateEngament}
          sessionData={sessionData}
          session={session}
          parentdata={parentdata}
          setActiveMYEtutor={setActiveMYEtutor}
          showchat={showchat}
          messagetutor={messagetutor}
          setisTrialSession={setisTrialSession}
          isTrialSession={isTrialSession}
          setIsmemberOpen={setIsmemberOpen}
          selectedMembership={selectedMembership}
          ismemberOpen={ismemberOpen}
          setIsDurationOpen={setIsDurationOpen}
          selectedDuration={selectedDuration}
          handleSelect={handleSelect}
          memberships={memberships}
          handleStartBooking={handleStartBooking}
          handleSelectduration={handleSelectduration}
          durations={durations}
          isDurationOpen={isDurationOpen}
        />
      )}
      {showBooking && (
        <BookingView
          tutor={selectedTutor}
          bookingStep={bookingStep}
          toggleSubjectDropdown={toggleSubjectDropdown}
          selectedSubjects={selectedSubjects}
          isSubjectDropdownOpen={isSubjectDropdownOpen}
          setIsSubjectDropdownOpen={setIsSubjectDropdownOpen}
          subjectOptions={subjectOptions}
          handleSubjectClick={handleSubjectClick}
          isTrialSession={isTrialSession}
          toggleLevelDropdown={toggleLevelDropdown}
          isLevelOpen={isLevelOpen}
          levelOptions={levelOptions}
          selectedLevel={selectedLevel}
          handleLevelClick={handleLevelClick}
          handleNextBookingStep={handleNextBookingStep}
          setisTrialSession={setisTrialSession}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          currentDate={currentDate}
          months={months}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          generateDays={generateDays}
          selectedTime={selectedTime}
          handleTimeSelect={handleTimeSelect}
          studentnote={studentnote}
          handleConfirmBooking={handleConfirmBooking}
          removeSubject={removeSubject}
          setIsLevelOpen={setIsLevelOpen}
          setStudentnote={setStudentnote}
          bookingInfo={bookingInfo}
        />
      )}
    </div>
  );
};

export default ETutorSearch;
