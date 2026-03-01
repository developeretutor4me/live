'use client';

import React, { useState, useEffect } from 'react';
import FormSteps from './components/FormSteps';
import './components/ScrollBar.css';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/auth/Layout';
import ContactInformation from './components/ContactInformation';
import EducationInformation from './components/EducationInformation';
import ExperienceInformation from './components/ExperienceInformation';
import ReviewAndSubmit from './components/ReviewAndSubmit';
import { sendGAEvent } from '@next/third-parties/google';
import ThankYou from './components/ThankYou';

interface ExperienceInfoProps {
  hasTutoringExperience: string;
  tutoringInterestLevel: string[];
  tutoringSubjects: string[];
  language: string[];
  instructionsInterest: string[];
  tutorAvailabilityHours: string;
  selectedStartTutoringDate: Date | string | undefined;
  generalAvailability: Record<string, string[]>;
  classRoomTeachingExperience: string;
}

interface EducationInfoProps {
  universityCollage: string;
  selectedDegree: string;
  selectedmajoredu: string;
  selectedYearedu: string;
  school: string;
}

interface ContactInformationProps {
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  zipCode: string;
}

const graduationYears: string[] = [];

for (let year = 1950; year <= 2026; year++) {
  if (!graduationYears.includes(String(year))) {
    graduationYears.push(String(year));
  }
}

const Page = () => {
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [contactInformation, setContactInformation] = useState<ContactInformationProps>({
    country: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    zipCode: '',
  });
  const [educationInfo, setEducationInfo] = useState<EducationInfoProps>({
    universityCollage: '',
    selectedDegree: '',
    selectedmajoredu: '',
    selectedYearedu: '',
    school: '',
  });
  const [experienceInfo, setExperienceInfo] = useState<ExperienceInfoProps>({
    hasTutoringExperience: '',
    tutoringInterestLevel: [],
    tutoringSubjects: [],
    language: [],
    instructionsInterest: [],
    tutorAvailabilityHours: '',
    selectedStartTutoringDate: '',
    generalAvailability: {},
    classRoomTeachingExperience: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmTerms, setConfirmTerms] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const onSubmitApplicationFormHandler = async () => {
    setIsLoading(true);
    const storedReferId: any = localStorage.getItem('referIdPerson');

    const formdata = {
      email: contactInformation.email,
      password: contactInformation.password,
      referId: storedReferId || null,
      contactInformation: {
        country: contactInformation.country,
        firstName: contactInformation.firstName,
        lastName: contactInformation.lastName,
        phone: contactInformation.phone,
        zipCode: contactInformation.zipCode,
        email: contactInformation.email,
      },
      education: {
        college: educationInfo.universityCollage,
        degree: educationInfo.selectedDegree,
        major: educationInfo.selectedmajoredu,
        graduation: new Date(`${educationInfo.selectedYearedu}-01-01`),
        school: educationInfo.school,
      },
      experience: {
        hasExperience: experienceInfo.hasTutoringExperience,
        tutoringLevel: experienceInfo.tutoringInterestLevel,
        subjectsTutored: experienceInfo.tutoringSubjects,
        languages: experienceInfo.language,
        instructionTypes: experienceInfo.instructionsInterest,
        availableHours: experienceInfo.tutorAvailabilityHours,
        startDate: experienceInfo.selectedStartTutoringDate,
        generalAvailability: experienceInfo.generalAvailability,
        hasTeachingExperience: experienceInfo.classRoomTeachingExperience,
        is18OrAbove: confirmTerms,
      },
    };

    try {
      const response = await fetch('/api/auth/signup/teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });

      const data = await response.json();
      if (!response.ok) {
        toast({
          title: 'Signup Failed',
          description: data.message || 'An error occurred during signup',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      setCurrentStep(5);
      sendGAEvent('event', 'teacherSignup', { value: 'success' });
      localStorage.removeItem('referIdPerson');
    } catch (error: any) {
      toast({
        title: 'Network Error',
        description: 'Unable to connect to server. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = ['Contact Information', 'Education', 'Experience', 'Review & Submit'];

  const displayStep = (step: any) => {
    switch (step) {
      case 1:
        return (
          <ContactInformation
            setContactInformation={setContactInformation}
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <EducationInformation
            setEducationInfo={setEducationInfo}
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <ExperienceInformation
            setExperienceInfo={setExperienceInfo}
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />
        );
      case 4:
        return (
          <ReviewAndSubmit
            contactInformation={contactInformation}
            educationInfo={educationInfo}
            experienceInfo={experienceInfo}
            setContactInformation={setContactInformation}
            setEducationInfo={setEducationInfo}
            setExperienceInfo={setExperienceInfo}
            setConfirmTerms={setConfirmTerms}
            confirmTerms={confirmTerms}
            onSubmitApplicationFormHandler={onSubmitApplicationFormHandler}
            isLoading={isLoading}
          />
        );
      case 5:
        return <ThankYou />;
      default:
    }
  };

  return (
    <Layout>
      <div className="flex justify-center custom-xl:justify-between w-full min-h-[calc(100vh-120px)] custom-lg:w-[91%] mx-auto gap-3 mt-6 mb-3 custom-xl:mt-1">
        <div className="mt-[7rem] 3xl:mt-[6rem] ml-7 hidden custom-xl:block">
          <FormSteps
            steps={steps}
            currentStep={currentStep}
            step={{
              selected: undefined,
              description: undefined,
            }}
          />
        </div>
        <div className="w-full custom-xl:w-[71.4%] overflow-y-auto max-h-screen scrollbar-none">
          {displayStep(currentStep)}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
