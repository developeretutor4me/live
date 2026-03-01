import ActivityDarkBlue from "../../../../../public/ActivityDarkBlue.svg";
import ActivityLightPurple from "../../../../../public/lighPUrple.svg";
import calanderinactive from "../../../../../public/calander inactive.svg";
import calender from "../../../../../public/calander.svg";
import contact from "../../../../../public/contactandsupporticon.svg";
import eicon from "../../../../../public/eicon.svg";
import einactive from "../../../../../public/e inactive.svg";
import earningsinactive from "../../../../../public/earnings inactive.svg";
import homeinactive from "../../../../../public/home inactive.svg";
import Home1 from "../../../../../public/homeicon.svg";
import link from "../../../../../public/linkicons.svg";
import linksinactive from "../../../../../public/links inactive.svg";
import membership from "../../../../../public/earnings.svg";
import refer from "../../../../../public/refericon.svg";
import referinactive from "../../../../../public/refer inactive.svg";
import sessionactive from "../../../../../public/sessionicon.svg";
import sessioninactive from "../../../../../public/sessionoverview inactive.svg";
import setting from "../../../../../public/settingicon.svg";
import settinginactive from "../../../../../public/settings inactive.svg";
import supportinactive from "../../../../../public/support inactive.svg";

export interface SidebarItem {
  name: string;
  activeIcon: string;
  inactiveIcon: string;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { name: "Dashboard", activeIcon: Home1, inactiveIcon: homeinactive },
  {
    name: "Session overview",
    activeIcon: sessionactive,
    inactiveIcon: sessioninactive,
  },
  { name: "My Students", activeIcon: eicon, inactiveIcon: einactive },
  { name: "Calendar", activeIcon: calender, inactiveIcon: calanderinactive },
  { name: "Earnings", activeIcon: membership, inactiveIcon: earningsinactive },
  { name: "Support", activeIcon: contact, inactiveIcon: supportinactive },
  {
    name: "Refer your Friends",
    activeIcon: refer,
    inactiveIcon: referinactive,
  },
  {
    name: "Activity",
    activeIcon: ActivityLightPurple,
    inactiveIcon: ActivityDarkBlue,
  },
  { name: "Settings", activeIcon: setting, inactiveIcon: settinginactive },
  { name: "Useful links", activeIcon: link, inactiveIcon: linksinactive },
];

export interface GenderOption {
  value: string;
  label: string;
}

export interface SubjectOption {
  value: string;
  label: string;
}

export interface GeneralTabProps {
  uploadedImage: string | null;
  profilePicture: string;
  image: any; // ideally replace 'any' with a proper image file type or URL type
  handleUpload: () => void;
  pictureuploadloading: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  setYourEducation: (edu: string) => void;
  setAboutYou: (about: string) => void;
  setVideoIntroduction: (video: string) => void;
  videoIntroduction: string;
  activeTab: string;
  aboutYou: string;
  yourEducation: string;
  lastName: string;
  setLastName: (name: string) => void;
  teacher: any;
  isEditing: boolean;
  day: string;
  setDay: (day: string) => void;
  month: string;
  setMonth: (month: string) => void;
  year: string;
  setYear: (year: string) => void;
  selectedGender: string;
  isGenderOpen: boolean;
  toggleGenderDropdown: () => void;
  genderOptions: GenderOption[];
  handleGenderClick: (gender: string) => void;
  selectedSubjects: string[];
  isSubjectDropdownOpen: boolean;
  setIsSubjectDropdownOpen: (open: boolean) => void; // added missing setter prop
  toggleSubjectDropdown: () => void;
  subjectOptions: SubjectOption[];
  handleSubjectClick: (subject: string) => void;
  removeSubject: (subject: string) => void;
  isSubjectUnapproved: (subject: string) => boolean;
  setsubjethover: (value: string) => void;
}

export interface CountryOption {
  value: string;
  label: string;
}

export interface TimezoneOption {
  value: string;
  label: string;
}

export interface ContactInformationProps {
  phone: string;
  email: string;
  activeTab: string;
  streetName: string;
  setStreetName: (value: string) => void;
  shippingAddress: string;
  setShippingAddress: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  postcode: string;
  setPostcode: (value: string) => void;
  selectedCountry: string;
  isCountryOpen: boolean;
  toggleCountryDropdown: () => void;
  countryoptions: CountryOption[];
  handleCountryClick: (value: string) => void;
  selectedTimezone: string;
  isTimezoneOpen: boolean;
  toggleTimezoneDropdown: () => void;
  timezoneoptions: TimezoneOption[];
  handletimezoneClick: (value: string) => void;
  isEditing: boolean;
}
export interface ProfessionalExperienceProps {
  isEditing: boolean;
  activeTab: string;
  toggleSubjectLEVELDropdown: () => void;
  toggleExperienceWithSpecialNeeds: () => void;

  currentJob: string;
  setCurrentJob: (value: string) => void;
  handleSubjectLEVELClick: (value: string) => void;
  setIsCountryOpen: (value: boolean) => void;
  setIsSubjectLEVELDropdownOpen: (value: boolean) => void;
  removeExperience: (value: string) => void;
  handleExperienceClick: (value: string) => void;
  removeSubjectLEVEL: (value: string) => void;

  tutoringExperience: string;
  isExperienceOpen: boolean;
  isSubjectLEVELDropdownOpen: boolean;
  setTutoringExperience: (value: string) => void;

  moreAboutProfessionalExperience: string;
  setMoreAboutProfessionalExperience: (value: string) => void;

  selectedSubjectsLEVEL: string[];
  setSelectedSubjectsLEVEL: (values: string[]) => void;

  selectedExperience: string[];
  setSelectedExperience: (values: string[]) => void;
}

export interface AcademicBackgroundprops {
  activeTab: string;
  errorMessage: string;
  isEditing: boolean;
  isSubmitting: boolean;
  setIsSubmitting: boolean;
  graduationSchool: string;
  setGraduationSchool: (value: string) => void;
  highestDegree: string;
  setHighestDegree: (value: string) => void;
  internationalExperience: string;
  setInternationalExperience: (value: string) => void;
  languages: string[];
  setLanguages: (value: string[]) => void;
  showNewInput: boolean;
  newLanguage: string;
  setNewLanguage: (value: string) => void;
  handleSubmitLanguage: () => void;
  handleDeleteLanguage: (index: number) => void;
  handleAddLanguage: () => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  setIsPopupOpen: (value: boolean) => void;
  isPopupOpen: boolean;
  setIsSubjectToVerifyDropdownOpen: (value: boolean) => void;
  isSubjectToVerifyDropdownOpen: boolean;
  toggleSubjectToVerifyDropdown: () => void;
  subjectOptions: { value: string; label: string }[];
  toggleAcedmicCountrydown: () => void;
  selectedAcademicCountry: string;
  isAcademicCountryopen: boolean;
  countryoptions: { value: string; label: string }[];
  handleAcademicCountryClick: (value: string) => void;
  selectedSubjectToVerifys: string;
  handleSubjectToVerifyClick: (value: string) => void;
  togglePurposeOfAttechmentDropdown: () => void;
  selectedPurposeOfAttechments: string;
  isPurposeOfAttechmentDropdownOpen: boolean;
  setIsPurposeOfAttechmentDropdownOpen: (value: boolean) => void;
  PurposeOfAttachment: { value: string; label: string }[];
  handlePurposeOfAttechmentClick: (value: string) => void;
}

export interface TutorFile {
  fileType: string;
  fileSize: string;
  _id: string;
  fileName: string;
  fileUrl: string;
}

export interface TutorDocument {
  _id: string;
  user: string; // Assuming it's populated as ObjectId in string format
  teacher: string; // Same here
  subject: string;
  purpose: string;
  files: TutorFile[];
  status: "Pending" | "Approved" | "Declined";
  adminRemarks: string;
  createdAt: string; // ISO string from server
  updatedAt: string;
}

export interface Student {
  user: IUser;
  levelOfStudy: string;
  grade: string;
  subjects: string[];
  personalInformation: {
    country: string;
    city: string;
    streetName: string;
    zipcode: string;
    institution: string;
    age: number;
  };
  additionalInformation: string;
  availability: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: string;
  isAdmin: boolean;
  verified: boolean;
  verification_token?: string;
  referralCode: string;
  etokis: number;
  referredBy?: string;
  profilePicture?: string;
  trialSessions: any;
  hasCompletedFirstSession: boolean;
  stripeSubscriptionId: string;
  planType: any;
  tutorLevel: string;
  durationMonths: string;
  sessionsPerMonth: number;
  subscriptionDateStart: string;
  subscriptionDateEnd: string;
  stripeMonthlyPrice: number;
  TrialSessionLeft: number;
  subscriptionIsActive: boolean;
}

export interface Teacher {
  level: number;
  user: IUser;
  currentJob: string;
  timeZone: string;
  gender: string;
  VideoIntroduction: string;
  aboutyou: string;
  YourEducation: string;
  currentMonthRegularSession:number;
  currentMonthGroupSession:number;
  TotalGroupSession:number;
  TotalRegularSession:number;
  EarnedThisMonth:number;
  EarnedLastMonth:number;
  TotalEarning:number;
  totalbooking:number;
  badge:string;
  bankDetails: {
    accountholder: string;
    IBAN: string;
    BIC: string;
  };
  contactInformation: {
    country: string;
    firstName: string;
    lastName: string;
    zipCode: string;
    email: string;
    phone: string;
    countryOfresident: string;
    streetname: string;
    shippingAddress: string;
    city: string;
    postcode: string;
  };
  education: {
    college: string;
    degree: string;
    major: string;
    graduation: Date;
    school?: string;
    graduationSchool?: string;
    graduationCountry?: string;
    highestDegree?: string;
  };
  DOB: {
    day: string;
    month: string;
    year: string;
  };
  experience: {
    hasExperience: boolean;
    tutoringLevel: string[];
    subjectsTutored: string[];
    languages: string[];
    instructionTypes: string[];
    availableHours: string;
    tutoringExperience: string;
    internationalExperience: string;
    moreaboutProfessionalExperience: string;
    startDate: Date;
    generalAvailability: {
      day: string;
      time: string;
    }[];
    EarnedThisMonth: number;
    EarnedLastMonth: number;
    hasTeachingExperience: boolean;

    is18OrAbove: boolean;
  };
  isApproved: boolean;
}
export interface BookingRequest {
  studentdetails: any;
  startLink: string;
  meetingCompleted: boolean;
  joinLink: string | undefined;
  _id: string;
  student: Student;
  teacher: Teacher;
  subjects: string[];
  level: string;
  date: string;
  time: string;
  status: string;
}

export interface Level {
  level: number;
  etokisRequired: number;
}

export const LEVELS: readonly Level[] = [
  { level: 1, etokisRequired: 0 },
  { level: 2, etokisRequired: 150 },
  { level: 3, etokisRequired: 300 },
  { level: 4, etokisRequired: 800 },
  { level: 5, etokisRequired: 1200 },
  { level: 6, etokisRequired: 1700 },
  { level: 7, etokisRequired: 2400 },
  { level: 8, etokisRequired: 3500 },
  { level: 9, etokisRequired: 4500 },
  { level: 10, etokisRequired: 5500 },
] as const;

export interface ProgressResult {
  currentLevel: number;
  nextLevel: number | null;
  progressPercentage: number;
  etokisToNextLevel: number;
  isMaxLevel: boolean;
}

export const subjectOptions = [
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
export const PurposeOfAttachment = [
  { value: "Degree certificate", label: "Degree certificate" },
  { value: "Grade Transcript", label: "Grade Transcript" },
  { value: "Professional Certification", label: "Professional Certification" },
  { value: "Other", label: "Other" },
];

export const subjectLevelOptions = [
  { value: "Pre-Kindergarten", label: "Pre-Kindergarten" },
  { value: "Kindergarten-2nd grade", label: "Kindergarten-2nd grade" },
  { value: "3rd-5th Grade", label: "3rd-5th Grade" },
  { value: "Middle School", label: "Middle School" },
  { value: "High School", label: "High School" },
  { value: "College", label: "College" },
  { value: "Graduate", label: "Graduate" },
  { value: "Adult", label: "Adult" },
];

export const experienceoptions = [
  {
    value: "Autism Spectrum Disorder (ASD)",
    label: "Autism Spectrum Disorder (ASD)",
  },
  {
    value: "Attention Deficit Hyperactivity Disorder (ADHD)",
    label: "Attention Deficit Hyperactivity Disorder (ADHD)",
  },
  { value: "Dyslexia", label: "Dyslexia" },
  { value: "Dyscalculia", label: "Dyscalculia" },
  { value: "Dysgraphia", label: "Dysgraphia" },
  { value: "Intellectual Disabilities", label: "Intellectual Disabilities" },
  {
    value: "Speech and Language Disorders",
    label: "Speech and Language Disorders",
  },
  {
    value: "Emotional and Behavioral Disorders",
    label: "Emotional and Behavioral Disorders",
  },
  { value: "Hearing Impairments", label: "Hearing Impairments" },
  { value: "Visual Impairments", label: "Visual Impairments" },
  {
    value: "Traumatic Brain Injury (TBI)",
    label: "Traumatic Brain Injury (TBI)",
  },
  {
    value: "Developmental Coordination Disorder (Dyspraxia)",
    label: "Developmental Coordination Disorder (Dyspraxia)",
  },
  {
    value: "Sensory Processing Disorder",
    label: "Sensory Processing Disorder",
  },
  { value: "Multiple Disabilities", label: "Multiple Disabilities" },
];

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];
export const countryoptions = [
  { value: "United States", label: "United States" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Ireland", label: "Ireland" },
  { value: "Canada", label: "Canada" },
  { value: "Malta", label: "Malta" },
  { value: "Belize", label: "Belize" },
  { value: "France", label: "France" },
  { value: "Belgium", label: "Belgium" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Luxembourg", label: "Luxembourg" },
  { value: "Monaco", label: "Monaco" },
  { value: "Haiti", label: "Haiti" },
  { value: "Germany", label: "Germany" },
  { value: "Austria", label: "Austria" },
  { value: "Liechtenstein", label: "Liechtenstein" },
];
export const timezoneoptions = [
  { label: "Baker Island, GMT -12:00", value: "Baker Island, GMT -12:00" },
  { label: "American Samoa, GMT -11:00", value: "American Samoa, GMT -11:00" },
  { label: "Hawaii, GMT -10:00", value: "Hawaii, GMT -10:00" },
  { label: "Alaska, GMT -09:00", value: "Alaska, GMT -09:00" },
  {
    label: "Pacific Time (US & Canada), GMT -08:00",
    value: "Pacific Time (US & Canada), GMT -08:00",
  },
  {
    label: "Mountain Time (US & Canada), GMT -07:00",
    value: "Mountain Time (US & Canada), GMT -07:00",
  },
  {
    label: "Central Time (US & Canada), GMT -06:00",
    value: "Central Time (US & Canada), GMT -06:00",
  },
  {
    label: "Eastern Time (US & Canada), GMT -05:00",
    value: "Eastern Time (US & Canada), GMT -05:00",
  },
  { label: "Caracas, GMT -04:00", value: "Caracas, GMT -04:00" },
  { label: "Buenos Aires, GMT -03:00", value: "Buenos Aires, GMT -03:00" },
  { label: "South Georgia, GMT -02:00", value: "South Georgia, GMT -02:00" },
  { label: "Cape Verde, GMT -01:00", value: "Cape Verde, GMT -01:00" },
  { label: "London, GMT ±00:00", value: "London, GMT ±00:00" },
  { label: "Berlin, GMT +01:00", value: "Berlin, GMT +01:00" },
  { label: "Cairo, GMT +02:00", value: "Cairo, GMT +02:00" },
  { label: "Moscow, GMT +03:00", value: "Moscow, GMT +03:00" },
  { label: "Dubai, GMT +04:00", value: "Dubai, GMT +04:00" },
  { label: "Islamabad, GMT +05:00", value: "Islamabad, GMT +05:00" },
  {
    label: "India Standard Time, GMT +05:30",
    value: "India Standard Time, GMT +05:30",
  },
  { label: "Nepal, GMT +05:45", value: "Nepal, GMT +05:45" },
  { label: "Dhaka, GMT +06:00", value: "Dhaka, GMT +06:00" },
  { label: "Myanmar, GMT +06:30", value: "Myanmar, GMT +06:30" },
  { label: "Bangkok, GMT +07:00", value: "Bangkok, GMT +07:00" },
  { label: "Beijing, GMT +08:00", value: "Beijing, GMT +08:00" },
  {
    label: "Australia Central Time, GMT +08:45",
    value: "Australia Central Time, GMT +08:45",
  },
  { label: "Tokyo, GMT +09:00", value: "Tokyo, GMT +09:00" },
  {
    label: "Australia Central Time, GMT +09:30",
    value: "Australia Central Time, GMT +09:30",
  },
  { label: "Sydney, GMT +10:00", value: "Sydney, GMT +10:00" },
  {
    label: "Lord Howe Island, GMT +10:30",
    value: "Lord Howe Island, GMT +10:30",
  },
  {
    label: "Solomon Islands, GMT +11:00",
    value: "Solomon Islands, GMT +11:00",
  },
  { label: "Norfolk Island, GMT +11:30", value: "Norfolk Island, GMT +11:30" },
  { label: "Auckland, GMT +12:00", value: "Auckland, GMT +12:00" },
  {
    label: "Chatham Islands, GMT +12:45",
    value: "Chatham Islands, GMT +12:45",
  },
  { label: "Nuku'alofa, GMT +13:00", value: "Nuku'alofa, GMT +13:00" },
  { label: "Kiritimati, GMT +14:00", value: "Kiritimati, GMT +14:00" },
];

export const USACities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "Indianapolis",
  "San Francisco",
  "Seattle",
  "Denver",
  "Oklahoma City",
  "Nashville",
  "El Paso",
  "Washington",
  "Boston",
  "Las Vegas",
  "Portland",
  "Detroit",
  "Memphis",
  "Louisville",
  "Baltimore",
  "Milwaukee",
  "Albuquerque",
  "Tucson",
  "Fresno",
  "Mesa",
  "Sacramento",
  "Atlanta",
  "Kansas City",
  "Colorado Springs",
  "Omaha",
  "Raleigh",
  "Miami",
  "Long Beach",
  "Virginia Beach",
  "Oakland",
  "Minneapolis",
  "Tulsa",
  "Arlington",
  "New Orleans",
  "Wichita",
  "Cleveland",
  "Tampa",
  "Bakersfield",
  "Aurora",
  "Honolulu",
  "Anaheim",
  "Santa Ana",
  "Riverside",
  "Corpus Christi",
  "Lexington",
  "Henderson",
  "Stockton",
  "Saint Paul",
  "Cincinnati",
  "St. Louis",
  "Pittsburgh",
  "Greensboro",
  "Anchorage",
  "Plano",
  "Lincoln",
  "Orlando",
  "Irvine",
  "Newark",
  "Toledo",
  "Durham",
  "Chula Vista",
  "Fort Wayne",
  "Jersey City",
  "St. Petersburg",
  "Laredo",
  "Madison",
  "Chandler",
  "Buffalo",
  "Lubbock",
  "Scottsdale",
  "Reno",
  "Glendale",
  "Gilbert",
  "Winston–Salem",
  "North Las Vegas",
  "Norfolk",
  "Chesapeake",
  "Garland",
  "Irving",
  "Hialeah",
  "Fremont",
  "Boise",
  "Richmond",
  "Baton Rouge",
  "Spokane",
  "Des Moines",
  "Tacoma",
  "San Bernardino",
  "Modesto",
  "Fontana",
  "Santa Clarita",
  "Birmingham",
  "Oxnard",
  "Fayetteville",
  "Moreno Valley",
  "Rochester",
  "Glendale",
  "Huntington Beach",
  "Salt Lake City",
  "Grand Rapids",
  "Amarillo",
  "Yonkers",
  "Aurora",
  "Montgomery",
  "Akron",
  "Little Rock",
  "Huntsville",
  "Augusta",
  "Port St. Lucie",
  "Grand Prairie",
  "Columbus",
  "Tallahassee",
  "Overland Park",
  "Tempe",
  "McKinney",
  "Mobile",
  "Cape Coral",
  "Shreveport",
  "Frisco",
  "Knoxville",
  "Worcester",
  "Brownsville",
  "Vancouver",
  "Fort Lauderdale",
  "Sioux Falls",
  "Ontario",
  "Chattanooga",
  "Providence",
  "Newport News",
  "Rancho Cucamonga",
  "Santa Rosa",
  "Oceanside",
  "Salem",
  "Elk Grove",
  "Garden Grove",
  "Pembroke Pines",
  "Peoria",
  "Eugene",
  "Corona",
  "Cary",
  "Springfield",
  "Fort Collins",
  "Jackson",
  "Alexandria",
  "Hayward",
  "Lancaster",
  "Lakewood",
  "Clarksville",
  "Palmdale",
  "Salinas",
  "Springfield",
  "Hollywood",
  "Pasadena",
  "Sunnyvale",
  "Macon",
  "Kansas City",
  "Pomona",
  "Escondido",
  "Killeen",
  "Naperville",
  "Joliet",
  "Bellevue",
  "Rockford",
  "Savannah",
  "Paterson",
  "Torrance",
  "Bridgeport",
  "McAllen",
  "Mesquite",
  "Syracuse",
  "Midland",
  "Pasadena",
  "Murfreesboro",
  "Miramar",
  "Dayton",
  "Fullerton",
  "Olathe",
  "Orange",
  "Thornton",
  "Roseville",
  "Denton",
  "Waco",
  "Surprise",
  "Carrollton",
  "West Valley City",
  "Charleston",
  "Warren",
  "Hampton",
  "Gainesville",
  "Visalia",
  "Coral Springs",
  "Columbia",
  "Cedar Rapids",
  "Sterling Heights",
  "New Haven",
  "Stamford",
  "Concord",
  "Kent",
  "Santa Clara",
  "Elizabeth",
  "Round Rock",
  "Thousand Oaks",
  "Lafayette",
  "Athens",
  "Topeka",
  "Simi Valley",
  "Fargo",
  "Norman",
  "Columbia",
  "Abilene",
  "Wilmington",
  "Hartford",
  "Victorville",
  "Pearland",
  "Vallejo",
  "Ann Arbor",
  "Berkeley",
  "Allentown",
  "Richardson",
  "Odessa",
  "Arvada",
  "Cambridge",
  "Sugar Land",
  "Beaumont",
  "Lansing",
  "Evansville",
  "Rochester",
  "Independence",
  "Fairfield",
  "Provo",
  "Clearwater",
  "College Station",
  "West Jordan",
  "Carlsbad",
  "El Monte",
  "Murrieta",
  "Temecula",
  "Springfield",
  "Palm Bay",
  "Costa Mesa",
  "Westminster",
  "North Charleston",
  "Miami Gardens",
  "Manchester",
  "High Point",
  "Downey",
  "Clovis",
  "Pompano Beach",
  "Pueblo",
  "Elgin",
  "Lowell",
  "Antioch",
  "West Palm Beach",
  "Peoria",
  "Everett",
  "Ventura",
  "Centennial",
  "Lakeland",
  "Gresham",
  "Richmond",
  "Billings",
  "Inglewood",
  "Broken Arrow",
  "Sandy Springs",
  "Jurupa Valley",
  "Hillsboro",
  "Waterbury",
  "Santa Maria",
  "Boulder",
  "Greeley",
  "Daly City",
  "Meridian",
  "Lewisville",
  "Davie",
  "West Covina",
  "South Bend",
  "League City",
  "Tyler",
  "Norwalk",
  "San Mateo",
  "Green Bay",
  "Wichita Falls",
  "Sparks",
  "Lakewood",
  "Burbank",
  "Rialto",
  "Allen",
  "El Cajon",
  "Las Cruces",
  "Renton",
  "Davenport",
  "South Gate",
  "Vista",
  "Woodbridge",
  "San Angelo",
  "Clinton",
  "Edison",
  "San Marcos",
  "Hesperia",
  "Mission",
  "Vacaville",
  "Brockton",
  "Roswell",
  "Beaverton",
  "Quincy",
  "Compton",
  "Gulfport",
  "Albany",
  "Lee's Summit",
  "Federal Way",
  "New Bedford",
  "Longmont",
  "Plymouth",
  "Edinburg",
  "San Leandro",
  "Chico",
  "Nampa",
  "Newton",
  "Avondale",
  "Reading",
  "Trenton",
  "Ogden",
  "Champaign",
  "Bloomington",
  "Sioux City",
  "Fall River",
  "Kenosha",
  "Deltona",
  "Hawthorne",
  "Carmel",
  "Suffolk",
  "Clifton",
  "Citrus Heights",
  "Livonia",
  "New Braunfels",
  "Greenville",
  "Cicero",
  "Fishers",
  "Sugar Land",
  "Bellingham",
  "Lynn",
  "Longview",
  "Warwick",
  "Edmond",
  "San Ramon",
  "Rio Rancho",
  "Hoover",
  "Boca Raton",
  "Bloomington",
  "Somerville",
  "Lake Forest",
  "Sandy",
  "Dearborn",
  "St. George",
  "Nashua",
  "Concord",
  "Cedar Park",
  "Danbury",
  "Largo",
  "Plantation",
  "Brooklyn Park",
  "Tamarac",
  "Missouri City",
  "Redwood City",
  "Alhambra",
  "Lake Charles",
  "Plymouth",
  "Bolingbrook",
  "Rock Hill",
  "Kirkland",
  "Flower Mound",
  "Flagstaff",
  "Weston",
  "Melbourne",
  "North Port",
  "Chino",
  "Alameda",
  "Portsmouth",
  "St. Cloud",
  "Baytown",
  "Upland",
  "Springdale",
  "Racine",
  "Apple Valley",
  "Turlock",
  "Gastonia",
  "Southfield",
  "Bristol",
  "Delray Beach",
  "Lawrence",
  "Palo Alto",
  "San Marcos",
  "Yuma",
  "Lynnwood",
  "Redding",
  "Spokane Valley",
  "Lawton",
  "San Clemente",
  "Mission Viejo",
  "Longview",
  "Vacaville",
  "Clovis",
  "Lakewood",
  "Hawthorne",
  "Redlands",
  "Chino Hills",
  "Aliso Viejo",
  "Newport Beach",
  "Tustin",
  "Camarillo",
  "Lake Elsinore",
  "Encinitas",
  "La Habra",
  "Monterey Park",
  "Tulare",
  "Cupertino",
  "Gardena",
  "National City",
  "Rocklin",
  "Petaluma",
  "Huntington Park",
  "San Rafael",
  "La Mesa",
  "Arcadia",
  "Fountain Valley",
  "Diamond Bar",
  "Woodland",
  "Santee",
  "Lake Forest",
  "Napa",
  "Dublin",
  "Laguna Niguel",
  "San Ramon",
  "Redondo Beach",
  "Yorba Linda",
];

export const UKCities = [
  "Aberdeen",
  "Armagh",
  "Bangor (Wales)",
  "Bangor (Northern Ireland)",
  "Bath",
  "Belfast",
  "Birmingham",
  "Bradford",
  "Brighton and Hove",
  "Bristol",
  "Cambridge",
  "Canterbury",
  "Cardiff",
  "Carlisle",
  "Chelmsford",
  "Chester",
  "Chichester",
  "City of London",
  "City of Westminster",
  "Colchester",
  "Coventry",
  "Derby",
  "Derry",
  "Doncaster",
  "Dundee",
  "Dunfermline",
  "Durham",
  "Edinburgh",
  "Ely",
  "Exeter",
  "Glasgow",
  "Gloucester",
  "Hereford",
  "Inverness",
  "Kingston upon Hull",
  "Lancaster",
  "Leeds",
  "Leicester",
  "Lichfield",
  "Lincoln",
  "Lisburn",
  "Liverpool",
  "London",
  "Londonderry",
  "Manchester",
  "Milton Keynes",
  "Newcastle upon Tyne",
  "Newport",
  "Newry",
  "Norwich",
  "Nottingham",
  "Oxford",
  "Perth",
  "Peterborough",
  "Plymouth",
  "Portsmouth",
  "Preston",
  "Ripon",
  "Rochester",
  "Salford",
  "Salisbury",
  "Sheffield",
  "Southampton",
  "St Albans",
  "St Asaph",
  "St David's",
  "Stirling",
  "Stoke-on-Trent",
  "Sunderland",
  "Swansea",
  "Truro",
  "Wakefield",
  "Wells",
  "Westminster",
  "Winchester",
  "Wolverhampton",
  "Worcester",
  "Wrexham",
  "York",
];

export const IrelandCities = [
  // Republic of Ireland
  "Dublin",
  "Cork",
  "Limerick",
  "Galway",
  "Waterford",
  "Kilkenny",

  // Northern Ireland
  "Belfast",
  "Derry",
  "Lisburn",
  "Newry",
  "Armagh",
  "Bangor",
];

export const CanadaCities = [
  // Alberta
  "Calgary",
  "Edmonton",
  "Red Deer",
  "Lethbridge",
  "Medicine Hat",
  "Grande Prairie",

  // British Columbia
  "Vancouver",
  "Victoria",
  "Surrey",
  "Burnaby",
  "Kelowna",
  "Kamloops",

  // Manitoba
  "Winnipeg",
  "Brandon",
  "Steinbach",

  // New Brunswick
  "Moncton",
  "Saint John",
  "Fredericton",
  "Dieppe",
  "Miramichi",

  // Newfoundland and Labrador
  "St. John's",
  "Mount Pearl",
  "Corner Brook",

  // Nova Scotia
  "Halifax",
  "Sydney",
  "Truro",

  // Ontario
  "Toronto",
  "Ottawa",
  "Mississauga",
  "Brampton",
  "Hamilton",
  "London",
  "Markham",
  "Vaughan",
  "Kitchener",
  "Windsor",
  "Richmond Hill",
  "Oakville",
  "Burlington",
  "Greater Sudbury",
  "Oshawa",
  "Barrie",
  "St. Catharines",
  "Guelph",
  "Cambridge",
  "Whitby",
  "Kingston",
  "Ajax",
  "Thunder Bay",
  "Waterloo",
  "Brantford",
  "Pickering",
  "Niagara Falls",
  "Peterborough",

  // Prince Edward Island
  "Charlottetown",
  "Summerside",

  // Quebec
  "Montreal",
  "Quebec City",
  "Laval",
  "Gatineau",
  "Longueuil",
  "Sherbrooke",
  "Saguenay",
  "Trois-Rivières",
  "Terrebonne",
  "Saint-Jean-sur-Richelieu",

  // Saskatchewan
  "Saskatoon",
  "Regina",
  "Prince Albert",
  "Moose Jaw",
  "Yorkton",
];

export const MaltaCities = [
  "Valletta",
  "Birkirkara",
  "Mosta",
  "Qormi",
  "Sliema",
  "San Pawl il-Baħar",
  "Zabbar",
  "Fgura",
  "Zejtun",
  "Naxxar",
  "Marsaskala",
  "Hamrun",
  "Birżebbuġa",
  "Rabat",
  "Mdina",
  "Attard",
  "Balzan",
  "Lija",
  "Gżira",
  "Msida",
  "Pietà",
  "Floriana",
  "Marsa",
  "Luqa",
  "Santa Venera",
  "Kalkara",
  "Mellieħa",
  "Mġarr",
  "Marsaxlokk",
  "Senglea",
  "Cospicua",
  "Vittoriosa",
  "St. Julian's",
  "Swieqi",
  "Pembroke",
  "Ta' Xbiex",
  "Qrendi",
  "Żebbuġ",
  "Siġġiewi",
  "Żurrieq",
  "Kirkop",
  "Gudja",
  "Għaxaq",
  "Iklin",
  "Paola",
  "Xgħajra",
  "Tarxien",
  "Birgu",
  "Isla",
  "Birżebbuġa",
  "Xewkija",
  "Victoria",
  "Nadur",
  "Għajnsielem",
  "Xagħra",
  "Sannat",
  "Munxar",
  "Għarb",
  "Għasri",
  "Kerċem",
  "San Lawrenz",
];

export const BelizeCities = [
  // Cities
  "Belize City",
  "Belmopan",

  // Towns
  "San Ignacio",
  "San Pedro",
  "Orange Walk Town",
  "Corozal Town",
  "Dangriga",
  "Benque Viejo del Carmen",
  "Punta Gorda",

  // Other Notable Settlements
  "Ladyville",
  "Santa Elena",
  "Trial Farm",
  "Independence",
  "Placencia",
  "Hopkins",
  "Caye Caulker",
  "Bullet Tree Falls",
  "Shipyard",
  "Guinea Grass",
  "Bella Vista",
];

export const FranceCities = [
  // Île-de-France
  "Paris",

  // Provence-Alpes-Côte d'Azur
  "Marseille",
  "Nice",
  "Toulon",
  "Avignon",
  "Cannes",

  // Auvergne-Rhône-Alpes
  "Lyon",
  "Saint-Étienne",
  "Grenoble",
  "Clermont-Ferrand",

  // Occitanie
  "Toulouse",
  "Montpellier",
  "Nîmes",
  "Perpignan",

  // Nouvelle-Aquitaine
  "Bordeaux",
  "Limoges",
  "Poitiers",
  "Pau",

  // Grand Est
  "Strasbourg",
  "Reims",
  "Metz",
  "Mulhouse",
  "Nancy",

  // Hauts-de-France
  "Lille",
  "Amiens",
  "Roubaix",
  "Dunkerque",

  // Pays de la Loire
  "Nantes",
  "Angers",
  "Le Mans",
  "Saint-Nazaire",

  // Brittany (Bretagne)
  "Rennes",
  "Brest",
  "Quimper",
  "Lorient",

  // Normandy (Normandie)
  "Le Havre",
  "Caen",
  "Rouen",
  "Cherbourg",

  // Bourgogne-Franche-Comté
  "Dijon",
  "Besançon",
  "Nevers",
  "Chalon-sur-Saône",

  // Centre-Val de Loire
  "Orléans",
  "Tours",
  "Bourges",
  "Chartres",

  // Corsica (Corse)
  "Ajaccio",
  "Bastia",
];

export const BelgiumCities = [
  "Brussels",
  "Antwerp",
  "Ghent",
  "Charleroi",
  "Liège",
  "Bruges",
  "Namur",
  "Leuven",
  "Mons",
  "Mechelen",
  "Aalst",
  "La Louvière",
  "Kortrijk",
  "Hasselt",
  "Ostend",
  "Tournai",
  "Genk",
  "Seraing",
  "Roeselare",
  "Verviers",
  "Sint-Niklaas",
  "Louvain-la-Neuve",
];

export const SwitzerlandCities = [
  "Zurich",
  "Geneva",
  "Basel",
  "Lausanne",
  "Bern",
  "Winterthur",
  "Lucerne",
  "St. Gallen",
  "Lugano",
  "Biel/Bienne",
  "Thun",
  "Köniz",
  "La Chaux-de-Fonds",
  "Schaffhausen",
  "Fribourg",
  "Chur",
  "Neuchâtel",
  "Vernier",
  "Sion",
  "Uster",
];

export const LuxembourgCities = [
  "Luxembourg City",
  "Esch-sur-Alzette",
  "Differdange",
  "Dudelange",
  "Ettelbruck",
  "Diekirch",
  "Wiltz",
  "Grevenmacher",
  "Remich",
  "Clervaux",
  "Vianden",
  "Redange",
  "Mondorf-les-Bains",
];

export const MonacoCities = [
  "Monaco-Ville",
  "Monte Carlo",
  "La Condamine",
  "Fontvieille",
  "Moneghetti",
  "Larvotto",
  "Jardin Exotique",
  "Saint Roman",
];

export const HaitiCities = [
  "Port-au-Prince",
  "Cap-Haïtien",
  "Gonaïves",
  "Les Cayes",
  "Jacmel",
  "Petionville",
  "Saint-Marc",
  "Miragoâne",
  "Fort-Liberté",
  "Jérémie",
  "Hinche",
  "Port-de-Paix",
  "Cayes-Jacmel",
  "Bonne Fin",
  "Ouanaminthe",
];

export const GermanyCities = [
  "Berlin",
  "Hamburg",
  "Munich",
  "Cologne",
  "Frankfurt",
  "Stuttgart",
  "Düsseldorf",
  "Dortmund",
  "Essen",
  "Leipzig",
  "Bremen",
  "Dresden",
  "Hanover",
  "Nuremberg",
  "Duisburg",
  "Bochum",
  "Wuppertal",
  "Bielefeld",
  "Bonn",
  "Münster",
  "Karlsruhe",
  "Mannheim",
  "Augsburg",
  "Wiesbaden",
  "Gelsenkirchen",
  "Mönchengladbach",
  "Braunschweig",
  "Chemnitz",
  "Kiel",
  "Aachen",
  "Halle (Saale)",
  "Magdeburg",
  "Freiburg im Breisgau",
  "Krefeld",
  "Lübeck",
  "Oberhausen",
  "Erfurt",
  "Mainz",
  "Rostock",
  "Kassel",
  "Hagen",
  "Hamm",
  "Saarbrücken",
  "Mülheim an der Ruhr",
  "Potsdam",
  "Ludwigshafen am Rhein",
  "Oldenburg",
  "Leverkusen",
  "Osnabrück",
  "Solingen",
  "Heidelberg",
  "Herne",
  "Neuss",
  "Darmstadt",
  "Paderborn",
  "Regensburg",
  "Ingolstadt",
  "Würzburg",
  "Fürth",
  "Wolfsburg",
  "Offenbach am Main",
  "Ulmer",
  "Heilbronn",
  "Göttingen",
  "Bottrop",
  "Recklinghausen",
  "Trier",
  "Reutlingen",
  "Bremerhaven",
  "Koblenz",
  "Bergisch Gladbach",
  "Jena",
  "Remscheid",
  "Erlangen",
  "Moers",
  "Siegen",
  "Hildesheim",
  "Salzgitter",
  "Cottbus",
  "Kaiserslautern",
  "Gütersloh",
  "Witten",
  "Zwickau",
  "Schwerin",
  "Gera",
  "Düren",
  "Esslingen am Neckar",
  "Ratingen",
  "Tübingen",
  "Flensburg",
  "Langenfeld",
  "Villingen-Schwenningen",
  "Konstanz",
  "Wesel",
  "Offenburg",
  "Celle",
  "Neumünster",
  "Bayreuth",
  "Lüneburg",
  "Detmold",
  "Ravensburg",
  "Ludwigsburg",
  "Worms",
  "Gießen",
  "Sindelfingen",
  "Herten",
  "Gaggenau",
  "Backnang",
  "Rosenheim",
];

export const AustriaCities = [
  "Vienna",
  "Graz",
  "Linz",
  "Salzburg",
  "Innsbruck",
  "Klagenfurt",
  "Villach",
  "Wels",
  "St. Pölten",
  "Dornbirn",
  "Steyr",
  "Feldkirch",
  "Bregenz",
  "Leoben",
  "Krems an der Donau",
  "Traun",
  "Amstetten",
  "Kapfenberg",
  "Schwechat",
  "Lustenau",
];

export const LiechtensteinCities = [
  "Vaduz",
  "Schaan",
  "Balzers",
  "Triesen",
  "Eschen",
  "Mauren",
  "Planken",
  "Ruggell",
  "Gamprin",
  "Schellenberg",
  "Triesenberg",
];
