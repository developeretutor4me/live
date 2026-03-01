
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import calendaricon from "../../../../public/calendaricongray.svg";
import level1 from "../../../../public/level-1.svg";
import level2 from "../../../../public/level-2.svg";
import level3 from "../../../../public/level-3.svg";
import level4 from "../../../../public/level-4.svg";
import level5 from "../../../../public/level-5.svg";
import level6 from "../../../../public/level-6.svg";
import level7 from "../../../../public/level-7.svg";
import level8 from "../../../../public/level-8.svg";
import level9 from "../../../../public/level-9.svg";
import level10 from "../../../../public/level-10.svg";
import stargolden from "../../../../public/StarGolden.svg";
import starblack from "../../../../public/Starblack.svg";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useTeacher } from "@/app/admin/hooks/useTeacher";
import {
  ChevronDown,
  ChevronUp,
  X,
  Search,
  ArrowLeft,
  Check,
} from "lucide-react";
import searchicon from "../../../../public/search icon.svg";
import badge from "../../../../public/badge.svg";
import Image from "next/image";

import axios from "axios";
import { ITeacher } from "@/app/api/models/Teacher";
import { useBookedDate } from "@/app/admin/hooks/useBookedDate";

const options = [
  { value: "", label: "Sort by" },
  { value: "createdAt", label: "Joining Date" },
  { value: "firstName", label: "Alphabetical Order " },
  { value: "lastName", label: "Alphabetical Order " },
  { value: "age", label: "Age" },
  { value: "grade", label: "Grade" },
];
const memberships = [
  { name: "Premium", price: 249, sessions: 8 },
  { name: "Standard", price: 139, sessions: 4 },
];
const durations = [
  {
    name: "3 Months Package",
    months: 3,
    discount: "5% off",
  },
  {
    name: "6 Months Package",
    months: 6,
    discount: "10% off",
  },
  {
    name: "12 Months Package",
    months: 12,
    discount: "15% off",
  },
];

interface ETutorSearchprops {
  sessiontutor: any;
  messagetutor: any;
  setActiveMYEtutor: (item: string) => void;
  parentdata: any;
  showchat: any;
  trialrequest: any;
  sessionData: any;
  showTerminateEngament:any
}
const ETutorSearch = ({
  showchat,
  sessiontutor,
  messagetutor,
  setActiveMYEtutor,
  trialrequest,
  parentdata,
  sessionData,
  showTerminateEngament
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
  const [selectedTime, setSelectedTime] = useState("");
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<any>([]);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedTutor, setSelectedTutor] = useState<ITeacher | any>(null);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(true);
  const [studentnote, setStudentnote] = useState("");
  const [searchParams, setSearchParams] = useState({
    sortBy: "",
    searchTerm: "",
    subjects: [],
    level: "",
    gender: "",
    tutorLevel: "",
  });
  const { teacher, isLoading3, error3 } = useTeacher();
  const [isOpendate, setIsOpendate] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [isTrialSession, setisTrialSession] = useState(trialrequest || false);
  const [bookingInfo, setBookingInfo] = useState({
    subject: "",
    level: "",
    date: "",
    time: "",
  });


  

  useEffect(() => {
    setBookingInfo((prev) => ({
      ...prev,
      subject: selectedSubjects.join(", "), // joining subjects as a comma-separated string
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

  function onLevelChange(level: any) {
    setBookingInfo((prevBookingInfo) => ({
      ...prevBookingInfo,
      level, // Update the level in bookingInfo
    }));
  }
  const subjectOptions = [
    { value: "Mathematics", label: "Mathematics" },
    { value: "Algebra", label: "Algebra" },
    { value: "Geometry", label: "Geometry" },
    { value: "Calculus", label: "Calculus" },
    { value: "Trigonometry", label: "Trigonometry" },
    { value: "Statistics", label: "Statistics" },
    { value: "Science", label: "Science" },
    { value: "Biology", label: "Biology" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Physics", label: "Physics" },
    { value: "Environmental Science", label: "Environmental Science" },
    { value: "Earth Science", label: "Earth Science" },
    { value: "English Language Arts", label: "English Language Arts" },
    { value: "Grammar", label: "Grammar" },
    { value: "Literature", label: "Literature" },
    { value: "Writing", label: "Writing" },
    { value: "Reading Comprehension", label: "Reading Comprehension" },
    { value: "Social Studies", label: "Social Studies" },
    {
      value: "History (World, U.S., Ancient)",
      label: "History (World, U.S., Ancient)",
    },
    { value: "Geography", label: "Geography" },
    { value: "Economics", label: "Economics" },
    { value: "Political Science", label: "Political Science" },
    { value: "Foreign Languages", label: "Foreign Languages" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Chinese (Mandarin)", label: "Chinese (Mandarin)" },
    { value: "Japanese", label: "Japanese" },
    { value: "Arabic", label: "Arabic" },
    { value: "Russian", label: "Russian" },
    {
      value: "Specialized & Advanced Subjects",
      label: "Specialized & Advanced Subjects",
    },
    { value: "Advanced Mathematics", label: "Advanced Mathematics" },
    { value: "Differential Equations", label: "Differential Equations" },
    { value: "Linear Algebra", label: "Linear Algebra" },
    { value: "Discrete Math", label: "Discrete Math" },
    {
      value: "Computer Science & Technology",
      label: "Computer Science & Technology",
    },
    {
      value: "Programming (Python, Java, C++)",
      label: "Programming (Python, Java, C++)",
    },
    { value: "Web Development", label: "Web Development" },
    { value: "Data Science", label: "Data Science" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "AI and Machine Learning", label: "AI and Machine Learning" },
    { value: "Business & Economics", label: "Business & Economics" },
    { value: "Accounting", label: "Accounting" },
    { value: "Marketing", label: "Marketing" },
    { value: "Finance", label: "Finance" },
    { value: "Entrepreneurship", label: "Entrepreneurship" },
    {
      value: "Microeconomics/Macroeconomics",
      label: "Microeconomics/Macroeconomics",
    },
  ];

  const handleSelectduration = (duration: any) => {
    setSelectedDuration(duration);
    setIsDurationOpen(false);
  };

  const handleTimeSelect = (time: any) => {
    handleBookingInputChange("time", time);
    setSelectedTime(time);
    setIsOpentime(false);
  };
  // date picker-----------------------------------
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
        day: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          -i
        ).getDate(),
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
      console.error("currentDate is not defined or not a valid Date object");
      return;
    }

    // Calculate the previous month
    const previousMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );

    // Prevent navigating to a date earlier than today's month and year
    if (
      previousMonthDate.getFullYear() < today.getFullYear() ||
      (previousMonthDate.getFullYear() === today.getFullYear() &&
        previousMonthDate.getMonth() < today.getMonth())
    ) {
      toast({
        title: "Invalid Navigation",
        description:
          "Cannot navigate to a previous month before the current date.",
        variant: "default",
      });
      return; // Exit without updating
    }

    // Update state to the previous month
    setCurrentDate(previousMonthDate);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  // -------------------------------------------

  const levelOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "level1", label: "Level 1" },
    { value: "level2", label: "Level 2" },
    { value: "level3", label: "Level 3" },
    { value: "level4", label: "Level 4" },
    { value: "level5", label: "Level 5" },
    { value: "level6", label: "Level 6" },
    { value: "level7", label: "Level 7" },
    { value: "level8", label: "Level 8" },
    { value: "level9", label: "Level 9" },
    { value: "level10", label: "Level 10" },
    { value: "advanced", label: "Advanced" },
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
      setSelectedSubjects(selectedSubjects.filter((item:any) => item !== subject));
    } else {
      // @ts-ignore
      setSelectedSubjects([...selectedSubjects, subject]);
    }

    // Update searchParams to reflect the new selected subjects

    setSearchParams((prev: any) => ({
      ...prev,
      // @ts-ignore
      subjects: selectedSubjects.includes(subject)
        ? selectedSubjects.filter((item:any) => item !== subject)
        : [...selectedSubjects, subject],
    }));
  };

  const removeSubject = (subject: any) => {
    setSelectedSubjects(selectedSubjects.filter((item:any) => item !== subject));
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
    setSearchParams((prev) => ({
      ...prev,
      sortBy: value,
    }));

    // Close dropdown after selecting an option
    setIsOpen(false);
  };

  const handleInputChange = (field: string, value: any[]) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
  };

  const handleLevelClick = (level: string) => {
    setSelectedLevel(level);
    setIsLevelOpen(false);
    onLevelChange(level);
  };

  const handleRemoveSubject = (subject: any) => {
    handleInputChange(
      "subjects",
      searchParams.subjects.filter((s) => s !== subject)
    );
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
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
    setSearchParams((prev) => ({
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
          title: "Session Ended",
          description:
            "Your session has ended! Please subscribe to one of our plans to Book new sessions.",
          variant: "default",
        });

        return;
      } else {
        const tutorLevel = parentdata.user.tutorLevel;

        if (tutorLevel === "Junior" && tutor.level > 3) {
          toast({
            title: "Invalid Selection",
            description:
              "As a Junior Membership, you can only Book tutors under level 3.",
            variant: "default",
          });
          return;
        } else if (
          tutorLevel === "Senior" &&
          (tutor.level < 1 || tutor.level > 7)
        ) {
          toast({
            title: "Invalid Selection",
            description:
              "As a Senior, you can only Book tutors from level 1 to 7.",
            variant: "default",
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
    setBookingInfo((prev) => ({ ...prev, [field]: value }));
  };
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setBookingInfo((prev) => ({ ...prev, date: date.toLocaleDateString() }));
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
        title: "Invalid Date",
        description: "Cannot select a past date.",
        variant: "default",
      });
      return false;
    }
  
    // If it's today, check if selected time is at least 1 hour in the future
    if (selectedDateOnly.getTime() === currentDateOnly.getTime()) {
      const oneHourFromNow = new Date();
      oneHourFromNow.setHours(currentDateTime.getHours() + 1);
  
      if (selectedDateTime < oneHourFromNow) {
        toast({
          title: "Invalid Time Selection",
          description: "Please select a time at least 1 hour from now.",
          variant: "default",
        });
        return false;
      }
    }
  
    // Check for conflicts on the same date only
    const conflict = await sessionData?.some((session: any) => {
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
        title: "Time Not Available",
        description: "This time slot is already booked on the selected date.",
        variant: "default",
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
          message: "This time slot is already booked."
        };
      }
  
      // If selected time is within 1 hour after the session
      if (selectedDateTime > sessionDateTime && timeDifferenceInMinutes < 60) {
        return {
          isValid: false,
          message: "Cannot book within 1 hour after an existing session. Please select a time after " +
                  `${(parseInt(sessionHours) + 1).toString().padStart(2, '0')}:${sessionMinutes}`
        };
      }
  
      // If selected time is within 1 hour before the session
      if (selectedDateTime < sessionDateTime && timeDifferenceInMinutes < 60) {
        return {
          isValid: false,
          message: "Cannot book within 1 hour before an existing session. Please select a different time."
        };
      }
    }
  
    return {
      isValid: true,
      message: "Time slot is available"
    };
  };

  const handleNextBookingStep = async() => {
    if (bookingStep === 1) {
      if (selectedSubjects.length === 0 || !selectedLevel) {
        toast({
          title: "",
          description: "Kindly select both a subject and a level to proceed.",
          variant: "default",
        });
        return; // Exit early to prevent proceeding
      }
    }
    if (bookingStep === 2) {
      if (!selectedTime || !selectedDate) {
        toast({
          title: "",
          description: "Kindly select Date and Time to proceed.",
          variant: "default",
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
          title: "Invalid Time Slot",
          description: validation.message,
          variant: "destructive",
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
    try {
      const response = await axios.post("/api/booking", {
        teacherId,
        subjects: [bookingInfo.subject],
        level: bookingInfo.level,
        date: bookingInfo.date,
        time: bookingInfo.time,
        bookingInfo,
        studentnote,
        IsTrialSession: isTrialSession,
      });

      toast({
        title: "Success!",
        description: "Request sent successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error booking session:", error);

      toast({
        title: "Uh oh! Something went wrong.",
        description: "An error occurred while trying to book the session.",
        variant: "destructive",
      });
    } finally {
      // setisTrialSession(false)
      setShowBooking(false);
      setShowResults(true);
      setShowProfile(false);
      setSelectedSubjects([]);
      setSelectedLevel("");
      await setBookingInfo({
        subject: "",
        level: "",
        date: "",
        time: "",
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
        case "createdAt":
          filteredTeachers = filteredTeachers.sort(
            // @ts-ignore
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          break;
        case "firstName":
          // @ts-ignore
          filteredTeachers = filteredTeachers.sort((a, b) =>
            a.contactInformation.firstName.localeCompare(
              b.contactInformation.firstName
            )
          );
          break;
        case "lastName":
          // @ts-ignore
          filteredTeachers = filteredTeachers.sort((a, b) =>
            a.contactInformation.lastName.localeCompare(
              b.contactInformation.lastName
            )
          );
          break;
        case "age":
          // @ts-ignore
          filteredTeachers = filteredTeachers.sort((a, b) => a.age - b.age);
          break;
        case "grade":
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
          teacher?.education?.major.some((subject) =>
            subject
              .toLowerCase()
              .includes(searchParams.searchTerm.toLowerCase())
          )
      );
    }

    // Filter by subjects
    if (searchParams.subjects.length > 0) {
      filteredTeachers = filteredTeachers.filter((teacher: any) =>
        searchParams.subjects.every((subject) =>
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
        (teacher: any) =>
          teacher?.contactInformation.gender === searchParams.gender
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

  const SearchForm = () => (
    <div className="space-y-4  bg-[#EDE8FA] px-6 py-6 rounded-3xl max-w-[62.5rem] mx-auto mt-9  min-h-screen  ">
      <div className="flex justify-between items-center flex-col custom-xl:flex-row space-x-2 pt-6">
        <h1 className=" text-3xl custom-xl:text-5xl font-bold text-[#685AAD] pl-10">
          Find eTutor
        </h1>

        {/* -----------sort by dropdown------- */}

        <div className="flex flex-wrap justify-end   gap-7 custom-xl:pr-8 w-fit flex-col custom-xl:flex-row mt-1">
          <div className="relative order-2 custom-xl:order-1  h-fit   w-full custom-xl:w-fit">
            <div
              className={`bg-[#DBCAFF] text-[#8c7bc4] text-xs sm:text-sm pl-10 pr-8 py-2 transition-all duration-500 rounded-full cursor-pointer select-none   flex items-center justify-between w-full custom-xl:w-[16.5rem] ${
                isOpen
                  ? "border  border-[#a394d6]"
                  : "border border-transparent"
              } `}
              onClick={toggleDropdown}
            >
              <span>
                {options.find((option) => option.value === selectedOption)
                  ?.label || "sort by"}
              </span>
              {isOpen ? (
                <ChevronUp className="text-[#a394d6]" />
              ) : (
                <ChevronDown className="text-[#a394d6]" />
              )}
            </div>

            {isOpen && (
              <div
                onMouseLeave={() => {
                  setIsOpen(false);
                }}
                className="py-3 max-w-[15.7rem] w-full transition-all duration-500  absolute top-full left-0 m-auto  bg-[#DBCAFF] border  border-[#a394d6] px-5 text-[#8f81c7] text-xs sm:text-sm mt-2.5  ml-1.5 rounded-xl shadow-lg z-10  h-fit"
              >
                <ul
                  id="style-2"
                  className=" overflow-y-auto max-h-[13rem] scrollstyle   "
                >
                  {options.map((option) => (
                    <li
                      key={option.value}
                      className={` first:pb-3 first:pt-0 py-3 cursor-pointer last:border-b-0 border-b border-[#8f81c7]  text-[#6C5BAA] text-lg max-w-[10.9rem]   ${
                        selectedOption === option.value ? "" : ""
                      }`}
                      onClick={() => handleOptionClick(option.value)}
                    >
                      <span className="pl-1 ">{option.label}</span>
                    </li>
                    // <div className="border-b border-[#8f81c7] w-full"></div>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ---------search bar top------- */}
          <div className="relative w-fit  h-fit order-1 custom-xl:order-2">
            <input
              type="text"
              placeholder="Search by eTutor's"
              className=" bg-[#DBCAFF] text-[#a394d6] placeholder-[#a394d6] px-10  py-2 rounded-full border border-transparent w-full  custom-xl:w-[19.4rem] focus:outline-none focus:ring-0"
              value={searchParams.searchTerm}
              // @ts-ignore
              onChange={(e: any) => {
                e.preventDefault();
                handleInputChange("searchTerm", e.target.value);
              }}
            />
            <Image  loading="lazy" 
              src={searchicon}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6949ff] w-4 h-4 "
              alt={""}
            />
          </div>
        </div>
      </div>

      <div className="  pt-[116px] ">
        <div className="w-full max-w-[36rem] mx-auto">
          <div className="relative  select-none">
            <div
              className="w-full bg-[#DBCAFF] text-[#a394d6]  text-sm custom-lg:text-xl custom-xl:text-2xl pr-7 sm:pr-14 pl-10 sm:pl-20 py-2 sm:py-4 rounded-full cursor-pointer flex justify-between items-center"
              onClick={toggleSubjectDropdown}
            >
              <span>
                {selectedSubjects.length > 0
                  ? `${selectedSubjects.length} selected`
                  : "select subject(s)"}
              </span>
              {isSubjectDropdownOpen ? (
                <ChevronUp size={30} className="text-[#a394d6] " />
              ) : (
                <ChevronDown size={30} className="text-[#a394d6] " />
              )}
            </div>

            {isSubjectDropdownOpen && (
              <div
                onMouseLeave={() => {
                  setIsSubjectDropdownOpen(false);
                }}
                className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[92%] mx-auto py-7  "
              >
                <div
                  id="style-2"
                  className="max-h-[16.4rem] overflow-y-scroll  "
                >
                  {subjectOptions.map((subject) => (
                    <div
                      key={subject.value}
                      className=" py-2 cursor-pointer flex items-center"
                      onClick={() => handleSubjectClick(subject.value)}
                    >
                      <div className=" border-b-2 border-[#a394d682] py-3 flex  gap-4  w-full px-4 max-w-[20rem]">
                        <div className="relative">
                          <input
                            type="checkbox"
                            // @ts-ignore
                            checked={selectedSubjects.includes(subject.value)}
                            onChange={() => {}}
                            className="absolute opacity-0 cursor-pointer"
                          />
                          <div
                            className={`h-7 w-7  border-2 border-[#6C5BAA] hover:bg-[#a394d6] hover:border-[#a394d6] rounded-md flex items-center justify-center 
                     ${
                       // @ts-ignore
                       selectedSubjects.includes(subject.value)
                         ? "bg-[#6c5baa]"
                         : ""
                     }`}
                          >
                            {
                              // @ts-ignore
                              selectedSubjects.includes(subject.value) && (
                                <Check />
                              )
                            }
                          </div>
                        </div>
                        <span className="ml-2 text-2xl text-[#6C5BAA] ">
                          {subject.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {selectedSubjects.length > 0 && (
            <div className="flex flex-wrap items-start justify-start gap-2 mt-6  max-w-[26rem] mx-auto min-h-[3.4rem]">
              {selectedSubjects.map((subject:any) => (
                <span
                  key={subject}
                  className="bg-[#6C5BAA] text-white px-4 py-1.5 rounded-full flex items-center   justify-between"
                >
                  {subject}
                  <X
                    className="ml-2 h-4 w-4 cursor-pointer"
                    onClick={() => removeSubject(subject)}
                  />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* level */}

        <div className="w-full max-w-[36rem] mx-auto mt-5">
          <div className="relative w-full select-none">
            <div
              className={`w-full bg-[#DBCAFF] text-[#a394d6]  text-sm custom-lg:text-xl custom-xl:text-2xl pr-7 sm:pr-14 pl-10 sm:pl-20 py-2 sm:py-4 rounded-full cursor-pointer flex justify-between items-center`}
              onClick={toggleLevelDropdown}
            >
              <span>{selectedLevel || "select level"}</span>

              {isLevelOpen ? (
                <ChevronUp size={30} className="text-[#a394d6] " />
              ) : (
                <ChevronDown size={30} className="text-[#a394d6] " />
              )}
            </div>
            {isLevelOpen && (
              <div
                onMouseLeave={() => {
                  setIsLevelOpen(false);
                }}
                className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[92%] mx-auto py-7  "
              >
                <div
                  id="style-2"
                  className="max-h-[16.4rem] overflow-y-scroll  "
                >
                  {levelOptions.map((level) => (
                    <div
                      key={level.value}
                      className=" py-2 text-2xl text-[#6C5BAA] border-b-2 border-[#a394d682]  max-w-[20rem] "
                      onClick={() => handleLevelClick(level.value)}
                    >
                      {level.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/*---------Select gender---  */}

        <div className="w-full max-w-[36rem] mx-auto mt-4">
          <div className="relative  select-none">
            <div
              className={`w-full bg-[#DBCAFF] text-[#a394d6]  text-sm custom-lg:text-xl custom-xl:text-2xl pr-7 sm:pr-14 pl-10 sm:pl-20 py-2 sm:py-4 rounded-full cursor-pointer flex justify-between items-center`}
              onClick={toggleGenderDropdown}
            >
              <span>{selectedGender || "select gender"}</span>

              {isGenderOpen ? (
                <ChevronUp size={30} className="text-[#a394d6]" />
              ) : (
                <ChevronDown size={30} className="text-[#a394d6]" />
              )}
            </div>
            {isGenderOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[90%] mx-auto py-5">
                {genderOptions.map((gender) => (
                  <div
                    key={gender.value}
                    className="py-2 text-2xl text-[#6C5BAA] border-b-2 border-[#a394d682] w-[80%] mx-auto"
                    onClick={() => handleGenderClick(gender.value)}
                  >
                    {gender.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ------range------ */}
        <div className="w-full max-w-[22rem] mx-auto mt-4">
          <div className="relative  select-none flex items-center flex-col justify-center">
            <span className="text-5xl text-[#685AAD] font-bold mt-5">
              {searchParams.tutorLevel}
            </span>
            <input
              type="range"
              min="1"
              max="10"
              // value={searchParams.tutorLevel}
              // onChange={(e) =>
              //   // handleInputChange("tutorLevel", parseInt(e.target.value))
              // }
              className="w-full scroll-smooth select-none mt-5  border-none accent-[#00DAE5]"
            />
            <p className="text-lg mt-2 mb-5 text-[#b9aed6]">
              Slide to adjust eTutor&apos;s level
            </p>
          </div>
        </div>

        <div className="mt-5 max-w-[22rem] w-full mx-auto flex items-center justify-center">
          <button
            onClick={async (e: any) => {
              if (isLoading3) {
              } else {
                handleSearched();
              }
            }}
            className=" w-full   bg-[#8653FF] text-white px-2 py-2 sm:py-4 font-bold text-xl rounded-full hover:bg-[#5a3dd8] transition-colors"
          >
            {loading ? "wait..." : "Search"}
          </button>
        </div>
        <div className="max-w-[40rem] w-full bg-[#e2d6fd] rounded-3xl  mt-10 px-12 py-4 mx-auto">
          <h1 className="text-[#685AAD] text-sm sm:text-xl font-bold">
            Want <span className="text-[#8653FF]"> discounts? </span>{" "}
          </h1>
          <p className="text-[#685AAD] text-md mt-3">
            Discounts apply when you book 6, 11, 26, or more sessions in bulk.{" "}
            <br />
            You will only be charged after you complete your sessions with the
            eTutors.
          </p>
        </div>
      </div>
      <style jsx>{`
        #style-2::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: #c9bbef;
        }

        #style-2::-webkit-scrollbar {
          width: 5px;
          background-color: transparent;
        }

        #style-2::-webkit-scrollbar-thumb {
          border-radius: 10px;

          background-color: #8f81c7;
        }
      `}</style>
    </div>
  );

  if (isLoading3) {
    return <p className="text-black">Loading...</p>;
  }
  // result view---------------------------------------------------
  const ResultsView = () => (
    <div className="bg-[#EDE8FA] w-full h-full rounded-3xl px-8 py-6">
      <div className="flex  mt-8 justify-between ">
        <h1 className="text-5xl font-bold text-[#685AAD] px-1 mb-3">
          Find your eTutor
        </h1>
        <div className="hidden custom-xl:flex flex-wrap justify-end   gap-8 w-fit flex-col custom-xl:flex-row ">
          <div className="relative order-2 custom-xl:order-1  h-fit   w-full custom-xl:w-fit">
            <div
              className={`bg-[#DBCAFF] text-[#8c7bc4] text-xs sm:text-sm pl-14 pr-12 py-3.5 transition-all duration-500 rounded-full cursor-pointer select-none   flex items-center justify-between w-full custom-xl:w-[21.5rem] ${
                isOpen
                  ? "border  border-[#a394d6]"
                  : "border border-transparent"
              } `}
              onClick={toggleDropdown}
            >
              <span>
                {options.find((option) => option.value === selectedOption)
                  ?.label || "sort by"}
              </span>
              {isOpen ? (
                <ChevronUp className="text-[#a394d6]" />
              ) : (
                <ChevronDown className="text-[#a394d6]" />
              )}
            </div>

            {isOpen && (
              <div
                onMouseLeave={() => {
                  setIsOpen(false);
                }}
                className="py-3 max-w-[90%] w-full transition-all duration-500  absolute top-full left-0 m-auto  bg-[#DBCAFF] border  border-[#a394d6] px-5 text-[#8f81c7] text-xs sm:text-sm mt-2.5  ml-1.5 rounded-xl shadow-lg z-10  h-fit"
              >
                <ul
                  id="style-2"
                  className=" overflow-y-auto max-h-[13rem] scrollstyle   "
                >
                  {options.map((option) => (
                    <li
                      key={option.value}
                      className={` first:pb-3 first:pt-0 py-3 cursor-pointer last:border-b-0 border-b border-[#8f81c7]  text-[#6C5BAA] text-sm max-w-[10.9rem]   ${
                        selectedOption === option.value ? "" : ""
                      }`}
                      onClick={() => {
                        handleOptionClick(option.value);

                        searchTeachers(teacher, searchParams);
                      }}
                      onMouseLeave={() => {
                        searchTeachers(teacher, searchParams);
                      }}
                      onMouseDown={() => {
                        searchTeachers(teacher, searchParams);
                      }}
                    >
                      <span className="pl-1">{option.label}</span>
                    </li>
                    // <div className="border-b border-[#8f81c7] w-full"></div>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ---------search bar top------- */}
          <div className="relative w-fit  h-fit order-1 custom-xl:order-2">
            <input
              type="text"
              placeholder="Search by eTutor's"
              className=" bg-[#DBCAFF] text-[#a394d6] placeholder-[#a394d6] px-10  py-3.5 rounded-full border border-transparent w-full  custom-xl:w-[24.8rem] focus:outline-none focus:ring-0"
              value={searchParams.searchTerm}
              // @ts-ignore
              onChange={(e: any) => {
                e.preventDefault();
                handleInputChange("searchTerm", e.target.value);
              }}
            />
            <Image  loading="lazy" 
              src={searchicon}
              className="absolute right-9 top-1/2 transform -translate-y-1/2 text-[#6949ff] w-4 h-4 "
              alt={""}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleBackToSearch}
        className="mb-4 flex items-center text-[#6949ff] hover:underline"
      >
        <ArrowLeft className="mr-2" /> Back to Search
      </button>

      <div className="flex flex-col gap-4 custom-lg:gap-9">
        {filteredTutors?.length > 0 &&
          filteredTutors?.map((teacher: any) => (
            <div
              // @ts-ignore
              key={teacher?._id}
              className="flex flex-col custom-xl:flex-row  justify-between bg-[#A296CC] rounded-3xl px-8 py-6 gap-6"
            >
              <div className="  h-fit  w-full custom-xl:max-w-[20rem] ">
                <div className="flex flex-col sm:flex-row justify-start items-center gap-6">
                  <img
                    // @ts-ignore
                    src={teacher?.user?.profilePicture || ""}
                    alt=""
                    // width={24}
                    // height={24}
                    className="w-24 h-24 rounded-full sm:mb-4 "
                  />

                  <div>
                    <h2 className="text-lg sm:text-3xl font-semibold  sm:text-start text-center capitalize">
                      {
                        // @ts-ignore
                        teacher?.contactInformation?.firstName
                      }{" "}
                      {
                        // @ts-ignore
                        teacher?.contactInformation?.lastName
                      }
                    </h2>
                    <p className="text-md sm:text-2xl  text-[#534988] sm:text-start text-center">
                      Bio
                    </p>
                    <p className="text-md sm:text-2xl font-bold  text-[#534988] sm:text-start text-center">
                      $20.00 Per Session
                    </p>
                  </div>
                </div>

                <div className=" flex flex-col items-center sm:items-start">
                  <div className="mt-2 flex flex-col items-center sm:items-start">
                    <h3 className="text-lg text-white">Availability:</h3>
                    <p className="text-lg text-[#473171] text-center sm:text-start">
                      {Object.entries(
                        // @ts-ignore
                        teacher?.experience?.generalAvailability
                      ).map(([day, times]) => (
                        <div key={day} className="flex">
                          <h3>{day} :</h3>{" "}
                          <p>
                            {
                              // @ts-ignore
                              times.join(", ")
                            }
                          </p>
                        </div>
                      ))}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col items-center sm:items-start">
                    <h3 className="text-lg text-white">Subjects:</h3>
                    <p className="text-lg text-[#473171] text-center sm:text-start">
                      {
                        // @ts-ignore
                        teacher?.experience?.subjectsTutored.map(subject => subject).join(',')
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="  custom-xl:max-w-[36rem] w-full ">
                <h3 className="text-lg ">About me</h3>
                <p className="text-lg text-[#473171]">
                  {
                    // @ts-ignore
                    teacher?.aboutyou || ""
                  }
                </p>

                <h3 className="text-lg  mt-6">Study</h3>
                <p className="text-lg text-[#473171]">
                  {
                    // @ts-ignore
                    teacher?.education?.degree
                  }
                </p>

                <h3 className="text-lg  mt-6">Teaching Experience</h3>
                <p className="text-lg text-[#473171]">
                  {
                    // @ts-ignore
                    teacher?.experience?.tutoringExperience || "Not Available"
                  }
                </p>
              </div>

              <div className="flex custom-xl:flex-col items-center justify-between  flex-row w-full custom-xl:w-32 ">
                <div className="w-16 h-16  sm:min-w-32 sm:min-h-32">
                  <Image  loading="lazy" 
                    src={
                      teacher?.level == "1"
                        ? level1
                        : teacher?.level == "2"
                        ? level2
                        : teacher?.level == "3"
                        ? level3
                        : teacher?.level == "4"
                        ? level4
                        : teacher?.level == "5"
                        ? level5
                        : teacher?.level == "6"
                        ? level6
                        : teacher?.level == "7"
                        ? level7
                        : teacher?.level == "8"
                        ? level8
                        : teacher?.level == "9"
                        ? level9
                        : teacher?.level == "10"
                        ? level10
                        : level1
                    }
                    alt=""
                    className="w-full h-full "
                  />
                </div>

                <button
                  onClick={() => handleViewProfile(teacher)} // Pass the entire tutor object
                  className="bg-[#8558F9] text-white py-2 px-6 rounded-full custom-xl:w-full hover:bg-purple-700 transition-colors"
                >
                  More info
                </button>
              </div>
            </div>
          ))}
      </div>

      <style jsx>{`
        #style-2::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: #c9bbef;
        }

        #style-2::-webkit-scrollbar {
          width: 5px;
          background-color: transparent;
        }

        #style-2::-webkit-scrollbar-thumb {
          border-radius: 10px;

          background-color: #8f81c7;
        }
      `}</style>
    </div>
  );

  // profile view-----------------------------------------

  const ProfileView: React.FC<{ tutor: ITeacher | any,showTerminateEngament?:any }> = ({ tutor,showTerminateEngament }) => {
    const [showterminateEngValue, setshowterminateEngValue] = useState(showTerminateEngament)
    const [sessionExists, setSessionExists] = useState(false);
    const [terminateEngPopUP, setterminateEngPopUP] = useState<any>(null)
    const [confirmTermination, setconfirmTermination] = useState(false)
    const [reason, setReason] = useState('');
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState(1);
  
    // A small array to map over for stars
    const stars = [1, 2, 3, 4, 5];
  
    const handleSubmit = () => {
      // Handle form submission
      alert(`Reason: ${reason}\nComments: ${comments}\nRating: ${rating}`);
    };


  useEffect(() => {
    setshowterminateEngValue(showTerminateEngament)
    async function checkSession() {
      if(tutor){

        const exists = await isTutorSessionExist(sessionData, tutor?._id);
        setSessionExists(exists);
      }
    }
    checkSession();
  }, []); 

    if (!tutor) return <h1 className="text-black">nothing available</h1>;


    async function deleteBookings(teacherId: string, studentId: string) {
      if(confirm("are you sure?")){
        setterminateEngPopUP(false)
        setconfirmTermination(false)
        setshowterminateEngValue(false)
        try {
          const res = await fetch('/api/delete-bookings', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ teacherId, studentId }),
          });
        
          if (!res.ok) {
            // Handle HTTP errors (e.g., 400, 500)
            const errorData = await res.json();
            throw new Error(errorData.message || 'Something went wrong');
          }
        
          const data = await res.json();
          alert("Engament Terminated")
          
          // Handle success case (maybe update UI or show a success message)
        } catch (error:any) {
          console.error('Error:', error.message);
          // Handle error case (e.g., show error notification to user)
        }
      }
   
    }
    
  
    async function isTutorSessionExist(sessionData: any, tutorId: any) {
     
      
      return sessionData?.some((request: any) => request?.teacher?._id === tutorId);
  }
 

    return (
      <div className="bg-[#EDE8FA] rounded-3xl p-8 flex flex-col custom-xl:flex-row gap-5">
        {/* Left column */}
        <div className="w-full custom-xl:w-[63%] space-y-4">
          {/* Profile card */}
          <div className="bg-[#A296CC] rounded-3xl pl-6 py-6 pr-3 sm:pr-8 ">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row  w-full sm:w-fit items-center gap-8 pl-6 pt-4">
                <img
                  src={tutor?.user?.profilePicture}
                  alt="Tutor"
                  className="w-20 h-20 sm:min-w-40 sm:min-h-40 rounded-full "
                />
                <div>
                  <h2 className="text-xl text-center sm:text-start sm:text-3xl font-semibold capitalize ">
                    {tutor?.contactInformation.firstName}{" "}
                    {tutor?.contactInformation.lastName}
                  </h2>
                  <p className="text-xl text-[#534988] max-w-[22rem] text-center sm:text-start">
                    EXPERIENCE (Formal): 1 to 3 years
                  </p>
                  <p className="text-xl text-[#534988] text-center sm:text-start">
                    BOOKINGs: {tutor?.totalbooking}
                  </p>
                </div>
              </div>

              <div className="w-28 h-28 hidden sm:block ">
                <Image
                  loading="lazy"
                  src={
                    tutor?.level == "1"
                      ? level1
                      : tutor?.level == "2"
                      ? level2
                      : tutor?.level == "3"
                      ? level3
                      : tutor?.level == "4"
                      ? level4
                      : tutor?.level == "5"
                      ? level5
                      : tutor?.level == "6"
                      ? level6
                      : tutor?.level == "7"
                      ? level7
                      : tutor?.level == "8"
                      ? level8
                      : tutor?.level == "9"
                      ? level9
                      : tutor?.level == "10"
                      ? level10
                      : level1
                  }
                  alt=""
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className=" mt-8">
              <div>
                <p className="text-lg text-white">About me</p>
                <p className="text-[#473171] text-lg">
                  {tutor?.aboutyou || "Not Available"}
                </p>
              </div>
            </div>

            <div className="flex justify-between flex-col sm:flex-row  mt-8 pr-4">
              <div className="">
                <div className="mb-8">
                  <h3 className="text-lg text-white">Availability:</h3>
                  <p className="text-[#473171] text-lg">
                    {Object.entries(tutor?.experience?.generalAvailability).map(
                      ([day, times]) => (
                        <div key={day} className="flex">
                          <h3>{day} :</h3>{" "}
                          <p>
                            {
                              // @ts-ignore
                              times.join(", ")
                            }
                          </p>
                        </div>
                      )
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg text-white">Subjects:</h3>
                  <p className="text-[#473171] text-lg">
                    {tutor?.experience.subjectsTutored.join(", ")}
                  </p>
                </div>
              </div>

              <div className=" ">
                <div className="mb-8">
                  <h3 className="text-lg text-white">Study</h3>
                  <p className="text-[#473171] text-lg">
                    {tutor?.education.degree}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg text-white">Teaching Experience</h3>
                  <p className="text-[#473171] text-lg">
                    {tutor?.experience?.tutoringExperience || "Not Available"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* buttons ----------------------------------------------- */}
          <div className="grid grid-col-1 2xl:grid-cols-2  py-2 items-center gap-2 2xl:gap-4">
            <div
              onClick={() => {
                setActiveMYEtutor("My eTutor");
                messagetutor(tutor);
                showchat(true);
              }}
              className="bg-[#EDE8FA] rounded-2xl  flex justify-center sm:justify-start   "
            >
              <button className="bg-[#8653FF] px-5  py-2  sm:px-12 sm:py-4 rounded-full text-2xl custom-xl:text-4xl w-full">
                Message eTutor
              </button>
            </div>

            {showterminateEngValue && sessionExists && (
              <>
                <button
                  onClick={() => {
                    // deleteBookings(tutor._id,parentdata?.user?._id)
                    setterminateEngPopUP(true);
                  }}
                  className="bg-[#FC7777] px-5  py-2  sm:px-12 sm:py-4 rounded-full text-2xl custom-xl:text-4xl truncate  w-full"
                >
                  Terminate Engament
                </button>
              </>
            )}
          </div>

          {terminateEngPopUP && !confirmTermination  && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-50  w-screen flex items-center justify-center backdrop-blur-sm h-screen scrollbar-none !m-0">
              <div className="">
                <div className="w-full max-w-[400px] md:max-w-[773px]  bg-white rounded-3xl  px-5 md:px-14 py-5 md:py-14 flex flex-col ">
                  <h2 className="text-2xl md:text-[58.43px] leading-none font-bold text-[#fd8585]">
                    Confirmation
                  </h2>
                  <p className="text-lg md:text-[27.71px] leading-tight text-[#8653FF]  mt-4 ">
                    Are you sure you want to terminate your engagement with
                    {tutor?.contactInformation.firstName}? This action cannot be
                    undone.
                  </p>
                  <div className="flex gap-2 sm:gap-4 md:gap-8 mt-4 md:mt-16">
                    <button
                      onClick={() => {
                        setterminateEngPopUP(false);
                      }}
                      className="px-10 py-3.5 bg-[#FC7777] text-white text-base md:text-[32.63px] leading-tight w-full rounded-2xl"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setconfirmTermination(true);
                      }}
                      className="px-10 py-3.5 bg-[#8653FF] text-white text-base md:text-[32.63px] leading-tight w-full rounded-2xl"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {(terminateEngPopUP && confirmTermination ) && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-50  w-screen flex items-start justify-center backdrop-blur-sm h-screen scrollbar-none !mt-0 overflow-y-auto">
              <div className="my-12 custom-xl:my-[67px] ">
                {/* Container */}
                <div className="w-full max-w-[725.17px] rounded-2xl bg-white p-6 shadow-lg md:px-11 md:py-10 ">
                  {/* Heading */}
                  <h1 className=" text-[24px] font-bold text-[#fd8585] md:text-[45.28px] leading-none">
                    Engagement Termination
                  </h1>

                  {/* Subtext */}
                  <p className="mt-5  text-[14px]  text-[#685AAD] md:text-[21.47px] leading-tight">
                    Please let us know why you’re choosing to terminate this
                    engagement. Your feedback helps us improve our services
                  </p>

                  {/* Divider (optional) */}
                  <hr className="my-5 border-[#685AAD]" />

                  {/* Rating Label */}
                  <p className="mb-4 pt-4 text-[14px] font-medium text-[#685AAD] md:text-[28.16px] leading-tight">
                    Please rate your experience with Mr.{" "}
                    {tutor?.contactInformation.firstName}
                  </p>

                  {/* Star Rating */}
                  <div className="mb-8 flex items-center space-x-7">
                    {stars.map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        {star <= rating ? (
                          // Filled star (e.g. first star = gold, rest = purple if you prefer)
                          <Image src={stargolden} alt="" />
                        ) : (
                          // Empty / alternate color star
                          <Image src={starblack} alt="" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Select Reason */}
                  <label
                    htmlFor="reason"
                    className="mb-4 pt-0.5 block text-[14px] font-medium text-[#685AAD] md:text-[28.16px] leading-tight"
                  >
                    Select a reason
                  </label>
                  <select
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="mb-6 w-full rounded-md border border-[#776BB5] bg-white px-6 py-5 text-[14px] text-gray-700 focus:outline-none md:text-[22.02px] md:leading-tight"
                  >
                    <option value="" disabled className="">
                      Select a reason
                    </option>
                    <option value="Personal Reasons">Personal Reasons</option>
                    <option value="Scheduling Conflicts">
                      Scheduling Conflicts
                    </option>
                    <option value="Financial Reasons">Financial Reasons</option>
                    <option value="Other">Other</option>
                  </select>

                  {/* Additional Comments */}
                  <label
                    htmlFor="comments"
                    className="mb-4 pt-0.5 block text-[14px] font-medium text-[#685AAD] md:text-[28.16px] leading-tight"
                  >
                    Additional comments
                  </label>
                  <textarea
                    id="comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="mb-8 w-full rounded-md border border-[#776BB5] px-3 py-2 text-[14px] text-gray-700 focus:outline-none md:text-[15px]"
                    rows={4}
                    placeholder="additional comments"
                  ></textarea>

                  {/* Submit Button */}
                  <div className="flex justify-between mb-2">
                    <span>&nbsp; </span>
                    <button
                      onClick={()=>{
                        deleteBookings(tutor._id,parentdata?.user?._id)
                        // handleSubmit
                      
                      }}
                      className=" rounded-xl bg-[#fd8585] py-4 px-11  text-[15px] font-medium text-white transition hover:bg-[#fd7575] md:text-[30.18px] leading-none"
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews card */}
          <div className="bg-[#A296CC] rounded-3xl p-7">
            <div className="">
              <h1 className="text-xl sm:text-3xl font-medium mb-4 pl-3">
                Qualifications
              </h1>

              <div>
                <div className="w-full  mx-auto bg-purple-600 rounded-t-3xl rounded-b-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#534988] text-white ">
                        <th className="py-3  text-sm sm:text-xl font-medium pl-12 ">
                          SUBJECT/TUTORING
                        </th>
                        {/* <th className="py-3 px-4 text-sm sm:text-xl font-medium">
                          LEVEL
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {tutor?.experience?.subjectsTutored.map(
                        (subject: any, index: any) => (
                          <tr
                            key={index}
                            className="border-b border-[#75699C] last:border-b-0 bg-[#8876b8] "
                          >
                            <td className="py-3 px-4 text-white  text-sm sm:text-xl border-r border-[#75699C]">
                              {subject}
                            </td>
                            {/* <td className="py-3 px-4 text-xs sm:text-md text-white">
                            
                          </td> */}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-[#A296CC] rounded-3xl ">
              <div>
                <h1 className="text-xl sm:text-3xl font-medium mb-8 pl-3 mt-8">
                  Reviews
                </h1>
                <div className="bg-[#8876B8] rounded-3xl px-7 py-7">
                  <div className="py-1 px-10 bg-[#534988] rounded-xl flex justify-end text-xs sm:text-lg">
                    8 Reviews in total
                  </div>
                  <div>
                    <div className="flex  items-center gap-4 py-6 border-b border-[#ffffff2c]">
                      <img
                        src="/assets/heroimg.png"
                        alt=""
                        className="w-8 sm:w-20 rounded-full border-2"
                      />
                      <div>
                        <h1 className="text-xl sm:text-3xl font-medium">
                          Kishwar A.
                        </h1>
                        <p className="text-xs sm:text-md">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Consequatur, aperiam.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div
          onMouseLeave={() => {
            setIsmemberOpen(false);
            setIsDurationOpen(false);
          }}
          className=" w-full custom-xl:w-[37%] space-y-4 "
        >
          {/* Booking card */}
          <div className="bg-[#A296CC] rounded-3xl p-10 ">
            <h2 className="text-xl sm:text-5xl font-bold mb-4">
              Book {tutor?.contactInformation.firstName}
            </h2>
            <p className="text-xs sm:text-md mb-4 text-[#564589] font-medium">
              You can change your membership by selecting one of the two other
              plans listed below, or visit the{" "}
              <span className="text-[#6949FF]">My Membership</span> page for
              more information.
            </p>
            {/* drop downs */}
            {/* membership drop down */}
            <div className="bg-[#685AAD] py-3 sm:py-6 px-2 sm:px-4 rounded-xl font-sans relative mb-4">
              <button
                onClick={() => {
                  setisTrialSession(false);
                  setIsmemberOpen((prevState) => !prevState);
                  setIsDurationOpen(false);
                }}
                className={`w-full bg-purple-600 text-[#B3ACD6] py-3 px-4 rounded-lg flex justify-between items-center ${
                  ismemberOpen && "text-white"
                }`}
              >
                <span className="text-xl font-bold">
                  {selectedMembership ? (
                    <span className="text-white">
                      {
                        // @ts-ignore
                        selectedMembership?.name
                      }
                    </span>
                  ) : (
                    "Select membership"
                  )}
                </span>
                {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>

              {ismemberOpen && (
                <div className="absolute z-50 left-0 w-full bg-[#685AAD] rounded-lg shadow-lg mt-7">
                  {memberships.map((membership) => (
                    <div
                      key={membership.name}
                      // @ts-ignore
                      onClick={() => handleSelect(membership)}
                      className="p-4 hover:bg-purple-700 cursor-pointer border-b border-purple-500 last:border-b-0 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {membership.name}
                        </h3>
                        <p className="text-purple-200">
                          <span className="text-2xl font-bold">
                            ${membership.price}
                          </span>{" "}
                          /{" "}
                          <span className="font-semibold">
                            {membership.sessions} sessions /{" "}
                            <span className="text-[#00dae5]">month</span>{" "}
                          </span>
                        </p>
                      </div>
                      {
                        // @ts-ignore
                        selectedMembership?.name === membership.name && (
                          <Check size={24} className="text-white" />
                        )
                      }
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* duration drop down */}

            <div className="bg-[#685AAD] py-3 sm:py-6 px-2 sm:px-4 rounded-xl font-sans relative mb-4">
              <button
                onClick={() => {
                  setisTrialSession(false);
                  setIsDurationOpen((prevState) => !prevState);
                  setIsmemberOpen(false);
                }}
                className="w-full bg-purple-600 text-[#B3ACD6] py-3 px-4 rounded-lg flex justify-between items-center"
              >
                <span
                  className={`text-xl font-bold ${
                    isDurationOpen && "text-white transition-all duration-300"
                  }`}
                >
                  {selectedDuration ? (
                    <span className="text-white">
                      {
                        // @ts-ignore
                        selectedDuration.name
                      }
                    </span>
                  ) : (
                    "Select package duration"
                  )}
                </span>
                {isDurationOpen ? (
                  <ChevronUp size={24} />
                ) : (
                  <ChevronDown size={24} />
                )}
              </button>

              {isDurationOpen && (
                <div className="absolute left-0 w-full bg-[#685AAD] rounded-lg shadow-lg mt-8  transition-transform duration-500">
                  {durations.map((duration) => (
                    <div
                      key={duration.name}
                      onClick={() => {
                        handleSelectduration(duration);
                        setisTrialSession(false);
                      }}
                      className="p-9 hover:bg-purple-700 cursor-pointer border-b border-purple-500 last:border-b-0 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-2xl  text-white">
                          {duration.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="text-xs sm:text-lg mb-4">
              You currently have the{" "}
              <span className="text-[#6949FF]">Pay As You Go</span> membership
              plan. This free plan allows you to book an eTutor at any time,
              paying only the fees listed for each session. No upfront costs or
              subscription fees
            </p>

            <div className="flex items-center mb-4">
              <div className="bg-[#8653FF] rounded-full p-1 mr-2">
                <Check size={20} color="white" className="font-bold" />
              </div>
              <span className="text-sm">
                Hear from 2/3 tutors like Lastname
              </span>
            </div>

            <div className="bg-[#B9AFDB] p-6 rounded-3xl">
              {isTrialSession === true &&
              parentdata?.user?.TrialSessionLeft > 0 ? (
                <button
                  onClick={() => {
                    handleStartBooking(tutor);
                    setisTrialSession(true);
                  }}
                  className="w-full bg-[#8653FF] text-white py-2 sm:py-4 text-xl rounded-full mb-4 font-semibold"
                >
                  Trial Session
                </button>
              ) : (
                <button
                  onClick={() => handleStartBooking(tutor)}
                  className="w-full bg-[#8653FF] text-white py-2 sm:py-4 text-xl rounded-full mb-4 font-semibold"
                >
                  Book Session
                </button>
              )}

              <button
                onClick={() => {
                  setActiveMYEtutor("My Membership");
                }}
                className="w-full bg-[#564589] text-white py-2 sm:py-4 text-xl rounded-full  font-semibold"
              >
                Your Packages
              </button>
            </div>
          </div>

          {/* 24/7 Support card */}
          <div
            onClick={() => {
              setActiveMYEtutor("Contact Support");
            }}
            className="bg-[#A296CC] rounded-2xl p-6 hover:cursor-pointer"
          >
            <h3 className="font-semibold mb-2 text-lg text-white">
              24/7 SUPPORT
            </h3>
            <p className="text-sm text-[#473171]">Need help?</p>
            <p className="text-sm text-[#473171]">Contact us</p>
          </div>
        </div>
      </div>
    );
  };

  const progressPercentage = bookingStep * 33.33;
  const BookingView: React.FC<{ tutor: ITeacher | any }> = ({ tutor }) => {
    return (
      <div className=" flex  relative items-start">
        <div
          className={`space-y-4 mt-8 bg-[#EDE8FA] px-6 py-8 rounded-3xl   ${
            bookingStep === 2
              ? "max-w-[49rem] w-full  mx-auto"
              : "max-w-[62.5rem] w-full mx-auto "
          }  min-h-screen `}
        >
          <div className="w-full bg-[#e9deff] rounded-full h-[4px] mb-24">
            <div
              className="bg-[#6949ff] h-[4px] rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {bookingStep === 1 && (
            <div>
              <div className="flex flex-col items-center">
                <div className="photo mb-4 mt-4">
                  <img
                    src={tutor?.user.profilePicture}
                    alt=""
                    className="rounded-full h-44 w-44   overflow-hidden "
                  />
                </div>
                <div className="info mb-14 ">
                  <h1 className="text-3xl text-[#685AAD] font-bold text-center">
                    Booking Request -{" "}
                    {
                      // @ts-ignore
                      tutor?.contactInformation.firstName
                    }{" "}
                    <br />
                    {
                      // @ts-ignore
                      tutor?.contactInformation.lastName
                    }
                  </h1>
                  <p className="text-sm font-bold text-[#473171]  text-center">
                    eTutors might change their fees, we recommend booking in
                    bulk <br />
                    to reserve their current fees.
                  </p>
                </div>
              </div>

              <div className="w-full max-w-[36rem] mx-auto">
                <div className="relative  select-none">
                  <div
                    className="w-full bg-[#DBCAFF] text-[#a394d6]  text-sm custom-lg:text-xl custom-xl:text-2xl pr-7 sm:pr-14 pl-10 sm:pl-20 py-2 sm:py-4 rounded-full cursor-pointer flex justify-between items-center"
                    onClick={toggleSubjectDropdown}
                  >
                    <span>
                      {selectedSubjects.length > 0
                        ? `${selectedSubjects.length} selected`
                        : "select subject(s)"}
                    </span>
                    {isSubjectDropdownOpen ? (
                      <ChevronUp size={30} className="text-[#a394d6] " />
                    ) : (
                      <ChevronDown size={30} className="text-[#a394d6] " />
                    )}
                  </div>

                  {isSubjectDropdownOpen && (
                    <div
                      onMouseLeave={() => {
                        setIsSubjectDropdownOpen(false);
                      }}
                      className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[92%] mx-auto py-7  "
                    >
                      <div
                        id="style-2"
                        className="max-h-[16.4rem] overflow-y-scroll  "
                      >
                        {subjectOptions.map((subject) => (
                          <div
                            key={subject.value}
                            className=" py-2 cursor-pointer flex items-center"
                            onClick={() => handleSubjectClick(subject.value)}
                          >
                            <div className=" border-b-2 border-[#a394d682] py-3 flex  gap-4  w-full px-4 max-w-[20rem]">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={selectedSubjects.includes(
                                    // @ts-ignore
                                    subject.value
                                  )}
                                  onChange={() => {}}
                                  className="absolute opacity-0 cursor-pointer"
                                />
                                <div
                                  className={`h-7 w-7  border-2 border-[#6C5BAA] hover:bg-[#a394d6] hover:border-[#a394d6] rounded-md flex items-center justify-center 
                     ${
                       // @ts-ignore
                       selectedSubjects.includes(subject.value)
                         ? "bg-[#6c5baa]"
                         : ""
                     }`}
                                >
                                  {
                                    // @ts-ignore
                                    selectedSubjects.includes(subject.value) && <Check />
                                  }
                                </div>
                              </div>
                              <span className="ml-2 text-2xl text-[#6C5BAA] ">
                                {subject.label}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {selectedSubjects.length > 0 && (
                  <div className="flex flex-wrap items-start justify-start gap-2 mt-6  max-w-[26rem] mx-auto min-h-[3.4rem]">
                    {selectedSubjects.map((subject:any) => (
                      <span
                        key={subject}
                        className="bg-[#6C5BAA] text-white px-4 py-1.5 rounded-full flex items-center   justify-between"
                      >
                        {subject}
                        <X
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={() => removeSubject(subject)}
                        />
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* level */}

              <div className="w-full max-w-[36rem] mx-auto mt-4">
                <div className="relative w-full select-none">
                  <div
                    className={`w-full bg-[#DBCAFF] text-[#a394d6]  text-sm custom-lg:text-xl custom-xl:text-2xl pr-7 sm:pr-14 pl-10 sm:pl-20 py-2 sm:py-4 rounded-full cursor-pointer flex justify-between items-center`}
                    onClick={toggleLevelDropdown}
                  >
                    <span>{selectedLevel || "select level"}</span>

                    {isLevelOpen ? (
                      <ChevronUp size={30} className="text-[#a394d6] " />
                    ) : (
                      <ChevronDown size={30} className="text-[#a394d6] " />
                    )}
                  </div>
                  {isLevelOpen && (
                    <div
                      onMouseLeave={() => {
                        setIsLevelOpen(false);
                      }}
                      className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[92%] mx-auto py-7  "
                    >
                      <div
                        id="style-2"
                        className="max-h-[16.4rem] overflow-y-scroll  "
                      >
                        {levelOptions.map((level) => (
                          <div
                            key={level.value}
                            className=" py-2 text-2xl text-[#6C5BAA] border-b-2 border-[#a394d682]  max-w-[20rem] "
                            onClick={() => handleLevelClick(level.value)}
                          >
                            {level.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-32 mb-14 max-w-[22rem] w-full mx-auto flex items-center justify-center ">
                <button
                  onClick={handleNextBookingStep}
                  className=" w-full   bg-[#8653FF] text-white px-2 py-2 sm:py-4 font-bold text-xl rounded-full hover:bg-[#5a3dd8] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {bookingStep === 2 && (
            <div className="h-screen flex  justify-center  ">
              <div className="  flex items-center flex-col w-full">
                <h1 className="text-4xl text-[#685AAD] mb-12">
                  Choose a <span className="font-bold">date and time</span>
                </h1>

                {/* select a date */}
                <div className="w-full max-w-[482px] mx-auto relative ">
                  <div className="w-full max-w-[482px] mx-auto relative">
                    {/* Input field */}
                    <div
                      className="w-full bg-[#DBCAFF] text-[#a394d6] text-sm custom-lg:text-xl custom-xl:text-2xl pl-10 pr-8 py-2 sm:py-3 rounded-full cursor-pointer flex justify-between items-center"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span className="text-purple-400">
                        {selectedDate
                          ? // @ts-ignore
                            selectedDate.toLocaleDateString()
                          : "Select a date"}
                      </span>
                      <Image  loading="lazy"  src={calendaricon} alt="" className="w-6 h-6" />
                    </div>

                    {/* Calendar dropdown */}
                    {isOpen && (
                      <div className="bg-[#e2d5fd] text-[#a394d6] z-50 rounded-3xl p-4 shadow-lg absolute top-[72px] w-full  px-4 sm:px-10 py-4 sm:py-9">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-11  ">
                          <button
                            onClick={handlePrevMonth}
                            className="text-purple-600"
                          >
                            <ChevronLeft className="w-8 h-8 font-bold" />
                          </button>
                          <h2 className="text-[#685AAD] font-medium text-sm sm:text-xl custom-xl:text-3xl">
                            {months[currentDate.getMonth()]}{" "}
                            {currentDate.getFullYear()}
                          </h2>
                          <button
                            onClick={handleNextMonth}
                            className="text-purple-600"
                          >
                            <ChevronRight className="w-8 h-8 font-bold " />
                          </button>
                        </div>

                        {/* Days of week */}
                        <div className="grid grid-cols-7 gap-1 mb-2 ">
                          {["S", "M", "T", "W", "T", "F", "S"].map(
                            (day, index) => (
                              <div
                                key={index}
                                className="text-center text-[#76639b] text-sm sm:text-lg custom-xl:text-2xl font-medium"
                              >
                                {day}
                              </div>
                            )
                          )}
                        </div>

                        {/* Calendar grid */}
                        <div className="grid grid-cols-7 gap-1">
                          {generateDays().map((day, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (day.isCurrentMonth) {
                                  handleDateChange(
                                    new Date(
                                      currentDate.getFullYear(),
                                      currentDate.getMonth(),
                                      day.day
                                    )
                                  );
                                }
                              }}
                              className={`
                  p-2 text-center rounded-full text-sm sm:text-lg custom-xl:text-2xl font-medium
                  ${day.isCurrentMonth ? "text-[#685aad] " : "text-[#d3c6ef]"}
                  ${
                    // @ts-ignore
                    selectedDate &&
                    selectedDate.getDate() === day.day &&
                    selectedDate.getMonth() === currentDate.getMonth() &&
                    selectedDate.getFullYear() === currentDate.getFullYear()
                      ? ""
                      : ""
                  }
                `}
                            >
                              {day.day}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* seleect time */}
                <div className="w-full max-w-[482px] mx-auto mt-6 relative  ">
                  <div className="w-full  relative">
                    {/* Input field */}
                    <div
                      className="relative  w-full bg-[#DBCAFF] text-[#a394d6] text-sm custom-lg:text-xl custom-xl:text-2xl pl-10 pr-3 py-2 sm:py-2 sm:pr-3 sm:pl-6 rounded-full cursor-pointer flex justify-between items-center"
                      // onClick={() => setIsOpentime(!isOpentime)}
                    >
                      <span className="text-[#a394d6]">Start time</span>

                      <div className=" h-full w-fit sm:w-full  sm:max-w-[219px] bg-[#685AAD] rounded-full text-xs sm:text-base custom-xl:text-xl flex items-center justify-start px-4 text-white p-1.5 truncate">
                        {/* {selectedTime} */}
                        <input
                          value={selectedTime}
                          onChange={(e: any) => {
                            e.preventDefault();
                            handleTimeSelect(e.target.value);
                          }}
                          id="time"
                          type="time"
                          className="w-full text-white bg-transparent "
                        />
                      </div>
                    </div>

                    {/* Time options dropdown */}
                  </div>
                </div>

                <div className="mt-7 max-w-[437px] w-full">
                  <input
                    autoFocus
                    className="w-full  h-24 p-4 rounded-lg bg-[#DBCAFF] outline-none focus:outline-none  text-[#B6A9E0] transition-colors duration-200 placeholder-[#B6A9E0] focus:ring-0 text-wrap"
                    placeholder="Write your instructions here..."
                    value={studentnote}
                    onChange={(e) => {
                      e.preventDefault();

                      setStudentnote(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-16 max-w-[22rem] w-full mx-auto flex items-center justify-center ">
                  <button
                    onClick={handleNextBookingStep}
                    className=" w-full   bg-[#8653FF] text-white px-2 py-2 sm:py-4 font-bold text-xl rounded-full hover:bg-[#5a3dd8] transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {bookingStep === 3 && (
            <div className=" h-screen  gap-14 flex flex-col items-center justify-center">
              <h3 className="text-3xl text-[#685AAD] font-bold">
                Confirm your Booking
              </h3>
              <div className="w-full rounded-3xl max-w-[50rem] p-8 text-[#9184D2] bg-[#DBCAFF] border-red-500">
                <div>
                  <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                    <p>tutor</p>
                    <p className="text-[#685AAD]">
                      {tutor?.contactInformation?.firstName}{" "}
                      {tutor?.contactInformation?.lastName}
                    </p>
                  </div>

                  <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                    <p>Subject: </p>
                    <p className="text-[#685AAD]">{bookingInfo.subject}</p>
                  </div>
                  <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                    <p>Level: </p>
                    <p className="text-[#685AAD]">{bookingInfo.level}</p>
                  </div>
                  <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                    <p>Date: </p>
                    <p className="text-[#685AAD]">{bookingInfo.date}</p>
                  </div>
                  <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                    <p>Time: </p>
                    <p className="text-[#685AAD]">{bookingInfo.time}</p>
                  </div>
                </div>
                {!isTrialSession && (
                  <>
                    {/* <div className="border-b-2 border-[#9184D2]">
                      <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                        <p>Total Cost</p>
                        <p className="text-[#685AAD]">value</p>
                      </div>
                      <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                        <p>Discount</p>
                        <p className="text-[#685AAD]">value</p>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                        <p>Total Cost</p>
                        <p className="text-[#685AAD]">value</p>
                      </div>
                    </div> */}
                  </>
                )}
              </div>

              <div className="max-w-[22rem] w-full mx-auto flex items-center justify-center ">
                <button
                  onClick={() => {
                    setisTrialSession(false);
                    handleConfirmBooking(tutor?._id);
                  }}
                  className="w-full   bg-[#8653FF] text-white px-2 py-2 sm:py-4 font-bold text-xl rounded-full hover:bg-[#5a3dd8] transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          <style jsx>{`
            #style-2::-webkit-scrollbar-track {
              border-radius: 10px;
              background-color: #c9bbef;
            }

            #style-2::-webkit-scrollbar {
              width: 5px;
              background-color: transparent;
            }

            #style-2::-webkit-scrollbar-thumb {
              border-radius: 10px;

              background-color: #8f81c7;
            }
          `}</style>
        </div>
      </div>
    );
  };

  return (
    <div className="text-white">
      {!showResults && !showProfile && !showBooking && <SearchForm />}

      {showResults && <ResultsView />}
      {showProfile && <ProfileView tutor={selectedTutor} showTerminateEngament={showTerminateEngament} />}
      {showBooking && <BookingView tutor={selectedTutor} />}
    </div>
  );
};

export default ETutorSearch;
