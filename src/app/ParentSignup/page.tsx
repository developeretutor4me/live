'use client';
import AdditionalInformation from '@/components/auth/AdditionalInformation';
import GradeSelection from '@/components/auth/GradeSelection';
import Layout from '@/components/auth/Layout';
import LevelSelection from '@/components/auth/LevelSelection';
import ParentInformation from '@/components/auth/ParentInformation';
import PersonalDetailsForm from '@/components/auth/PersonalDetailsForm';
import ShowAvailability from '@/components/auth/ShowAvailability';
import SignUpForm from '@/components/auth/SignUpForm';
import SubjectSelection from '@/components/auth/SubjectSelection';
import { useToast } from '@/hooks/use-toast';
import { sendGAEvent } from '@next/third-parties/google';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { countryData } from '@/utils/countryData';

export interface ParentDetails {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  country: string;
  stateCity: string;
  streetName: string;
  zipCode: string;
}

export interface ChildDetails {
  firstName: string;
  lastName: string;
  age: string;
  country: string;
  stateCity: string;
  institution: string;
  streetName: string;
  zipCode: string;
}

const Page = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [QuestionNo, setQuestionNo] = useState(1);
  const [isGradeConfirmed, setIsGradeConfirmed] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [personalDetailsIsConfirmed, setPersonalDetailsIsConfirmed] = useState<ParentDetails>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    stateCity: '',
    streetName: '',
    zipCode: '',
    phoneNumber: '',
  });
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState('Berlin, GMT +02:200');
  const [childDetailsIsConfirmed, setChildDetailsIsConfirmed] = useState<ChildDetails>({
    firstName: '',
    lastName: '',
    age: '',
    country: '',
    stateCity: '',
    institution: '',
    streetName: '',
    zipCode: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCountryForPhone, setselectedCountryForPhone] = useState(countryData[0]);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      if (session.user?.role === 'parent') {
        sendGAEvent('event', 'parent', {
          value: 'parent',
          role: 'parent',
          userId: session.user.id,
        });
        router.push('/parent');
      } else if (session?.user?.role === 'teacher') {
        sendGAEvent('event', 'teacher', { value: 'teacher' });
        router.push('/etutor');
      } else if (session?.user?.role === 'student') {
        sendGAEvent('event', 'student', { value: 'student' });
        router.push('/studentdashboard');
      }
    }
  }, [router, session]);

  const formData = {
    email: personalDetailsIsConfirmed.email,
    password: personalDetailsIsConfirmed.password,
    parent: {
      firstName: personalDetailsIsConfirmed.firstName,
      lastName: personalDetailsIsConfirmed.lastName,
      age: childDetailsIsConfirmed.age,
      institution: childDetailsIsConfirmed.institution,
      phoneNumber: `(${selectedCountryForPhone.dial_code}) ${personalDetailsIsConfirmed.phoneNumber}`,
      levelOfStudy: selectedLevel,
      grade: selectedGrade,
      subjectChildNeeds: selectedSubjects,
      additionalInformation: additionalInformation,
      availability: selectedTimeZone + ' ' + selectedDate,
      childInformation: {
        firstName: childDetailsIsConfirmed.firstName,
        lastName: childDetailsIsConfirmed.lastName,
        age: childDetailsIsConfirmed.age,
        country: childDetailsIsConfirmed.country,
        city: childDetailsIsConfirmed.stateCity,
        institution: childDetailsIsConfirmed.institution,
        streetName: childDetailsIsConfirmed.streetName,
        zipCode: childDetailsIsConfirmed.zipCode,
      },
      parentPersonalInformation: {
        country: personalDetailsIsConfirmed.country,
        city: personalDetailsIsConfirmed.stateCity,
        streetName: personalDetailsIsConfirmed.streetName,
        zipCode: personalDetailsIsConfirmed.zipCode,
      },
    },
  };

  const handleOptionChange = (option: string) => {
    setSelectedLevel(option);
  };

  const confirmGrade = () => {
    setIsGradeConfirmed(true);
  };

  const handleGradeClick = (grade: any) => {
    setSelectedGrade(grade);
  };

  const handleSubjectConfirmation = (selectedSubjects: string[]) => {
    setSelectedSubjects(selectedSubjects);
    setQuestionNo(QuestionNo + 1);
  };

  const handleChildDetailsConfirmation = (data: ChildDetails) => {
    setChildDetailsIsConfirmed({
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      country: data.country,
      stateCity: data.stateCity,
      institution: data.institution,
      streetName: data.streetName,
      zipCode: data.zipCode,
    });
    setQuestionNo(QuestionNo + 1);
  };

  const handleParentDetailsConfirmation = (data: any) => {
    setPersonalDetailsIsConfirmed({
      ...personalDetailsIsConfirmed,
      country: data.country,
      stateCity: data.stateCity,
      streetName: data.streetName,
      zipCode: data.zipCode,
    });
    setQuestionNo(QuestionNo + 1);
  };

  const handleAdditionalInformationConfirmation = (additionalInfo: string) => {
    setAdditionalInformation(additionalInfo);
    setQuestionNo(QuestionNo + 1);
  };

  const handleAvailabilityConfirmation = (selectedDate: Date, selectedTimeZone: string) => {
    setSelectedDate(selectedDate);
    setSelectedTimeZone(selectedTimeZone);
    setQuestionNo(QuestionNo + 1);
  };

  const handleGoogleSignIn = async () => {
    let data = localStorage.getItem('formData');
    if (data) {
      localStorage.removeItem('formData');
    }

    localStorage.setItem('formData', JSON.stringify(formData));

    await signIn('google', {
      callbackUrl: `${window.location.origin}/verifystudent`,
    });
  };

  const signUpFormSubmitHandler = async () => {
    setLoading(true);

    try {
      const referId = localStorage.getItem('referIdPerson');

      const response = await fetch('/api/auth/signup/parent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          referId: referId || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: 'Signup Failed',
          description: data.message || 'An error occurred during signup',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      router.push('/ParentSignup/Confirmation');
      sendGAEvent('event', 'parentSignup', { value: 'success' });
      localStorage.removeItem('referIdPerson');
    } catch (error: any) {
      toast({
        title: 'Network Error',
        description: 'Unable to connect to server. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderClassLevelOptions = () => {
    switch (selectedLevel) {
      case 'middle':
        return (
          <GradeSelection
            grade="middle"
            handleGradeClick={handleGradeClick}
            selectedGrade={selectedGrade}
            gradeConfirmationHandler={() => setIsGradeConfirmed(true)}
            title="What is your Child’s Grade?"
          />
        );
      case 'elementary':
        return (
          <GradeSelection
            grade="elementary"
            handleGradeClick={handleGradeClick}
            selectedGrade={selectedGrade}
            gradeConfirmationHandler={() => setIsGradeConfirmed(true)}
            title="What is your Child’s Grade?"
          />
        );
      case 'high':
        return (
          <GradeSelection
            grade="high"
            handleGradeClick={handleGradeClick}
            selectedGrade={selectedGrade}
            gradeConfirmationHandler={() => setIsGradeConfirmed(true)}
            title="What is your Child’s Grade?"
          />
        );
      case 'college':
        return (
          <GradeSelection
            grade="college"
            handleGradeClick={handleGradeClick}
            selectedGrade={selectedGrade}
            gradeConfirmationHandler={() => setIsGradeConfirmed(true)}
            title="What is your Child’s Grade?"
          />
        );
      default:
        return null;
    }
  };

  const renderQuestionNo = () => {
    switch (QuestionNo) {
      case 1:
        return (
          <SubjectSelection
            subjectConfirmationHandler={handleSubjectConfirmation}
            title="What subjects does your child need help with?"
          />
        );
      case 2:
        return (
          <PersonalDetailsForm
            onConfirm={handleChildDetailsConfirmation}
            title="Child’s Personal Information"
          />
        );
      case 3:
        return (
          <AdditionalInformation
            onConfirm={handleAdditionalInformationConfirmation}
            title="Additional Information"
            description="Please share anything you think your child’s eTutor should know to support them better. This could include learning preferences, challenges, a 504 plan, or helpful teaching strategies. Your notes will help us personalize their learning experience."
          />
        );
      case 4:
        return (
          <ShowAvailability
            onConfirm={handleAvailabilityConfirmation}
            title="When is your child available?"
          />
        );
      case 5:
        return (
          <ParentInformation
            onConfirm={handleParentDetailsConfirmation}
            title="Parent's Personal Information"
          />
        );
      case 6:
        return (
          <SignUpForm
            handleGoogleSignIn={handleGoogleSignIn}
            signUpFormSubmitHandler={signUpFormSubmitHandler}
            personalDetailsIsConfirmed={personalDetailsIsConfirmed}
            setPersonalDetailsIsConfirmed={setPersonalDetailsIsConfirmed}
            loading={loading}
            selectedCountryForPhone={selectedCountryForPhone}
            setselectedCountryForPhone={setselectedCountryForPhone}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      {!selectedLevel && (
        <LevelSelection
          handleOptionChange={handleOptionChange}
          confirmGrade={confirmGrade}
          formType="parent"
          title="What grade level is your child in?"
        />
      )}
      {selectedLevel && !isGradeConfirmed && renderClassLevelOptions()}
      {isGradeConfirmed && renderQuestionNo()}
    </Layout>
  );
};

export default Page;
