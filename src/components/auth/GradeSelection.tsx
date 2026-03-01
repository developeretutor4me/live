import React from 'react';
import FormContainer from '@/components/auth/FormContainer';

interface GradeSelectionProps {
  grade: string;
  handleGradeClick: (selectedGrade: string) => void;
  selectedGrade: string | null;
  gradeConfirmationHandler: () => void;
  title: string;
}

interface GradeOption {
  label: string;
  value: string;
}

const elementaryGradeOptions: GradeOption[] = [
  { label: '1st Grade', value: '1st Grade' },
  { label: '2nd Grade', value: '2nd Grade' },
  { label: '3rd Grade', value: '3rd Grade' },
  { label: '4th Grade', value: '4th Grade' },
  { label: '5th Grade', value: '5th Grade' },
];

const middleGradeOptions: GradeOption[] = [
  { label: '6th Grade', value: '6th Grade' },
  { label: '7th Grade', value: '7th Grade' },
  { label: '8th Grade', value: '8th Grade' },
];

const highGradeOptions: GradeOption[] = [
  { label: '9th Grade', value: '9th Grade' },
  { label: '10th Grade', value: '10th Grade' },
  { label: '11th Grade', value: '11th Grade' },
  { label: '12th Grade', value: '12th Grade' },
];

const collegeGradeOptions: GradeOption[] = [
  { label: 'Freshman year', value: 'Freshman year' },
  { label: 'Sophomore year', value: 'Sophomore year' },
  { label: 'Junior year', value: 'Junior year' },
  { label: 'Senior year', value: 'Senior year' },
];

const gradeOptions: { [key: string]: GradeOption[] } = {
  elementary: elementaryGradeOptions,
  middle: middleGradeOptions,
  high: highGradeOptions,
  college: collegeGradeOptions,
};

const GradeSelection = ({
  grade,
  handleGradeClick,
  selectedGrade,
  gradeConfirmationHandler,
  title,
}: GradeSelectionProps) => {
  return (
    <FormContainer title={title} titleAlignment="left">
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-y-8 gap-x-[3rem]">
          {gradeOptions[grade].map((grade: GradeOption, index: number) => (
            <button
              key={index}
              onClick={() => handleGradeClick(grade.value)}
              className={`
                py-2 px-6 rounded-full text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[40px] transition-all duration-300
                ${
                  selectedGrade === grade.value
                    ? 'bg-[#9184F0] text-white shadow-lg transform scale-105'
                    : 'bg-[#D8D0F0] text-[#534988] hover:bg-[#C5B8E8] hover:scale-102 border border-[#9184F0] rounded-full'
                }
              `}
            >
              {grade.label}
            </button>
          ))}
        </div>

        {/* Confirm button */}
        <div className="mt-8">
          <button
            onClick={gradeConfirmationHandler}
            disabled={!selectedGrade}
            className={`
              w-full py-2 px-8 mt-5 rounded-full text-[20px] lg:text-[25px] xl:text-[35px] 2xl:text-[45px] font-medium text-white transition-all duration-300
              ${
                selectedGrade
                  ? 'bg-[#8358F7] hover:bg-[#7A6BD9] cursor-pointer shadow-lg hover:shadow-xl'
                  : 'bg-gray-400 cursor-not-allowed opacity-50'
              }
            `}
          >
            Confirm
          </button>
        </div>
      </div>
    </FormContainer>
  );
};

export default GradeSelection;
