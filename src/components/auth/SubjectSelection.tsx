import React, { useState } from 'react';
import FormContainer from '@/components/auth/FormContainer';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';

interface SubjectSelectionProps {
  subjectConfirmationHandler: (selectedSubjects: string[]) => void;
  title: string;
}

interface SubjectOption {
  value: string;
  label: string;
}

const subjectOptions: SubjectOption[] = [
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

const SubjectSelection = ({ subjectConfirmationHandler, title }: SubjectSelectionProps) => {
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const toggleSubjectDropdown = () => {
    setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
  };

  const handleSubjectClick = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(item => item !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const removeSubject = (subject: string) => {
    setSelectedSubjects(selectedSubjects.filter(item => item !== subject));
  };

  return (
    <FormContainer title={title} titleAlignment="left">
      <div className="w-full mx-auto mt-6 mb-4">
        <div className="relative select-none">
          <div
            className="w-full bg-[#DBCAFF] text-[#a394d6] text-sm custom-lg:text-xl custom-2xl:text-2xl pr-7 sm:pr-14 pl-10 sm:pl-20 py-2 custom-2xl:py-6 rounded-full cursor-pointer flex justify-between items-center"
            onClick={toggleSubjectDropdown}
          >
            <span>
              {selectedSubjects.length > 0
                ? `${selectedSubjects.length} selected`
                : 'select subject(s)'}
            </span>
            {isSubjectDropdownOpen ? (
              <ChevronUp
                size={40}
                className="text-[#a394d6] w-5 custom-xl:w-10 h-5 custom-xl:h-10"
              />
            ) : (
              <ChevronDown
                size={40}
                className="text-[#a394d6] w-5 custom-xl:w-10 h-5 custom-xl:h-10"
              />
            )}
          </div>

          {isSubjectDropdownOpen && (
            <div
              onMouseLeave={() => {
                setIsSubjectDropdownOpen(false);
              }}
              className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[92%] mx-auto py-4 custom-2xl:py-7  "
            >
              <div id="style-2" className="max-h-[16.4rem] overflow-y-scroll  ">
                {subjectOptions.map((subject: SubjectOption) => (
                  <div
                    key={subject.value}
                    className=" custom-xl:py-2 cursor-pointer flex !items-center "
                    onClick={() => handleSubjectClick(subject.value)}
                  >
                    <div className="border-b-2 border-[#a394d682] py-2 custom-xl:py-3 flex items-center  gap-4  w-full px-0 custom-xl:px-4 max-w-[90%] truncate">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={selectedSubjects.includes(subject.value)}
                          onChange={() => {}}
                          className="absolute opacity-0 cursor-pointer"
                        />
                        <div
                          className={`h-4 custom-xl:h-7 w-4 custom-xl:w-7  border custom-xl:border-2 border-[#6C5BAA] hover:bg-[#a394d6] hover:border-[#a394d6] rounded-sm custom-xl:rounded-md flex items-center justify-center${
                            selectedSubjects.includes(subject.value) ? 'bg-[#6c5baa]' : ''
                          }`}
                        >
                          {selectedSubjects.includes(subject.value) && (
                            <Check className="text-white" />
                          )}
                        </div>
                      </div>
                      <span className="ml-1 sm:ml-2 text-base sm:text-lg custom-xl:text-2xl text-[#6C5BAA] truncate ">
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
          <div className="flex flex-wrap items-start justify-start gap-2 mt-3 sm:mt-5 custom-xl:mt-8   px-2 custom-xl:px-6 mx-auto min-h-[3.4rem]">
            {selectedSubjects.map(subject => (
              <span
                key={subject}
                className="bg-[#6C5BAA] text-xs custom-xl:text-xl text-white px-5 py-2 custom-2xl:py-3.5 rounded-full flex items-center  gap-7  justify-between"
              >
                {subject}
                <X
                  className="ml-2 h-4 custom-2xl:h-7 w-4 custom-2xl:w-7 cursor-pointer"
                  onClick={() => removeSubject(subject)}
                />
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Confirm button */}
      <div className="mt-8">
        <button
          onClick={() => subjectConfirmationHandler(selectedSubjects)}
          disabled={selectedSubjects.length <= 0}
          className={`
              w-full py-4 px-8 rounded-full text-[20px] lg:text-[24px] xl:text-[30px] 2xl:text-[36px] font-medium text-white transition-all duration-300
              ${
                selectedSubjects.length > 0
                  ? 'bg-[#8358F7] hover:bg-[#7A6BD9] cursor-pointer shadow-lg hover:shadow-xl'
                  : 'bg-gray-400 cursor-not-allowed opacity-50'
              }
            `}
        >
          Confirm
        </button>
      </div>
    </FormContainer>
  );
};

export default SubjectSelection;
