import React, { useEffect } from 'react';
import FormHeading from './FormHeading';
import ContactInformation from './Reviews/ContactInformation';
import EducationInformation from './Reviews/EducationInformation';
import ExperinceInformation from './Reviews/ExperinceInformation';

interface ReviewAndSubmitProps {
  contactInformation: any;
  educationInfo: any;
  experienceInfo: any;
  setContactInformation: (data: any) => void;
  setEducationInfo: (data: any) => void;
  setExperienceInfo: (data: any) => void;
  setConfirmTerms: (data: any) => void;
  confirmTerms: boolean;
  onSubmitApplicationFormHandler: () => void;
  isLoading: boolean;
}

const ReviewAndSubmit = ({
  contactInformation,
  educationInfo,
  experienceInfo,
  setContactInformation,
  setEducationInfo,
  setExperienceInfo,
  setConfirmTerms,
  confirmTerms,
  onSubmitApplicationFormHandler,
  isLoading,
}: ReviewAndSubmitProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="etutor-signup bg-questionbg px-4 py-6 sm:px-8 sm:py-8 md:px-12  md:py-10 custom-lg:px-16 custom-lg:py-12 custom-xl:px-[64px] custom-xl:py-16 rounded-3xl custom-xl:rounded-[50px] mt-1">
      <FormHeading
        className=""
        heading="Review Application"
        paragraph="Please review each section of your application to insure your information is correct. once you're ready click &lsquo;submit&rsquo; to finalize this portion of the application process "
      />
      <ContactInformation
        contactInformation={contactInformation}
        setContactInformation={setContactInformation}
      />
      <EducationInformation educationInfo={educationInfo} setEducationInfo={setEducationInfo} />
      <ExperinceInformation experinceInfo={experienceInfo} setExperinceInfo={setExperienceInfo} />
      {/* Terms and Submit Section */}
      <div className="mt-8 custom-xl:mt-12">
        {/* Age Confirmation and Terms Checkbox */}
        <div className="flex items-start space-x-3 mb-6 custom-xl:mb-8">
          <div className="relative flex items-center justify-center w-6 h-6 custom-xl:w-7 custom-xl:h-7 mt-1">
            <input
              type="checkbox"
              id="ageTermsCheckbox"
              className="absolute w-6 h-6 custom-xl:w-7 custom-xl:h-7 opacity-0 cursor-pointer"
              checked={confirmTerms}
              onChange={() => setConfirmTerms(!confirmTerms)}
            />
            <div
              className={`w-6 h-6 custom-xl:w-7 custom-xl:h-7 border-2 border-[#685AAD] rounded-sm custom-xl:rounded-md flex items-center justify-center transition-colors ${
                confirmTerms ? 'bg-[#685AAD]' : 'bg-white'
              }`}
            >
              {confirmTerms && (
                <svg
                  className="w-4 h-4 custom-xl:w-5 custom-xl:h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>
          <label
            htmlFor="ageTermsCheckbox"
            className="text-[#685AAD] text-base custom-xl:text-lg leading-relaxed cursor-pointer"
          >
            I confirm that I am 18 years or older and agree to the{' '}
            <span className="underline cursor-pointer text-[#8458F8] font-bold hover:text-[#685AAD] transition-colors">
              eTutor4Me LLC Terms of Use
            </span>{' '}
            and{' '}
            <span className="underline cursor-pointer text-[#8458F8] font-bold hover:text-[#685AAD] transition-colors">
              Privacy Policy
            </span>
            .
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex">
          <button
            type="button"
            className="w-[200px] sm:w-[220px] md:w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[400px] bg-[#8653FF] hover:bg-[#8653FF]/90 active:bg-[#7A6BD9] text-[#FFFFFF] font-bold text-[20px] md:text-[25px] lg:text-[25px] xl:text-[30px] 2xl:text-[30px] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-3 sm:py-4 md:py-4 lg:py-5 xl:py-5 rounded-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:shadow-[#8653FF]/25 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            onClick={onSubmitApplicationFormHandler}
            disabled={!confirmTerms}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting</span>
              </div>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndSubmit;
