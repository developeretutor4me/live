import React from 'react';
import FormContainer from '@/components/auth/FormContainer';

interface LevelSelectionProps {
  handleOptionChange: (selectedLevel: string) => void;
  confirmGrade: () => void;
  formType: string;
  title: string;
}

const LevelSelection = ({
  handleOptionChange,
  confirmGrade,
  formType,
  title,
}: LevelSelectionProps) => {
  return (
    <FormContainer title={title} titleAlignment="left">
      <div className="space-y-4 sm:space-y-6">
        <button
          onClick={() => handleOptionChange('elementary')}
          className="w-full py-2 px-6 bg-[#DDD3F8] border border-[#9184F0] rounded-full text-[#534988] text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[40px] hover:bg-[#9184F0] hover:text-white transition-all duration-300"
        >
          Elementary Schools
        </button>

        <button
          onClick={() => handleOptionChange('middle')}
          className="w-full py-2 px-6 bg-[#DDD3F8] border border-[#9184F0] rounded-full text-[#534988] text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[40px] hover:bg-[#9184F0] hover:text-white transition-all duration-300"
        >
          Middle school
        </button>

        <button
          onClick={() => handleOptionChange('high')}
          className="w-full py-2 px-6 bg-[#DDD3F8] border border-[#9184F0] rounded-full text-[#534988] text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[40px] hover:bg-[#9184F0] hover:text-white transition-all duration-300"
        >
          High school
        </button>

        <button
          onClick={() => handleOptionChange('college')}
          className="w-full py-2 px-6 bg-[#DDD3F8] border border-[#9184F0] rounded-full text-[#534988] text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[40px] hover:bg-[#9184F0] hover:text-white transition-all duration-300"
        >
          College / Graduate school
        </button>

        {formType === 'student' && (
          <button
            onClick={() => {
              handleOptionChange('adult');
              confirmGrade();
            }}
            className="w-full py-2 px-6 bg-[#DDD3F8] border border-[#9184F0] rounded-full text-[#534988] text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[40px] hover:bg-[#9184F0] hover:text-white transition-all duration-300"
          >
            Adult / professional
          </button>
        )}
      </div>
    </FormContainer>
  );
};

export default LevelSelection;
