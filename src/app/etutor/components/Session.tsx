import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import noschedual from "../../../../public/noschedualsessions.svg";
import chaticon from "../../../../public/chaticonwhite.svg";
import infoicon from "../../../../public/infoicon.svg";

import foldericon from "../../../../public/folder icon white.svg";
import profilewhite from "../../../../public/profile icon white.svg";
import { ChevronDown, ChevronUp } from "lucide-react";
import searchicon from "../../../../public/search icon.svg";
import { useToast } from "@/hooks/use-toast";

const options = [
  { value: "nameAsc", label: "Student Name (A-Z)" },
  { value: "nameDesc", label: "Student Name (Z-A)" },
  { value: "dateAsc", label: "Date (Oldest First)" },
  { value: "dateDesc", label: "Date (Newest First)" },
  { value: "status", label: "Status" },
  { value: "level", label: "Level of Study" },
  { value: "grade", label: "Grade" },
];



const userSortOptions = [
  { value: 'nameAsc', label: 'Name (A-Z)' },
  { value: 'nameDesc', label: 'Name (Z-A)' },
  { value: 'grade', label: 'Grade' },
  { value: 'institution', label: 'Institution' }
];

interface Student {
  personalInformation: any;
  institution: any;
  additionalInformation: string;
  profile: {
    firstName: String;
  };
  email: string;
  contactInformation: {
    country: string;
    phone: string;
    address: string;
  };
}

interface Teacher {
  name: string;
  email: string;
  contactInformation: {
    country: string;
    phone: string;
    address: string;
  };
}

interface BookingRequest {
  StudentNote: any;

  meetingCompleted: boolean;
  studentdetails: any;
  duration: string;
  joinLink: string | undefined;
  startLink: string | undefined;
  _id: string;
  student: Student;
  teacher: Teacher;
  subjects: string[];
  level: string;
  date: string;
  time: string;
  status: string;
}

type User = (Student | Parent) & { type: 'student' | 'parent' };


interface Student {
  _id: string;
  levelOfStudy: string;
  grade: string;
  subjects: string[];
  firstName: string;
  lastName: string;
  phoneNumber: string;
  user: User;
}

interface Parent {
  additionalInformation: string;
  _id: string;
  gradeLevel: string;
  grade: string;
  levelOfStudy: string;
  subjectChildNeeds: string[];
  firstName: string;
  lastName: string;
  phoneNumber: string;
  user: User;
}
interface sessionprops {
  setActiveFindEtutor: (item: string) => void;
  setActiveMYEtutor: (item: string) => void;
  setTutor: any;
  setcompleted?: string;
  showchat: any;
  tutortomessage: any;
}

const SessionDashboard = ({
  setActiveFindEtutor,
  setActiveMYEtutor,
  setcompleted = "upcoming",
  setTutor,
  showchat,
  tutortomessage,
}: sessionprops) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("individual");
  const [activeSubTab, setActiveSubTab] = useState("upcoming");
  const { data: session } = useSession();
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchedreq, setFetchedreq] = useState([]);
  const [starturl, setStarturl] = useState("");
  const [joinurl, setJoinurl] = useState("");
  const [acceptvalue, setAcceptvalue] = useState("Accept");
  const [fulldata, setfulldata] = useState(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [requestsofteachers, setrequestsofteachers] = useState([]);
  const [value, setvalue] = useState(false);
  const [expandedRequestId, setexpandedRequestId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [apply, setapply] = useState("")
  const [Wait, setWait] = useState("")
  const [accept, setaccept] = useState("")
  const [filteredRequests, setFilteredRequests] = useState<BookingRequest[]>(
    []
  );
  const [IsTrialSession, setIsTrialSession] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });

  // const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [filteredData, setFilteredData] = useState<{
    filteredStudents: Student[];
    filteredParents: Parent[];
  }>({ filteredStudents: [], filteredParents: [] });

  // Function to sort the data
  const sortData = (data: BookingRequest[], sortKey: string) => {
    return [...data].sort((a, b) => {
      switch (sortKey) {
        case "nameAsc":
          return `${a.studentdetails.firstName} ${a.studentdetails.lastName}`.localeCompare(
            `${b.studentdetails.firstName} ${b.studentdetails.lastName}`
          );
        case "nameDesc":
          return `${b.studentdetails.firstName} ${b.studentdetails.lastName}`.localeCompare(
            `${a.studentdetails.firstName} ${a.studentdetails.lastName}`
          );
        case "dateAsc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "dateDesc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "status":
          return a.status.localeCompare(b.status);
        case "level":
          return a.level.localeCompare(b.level);
        case "grade":
          return a.studentdetails.grade.localeCompare(b.studentdetails.grade);
        default:
          return 0;
      }
    });
  };

  // Function to filter the data
  const filterData = (data: BookingRequest[], query: string) => {
    return data.filter((request) => {
      const searchString = query.toLowerCase();
      return (
        `${request?.studentdetails.firstName} ${request?.studentdetails?.lastName}`
          .toLowerCase()
          .includes(searchString) ||
        (request?.studentdetails?.phoneNumber?.includes(searchString) ??
          false) ||
        request?.level.toLowerCase().includes(searchString) ||
        request?.subjects.some((subject) =>
          subject.toLowerCase().includes(searchString)
        ) ||
        request?.status.toLowerCase().includes(searchString) ||
        request?.studentdetails?.grade.toLowerCase().includes(searchString)
      );
    });
  };

  // Update filtered results whenever search query or sort changes
  useEffect(() => {
    let result = [...requests];


    // Apply search filter
    if (searchQuery) {
      result = filterData(result, searchQuery);
    }

    // Apply sorting
    if (selectedOption) {
      result = sortData(result, selectedOption);
    }

    setFilteredRequests(result);
  }, [searchQuery, selectedOption, requests,]);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };










  // search methods for parent and student together
  const filterCombinedData = (
    students: Student[],
    parents: Parent[],
    query: string
  ) => {
    const searchString = query.toLowerCase();

    // Filter students
    const filteredStudents = students.filter((student) => {
      return (
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchString) ||
        (student.phoneNumber?.includes(searchString) ?? false) ||
        student.grade.toLowerCase().includes(searchString) ||
        student.personalInformation?.institution?.toLowerCase().includes(searchString) ||
        student.levelOfStudy.toLowerCase().includes(searchString) ||
        student.subjects.some((subject) => subject.toLowerCase().includes(searchString))
      );
    });

    // Filter parents
    const filteredParents = parents.filter((parent) => {
      return (
        `${parent.firstName} ${parent.lastName}`.toLowerCase().includes(searchString)

      );
    });

    return {
      filteredStudents,
      filteredParents
    };
  };

  // Sort function for combined data
  const sortCombinedData = (
    students: Student[],
    parents: Parent[],
    sortKey: string
  ) => {
    const sortArrays = <T extends User>(arr: T, key: string) => {
      //@ts-ignore
      return [...arr].sort((a, b) => {
        switch (key) {
          case 'nameAsc':
            return `${a.firstName} ${a.lastName}`.localeCompare(
              `${b.firstName} ${b.lastName}`
            );
          case 'nameDesc':
            return `${b.firstName} ${b.lastName}`.localeCompare(
              `${a.firstName} ${a.lastName}`
            );
          case 'grade':
            if (a.type === 'student' && b.type === 'student') {
              return a.grade.localeCompare(b.grade);
            } else if (a.type === 'parent' && b.type === 'parent') {
              return a.children[0]?.grade.localeCompare(b.children[0]?.grade) || 0;
            }
            return 0;
          case 'institution':
            if (a.type === 'student' && b.type === 'student') {
              return a.institution.localeCompare(b.institution);
            } else if (a.type === 'parent' && b.type === 'parent') {
              return a.children[0]?.institution.localeCompare(b.children[0]?.institution) || 0;
            }
            return 0;
          default:
            return 0;
        }
      });
    };

    return {
      //@ts-ignore
      sortedStudents: sortArrays(students as User[], sortKey) as Student[],
      //@ts-ignore
      sortedParents: sortArrays(parents as User[], sortKey) as Parent[]
    };
  };

  // Update filtered and sorted results whenever search query or sort changes
  useEffect(() => {
    // First filter the data
    const filteredResults = filterCombinedData(students, parents, searchQuery);

    // Then sort the filtered results
    const sortedResults = selectedSort
      ? sortCombinedData(
        filteredResults.filteredStudents,
        filteredResults.filteredParents,
        selectedSort
      )
      : filteredResults;
    //@ts-ignore
    setFilteredData(sortedResults);
  }, [searchQuery, selectedSort, students, parents]);


  // fetch students and parent
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/Fetch-students&parent");
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();

        setStudents(data.students);
        setParents(data.parents);
        setrequestsofteachers(data.requests);


        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [value, activeSubTab, activeTab]);

  // fetching incoming requests
  useEffect(() => {
    const fetchRequests = async () => {
      if (!session) return;

      try {
        const response = await fetch(
          "/api/get-incoming-requests-from-student",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }

        const data = await response.json();
        setRequests(data.bookingRequests);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [session, activeSubTab]);

  async function sendRequest(recipientId: string) {
    setapply(recipientId)
    const response = await fetch("/api/Request-from-teacher-to-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teacherId: session?.user.id, recipientId }),
    });

    const data = await response.json();
    if (response.ok) {
      setFilteredRequests((prevRequests) =>
        prevRequests.filter((request) => request?._id !== recipientId)
      );
      setapply("")
    } else {
      console.error(data.message);
    }
  }

  const tabs = [
    { id: "individual", label: "INDIVIDUAL SESSION" },
    { id: "group", label: "GROUP SESSION" },
    { id: "trial", label: "TRIAL SESSION" },
  ];

  const subTabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
  ];
  // @ts-ignore
  const getTabColor = (tabId) => {
    if (activeTab === "individual") {
      if (tabId === "group") return "#B4A5D7";
      if (tabId === "trial") return "#6B5692";
    } else if (activeTab === "group") {
      if (tabId === "individual") return "#6B5692";
      if (tabId === "trial") return "#B4A5D7";
    } else if (activeTab === "trial") {
      if (tabId === "group") return "#6B5692";
      if (tabId === "individual") return "#B4A5D7";
    }
    return "#EDE8FA"; // Active tab color
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    if (newStatus === "rejected") {

      setWait(bookingId)
    }
    if (newStatus === "accepted") {

      setaccept(bookingId)
    }
    if (true) {
      const createZoomMeeting = async () => {
        try {
          const response = await axios.post("/api/zoomapi");


          if (response.data.success) {
            const { start_url, join_url } = response.data.meeting;

            // Store the full meeting data
            const newMeetingData = response.data;

            // Update state if needed
            setStarturl(start_url);
            setJoinurl(join_url);
            setfulldata(newMeetingData);

            return {
              start_url,
              join_url,
              meetingData: newMeetingData,
            };
          } else {
            throw new Error("Meeting creation unsuccessful");
          }
        } catch (error: any) {
          console.error("Zoom API Error:", error);
          throw error; // Re-throw to handle in the main function
        }
      };

      try {
        const meetingResult = await createZoomMeeting();


        // Update booking with meeting data
        const updateResponse = await axios.post("/api/update-booking-status", {
          bookingId,
          newStatus,
          startLink: meetingResult.start_url,
          joinLink: meetingResult.join_url,
          zoomMeetingData: meetingResult.meetingData, // Use consistent field name
        });

        if (!updateResponse.data.success) {
          throw new Error("Failed to update booking");
        }

        setFilteredRequests((prevRequests) =>
          prevRequests.filter((request) => request?._id !== bookingId)
        );


        setLoading(false);
      } catch (error: any) {
        console.error("Error in updateBookingStatus:", error);
        setError(error.message || "An unknown error occurred");
        setLoading(false);

        toast({
          title: `Error: ${error.message || "Failed to update booking"}`,
          description: "",
          variant: "destructive",
        });
      } finally {
        setWait("")
        setaccept("")

      }
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full  pt-4 bg-[#EDE8FA] rounded-3xl  relative h-full scrollbar-none text-white">
      <div className="flex justify-between items-start mb-4 absolute top-0 left-0 w-full">
        <div className=" grid grid-cols-3   rounded-tl-3xl rounded-tr-3xl h-10 sm:h-[89px] w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center flex-nowrap  font-normal box-border sm:font-bold text-xs px-2  sm:text-lg  transition-all
            ${tab.id === activeTab
                  ? "bg-[#EDE8FA] text-[#685AAD] transition-all"
                  : `text-white transition-all`
                }
            ${tab.id === "individual"
                  ? "rounded-tl-3xl transition-all"
                  : "transition-all"
                }
            ${tab.id === "trial"
                  ? "rounded-tr-3xl custom-xl:rounded-none transition-all"
                  : "transition-all"
                }
              
          `}
              style={{ backgroundColor: getTabColor(tab.id) }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white h-10 sm:h-[89px] w-[38%] rounded-bl-3xl     transition-all  hidden custom-xl:flex items-start  justify-center px-4 custom-lg:px-8 pb-4 rounded-tr-3xl">
          {activeTab === "trial" ? (
            ""
          ) : (
            <div className="text-transparent bg-transparent font-bold text-xs px-2 transition-all  w-[80%]   md:text-sm custom-xl:text-2xl h-full  rounded-md sm:rounded-xl mb-1 uppercase   flex items-center justify-center ">
              Sessions&nbsp;left:

            </div>
          )}
        </div>
      </div>

      <div className="mt-14 sm:mt-[130px] ml-[10px]">
        {activeTab === "trial" ? (
          <div className="bg-[#655693] ml-2 sm:ml-10  py-3 px-3 text-sm rounded-xl w-fit flex  ">
            <button
              onClick={() => setActiveSubTab("upcoming")}
              className={`flex-1 py-3 sm:py-6 px-7 sm:px-[51px]  text-center rounded-xl transition-all duration-300 ${activeSubTab === "upcoming"
                ? "bg-[#8653FF] text-white transition-all"
                : "text-[#d8b4fe] transition-all"
                }`}
            >
              Application
            </button>
            <button
              onClick={() => setActiveSubTab("completed")}
              className={`flex-1 py-3 sm:py-6 px-[20px] sm:px-[46px] text-center rounded-xl transition-all duration-300 ${activeSubTab === "completed"
                ? "bg-[#8653FF] text-white"
                : "text-[#d8b4fe]"
                }`}
            >
              Requests
            </button>
          </div>
        ) : (
          <div className="bg-[#655693]  ml-2 sm:ml-10 py-3 px-3 text-sm rounded-xl w-fit flex  ">
            <button
              onClick={() => setActiveSubTab("upcoming")}
              className={`flex-1 py-3 sm:py-6 px-6 sm:px-12 text-center rounded-xl transition-all duration-300 ${activeSubTab === "upcoming"
                ? "bg-[#8653FF] text-white"
                : "text-[#d8b4fe]"
                }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveSubTab("completed")}
              className={`flex-1 py-3 sm:py-6 px-6 sm:px-12 text-center rounded-xl transition-all duration-300 ${activeSubTab === "completed"
                ? "bg-[#8653FF] text-white"
                : "text-[#d8b4fe]"
                }`}
            >
              Completed
            </button>
          </div>
        )}
      </div>

      <div
        className={`${activeTab === "trial" ? "bg-[#ede8fa]" : "bg-[#B4A5D7]"
          }  py-2 px-2 custom-xl:px-5 custom-xl:py-8 rounded-3xl mt-7 sm:mt-[37px] h-full  overflow-auto scrollbar-none `}
      >
        {/* --------------individual session-----------------   */}
        {activeTab === "individual" && (
          <>
            <div>
              {activeSubTab === "upcoming" && (
                <div className="px-2   custom-xl:px-7  w-full space-y-6">
                  {/* Header Row */}
                  <div className="hidden custom-xl:grid custom-xl:grid-cols-4 mb-5 text-sm custom-lg text-base:sm:text-xl custom-xl:pl-9  w-[68%] text-white">
                    <div className="px-4  ">Subject and level</div>
                    <div className="px-4  ">Name</div>
                    <div className="px-4  ">Duration</div>
                    <div className="px-4  ">Date and Time</div>
                  </div>

                  {/* Session Card */}

                  {requests.length > 0 && requests.filter(
                    (request) =>
                      request?.status === "accepted" &&
                      request?.meetingCompleted === false
                  ).length !== 0 ? (
                    <>
                      {requests
                        .filter(
                          (request) =>
                            request?.status === "accepted" &&
                            request?.meetingCompleted === false
                        )
                        .map((request) => {
                          const isExpanded = expandedRequestId === request?._id;
                          return (
                            <div
                              key={request?._id}
                              className={`w-full  bg-[#7565A4] rounded-lg custom-xl:pl-9   ${isExpanded
                                ? "h-auto custom-xl:h-fit transition-all duration-1000 ease-out"
                                : "h-auto custom-xl:h-20 transition-all duration-300 ease-out"
                                } overflow-hidden cursor-pointer`}
                              onMouseEnter={() =>
                                //@ts-ignore
                                setexpandedRequestId(request?._id)
                              }
                              onMouseLeave={() => setexpandedRequestId(null)}
                            >
                              <div className="flex flex-col  custom-xl:flex-row custom-xl:items-start h-full">
                                {/* Content Section */}
                                <div className="flex-1 p-4 flex flex-col custom-xl:flex-row items-start custom-xl:items-center">
                                  <div className="grid grid-cols-2 custom-xl:grid-cols-4 gap-4 w-full">
                                    {/* Subject */}
                                    <div className="flex flex-col custom-xl:block transition-all duration-300 ease-in-out custom-xl:pt-2">
                                      <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                                        Subject and level
                                      </span>
                                      <span className="text-white text-base custom-2xl text-base:sm:text-xl  font-medium">
                                        {request?.subjects || ""}
                                      </span>
                                      <div
                                        className={`text-white ${isExpanded
                                          ? "opacity-100 block transition-all duration-300 ease-in-out"
                                          : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                      >
                                        PAYg session
                                      </div>

                                      <div
                                        className={`text-white mt-4 ${isExpanded
                                          ? "opacity-100 block transition-all duration-300 ease-in-out"
                                          : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                      >
                                        <span className="text-3xl font-medium">
                                          Student&apos;s Note:
                                        </span>
                                        <p className="">
                                          {request?.StudentNote ||
                                            "Not Available"}{" "}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Tutor */}
                                    <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                      <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                        eTutor
                                      </span>
                                      <span className="text-white text-base custom-2xl text-base:sm:text-xl ">
                                        {request?.studentdetails?.firstName ||
                                          "Your Student"}
                                      </span>
                                      <div
                                        className={` ${isExpanded
                                          ? "opacity-100 block transition-all duration-300 ease-in-out"
                                          : "opacity-0 hidden transition-all duration-300 ease-in-out "
                                          }`}
                                      >
                                        <div className="flex  gap-6 items-center  mt-2">
                                          <span>
                                            <Image loading="lazy"
                                              onClick={() => {
                                                setActiveFindEtutor(
                                                  "My eTutor"
                                                );
                                                tutortomessage(request?.teacher);
                                                showchat(true);
                                              }}
                                              src={chaticon}
                                              alt="chaticon"
                                              className="w-5 h-5"
                                            />
                                          </span>
                                          <span>
                                            <Image loading="lazy"
                                              onClick={() => {
                                                setActiveFindEtutor(
                                                  "My eTutor"
                                                );
                                                tutortomessage(request?.teacher);
                                                showchat(true);
                                              }}
                                              src={foldericon}
                                              alt="foldericon"
                                              className="w-5 h-5"
                                            />
                                          </span>
                                          <span
                                            onClick={() => {
                                              setActiveFindEtutor(
                                                "Find eTutor"
                                              );

                                              setTutor(request?.teacher);
                                            }}
                                          >
                                            <Image loading="lazy"
                                              src={profilewhite}
                                              alt="profileicon"
                                              className="w-5 h-5"
                                            />
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                      <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                        Duration
                                      </span>
                                      <span className="text-white text-base custom-2xl text-base:sm:text-xl">
                                        {request?.duration || ""}
                                      </span>
                                    </div>

                                    {/* Date/Time */}
                                    <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                      <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                        Date and Time
                                      </span>
                                      <span className="text-white text-base custom-2xl text-base:sm:text-xl">
                                        {`${new Date(request?.date)
                                          .toLocaleDateString("en-GB")
                                          .replace(/\//g, "/")
                                          .slice(0, 10)}`}
                                      </span>
                                      <div
                                        className={`text-base sm:text-xl text-white ${isExpanded
                                          ? "opacity-100 block transition-all duration-300 ease-in-out"
                                          : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                      >
                                        {`${new Date(
                                          request?.date
                                        ).toLocaleDateString("en-GB", {
                                          weekday: "short",
                                        })}`}{" "}
                                        {request?.time || ""}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Buttons Section */}
                                <div
                                  className={`flex flex-col custom-xl:flex-row gap-2  custom-xl:gap-4  h-full  ${isExpanded
                                    ? "py-6 px-4 h-auto custom-xl:h-28"
                                    : "p-4"
                                    } custom-xl:pl-0 `}
                                >
                                  <button
                                    onClick={() =>
                                      setActiveFindEtutor("Find eTutor")
                                    }
                                    className="w-full  custom-xl:h-full custom-xl:w-auto bg-[#655693] text-white px-8 py-2 rounded-md text-sm custom-2xl text-base:sm:text-xl hover:bg-[#5c4c8b] transition-colors"
                                  >
                                    Edit Session
                                  </button>
                                  <a href={request?.startLink} target="_blank">
                                    <button className="w-full custom-xl:h-full  custom-xl:w-auto bg-[#FC7777] text-white px-8 py-2 rounded-md text-sm custom-2xl text-base:sm:text-xl hover:bg-[#f16d6d] transition-colors">
                                      Meeting Link
                                    </button>
                                  </a>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </>
                  ) : (
                    <Image loading="lazy" src={noschedual} alt="no" className="mx-auto " />
                  )}
                </div>
              )}
            </div>

            <div>
              {activeSubTab === "completed" && (
                <div className="px-2   custom-xl:px-7  w-full space-y-6">
                  {/* Header Row */}
                  <div className="hidden custom-xl:grid custom-xl:grid-cols-4 mb-5 text-sm custom-lg text-base:sm:text-xl custom-xl:pl-9  w-[68%] text-white">
                    <div className="px-4  ">Subject and level</div>
                    <div className="px-4  ">Name</div>
                    <div className="px-4  ">Duration</div>
                    <div className="px-4  ">Date and Time</div>
                  </div>

                  {/* Session Card */}

                  {requests.length > 0 && requests.filter(
                    (request) =>
                      request?.status === "accepted" &&
                      request?.meetingCompleted === true
                  ).length !== 0 ? (
                    <>
                      {requests
                        .filter(
                          (request) =>
                            request?.status === "accepted" &&
                            request?.meetingCompleted === true
                        )
                        .map((request) => {
                          const isExpanded = expandedRequestId === request?._id;
                          return (
                            <div
                              key={request?._id}
                              className={`w-full  bg-[#7565A4] rounded-lg custom-xl:pl-9   ${isExpanded
                                ? "h-auto custom-xl:h-fit transition-all duration-1000 ease-out"
                                : "h-auto custom-xl:h-20 transition-all duration-300 ease-out"
                                } overflow-hidden cursor-pointer`}
                              onMouseEnter={() =>
                                //@ts-ignore
                                setexpandedRequestId(request?._id)
                              }
                              onMouseLeave={() => setexpandedRequestId(null)}
                            >
                              <div className="flex flex-col  custom-xl:flex-row custom-xl:items-start h-full">
                                {/* Content Section */}
                                <div className="flex-1 p-4 flex flex-col custom-xl:flex-row items-start custom-xl:items-center">
                                  <div className="grid grid-cols-2 custom-xl:grid-cols-4 gap-4 w-full">
                                    {/* Subject */}
                                    <div className="flex flex-col custom-xl:block transition-all duration-300 ease-in-out custom-xl:pt-2">
                                      <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                                        Subject and level
                                      </span>
                                      <span className="text-white text-base custom-2xl text-base:sm:text-xl  font-medium">
                                        {request?.subjects || ""}
                                      </span>
                                      <div
                                        className={`text-white ${isExpanded
                                          ? "opacity-100 block transition-all duration-300 ease-in-out"
                                          : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                      >
                                        PAYg session
                                      </div>

                                      <div
                                        className={`text-white mt-4 ${isExpanded
                                          ? "opacity-100 block transition-all duration-300 ease-in-out"
                                          : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                      >
                                        <span className="text-3xl font-medium">
                                          Student&apos;s Note:
                                        </span>
                                        <p className="">
                                          {request?.StudentNote ||
                                            "Not Available"}{" "}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Tutor */}
                                    <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                      <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                        eTutor
                                      </span>
                                      <span className="text-white text-base custom-2xl text-base:sm:text-xl ">
                                        {request?.studentdetails?.firstName ||
                                          "Your Student"}
                                      </span>
                                      <div
                                        className={` ${isExpanded
                                          ? "opacity-100 block transition-all duration-300 ease-in-out"
                                          : "opacity-0 hidden transition-all duration-300 ease-in-out "
                                          }`}
                                      >
                                        <div className="flex  gap-6 items-center  mt-2">
                                          <span>
                                            <Image loading="lazy"
                                              onClick={() => {
                                                setActiveFindEtutor(
                                                  "My eTutor"
                                                );
                                                tutortomessage(request?.teacher);
                                                showchat(true);
                                              }}
                                              src={chaticon}
                                              alt="x"
                                              className="w-5 h-5"
                                            />
                                          </span>
                                          <span>
                                            <Image loading="lazy"
                                              onClick={() => {
                                                setActiveFindEtutor(
                                                  "My eTutor"
                                                );
                                                tutortomessage(request?.teacher);
                                                showchat(true);
                                              }}
                                              src={foldericon}
                                              alt="x"
                                              className="w-5 h-5"
                                            />
                                          </span>
                                          <span
                                            onClick={() => {
                                              setActiveFindEtutor(
                                                "Find eTutor"
                                              );

                                              setTutor(request?.teacher);
                                            }}
                                          >
                                            <Image loading="lazy"
                                              src={profilewhite}
                                              alt="x"
                                              className="w-5 h-5"
                                            />
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                      <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                        Duration
                                      </span>
                                      <span className="text-white text-base custom-2xl text-base:sm:text-xl">
                                        {request?.duration || ""}
                                      </span>
                                    </div>

                                    {/* Date/Time */}
                                    <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                      <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                        Date and Time
                                      </span>
                                      <span className="text-white text-base custom-2xl text-base:sm:text-xl">
                                        {`${new Date(request?.date)
                                          .toLocaleDateString("en-GB")
                                          .replace(/\//g, "/")
                                          .slice(0, 10)}`}
                                      </span>
                                      <div
                                        className={`text-base sm:text-xl text-white ${isExpanded
                                          ? "opacity-100 block transition-all duration-300 ease-in-out"
                                          : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                      >
                                        {`${new Date(
                                          request?.date
                                        ).toLocaleDateString("en-GB", {
                                          weekday: "short",
                                        })}`}{" "}
                                        {request?.time || ""}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Buttons Section */}
                                <div
                                  className={`flex flex-col custom-xl:flex-row gap-2  custom-xl:gap-4  h-full ${isExpanded ? "py-6 px-4" : "p-4"
                                    } transition-all duration-300 ease-in-out  custom-xl:pl-0 `}
                                >
                                  <button className="w-full bg-transparent  custom-xl:h-full custom-xl:w-auto  text-transparent px-8 py-2 rounded-md ">
                                    Edit Session
                                  </button>

                                  <button className="w-full custom-xl:h-full  custom-xl:w-auto bg-[#655693] text-white px-14 py-2 rounded-md text-sm custom-2xl text-base:sm:text-xl  transition-colors">
                                    Completed
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </>
                  ) : (
                    <Image loading="lazy" src={noschedual} alt="x" className="mx-auto " />
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* -----------------group session------------- */}
        {activeTab === "group" && (
          <>
            <div>
              {activeSubTab === "upcoming" && (
                <div className="px-1  custom-xl:px-6">
                  <div className="w-full custom-xl:w-[65%] flex justify-between mb-1 sm:mb-4 custom-xl:px-4">
                    <span className="px-2 custom-xl:px-0 text-xs sm:text-sm">
                      Subject and level
                    </span>
                    <span className="px-2 custom-xl:px-0 text-xs sm:text-sm">
                      eTutor
                    </span>
                    <span className="px-2 custom-xl:px-0 text-xs sm:text-sm">
                      Duration
                    </span>
                    <span className="px-2 custom-xl:px-0 text-xs sm:text-sm">
                      Date and Time{" "}
                    </span>
                  </div>

                  {/* <div className="flex flex-col gap-2 custom-xl:gap-3">
                    <div className="flex  justify-between custom-xl:items-center  py-2 rounded-lg bg-[#564589] pl-2 sm:pl-4 pr-2 flex-col custom-xl:flex-row">
                      <div className="w-full custom-xl:w-[65%] custom-xl:pr-6 flex justify-between ">
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md">
                          English Level C1 #3
                        </span>
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md">
                          Tutor Name
                        </span>
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md custom-xl:pr-4">
                          60min
                        </span>
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md">
                          17-june-12:00
                        </span>
                      </div>

                      <div className="flex gap-2 items-center justify-center custom-xl:pl-6  flex-wrap sm:flex-nowrap   w-fit custom-lg:w-fit mt-4 custom-xl:mt-0 ">
                        <button
                          onClick={() => setActiveFindEtutor("Find eTutor")}
                          className="bg-[#473171] px-6 py-[2px] rounded-md"
                        >
                          Edit&nbsp;Session
                        </button>
                        <button className="bg-[#8653FF] px-6 py-[2px] rounded-md">
                          Meeting&nbsp;Link
                        </button>
                      </div>
                    </div>
                    <div className="flex  justify-between custom-xl:items-center  py-2 rounded-lg bg-[#564589] pl-2 sm:pl-4 pr-2 flex-col custom-xl:flex-row">
                      <div className="w-full custom-xl:w-[65%] custom-xl:pr-6 flex justify-between ">
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md">
                          English Level C1 #3
                        </span>
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md">
                          Tutor Name
                        </span>
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md custom-xl:pr-4">
                          60min
                        </span>
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md">
                          17-june-12:00
                        </span>
                      </div>

                      <div className="flex gap-2 items-center justify-center custom-xl:pl-6  flex-wrap sm:flex-nowrap   w-fit custom-lg:w-fit mt-4 custom-xl:mt-0 ">
                        <button
                          onClick={() => setActiveFindEtutor("Find eTutor")}
                          className="bg-[#473171] px-6 py-[2px] rounded-md"
                        >
                          Edit&nbsp;Session
                        </button>
                        <button className="bg-[#8653FF] px-6 py-[2px] rounded-md">
                          Meeting&nbsp;Link
                        </button>
                      </div>
                    </div>
                  </div> */}
                </div>
              )}
            </div>
            <div>
              {activeSubTab === "completed" && (
                <div className="px-1  custom-xl:px-6">
                  <div className="w-full custom-xl:w-[65%] flex justify-between mb-1 sm:mb-4 custom-xl:px-4">
                    <span className="px-2 custom-xl:px-0 text-xs sm:text-sm">
                      Subject and level
                    </span>
                    <span className="px-2 custom-xl:px-0 text-xs sm:text-sm">
                      eTutor
                    </span>
                    <span className="px-2 custom-xl:px-0 text-xs sm:text-sm">
                      Duration
                    </span>
                    <span className="px-2 custom-xl:px-0 text-xs sm:text-sm">
                      Date and Time{" "}
                    </span>
                  </div>

                  {/* <div className="flex flex-col gap-2 custom-xl:gap-3">
                    <div className="flex  justify-between custom-xl:items-center  py-2 rounded-lg bg-[#564589] pl-2 sm:pl-4 pr-2 flex-col custom-xl:flex-row">
                      <div className="w-full custom-xl:w-[65%] custom-xl:pr-6 flex justify-between ">
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md">
                          English Level C1 #3
                        </span>
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md">
                          Tutor Name
                        </span>
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md custom-xl:pr-4">
                          60min
                        </span>
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md">
                          17-june-12:00
                        </span>
                      </div>
                    </div>
                    <div className="flex  justify-between custom-xl:items-center  py-2 rounded-lg bg-[#564589] pl-2 sm:pl-4 pr-2 flex-col custom-xl:flex-row">
                      <div className="w-full custom-xl:w-[65%] custom-xl:pr-6 flex justify-between ">
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md">
                          English Level C1 #3
                        </span>
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md">
                          Tutor Name
                        </span>
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md custom-xl:pr-4">
                          60min
                        </span>
                        <span className="text-xs max-w-13 sm:text-sm custom-xl:text-md">
                          17-june-12:00
                        </span>
                      </div>
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          </>
        )}

        {/* ------------------trial session----------------- */}
        {activeTab === "trial" && (
          <>


            <div className="">
              {activeSubTab === "upcoming" && (
                <>
                  <div className="px-1  custom-xl:px-4  mt-2 custom-xl:mt-4">
                    <div className="flex justify-between gap-3 flex-wrap sm:flex-nowrap sm:gap-x-14">
                      <h1 className="text-2xl custom-xl:text-5xl text-[#685AAD] font-bold text-nowrap">
                        New Students
                      </h1>

                      {/* right side search params-------------------------------- */}

                      <div className="flex flex-wrap justify-end   gap-4 custom-xl:gap-7  w-fit  ">
                        <div className="relative order-2 custom-xl:order-1  h-fit   w-full  max-w-[20.5rem] custom-xl:max-w-fit custom-xl:w-fit ">
                          <div
                            className={`bg-[#DBCAFF] text-[#685AAD] placeholder-[#685aadb0] text-xl px-10  py-3 rounded-full border border-transparent w-full  custom-xl:w-[24.7rem] focus:outline-none focus:ring-0 flex justify-between gap-5 ${isOpen
                              ? "border  border-[#a394d6]"
                              : "border border-transparent"
                              } `}
                            onClick={toggleDropdown}
                          >
                            <span className="text-xl pl-3 lowercase">
                              {options.find(
                                (option) => option.value === sortConfig.key
                              )?.label || "sort by"}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="text-[#a394d6]" />
                            ) : (
                              <ChevronDown className="text-[#a394d6]" />
                            )}
                          </div>

                          <div>
                            <Image loading="lazy"
                              src={infoicon}
                              alt="x"
                              className="h-6 w-6 absolute top-2 -left-12  "
                            />
                          </div>
                          {isOpen && (
                            <div
                              onMouseLeave={() => {
                                setIsOpen(false);
                              }}
                              className="py-5 max-w-[20.8rem] mx-auto w-full transition-all duration-500  absolute top-full left-0 m-auto  bg-[#DBCAFF] border  border-[#a394d6] px-5 text-[#8f81c7] text-xs sm:text-sm mt-2.5  ml-1.5 rounded-xl shadow-lg z-10  h-fit"
                            >
                              <ul
                                id="style-2"
                                className=" overflow-y-auto max-h-[13rem] scrollstyle   "
                              >
                                {options.map((option) => (
                                  <li
                                    key={option.value}
                                    className={` first:pb-3 first:pt-0 py-3 cursor-pointer last:border-b-0 border-b border-[#8f81c7]  text-[#6C5BAA] text-lg max-w-[14.9rem]   ${selectedOption === option.value ? "" : ""
                                      }`}
                                    onClick={() =>
                                      handleOptionClick(option.value)
                                    }
                                  >
                                    <span className="pl-1 ">
                                      {option.label}
                                    </span>
                                  </li>
                                  // <div className="border-b border-[#8f81c7] w-full"></div>
                                ))}
                              </ul>
                              <div></div>
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
                          )}
                        </div>

                        {/* ---------search bar top------- */}
                        <div className="relative w-fit  h-fit order-1 custom-xl:order-2">
                          <input
                            type="text"
                            placeholder="Search by Students"
                            className=" bg-[#DBCAFF] text-[#685AAD] placeholder-[#685aadb0] text-xl px-10  py-3 rounded-full border border-transparent w-full  custom-xl:w-[24.7rem] focus:outline-none focus:ring-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <Image loading="lazy"
                            src={searchicon}
                            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-[#6949ff] w-5 h-5 "
                            alt="x"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 custom-xl:gap-3  mt-5 custom-xl:mt-8">
                      {filteredData.filteredStudents.length > 0 && filteredData.filteredStudents
                        .filter(
                          (student) =>
                            !requestsofteachers.some(
                              (teacher: any) =>
                                teacher.teacher === session?.user?.id &&
                                teacher.recipient === student._id
                            )
                        )
                        .map((student) => (
                          <>
                            <div
                              key={student._id}
                              className="bg-[#B4A5D7] p-8 custom-xl:pl-[70px] custom-xl:pr-14 custom-xl:pt-11 custom-xl:pb-7 rounded-[2rem]  w-full relative"
                            >
                              <div className="flex flex-col md:flex-row gap-2 sm:gap-8 custom-xl:gap-28">
                                {/* Left section with avatar and name */}
                                <div className="flex flex-col items-center justify-center sm:justify-normal  w-full sm:w-fit  ">
                                  <div className="w-20 sm:w-28 custom-xl:w-[156px] h-20 sm:h-28 custom-xl:h-[156px] overflow-hidden   rounded-full mb-6">
                                    <img
                                      //@ts-ignore
                                      src={student?.user?.profilePicture || ""}
                                      alt="example"
                                    />
                                  </div>
                                  <span className="text-white text-base sm:text-xl custom-xl:text-3xl font-medium text-center capitalize ">
                                    {student.firstName || ""}
                                  </span>
                                </div>

                                {/* Right section with content */}
                                <div className="flex-1">
                                  {/* Grid header */}
                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                                    <div>
                                      <h3 className="text-white text-base sm:text-xl font-medium mb-1">
                                        Subjects needed
                                      </h3>
                                      <p className="text-[#473171] text-sm sm:text-lg">
                                        {student.subjects.join("-")}
                                      </p>
                                    </div>
                                    <div>
                                      <h3 className="text-white text-base sm:text-xl font-medium mb-1">
                                        Grade
                                      </h3>
                                      <p className="text-[#473171] text-sm sm:text-lg">
                                        {student.grade || ""}
                                      </p>
                                    </div>
                                    <div>
                                      <h3 className="text-white text-base sm:text-xl font-medium mb-1">
                                        Entry date
                                      </h3>
                                      <p className="text-[#473171] text-sm sm:text-lg">
                                        {
                                          //@ts-ignore
                                          student.user?.createdAt
                                            ? new Date(
                                              //@ts-ignore
                                              student.user?.createdAt
                                            ).toLocaleDateString("en-GB")
                                            : ""}
                                      </p>
                                    </div>
                                    <div>
                                      <h3 className="text-white text-base sm:text-xl font-medium mb-1">

                                      </h3>
                                      <p className="text-[#473171] text-sm sm:text-lg">

                                      </p>
                                    </div>
                                  </div>

                                  {/* Description text */}
                                  <p className="text-[#473171] leading-relaxed mb-8 text-base sm:text-xl">
                                    {" "}
                                    {student.additionalInformation ||
                                      "Not Available"}
                                  </p>

                                  {/* Action buttons */}
                                  <div className="flex justify-end gap-4 flex-wrap  ">
                                    {/* <button
                                  onClick={() => {
                                    updateBookingStatus(
                                      request?._id,
                                      "rejected"
                                    );
                                  }}
                                  className="bg-[#FC7777] text-white px-8 py-2 rounded-xl text-base sm:text-xl max-w-[169px]  sm:max-w-[113px] w-full font-normal"
                                >
                                  Deny
                                </button> */}

                                    <button
                                      onClick={() => {
                                        sendRequest(student._id);
                                        setvalue((prevValue) => !prevValue);
                                      }}
                                      className="bg-violet-500 text-white px-8 py-2 rounded-xl text-base sm:text-xl max-w-[169px] w-full font-normal"
                                    >
                                      {apply === student._id ? 'Wait...' : 'Apply'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ))}

                      <>
                        {filteredData.filteredParents.length > 0 && filteredData.filteredParents
                          .filter(
                            (student) =>
                              !requestsofteachers.some(
                                (teacher: any) =>
                                  teacher.teacher === session?.user?.id &&
                                  teacher.recipient === student._id
                              )
                          )
                          .map((parent) => (
                            <>
                              <div
                                key={parent._id}
                                className="bg-[#B4A5D7] p-8 custom-xl:pl-[70px] custom-xl:pr-14 custom-xl:pt-11 custom-xl:pb-7 rounded-[2rem]  w-full relative"
                              >
                                <div className="flex flex-col md:flex-row gap-2 sm:gap-8 custom-xl:gap-28">
                                  {/* Left section with avatar and name */}
                                  <div className="flex flex-col items-center justify-center sm:justify-normal  w-full sm:w-fit  ">
                                    <div className="w-20 sm:w-28 custom-xl:w-[156px] h-20 sm:h-28 custom-xl:h-[156px] overflow-hidden  flex items-center justify-center rounded-full mb-6">
                                      <img
                                        //@ts-ignore
                                        src={parent?.user?.profilePicture || ""}
                                        alt="example"
                                        className="object-cover w-full"
                                      />
                                    </div>
                                    <span className="text-white text-base sm:text-xl custom-xl:text-3xl font-medium text-center capitalize ">
                                      {parent.firstName || ""}
                                    </span>
                                  </div>

                                  {/* Right section with content */}
                                  <div className="flex-1">
                                    {/* Grid header */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                                      <div>
                                        <h3 className="text-white text-base sm:text-xl font-medium mb-1">
                                          Subjects needed
                                        </h3>
                                        <p className="text-[#473171] text-sm sm:text-lg">
                                          {parent.subjectChildNeeds.join("-")}
                                        </p>
                                      </div>
                                      <div>
                                        <h3 className="text-white text-base sm:text-xl font-medium mb-1">
                                          Grade
                                        </h3>
                                        <p className="text-[#473171] text-sm sm:text-lg">
                                          {parent.grade || ""}
                                        </p>
                                      </div>
                                      <div>
                                        <h3 className="text-white text-base sm:text-xl font-medium mb-1">
                                          Entry date
                                        </h3>
                                        <p className="text-[#473171] text-sm sm:text-lg">
                                          {
                                            //@ts-ignore
                                            parent.user?.createdAt
                                              ? new Date(
                                                //@ts-ignore
                                                parent.user?.createdAt
                                              ).toLocaleDateString("en-GB")
                                              : ""}
                                        </p>
                                      </div>
                                      <div>
                                        <h3 className="text-white text-base sm:text-xl font-medium mb-1">

                                        </h3>
                                        <p className="text-[#473171] text-sm sm:text-lg">

                                        </p>
                                      </div>
                                    </div>

                                    {/* Description text */}
                                    <p className="text-[#473171] leading-relaxed mb-8 text-base sm:text-xl">
                                      {" "}
                                      {parent.additionalInformation ||
                                        "Not Available"}
                                    </p>

                                    {/* Action buttons */}
                                    <div className="flex justify-end gap-4 flex-wrap  ">
                                      {/* <button
                                              onClick={() => {
                                                updateBookingStatus(
                                                  request?._id,
                                                  "rejected"
                                                );
                                              }}
                                              className="bg-[#FC7777] text-white px-8 py-2 rounded-xl text-base sm:text-xl max-w-[169px]  sm:max-w-[113px] w-full font-normal"
                                            >
                                              Deny
                                            </button> */}

                                      <button
                                        onClick={() => {
                                          sendRequest(parent._id);
                                          setvalue((prevValue) => !prevValue);
                                        }}
                                        className="bg-violet-500 text-white px-8 py-2 rounded-xl text-base sm:text-xl max-w-[169px] w-full font-normal"
                                      >
                                        {apply === parent._id ? 'Wait...' : 'Apply'}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                      </>
                    </div>
                  </div>
                </>
              )}
            </div>



            <div>
              {activeSubTab === "completed" && (

                <>
                  <div className="px-1  custom-xl:px-4  mt-2 custom-xl:mt-4">
                    <div className="flex justify-between gap-3 flex-wrap sm:flex-nowrap sm:gap-x-14">
                      <h1 className="text-2xl custom-xl:text-5xl text-[#685AAD] font-bold text-nowrap">
                        Find your Students
                      </h1>

                      {/* right side search params-------------------------------- */}

                      <div className="flex flex-wrap justify-end   gap-4 custom-xl:gap-7  w-fit ">
                        <div className="relative order-2 custom-xl:order-1  h-fit   w-full  max-w-[20.5rem] custom-xl:max-w-fit custom-xl:w-fit ">
                          <div
                            className={`bg-[#DBCAFF] text-[#685AAD] placeholder-[#685aadb0] text-xl px-10  py-3 rounded-full border border-transparent w-full  custom-xl:w-[24.7rem] focus:outline-none focus:ring-0 flex justify-between gap-5 ${isOpen
                              ? "border  border-[#a394d6]"
                              : "border border-transparent"
                              } `}
                            onClick={toggleDropdown}
                          >
                            <span className="text-xl pl-3 lowercase">
                              {options.find(
                                (option) => option.value === sortConfig.key
                              )?.label || "sort by"}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="text-[#a394d6]" />
                            ) : (
                              <ChevronDown className="text-[#a394d6]" />
                            )}
                          </div>

                          <div>
                            <Image loading="lazy"
                              src={infoicon}
                              alt="x"
                              className="h-6 w-6 absolute top-2 -left-12"
                            />
                          </div>
                          {isOpen && (
                            <div
                              onMouseLeave={() => {
                                setIsOpen(false);
                              }}
                              className="py-5 max-w-[20.8rem] mx-auto w-full transition-all duration-500  absolute top-full left-0 m-auto  bg-[#DBCAFF] border  border-[#a394d6] px-5 text-[#8f81c7] text-xs sm:text-sm mt-2.5  ml-1.5 rounded-xl shadow-lg z-10  h-fit"
                            >
                              <ul
                                id="style-2"
                                className=" overflow-y-auto max-h-[13rem] scrollstyle   "
                              >
                                {options.map((option) => (
                                  <li
                                    key={option.value}
                                    className={` first:pb-3 first:pt-0 py-3 cursor-pointer last:border-b-0 border-b border-[#8f81c7]  text-[#6C5BAA] text-lg max-w-[14.9rem]   ${selectedOption === option.value ? "" : ""
                                      }`}
                                    onClick={() =>
                                      handleOptionClick(option.value)
                                    }
                                  >
                                    <span className="pl-1 ">
                                      {option.label}
                                    </span>
                                  </li>
                                  // <div className="border-b border-[#8f81c7] w-full"></div>
                                ))}
                              </ul>
                              <div></div>
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
                          )}
                        </div>

                        {/* ---------search bar top------- */}
                        <div className="relative w-fit  h-fit order-1 custom-xl:order-2">
                          <input
                            type="text"
                            placeholder="Search by Students"
                            className=" bg-[#DBCAFF] text-[#685AAD] placeholder-[#685aadb0] text-xl px-10  py-3 rounded-full border border-transparent w-full  custom-xl:w-[24.7rem] focus:outline-none focus:ring-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <Image loading="lazy"
                            src={searchicon}
                            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-[#6949ff] w-5 h-5 "
                            alt="x"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 custom-xl:gap-3  mt-5 custom-xl:mt-8">
                      {filteredRequests
                        .filter((request) => request?.status === "pending")
                        .map((request) => {
                          return (
                            <>
                              <div
                                key={request?._id}
                                className="bg-[#B4A5D7] p-8 custom-xl:pl-[70px] custom-xl:pr-14 custom-xl:pt-11 custom-xl:pb-7 rounded-[2rem]  w-full relative"
                              >
                                <div className="flex flex-col md:flex-row gap-2 sm:gap-8 custom-xl:gap-28">
                                  {/* Left section with avatar and name */}
                                  <div className="flex flex-col items-start justify-center sm:justify-normal  w-full sm:w-fit  ">
                                    <div className="w-20 sm:w-28 custom-xl:w-[156px] h-20 sm:h-28 custom-xl:h-[156px] overflow-hidden flex items-center justify-center  rounded-full mb-6">
                                      <img
                                        src={
                                          //@ts-ignore
                                          request?.student?.profilePicture || ""
                                        }
                                        alt="example"
                                        className="object-cover w-full"
                                      />
                                    </div>
                                    <span className="text-white text-base sm:text-xl custom-xl:text-3xl font-medium text-center capitalize ">
                                      {
                                        //@ts-ignore
                                        request?.studentdetails.firstName || ""} {request?.IsTrialSession === true && (<span className="text-[#e6e4f2]">(Trial Session)</span>)}
                                    </span>
                                  </div>

                                  {/* Right section with content */}
                                  <div className="flex-1">
                                    {/* Grid header */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                                      <div>
                                        <h3 className="text-white text-base sm:text-xl font-medium mb-1">
                                          Subjects needed
                                        </h3>
                                        <p className="text-[#473171] text-sm sm:text-lg">
                                          {request?.subjects.join("-")}
                                        </p>
                                      </div>
                                      <div>
                                        <h3 className="text-white text-base sm:text-xl font-medium mb-1">
                                          Grade
                                        </h3>
                                        <p className="text-[#473171] text-sm sm:text-lg">
                                          {request?.studentdetails.grade || ""}
                                        </p>
                                      </div>
                                      <div>
                                        <h3 className="text-white text-base sm:text-xl font-medium mb-1">
                                          Entry date
                                        </h3>
                                        <p className="text-[#473171] text-sm sm:text-lg">
                                          {request?.date
                                            ? new Date(
                                              request?.date
                                            ).toLocaleDateString("en-GB")
                                            : ""}
                                        </p>
                                      </div>
                                      <div>
                                        <h3 className="text-white text-base sm:text-xl font-medium mb-1">

                                        </h3>
                                        <p className="text-[#473171] text-sm sm:text-lg">

                                        </p>
                                      </div>
                                    </div>

                                    {/* Description text */}
                                    <p className="text-[#473171] leading-relaxed mb-8 text-base sm:text-xl">
                                      Student Note:{" "}
                                      {request?.StudentNote || "Not Available"}
                                    </p>

                                    {/* Action buttons */}
                                    <div className="flex justify-end gap-4 flex-wrap  ">
                                      <button
                                        onClick={() => {
                                          updateBookingStatus(
                                            request?._id,
                                            "rejected"
                                          );
                                        }}
                                        className="bg-[#FC7777] text-white px-8 py-2 rounded-xl text-base sm:text-xl max-w-[169px]  sm:max-w-[113px] w-full font-normal"
                                      >
                                        {Wait === request?._id ? 'Wait...' : 'Deny'}
                                      </button>



                                      <button
                                        onClick={() => {
                                          //@ts-ignore
                                          if (request?.IsTrialSession === true) {
                                            setIsTrialSession(true)
                                          }
                                          updateBookingStatus(
                                            request?._id,
                                            "accepted"
                                          );
                                          // setActiveFindEtutor("Find eTutor");
                                        }}
                                        className="bg-violet-500 text-white px-8 py-2 rounded-xl text-base sm:text-xl max-w-[169px] w-full font-normal"
                                      >

                                        {accept === request?._id ? 'Wait...' : 'Accept'}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </>
              )}



            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SessionDashboard;



