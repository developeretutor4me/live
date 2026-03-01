export const subjectOptions = [
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

export const options = [
  { value: '', label: 'Sort by' },
  { value: 'createdAt', label: 'Joining Date' },
  { value: 'firstName', label: 'Alphabetical Order ' },
  { value: 'lastName', label: 'Alphabetical Order ' },
  { value: 'age', label: 'Age' },
  { value: 'grade', label: 'Grade' },
];
export const memberships = [
  { name: 'Premium', price: 249, sessions: 8 },
  { name: 'Standard', price: 139, sessions: 4 },
];
export const durations = [
  {
    name: '3 Months Package',
    months: 3,
    discount: '5% off',
  },
  {
    name: '6 Months Package',
    months: 6,
    discount: '10% off',
  },
  {
    name: '12 Months Package',
    months: 12,
    discount: '15% off',
  },
];

export interface Student {
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

export interface Teacher {
  name: string;
  email: string;
  contactInformation: {
    country: string;
    phone: string;
    address: string;
  };
}

export interface BookingRequest {
  duration: string;
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

export const timezoneoptions = [
  { label: 'Baker Island, GMT -12:00', value: 'Baker Island, GMT -12:00' },
  { label: 'American Samoa, GMT -11:00', value: 'American Samoa, GMT -11:00' },
  { label: 'Hawaii, GMT -10:00', value: 'Hawaii, GMT -10:00' },
  { label: 'Alaska, GMT -09:00', value: 'Alaska, GMT -09:00' },
  {
    label: 'Pacific Time (US & Canada), GMT -08:00',
    value: 'Pacific Time (US & Canada), GMT -08:00',
  },
  {
    label: 'Mountain Time (US & Canada), GMT -07:00',
    value: 'Mountain Time (US & Canada), GMT -07:00',
  },
  {
    label: 'Central Time (US & Canada), GMT -06:00',
    value: 'Central Time (US & Canada), GMT -06:00',
  },
  {
    label: 'Eastern Time (US & Canada), GMT -05:00',
    value: 'Eastern Time (US & Canada), GMT -05:00',
  },
  { label: 'Caracas, GMT -04:00', value: 'Caracas, GMT -04:00' },
  { label: 'Buenos Aires, GMT -03:00', value: 'Buenos Aires, GMT -03:00' },
  { label: 'South Georgia, GMT -02:00', value: 'South Georgia, GMT -02:00' },
  { label: 'Cape Verde, GMT -01:00', value: 'Cape Verde, GMT -01:00' },
  { label: 'London, GMT ±00:00', value: 'London, GMT ±00:00' },
  { label: 'Berlin, GMT +01:00', value: 'Berlin, GMT +01:00' },
  { label: 'Cairo, GMT +02:00', value: 'Cairo, GMT +02:00' },
  { label: 'Moscow, GMT +03:00', value: 'Moscow, GMT +03:00' },
  { label: 'Dubai, GMT +04:00', value: 'Dubai, GMT +04:00' },
  { label: 'Islamabad, GMT +05:00', value: 'Islamabad, GMT +05:00' },
  {
    label: 'India Standard Time, GMT +05:30',
    value: 'India Standard Time, GMT +05:30',
  },
  { label: 'Nepal, GMT +05:45', value: 'Nepal, GMT +05:45' },
  { label: 'Dhaka, GMT +06:00', value: 'Dhaka, GMT +06:00' },
  { label: 'Myanmar, GMT +06:30', value: 'Myanmar, GMT +06:30' },
  { label: 'Bangkok, GMT +07:00', value: 'Bangkok, GMT +07:00' },
  { label: 'Beijing, GMT +08:00', value: 'Beijing, GMT +08:00' },
  {
    label: 'Australia Central Time, GMT +08:45',
    value: 'Australia Central Time, GMT +08:45',
  },
  { label: 'Tokyo, GMT +09:00', value: 'Tokyo, GMT +09:00' },
  {
    label: 'Australia Central Time, GMT +09:30',
    value: 'Australia Central Time, GMT +09:30',
  },
  { label: 'Sydney, GMT +10:00', value: 'Sydney, GMT +10:00' },
  {
    label: 'Lord Howe Island, GMT +10:30',
    value: 'Lord Howe Island, GMT +10:30',
  },
  {
    label: 'Solomon Islands, GMT +11:00',
    value: 'Solomon Islands, GMT +11:00',
  },
  { label: 'Norfolk Island, GMT +11:30', value: 'Norfolk Island, GMT +11:30' },
  { label: 'Auckland, GMT +12:00', value: 'Auckland, GMT +12:00' },
  {
    label: 'Chatham Islands, GMT +12:45',
    value: 'Chatham Islands, GMT +12:45',
  },
  { label: "Nuku'alofa, GMT +13:00", value: "Nuku'alofa, GMT +13:00" },
  { label: 'Kiritimati, GMT +14:00', value: 'Kiritimati, GMT +14:00' },
];
