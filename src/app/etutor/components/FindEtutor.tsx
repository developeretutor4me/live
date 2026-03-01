import React, { useEffect, useState } from "react";
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
// import BookingForm from "./BookingForm";

const subjects = [
  { name: "Maths", levels: "11+, GCSE, KS2, KS3" },
  { name: "Chemistry", levels: "A-Level, GCSE, KS3" },
  { name: "Biology", levels: "1-Level, GCSE, KS3" },
  { name: "English Language", levels: "GCSE" },
  { name: "English Literature", levels: "GCSE" },
];
// Dummy data for search results
const dummyTutors = [
  {
    id: 1,
    name: "Mr. Firstname",
    bio: "Experienced tutor specializing in Mathematics and Science",
    price: 20,
    availability: "Mon, Wed, Thu from 4:00 p.m",
    subjects: ["Math", "Science"],
    about: "this is about of the teach",
    study: "this is study of the teacher",
    experience: "3 years and 7 students currently",
    level: 10,
    image: "/assets/heroimg2.png",
  },
  {
    id: 2,
    name: "Mr. abdullah",
    bio: "Experienced tutor specializing in Mathematics and Science",
    price: 20,
    availability: "Mon, Wed, Thu from 4:00 p.m",
    subjects: ["Math", "Science"],
    about: "this is about of the teacher",
    study: "this is study of the teacher",
    experience: "3 years and 7 students currently",
    level: 10,
    image: "/assets/heroimg2.png",
  },
  // Add more dummy tutors here...
];

const options = [
  { value: "", label: "Sort by" },
  { value: "date", label: "Joining Date" },
  { value: "name", label: "Alphabetical Order" },
  { value: "age", label: "Age" },
];
const memberships = [
  { name: "Premium", price: 249, sessions: 8 },
  { name: "Standard", price: 139, sessions: 4 },
];
const ETutorSearch = () => {
  const [ismemberOpen, setIsmemberOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);

  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [searchParams, setSearchParams] = useState({
    sortBy: "",
    searchTerm: "",
    subjects: [],
    level: "",
    gender: "",
    tutorLevel: 5,
  });
  const [bookingInfo, setBookingInfo] = useState({
    subject: "",
    level: "",
    date: "",
    time: "",
  });
  const subjectOptions = [
    { value: "Art", label: "Art" },
    { value: "Math", label: "Math" },
    { value: "Science", label: "Science" },
    { value: "History", label: "History" },
  ];
  const levelOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const togglememberDropdown = () => setIsmemberOpen(!isOpen);

  const handleSelect = (membership: React.SetStateAction<null>) => {
    setSelectedMembership(membership);
    setIsmemberOpen(false);
  };
  const toggleSubjectDropdown = () =>
    setIsSubjectDropdownOpen(!isSubjectDropdownOpen);

  const handleSubjectClick = (subject: string) => {
    //@ts-ignore
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((item) => item !== subject));
    } else {
      //@ts-ignore
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const removeSubject = (subject: never) => {
    setSelectedSubjects(selectedSubjects.filter((item) => item !== subject));
  };
  const [filteredTutors, setFilteredTutors] = useState(dummyTutors);

  // Effect to update search results when search parameters change
  useEffect(() => {
    const results = dummyTutors.filter((tutor) => {
      const matchesSearchTerm =
        tutor.name
          .toLowerCase()
          .includes(searchParams.searchTerm.toLowerCase()) ||
        tutor.bio.toLowerCase().includes(searchParams.searchTerm.toLowerCase());
      const matchesSubjects =
        searchParams.subjects.length === 0 ||
        searchParams.subjects.some((subject) =>
          tutor.subjects.includes(subject)
        );
      const matchesLevel =
        !searchParams.level ||
        //@ts-ignore
        tutor.level.toLowerCase() === searchParams.level.toLowerCase();
      const matchesGender =
        !searchParams.gender ||
        //@ts-ignore
        tutor?.gender?.toLowerCase() === searchParams.gender.toLowerCase();
      const matchesTutorLevel = tutor.level >= searchParams.tutorLevel;

      return (
        matchesSearchTerm &&
        matchesSubjects &&
        matchesLevel &&
        matchesGender &&
        matchesTutorLevel
      );
    });
    if (searchParams.sortBy) {
      //@ts-ignore
      results.sort((a, b) => {
        if (searchParams.sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (searchParams.sortBy === "price") {
          return a.price - b.price;
        }
        // Add more sorting options as needed
      });
    }

    setFilteredTutors(results);
  }, [searchParams]);

  // ... (previous handler functions)

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleLevelDropdown = () => setIsLevelOpen(!isLevelOpen);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false); // Close dropdown after selecting an option
  };

  const handleSearch = () => {
    setShowResults(true);
    setShowProfile(false);
    setShowBooking(false);
  };
  const handleInputChange = (field: string, value: any[]) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
  };

  const handleLevelClick = (level: React.SetStateAction<string>) => {
    setSelectedLevel(level);
    setIsLevelOpen(false);
    onLevelChange(level);
  };

  const handleAddSubject = (subject: any) => {
    //@ts-ignore
    if (!searchParams.subjects.includes(subject)) {
      handleInputChange("subjects", [...searchParams.subjects, subject]);
    }
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
  };

  const handleGenderClick = (value: React.SetStateAction<string>) => {
    setSelectedGender(value);
    setIsGenderOpen(false);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
    setShowProfile(false);
    setShowBooking(false);
  };

  const handleViewProfile = (tutor: any) => {
    setSelectedTutor(tutor);
    setShowProfile(true);
    setShowResults(false);
  };

  const handleBackToResults = () => {
    setShowProfile(false);
    setShowResults(true);
  };

  const handleStartBooking = () => {
    setShowBooking(true);
    setShowProfile(false);
    setBookingStep(1);
  };
  // @ts-ignore
  const handleBookingInputChange = (field, value) => {
    setBookingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextBookingStep = () => {
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    }
  };

  const handleConfirmBooking = () => {
    // Here you would typically send the booking information to your backend

    setShowBooking(false);
    setShowResults(false);
    setShowProfile(false);
    // Reset booking info
    setBookingInfo({
      subject: "",
      level: "",
      date: "",
      time: "",
    });
  };

  const SearchForm = () => (
    <div className="space-y-4  bg-[#EDE8FA] px-6 py-6 rounded-3xl max-w-[62.5rem] mx-auto  min-h-screen ">
      <div className="flex justify-between items-center flex-col custom-xl:flex-row space-x-2 pt-7">
        <h1 className=" text-3xl custom-xl:text-5xl font-bold text-[#685AAD] pl-8">
          Find eTutor
        </h1>

        {/* -----------sort by dropdown------- */}

        <div className="flex flex-wrap justify-end   gap-7 custom-xl:pr-8 w-fit flex-col custom-xl:flex-row">
          <div className="relative order-2 custom-xl:order-1  h-fit   w-full custom-xl:w-fit">
            <div
              className={`bg-[#DBCAFF] text-[#a394d6] text-xs sm:text-sm pl-10 pr-6 py-2 rounded-full cursor-pointer select-none   flex items-center justify-between w-full custom-xl:w-[16rem] ${
                isOpen
                  ? "border  border-[#a394d6]"
                  : "border border-transparent"
              } `}
              onClick={toggleDropdown}
            >
              <span>
                {options.find((option) => option.value === selectedOption)
                  ?.label || "Sort by"}
              </span>
              {isOpen ? (
                <ChevronUp className="text-[#a394d6]" />
              ) : (
                <ChevronDown className="text-[#a394d6]" />
              )}
            </div>

            {isOpen && (
              <ul className=" absolute top-full left-0 w-full m-auto  bg-[#DBCAFF] border  border-[#a394d6] text-[#8f81c7] text-xs sm:text-sm mt-2 rounded-xl shadow-lg z-10 max-h-[13rem]  ">
                {options.map((option) => (
                  <li
                    key={option.value}
                    className={`px-4 py-2 cursor-pointer     ${
                      selectedOption === option.value ? "" : ""
                    }`}
                    onClick={() => handleOptionClick(option.value)}
                  >
                    {option.label}
                    <div className="border-b border-[#8f81c7] w-full"></div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ---------search bar top------- */}
          <div className="relative w-fit  h-fit order-1 custom-xl:order-2">
            <input
              type="text"
              placeholder="Search by eTutor's"
              className=" bg-[#DBCAFF] text-[#a394d6] placeholder-[#a394d6] px-10  py-2 rounded-full border border-transparent w-full  custom-xl:w-[20rem] "
              // value={searchParams.searchTerm}
              // onChange={(e) => handleInputChange("searchTerm", e.target.value)}
            />
            <Image  loading="lazy" 
              src={searchicon}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6949ff] w-4 h-4 "
              alt={""}
            />
          </div>
        </div>
      </div>

      <div className="  pt-28 ">
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
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[90%] mx-auto py-7 ">
                {subjectOptions.map((subject) => (
                  <div
                    key={subject.value}
                    className="px-8 py-2 cursor-pointer flex items-center"
                    onClick={() => handleSubjectClick(subject.value)}
                  >
                    <div className="border-b-2 border-[#a394d682] py-3 flex w-[70%] gap-4">
                      <div className="relative">
                        <input
                          type="checkbox"
                          //@ts-ignore
                          checked={selectedSubjects.includes(subject.value)}
                          onChange={() => {}}
                          className="absolute opacity-0 cursor-pointer"
                        />
                        <div
                          className={`h-7 w-7  border-2 border-[#6C5BAA] hover:bg-[#a394d6] hover:border-[#a394d6] rounded-md flex items-center justify-center 
                     ${
                            //@ts-ignore
                       selectedSubjects.includes(subject.value)
                         ? "bg-[#6c5baa]"
                         : ""
                     }`}
                        >
                          {
                          //@ts-ignore
                          selectedSubjects.includes(subject.value) && (
                            <Check />
                          )}
                        </div>
                      </div>
                      <span className="ml-2 text-2xl text-[#6C5BAA] ">
                        {subject.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedSubjects.length > 0 && (
            <div className="flex flex-wrap items-start justify-start gap-2 mt-6  max-w-[26rem] mx-auto min-h-[5rem]">
              {selectedSubjects.map((subject) => (
                <span
                  key={subject}
                  className="bg-[#6C5BAA] text-white px-4 py-1 rounded-full flex items-center max-w-[8rem] w-full justify-between"
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
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[90%] mx-auto py-5 ">
                {levelOptions.map((level) => (
                  <div
                    key={level.value}
                    className=" py-2 text-2xl text-[#6C5BAA] border-b-2 border-[#a394d682] w-[80%] mx-auto "
                    onClick={() => handleLevelClick(level.value)}
                  >
                    {level.label}
                  </div>
                ))}
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
            onClick={handleSearch}
            className=" w-full   bg-[#8653FF] text-white px-2 py-2 sm:py-4 font-bold text-xl rounded-full hover:bg-[#5a3dd8] transition-colors"
          >
            Search
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
    </div>
  );

  const ResultsView = () => (
    <div className="bg-[#EDE8FA] w-full h-full rounded-3xl px-8 py-6">
      <h1 className="text-3xl font-bold text-[#685AAD] px-6 mb-8">
        Find your eTutor
      </h1>

      {/* <button
    onClick={handleBackToSearch}
    className="mb-4 flex items-center text-[#6949ff] hover:underline"
  >
    <ArrowLeft className="mr-2" /> Back to Search
  </button> */}

      <div className="flex flex-col gap-4 custom-lg:gap-9">
        {filteredTutors.map((tutor) => (
          <div
            key={tutor.id}
            className="flex flex-col custom-xl:flex-row  justify-between bg-[#A296CC] rounded-3xl px-8 py-6 gap-6"
          >
            {/* Left column: Image, Name, Bio, Price */}
            <div className="  h-fit  w-full custom-xl:max-w-[20rem] ">
              <div className="flex flex-col sm:flex-row justify-start items-center gap-6">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  // width={24}
                  // height={24}
                  className="w-24 h-24 rounded-full sm:mb-4 border-2"
                />

                <div>
                  <h2 className="text-lg sm:text-3xl font-semibold  sm:text-start text-center">
                    {tutor.name}
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
                    {tutor.availability}
                  </p>
                </div>

                <div className="mt-4 flex flex-col items-center sm:items-start">
                  <h3 className="text-lg text-white">Subjects:</h3>
                  <p className="text-lg text-[#473171] text-center sm:text-start">
                    {tutor.subjects.join(", ")}{" "}
                  </p>
                </div>
              </div>
            </div>

            {/* Middle column: About me, Study, Teaching Experience */}
            <div className="  custom-xl:max-w-[36rem] w-full ">
              <h3 className="text-lg ">About me</h3>
              <p className="text-lg text-[#473171]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              </p>

              <h3 className="text-lg  mt-6">Study</h3>
              <p className="text-lg text-[#473171]">{tutor.study}</p>

              <h3 className="text-lg  mt-6">Teaching Experience</h3>
              <p className="text-lg text-[#473171]">
                {tutor.experience} years and {
                //@ts-ignore
                tutor?.currentStudents}
              </p>
            </div>

            {/* Right column: Availability, Subjects, Badge, More info button */}
            <div className="flex custom-xl:flex-col items-center justify-between  flex-row w-full custom-xl:w-32 ">
              <Image  loading="lazy"  src={badge} alt="" className="w-16 sm:min-w-32 " />

              <button
                onClick={() => handleViewProfile(tutor)}
                className="bg-[#8558F9] text-white py-2 px-6 rounded-full custom-xl:w-full hover:bg-purple-700 transition-colors"
              >
                More info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="bg-[#EDE8FA] rounded-3xl p-8 flex flex-col custom-xl:flex-row gap-5">
      {/* Left column */}
      <div className="w-full custom-xl:w-[63%] space-y-4">
        {/* Profile card */}
        <div className="bg-[#A296CC] rounded-3xl pl-6 py-6 pr-3 sm:pr-8 ">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row border-2 w-full sm:w-fit items-center gap-8 pl-6 pt-4">
              <img
                src="/api/placeholder/80/80"
                alt="Tutor"
                className="w-20 h-20 sm:min-w-40 sm:min-h-40 rounded-full border-2 border-red-700 "
              />
              <div>
                <h2 className="text-xl text-center sm:text-start sm:text-3xl font-semibold">
                  {
                  //@ts-ignore
                  selectedTutor?.name}
                </h2>
                <p className="text-xl text-[#534988] max-w-[22rem] text-center sm:text-start">
                  EXPERIENCE (Formal): 1 to 3 years
                </p>
                <p className="text-xl text-[#534988] text-center sm:text-start">
                  BOOKINGs:
                </p>
              </div>
            </div>

            <div className=" ">
              <Image  loading="lazy"  src={badge} alt="" className="w-28 hidden sm:block" />
            </div>
          </div>

          <div className=" mt-8">
            <div>
              <p className="text-lg text-white">About me</p>
              <p className="text-[#473171] text-lg">{
              //@ts-ignore
              selectedTutor?.about}</p>
            </div>
          </div>

          <div className="flex justify-between flex-col sm:flex-row  mt-8 pr-4">
            <div className="">
              <div className="mb-8">
                <h3 className="text-lg text-white">Availability:</h3>
                <p className="text-[#473171] text-lg">Mon-Wed 6pm-9pm</p>
              </div>
              <div>
                <h3 className="text-lg text-white">Subjects:</h3>
                <p className="text-[#473171] text-lg">all the subjects</p>
              </div>
            </div>

            <div className=" ">
              <div className="mb-8">
                <h3 className="text-lg text-white">Study</h3>
                <p className="text-[#473171] text-lg">
                  University up to PhD grade
                </p>
              </div>
              <div>
                <h3 className="text-lg text-white">Teaching Experience</h3>
                <p className="text-[#473171] text-lg">
                  3 years as 2 students monthly
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Qualifications card */}
        <div className="bg-[#EDE8FA] rounded-2xl py-10 flex justify-center sm:justify-start   ">
          <button className="bg-[#8653FF] px-16 py-2  sm:px-32 sm:py-4 rounded-full text-2xl">
            Message eTutor
          </button>
        </div>

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
                      <th className="py-3 px-4 text-sm sm:text-xl font-medium">
                        LEVEL
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#75699C] last:border-b-0 bg-[#8876b8] "
                      >
                        <td className="py-3 px-4 text-white  text-xs sm:text-md border-r border-[#75699C]">
                          {subject.name}
                        </td>
                        <td className="py-3 px-4 text-xs sm:text-md text-white">
                          {subject.levels}
                        </td>
                      </tr>
                    ))}
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
      <div className=" w-full custom-xl:w-[37%] space-y-4">
        {/* Booking card */}
        <div className="bg-[#A296CC] rounded-3xl p-10 ">
          <h2 className="text-xl sm:text-5xl font-bold mb-4">
            Book Mr. Firstname
          </h2>
          <p className="text-xs sm:text-md mb-4 text-[#564589] font-medium">
            You can change your membership by selecting one of the two other
            plans listed below, or visit the{" "}
            <span className="text-[#6949FF]">My Membership</span> page for more
            information.
          </p>

          <div className="bg-[#685AAD] py-3 sm:py-6 px-2 sm:px-4 rounded-xl font-sans relative mb-4">
            <button
              onClick={togglememberDropdown}
              className="w-full bg-purple-600 text-[#B3ACD6] py-3 px-4 rounded-lg flex justify-between items-center"
            >
              <span className="text-xl font-bold">
                {selectedMembership
                //@ts-ignore
                  ? selectedMembership.name
                  : "Select membership"}
              </span>
              {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>

            {ismemberOpen && (
              <div className="absolute left-0 w-full bg-[#685AAD] rounded-lg shadow-lg mt-8">
                {memberships.map((membership) => (
                  <div
                    key={membership.name}
                    //@ts-ignore
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
                        / {membership.sessions} sessions / month
                      </p>
                    </div>
                    {
                    //@ts-ignore
                    selectedMembership?.name === membership.name && (
                      <Check size={24} className="text-white" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-[#685AAD] py-3 sm:py-6 px-2 sm:px-4 rounded-xl font-sans relative mb-4">
            <button
              onClick={togglememberDropdown}
              className="w-full bg-purple-600 text-[#B3ACD6] py-3 px-4 rounded-lg flex justify-between items-center"
            >
              <span className="text-xl font-bold">
                {selectedMembership
                //@ts-ignore
                  ? selectedMembership.name
                  : "Select Package Name"}
              </span>
              {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>

            {ismemberOpen && (
              <div className="absolute left-0 w-full bg-[#685AAD] rounded-lg shadow-lg mt-8">
                {memberships.map((membership) => (
                  <div
                    key={membership.name}
                    //@ts-ignore
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
                        / {membership.sessions} sessions / month
                      </p>
                    </div>
                    {
                    //@ts-ignore
                    selectedMembership?.name === membership.name && (
                      <Check size={24} className="text-white" />
                    )}
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
            <span className="text-sm">Hear from 2/3 tutors like Lastname</span>
          </div>

          <div className="bg-[#B9AFDB] p-6 rounded-3xl">
            <button
              onClick={handleStartBooking}
              className="w-full bg-[#8653FF] text-white py-2 sm:py-4 text-xl rounded-full mb-4 font-semibold"
            >
              Book Session
            </button>

            <button className="w-full bg-[#564589] text-white py-2 sm:py-4 text-xl rounded-full  font-semibold">
              Your Packages
            </button>
          </div>
        </div>

        {/* 24/7 Support card */}
        <div className="bg-[#A296CC] rounded-2xl p-6">
          <h3 className="font-semibold mb-2 text-lg text-white">
            24/7 SUPPORT
          </h3>
          <p className="text-sm text-[#473171]">Need help?</p>
          <p className="text-sm text-[#473171]">Contact us</p>
        </div>
      </div>
    </div>
  );
  const progressPercentage = bookingStep * 33.33;
  const BookingView = () => (
    <div
      className={`space-y-4 bg-[#EDE8FA] px-6 py-6 rounded-3xl  max-w-[62.5rem] mx-auto min-h-screen`}
    >
      <div className="w-full bg-[#e9deff] rounded-full h-[4px] mb-4">
        <div
          className="bg-[#6949ff] h-[4px] rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {bookingStep === 1 && (
        <div>
          <div className="flex flex-col items-center">
            <div className="photo mb-4 mt-4">
              <Image  loading="lazy" 
                src={badge}
                alt=""
                className="rounded-full h-32 w-32  border-2 overflow-hidden border-red-800"
              />
            </div>
            <div className="info mb-8 ">
              <h1 className="text-2xl text-[#685AAD] font-bold text-center">
                Booking Request - Name <br />
                Lastname
              </h1>
              <p className="text-sm font-bold text-[#685AAD]  text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />{" "}
                Aut, dolores!
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
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[90%] mx-auto py-7 ">
                  {subjectOptions.map((subject) => (
                    <div
                      key={subject.value}
                      className="px-8 py-2 cursor-pointer flex items-center"
                      onClick={() => handleSubjectClick(subject.value)}
                    >
                      <div className="border-b-2 border-[#a394d682] py-3 flex w-[70%] gap-4">
                        <div className="relative">
                          <input
                            type="checkbox"
                            //@ts-ignore
                            checked={selectedSubjects.includes(subject.value)}
                            onChange={() => {}}
                            className="absolute opacity-0 cursor-pointer"
                          />
                          <div
                            className={`h-7 w-7  border-2 border-[#6C5BAA] hover:bg-[#a394d6] hover:border-[#a394d6] rounded-md flex items-center justify-center 
                     ${
                              //@ts-ignore
                       selectedSubjects.includes(subject.value)
                         ? "bg-[#6c5baa]"
                         : ""
                     }`}
                          >
                            {
                            //@ts-ignore
                            selectedSubjects.includes(subject.value) && (
                              <Check />
                            )}
                          </div>
                        </div>
                        <span className="ml-2 text-2xl text-[#6C5BAA] ">
                          {subject.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {selectedSubjects.length > 0 && (
              <div className="flex flex-wrap items-start justify-start gap-2 mt-6  max-w-[26rem] mx-auto min-h-[5rem]">
                {selectedSubjects.map((subject) => (
                  <span
                    key={subject}
                    className="bg-[#6C5BAA] text-white px-4 py-1 rounded-full flex items-center max-w-[8rem] w-full justify-between"
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
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[90%] mx-auto py-5 ">
                  {levelOptions.map((level) => (
                    <div
                      key={level.value}
                      className=" py-2 text-2xl text-[#6C5BAA] border-b-2 border-[#a394d682] w-[80%] mx-auto "
                      onClick={() => handleLevelClick(level.value)}
                    >
                      {level.label}
                    </div>
                  ))}
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
          <div className="mt-16 max-w-[22rem] w-full mx-auto flex items-center justify-center ">
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
        <div className="h-screen flex items-center justify-center  border-2">
          <div className=" border-2 border-red-700 flex items-center flex-col w-full">
            <h1 className="text-3xl text-[#685AAD] mb-20">
              Choose a <span className="font-bold">date and time</span>
            </h1>

            <div className="w-full max-w-[36rem] mx-auto relative ">
              <input
                type="date"
                className={`w-full bg-[#DBCAFF] text-[#a394d6] text-sm custom-lg:text-xl custom-xl:text-2xl pl-10 pr-16 py-2 sm:py-4 rounded-full cursor-pointer`}
                value={bookingInfo.date || ""}
                onChange={(e) =>
                  handleBookingInputChange("date", e.target.value)
                }
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {/* Replace with your date icon, e.g., <YourDateIcon /> */}
                <svg
                  /* your icon SVG here */ xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#a394d6"
                >
                  <path d="M3 6h18v2H3z" />
                  <path d="M21 2h-3V0h-2v2H8V0H6v2H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM3 20V4h18v16H3z" />
                </svg>
              </span>
            </div>

            <div className="w-full max-w-[36rem] mx-auto mt-8 relative border-2 ">
              <input
                type="time"
                className={`w-full bg-[#DBCAFF] text-[#a394d6] text-sm custom-lg:text-xl custom-xl:text-2xl pl-10 pr-16 py-2 sm:py-4 rounded-full cursor-pointer`}
                value={bookingInfo.time || ""}
                onChange={(e) =>
                  handleBookingInputChange("time", e.target.value)
                }
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {/* Replace with your time icon, e.g., <YourTimeIcon /> */}
                <svg
                  /* your icon SVG here */ xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#a394d6"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v4z" />
                </svg>
              </span>
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
        <div className=" h-screen border-2 gap-14 flex flex-col items-center justify-center">
          <h3 className="text-3xl text-[#685AAD] font-bold">
            Confirm your Booking
          </h3>
          <div className="w-full rounded-3xl max-w-[50rem] p-8 text-[#9184D2] bg-[#DBCAFF] border-red-500">
            <div className="border-b-2 border-[#9184D2]">
              <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                <p>tutor</p>
                <p className="text-[#685AAD]">value</p>
              </div>

              <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                <p>Subject: {bookingInfo.subject}</p>
                <p className="text-[#685AAD]">value</p>
              </div>
              <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                <p>Level: {bookingInfo.level}</p>
                <p className="text-[#685AAD]">value</p>
              </div>
              <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                <p>Date: {bookingInfo.date}</p>
                <p className="text-[#685AAD]">value</p>
              </div>
              <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                <p>Time: {bookingInfo.time}</p>
                <p className="text-[#685AAD]">value</p>
              </div>
            </div>
            <div className="border-b-2 border-[#9184D2]">
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
              
            </div>
          </div>

          <div className="max-w-[22rem] w-full mx-auto flex items-center justify-center ">
          <button
            onClick={handleConfirmBooking}
            className="w-full   bg-[#8653FF] text-white px-2 py-2 sm:py-4 font-bold text-xl rounded-full hover:bg-[#5a3dd8] transition-colors"
            >
            Confirm
          </button>
            </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {!showResults && !showProfile && !showBooking && <SearchForm />}

      {showResults && <ResultsView />}
      {showProfile && <ProfileView />}
      {showBooking && <BookingView />}
    </>
  );
};

export default ETutorSearch;
function onLevelChange(level: React.SetStateAction<string>) {
  throw new Error("Function not implemented.");
}
