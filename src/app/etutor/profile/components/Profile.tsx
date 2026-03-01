import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import {
  subjectOptions,
  PurposeOfAttachment,
  genderOptions,
  countryoptions,
  timezoneoptions,
  Teacher,
} from './Data';
import useSWR from 'swr';
import GeneralTab from './GeneralTab';
import ContactInformation from './ContactInformation';
import ProfessionalExperience from './ProfessionalExperience';
import AcademicBackground from './AcademicBackground';

interface Profileprops {
  onFnameChange: (fname: string) => void;
  onprofilepicture: (profilepic: string) => void;
}
function Profile({ onFnameChange, onprofilepicture }: Profileprops) {
  const { toast } = useToast();
  const { data: session, update } = useSession();
  const [activeTab, setActiveTab] = useState('GENERAL');
  const [error, setError] = useState<string | null>(null);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [isSubjectLEVELDropdownOpen, setIsSubjectLEVELDropdownOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedSubjectsLEVEL, setSelectedSubjectsLEVEL] = useState<string[]>([]);

  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [teacher, setTeacher] = useState<Teacher>();
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
  const [isAcademicCountryopen, setisAcademicCountryopen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCountry, setselectedCountry] = useState('');
  const [selectedTimezone, setselectedTimezone] = useState('');
  const [selectedAcademicCountry, setselectedAcademicCountry] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [acceptsTrialSession, setAcceptsTrialSession] = useState(false);

  // Contact Information
  const [country, setCountry] = useState('');
  const [countryOfResident, setCountryOfResident] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [streetName, setStreetName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [email, setEmail] = useState('');

  // Education
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const [graduation, setGraduation] = useState<Date | undefined>(undefined);

  const [graduationSchool, setGraduationSchool] = useState('');
  const [highestDegree, setHighestDegree] = useState('');
  const [school, setSchool] = useState('');

  // DOB
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Miscellaneous Information
  const [currentJob, setCurrentJob] = useState('');

  const [videoIntroduction, setVideoIntroduction] = useState('');
  const [aboutYou, setAboutYou] = useState('');
  const [yourEducation, setYourEducation] = useState('');

  // Experience
  const [experienceWithSpecialNeedsStudent, setExperienceWithSpecialNeedsStudent] = useState(['']);
  const [tutoringExperience, setTutoringExperience] = useState('');
  const [internationalExperience, setInternationalExperience] = useState('');
  const [moreAboutProfessionalExperience, setMoreAboutProfessionalExperience] = useState('');
  const [hasExperience, setHasExperience] = useState(false);
  const [tutoringLevel, setTutoringLevel] = useState(['']);
  const [subjectsTutored, setSubjectsTutored] = useState(['']);
  const [instructionTypes, setInstructionTypes] = useState(['']);
  const [availableHours, setAvailableHours] = useState('');
  const [startDate, setStartDate] = useState('');
  const [generalAvailability, setGeneralAvailability] = useState<{ day: string; time: string }[]>(
    []
  );
  const [hasTeachingExperience, setHasTeachingExperience] = useState(false);
  const [is18OrAbove, setIs18OrAbove] = useState(false);
  const [accountHolder, setAccountHolder] = useState('');
  const [IBAN, setIBAN] = useState('');
  const [BIC, setBIC] = useState('');
  const [currentMonthRegularSession, setCurrentMonthRegularSession] = useState(0);
  const [currentMonthGroupSession, setCurrentMonthGroupSession] = useState(0);
  const [totalGroupSession, setTotalGroupSession] = useState(0);
  const [totalRegularSession, setTotalRegularSession] = useState(0);
  const [totalBooking, setTotalBooking] = useState(0);
  const [level, setLevel] = useState(0);
  const [badge, setBadge] = useState(
    'https://cdn4.vectorstock.com/i/1000x1000/85/48/emblem-badge-ribbon-vector-14398548.jpg'
  );
  const [earnedThisMonth, setEarnedThisMonth] = useState(0);
  const [earnedLastMonth, setEarnedLastMonth] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [languages, setLanguages] = useState(['']);
  const [showNewInput, setShowNewInput] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubjectToVerifyDropdownOpen, setIsSubjectToVerifyDropdownOpen] = useState(false);
  const [selectedSubjectToVerifys, setSelectedSubjectToVerifys] = useState('');
  const [isPurposeOfAttechmentDropdownOpen, setIsPurposeOfAttechmentDropdownOpen] = useState(false);
  const [selectedPurposeOfAttechments, setSelectedPurposeOfAttechments] = useState('');
  const [profilePicture, setprofilePicture] = useState('');

  const [files, setFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [pictureuploadloading, setpictureuploadloading] = useState(false);
  const [image, setImage] = useState<File | null>(null); // State to hold the selected image
  const [isUploading, setIsUploading] = useState(false); // State to show the uploading status
  const [uploadedImage, setUploadedImage] = useState<string | null>('');
  const [unapprovedSubjects, setUnapprovedSubjects] = useState<string[]>([]);
  const [isCheckingApproval, setIsCheckingApproval] = useState(false);
  const [subjethover, setsubjethover] = useState('');
  const [onvideoiconhover, setonvideoiconhover] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setUploadedUrls([]);

    const formData = new FormData();
    formData.append('userid', session?.user.id);
    formData.append('subject', selectedSubjectToVerifys);
    formData.append('purpose', selectedPurposeOfAttechments);
    // @ts-ignore
    formData.append('teacher', teacher?._id);
    files.forEach(file => formData.append('files', file));

    try {
      const response = await fetch('/api/qualification-approval', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadedUrls(result.uploadedFiles.map((file: { fileUrl: string }) => file.fileUrl));

        toast({
          title: 'Success',
          description: 'Your files have been successfully submitted for verification. Thank you!',
          variant: 'default',
        });
        setIsPopupOpen(false);
      } else {
        setErrorMessage(result.error || 'Failed to upload files');
      }
    } catch (error) {
      toast({
        title: '!',
        description: `'Error uploading files:' ${error}`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);

      setSelectedSubjectToVerifys('');
      setSelectedPurposeOfAttechments('');
      setFiles([]);
    }
  };

  const removeFile = (index: any) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  const togglePurposeOfAttechmentDropdown = () => {
    setIsPurposeOfAttechmentDropdownOpen(!isPurposeOfAttechmentDropdownOpen);
  };

  const handlePurposeOfAttechmentClick = (PurposeOfAttechment: string) => {
    setSelectedPurposeOfAttechments(PurposeOfAttechment);
    setIsPurposeOfAttechmentDropdownOpen(false);
  };

  const toggleSubjectToVerifyDropdown = () => {
    setIsSubjectToVerifyDropdownOpen(!isSubjectToVerifyDropdownOpen);
  };

  const handleSubjectToVerifyClick = (SubjectToVerify: string) => {
    setSelectedSubjectToVerifys(SubjectToVerify);
    setIsSubjectToVerifyDropdownOpen(false);
  };

  const handleAddLanguage = () => {
    if (!isEditing || languages.length >= 4) return;
    setShowNewInput(true);
  };

  const handleSubmitLanguage = () => {
    if (newLanguage.trim() && languages.length < 4) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
      if (languages.length < 3) {
        setShowNewInput(true);
      } else {
        setShowNewInput(false);
      }
    }
  };

  const handleDeleteLanguage = (indexToDelete: any) => {
    if (!isEditing) return;
    setLanguages(languages.filter((_, index) => index !== indexToDelete));
  };

  // update function-------------------------
  const handleSave = async () => {
    setIsEditing(true);
    try {
      const approvedSubjects = selectedSubjects.filter(
        subject => !unapprovedSubjects.includes(subject)
      );
      const body = {
        acceptsTrialSession: acceptsTrialSession,
        contactInformation: {
          country: selectedCountry,
          countryOfresident: countryOfResident,
          firstName: firstName,
          lastName: lastName,
          zipCode: zipCode,
          phone: phone,
          streetname: streetName,
          shippingAddress: shippingAddress,
          city: city,
          postcode: postcode,
          email: email,
        },
        education: {
          college: college,
          degree: degree,
          major: major,
          graduation: graduation,
          graduationSchool: graduationSchool,
          graduationCountry: selectedAcademicCountry,
          highestDegree: highestDegree,
          school: school,
        },
        DOB: {
          day: day,
          month: month,
          year: year,
        },
        currentJob: currentJob,
        timeZone: selectedTimezone,
        gender: selectedGender,
        VideoIntroduction: videoIntroduction,
        aboutyou: aboutYou,
        YourEducation: yourEducation,
        experience: {
          experienceWithSpecialNeedsStudent: selectedExperience,
          tutoringExperience: tutoringExperience,
          internationalExperience: internationalExperience,
          moreaboutProfessionalExperience: moreAboutProfessionalExperience,
          hasExperience: hasExperience,
          tutoringLevel: selectedSubjectsLEVEL,
          subjectsTutored: approvedSubjects,
          languages: languages,
          instructionTypes: instructionTypes,
          availableHours: availableHours,
          startDate: startDate,
          generalAvailability: generalAvailability,
          hasTeachingExperience: hasTeachingExperience,
          is18OrAbove: is18OrAbove,
        },
        bankDetails: {
          accountholder: accountHolder,
          IBAN: IBAN,
          BIC: BIC,
        },
      };

      const response = await fetch('/api/Teacher-Apis/Update-Teacher-Data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();

        toast({
          title: 'Updated successfully!',
          description: '',
          variant: 'default',
        });
      } else {
        const error = await response.json();

        toast({
          title: `Error: ${error.error}`,
          description: '',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: `Failed to update teacher data.`,
        description: '',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (teacher) {
      // Contact Information

      // @ts-ignore
      setprofilePicture(teacher?.user?.profilePicture);
      setselectedCountry(teacher?.contactInformation?.country || '');
      setCountryOfResident(teacher?.contactInformation?.countryOfresident || '');
      setFirstName(teacher?.contactInformation?.firstName || '');
      setLastName(teacher?.contactInformation?.lastName || '');
      setZipCode(teacher?.contactInformation?.zipCode || '');
      setPhone(teacher?.contactInformation?.phone || '');
      setStreetName(teacher?.contactInformation?.streetname || '');
      setShippingAddress(teacher?.contactInformation?.shippingAddress || '');
      setCity(teacher?.contactInformation?.city || '');
      setPostcode(teacher?.contactInformation?.postcode || '');
      //@ts-ignore
      setEmail(teacher?.user?.email || '');

      // Education
      setCollege(teacher?.education?.college || '');
      setDegree(teacher?.education?.degree || '');
      setMajor(teacher?.education?.major || '');
      setGraduation(
        teacher?.education?.graduation ? new Date(teacher.education.graduation) : undefined
      );

      setGraduationSchool(teacher?.education?.graduationSchool || '');
      setselectedAcademicCountry(teacher?.education?.graduationCountry || '');
      setHighestDegree(teacher?.education?.highestDegree || '');
      setSchool(teacher?.education?.school || '');

      // DOB
      setDay(teacher?.DOB?.day || '');
      setMonth(teacher?.DOB?.month || '');
      setYear(teacher?.DOB?.year || '');

      // Miscellaneous Information
      setCurrentJob(teacher?.currentJob || '');
      setselectedTimezone(teacher?.timeZone || '');
      setSelectedGender(teacher?.gender || '');
      setVideoIntroduction(teacher?.VideoIntroduction || '');
      setAboutYou(teacher?.aboutyou || '');
      setYourEducation(teacher?.YourEducation || '');

      // Experience
      setSelectedExperience(
        //@ts-ignore
        teacher?.experience?.experienceWithSpecialNeedsStudent || []
      );
      setTutoringExperience(teacher?.experience?.tutoringExperience || '');
      setInternationalExperience(teacher?.experience?.internationalExperience || '');
      setMoreAboutProfessionalExperience(
        teacher?.experience?.moreaboutProfessionalExperience || ''
      );
      setHasExperience(teacher?.experience?.hasExperience || false);
      //@ts-ignore
      setSelectedSubjectsLEVEL(teacher?.experience?.tutoringLevel || []);
      //@ts-ignore
      setSelectedSubjects(teacher?.experience?.subjectsTutored || []);
      setLanguages(teacher?.experience?.languages || ['']);
      setInstructionTypes(teacher?.experience?.instructionTypes || []);
      setAvailableHours(teacher?.experience?.availableHours || '');
      setStartDate(teacher?.experience?.startDate.toString() || '');
      setGeneralAvailability(teacher?.experience?.generalAvailability || '');
      setHasTeachingExperience(teacher?.experience?.hasTeachingExperience || false);
      setIs18OrAbove(teacher?.experience?.is18OrAbove || false);

      // Bank Details
      setAccountHolder(teacher?.bankDetails?.accountholder || '');
      setIBAN(teacher?.bankDetails?.IBAN || '');
      setBIC(teacher?.bankDetails?.BIC || '');

      // Stats
      setCurrentMonthRegularSession(teacher?.currentMonthRegularSession || 0);
      setCurrentMonthGroupSession(teacher?.currentMonthGroupSession || 0);
      setTotalGroupSession(teacher?.TotalGroupSession || 0);
      setTotalRegularSession(teacher?.TotalRegularSession || 0);
      setTotalBooking(teacher?.totalbooking || 0);
      setLevel(teacher?.level || 0);
      setBadge(
        teacher?.badge ||
          'https://cdn4.vectorstock.com/i/1000x1000/85/48/emblem-badge-ribbon-vector-14398548.jpg'
      );
      setEarnedThisMonth(teacher?.EarnedThisMonth || 0);
      setEarnedLastMonth(teacher?.EarnedLastMonth || 0);
      setTotalEarning(teacher?.TotalEarning || 0);

      // Approval
      setIsApproved(teacher?.isApproved || false);
    }
  }, [teacher]);
  useEffect(() => {
    onFnameChange(firstName);
    onprofilepicture(profilePicture);
  }, [firstName, onFnameChange, onprofilepicture, profilePicture]);

  const toggleEdit = () => {
    setIsEditing(prev => !prev);
  };

  const toggleSubjectDropdown = () => {
    if (isEditing === true) {
      setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
    }
  };
  const toggleSubjectLEVELDropdown = () => {
    if (isEditing === true) {
      setIsSubjectLEVELDropdownOpen(!isSubjectLEVELDropdownOpen);
    }
  };
  const toggleExperienceWithSpecialNeeds = () => {
    if (isEditing === true) {
      setIsExperienceOpen(!isExperienceOpen);
    }
  };

  const handleSubjectClick = async (subject: string) => {
    // If already selected, just remove it
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(item => item !== subject));
      setUnapprovedSubjects(unapprovedSubjects.filter(item => item !== subject));
      return;
    }

    // If adding a new subject and we already have 2 or more subjects
    if (selectedSubjects.length >= 2) {
      setIsCheckingApproval(true);
      try {
        // Call the API to check if subject is approved
        const response = await fetch('/api/check-subject-approval', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subject }),
        });

        const result = await response.json();

        // Add the subject to selected subjects regardless
        setSelectedSubjects([...selectedSubjects, subject]);

        // If not approved, also add to unapproved list

        if (!(response.status === 200)) {
          setUnapprovedSubjects([...unapprovedSubjects, subject]);
        }
      } catch (error) {
        console.error('Error checking subject approval:', error);
        // In case of error, still add the subject but mark as unapproved
        setSelectedSubjects([...selectedSubjects, subject]);
        setUnapprovedSubjects([...unapprovedSubjects, subject]);
      } finally {
        setIsCheckingApproval(false);
      }
    } else {
      // If less than 2 subjects, no need to check approval
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const isSubjectUnapproved = (subject: string) => {
    return unapprovedSubjects.includes(subject);
  };

  const removeSubject = (subject: string) => {
    setSelectedSubjects(selectedSubjects.filter(item => item !== subject));
    setUnapprovedSubjects(unapprovedSubjects.filter(item => item !== subject));
  };

  const handleSubjectLEVELClick = (subject: string) => {
    // @ts-ignore
    if (selectedSubjectsLEVEL.includes(subject)) {
      setSelectedSubjectsLEVEL(selectedSubjectsLEVEL.filter(item => item !== subject));
    } else {
      // @ts-ignore
      setSelectedSubjectsLEVEL([...selectedSubjectsLEVEL, subject]);
    }
  };
  const handleExperienceClick = (subject: string) => {
    // @ts-ignore
    if (selectedExperience.includes(subject)) {
      setSelectedExperience(selectedExperience.filter(item => item !== subject));
    } else {
      // @ts-ignore
      setSelectedExperience([...selectedExperience, subject]);
    }
  };

  const removeSubjectLEVEL = (subject: string) => {
    if (isEditing === true) {
      setSelectedSubjectsLEVEL(selectedSubjectsLEVEL.filter(item => item !== subject));
    }
  };
  const removeExperience = (subject: string) => {
    setSelectedExperience(selectedExperience.filter(item => item !== subject));
  };

  const toggleGenderDropdown = () => {
    if (isEditing === true) {
      setIsGenderOpen(!isGenderOpen);
    }
  };
  const toggleCountryDropdown = () => {
    if (isEditing) {
      setIsCountryOpen(!isCountryOpen);
    }
  };
  const toggleTimezoneDropdown = () => {
    if (isEditing) {
      setIsTimezoneOpen(!isTimezoneOpen);
    }
  };
  const toggleAcedmicCountrydown = () => {
    if (isEditing) {
      setisAcademicCountryopen(!isAcademicCountryopen);
    }
  };

  const handleGenderClick = (value: string) => {
    setSelectedGender(value); // Update the selected gender state
    setIsGenderOpen(false); // Close the gender dropdown
  };
  const handleCountryClick = (value: string) => {
    setselectedCountry(value); // Update the selected gender state
    setIsCountryOpen(false); // Close the gender dropdown
  };
  const handletimezoneClick = (value: string) => {
    setselectedTimezone(value); // Update the selected gender state
    setIsTimezoneOpen(false); // Close the gender dropdown
  };
  const handleAcademicCountryClick = (value: string) => {
    setselectedAcademicCountry(value); // Update the selected gender state
    setisAcademicCountryopen(false); // Close the gender dropdown
  };
  const tabs = [
    { id: 'GENERAL', label: 'GENERAL' },
    { id: 'CONTACTINFORMATION', label: 'CONTACT INFORMATION' },
    { id: 'PROFESSIONALEXPERIENCE', label: 'PROFESSIONAL EXPERIENCE' },
    { id: 'ACADEMICBACKGROUND', label: 'ACADEMIC BACKGROUND' },
  ];
  const getTabColor = (tabId: string) => {
    if (activeTab === 'GENERAL') {
      if (tabId === 'CONTACTINFORMATION') return '#B4A5D7';
      if (tabId === 'PROFESSIONALEXPERIENCE') return '#6B5692';
      if (tabId === 'ACADEMICBACKGROUND') return '#473171';
    } else if (activeTab === 'CONTACTINFORMATION') {
      if (tabId === 'GENERAL') return '#473171';
      if (tabId === 'PROFESSIONALEXPERIENCE') return '#B4A5D7';
      if (tabId === 'ACADEMICBACKGROUND') return '#6B5692';
    } else if (activeTab === 'PROFESSIONALEXPERIENCE') {
      if (tabId === 'GENERAL') return '#6B5692';
      if (tabId === 'CONTACTINFORMATION') return '#473171';
      if (tabId === 'ACADEMICBACKGROUND') return '#B4A5D7';
    } else if (activeTab === 'ACADEMICBACKGROUND') {
      if (tabId === 'GENERAL') return '#B4A5D7';
      if (tabId === 'CONTACTINFORMATION') return '#6B5692';
      if (tabId === 'PROFESSIONALEXPERIENCE') return '#473171';
    }
    return '#EDE8FA'; // Active tab color
  };

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Teacher not found or internal server error');
    }
    return response.json();
  };

  // Use SWR hook
  const { data: teacherData, isLoading } = useSWR('/api/Teacher-Apis/teacher-data', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    onSuccess: (data: any) => {
      setTeacher(data);
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      setError(''); // Reset any previous error
    }
  };

  const handleUpload = async () => {
    setpictureuploadloading(true);
    if (!image) {
      setError('Please select an image first.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageBase64 = reader.result as string;

      setIsUploading(true); // Show the uploading status

      try {
        // Call the API to upload the image to S3 and store the URL in the database
        const response = await fetch('/api/upload-profile-picture', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session?.user.id,
            imageBase64: imageBase64.split(',')[1], // Send only base64 data (not the prefix)
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setImage(null);
          // Successfully uploaded the image, update the profile picture URL
          setUploadedImage(data.profilePictureUrl);
          setpictureuploadloading(false);
        } else {
          setImage(null);
          setpictureuploadloading(false);
          setError(data.message || 'Failed to upload the image.');
        }
      } catch (error) {
        setImage(null);
        setpictureuploadloading(false);
        console.error('Error uploading profile picture:', error);
        setError('An error occurred while uploading the image.');
      } finally {
        setIsUploading(false); // Hide the uploading status
      }
    };

    reader.readAsDataURL(image); // Convert the image file to base64
  };

  return (
    <div className=" h-fit w-full -mt-1 rounded-tl-3xl flex mb-12 pb-12   ">
      <div className="w-full    rounded-3xl  relative h-full scrollbar-none p-0 m-0">
        <div className="flex justify-between items-start  w-full">
          <div className=" grid grid-cols-4   rounded-tl-3xl rounded-tr-3xl h-10 sm:h-[84px] w-full">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center flex-nowrap  font-normal box-border sm:font-bold text-xs px-2  sm:text-[20px] sm:leading-[1.75rem]  transition-all
            ${tab.id === 'GENERAL' && 'rounded-tl-3xl'}
            ${tab.id === 'ACADEMICBACKGROUND' && 'rounded-tr-3xl'}
            ${
              tab.id === activeTab
                ? 'bg-[#EDE8FA] text-[#685AAD] transition-all'
                : `text-white transition-all`
            }`}
                style={{ backgroundColor: getTabColor(tab.id) }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className=" rounded-tl-3xl rounded-tr-3xl h-10 sm:h-[84px] w-[6.8%] hidden custom-2xl:block"></div>
        </div>

        <div
          className={`px-5 sm:px-0 sm:pl-10 custom-xl:pl-20 sm:pr-10 custom-xl:pr-16 py-6 custom-xl:py-12  custom-2xl:rounded-tr-3xl  bg-[#EDE8FA] h-full rounded-b-3xl`}
        >
          <GeneralTab
            activeTab={activeTab}
            uploadedImage={uploadedImage}
            profilePicture={profilePicture}
            image={image}
            handleUpload={handleUpload}
            pictureuploadloading={pictureuploadloading}
            handleImageChange={handleImageChange}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            teacher={teacher}
            isEditing={isEditing}
            day={day}
            setDay={setDay}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            selectedGender={selectedGender}
            isGenderOpen={isGenderOpen}
            toggleGenderDropdown={toggleGenderDropdown}
            genderOptions={genderOptions}
            handleGenderClick={handleGenderClick}
            selectedSubjects={selectedSubjects}
            isSubjectDropdownOpen={isSubjectDropdownOpen}
            setIsSubjectDropdownOpen={setIsSubjectDropdownOpen}
            toggleSubjectDropdown={toggleSubjectDropdown}
            subjectOptions={subjectOptions}
            handleSubjectClick={handleSubjectClick}
            removeSubject={removeSubject}
            isSubjectUnapproved={isSubjectUnapproved}
            setYourEducation={setYourEducation}
            yourEducation={yourEducation}
            setAboutYou={setAboutYou}
            aboutYou={aboutYou}
            setVideoIntroduction={setVideoIntroduction}
            videoIntroduction={videoIntroduction}
            setsubjethover={setsubjethover}
          />

          <ContactInformation
            activeTab={activeTab}
            phone={phone}
            email={email}
            streetName={streetName}
            setStreetName={setStreetName}
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
            city={city}
            setCity={setCity}
            postcode={postcode}
            setPostcode={setPostcode}
            selectedCountry={selectedCountry}
            isCountryOpen={isCountryOpen}
            toggleCountryDropdown={toggleCountryDropdown}
            countryoptions={countryoptions}
            handleCountryClick={handleCountryClick}
            selectedTimezone={selectedTimezone}
            isTimezoneOpen={isTimezoneOpen}
            toggleTimezoneDropdown={toggleTimezoneDropdown}
            timezoneoptions={timezoneoptions}
            handletimezoneClick={handletimezoneClick}
            isEditing={isEditing}
          />

          <ProfessionalExperience
            activeTab={activeTab}
            isEditing={isEditing}
            currentJob={currentJob}
            setCurrentJob={setCurrentJob}
            tutoringExperience={tutoringExperience}
            setTutoringExperience={setTutoringExperience}
            moreAboutProfessionalExperience={moreAboutProfessionalExperience}
            setMoreAboutProfessionalExperience={setMoreAboutProfessionalExperience}
            selectedSubjectsLEVEL={selectedSubjectsLEVEL}
            setSelectedSubjectsLEVEL={setSelectedSubjectsLEVEL}
            selectedExperience={selectedExperience}
            setSelectedExperience={setSelectedExperience}
            toggleSubjectLEVELDropdown={toggleSubjectLEVELDropdown}
            toggleExperienceWithSpecialNeeds={toggleExperienceWithSpecialNeeds}
            removeExperience={removeExperience}
            handleExperienceClick={handleExperienceClick}
            setIsCountryOpen={setIsCountryOpen}
            isExperienceOpen={isExperienceOpen}
            handleSubjectLEVELClick={handleSubjectLEVELClick}
            isSubjectLEVELDropdownOpen={isSubjectLEVELDropdownOpen}
            setIsSubjectLEVELDropdownOpen={setIsSubjectLEVELDropdownOpen}
            removeSubjectLEVEL={removeSubjectLEVEL}
          />

          <AcademicBackground
            activeTab={activeTab}
            errorMessage={errorMessage}
            isEditing={isEditing}
            isSubmitting={isSubmitting}
            graduationSchool={graduationSchool}
            setGraduationSchool={setGraduationSchool}
            highestDegree={highestDegree}
            setHighestDegree={setHighestDegree}
            internationalExperience={internationalExperience}
            setInternationalExperience={setInternationalExperience}
            languages={languages}
            setLanguages={setLanguages}
            showNewInput={showNewInput}
            newLanguage={newLanguage}
            setNewLanguage={setNewLanguage}
            handleSubmitLanguage={handleSubmitLanguage}
            handleDeleteLanguage={handleDeleteLanguage}
            handleAddLanguage={handleAddLanguage}
            handleSubmit={handleSubmit}
            handleFileChange={handleFileChange}
            removeFile={removeFile}
            files={files}
            setFiles={setFiles}
            setIsPopupOpen={setIsPopupOpen}
            isPopupOpen={isPopupOpen}
            setIsSubjectToVerifyDropdownOpen={setIsSubjectToVerifyDropdownOpen}
            isSubjectToVerifyDropdownOpen={isSubjectToVerifyDropdownOpen}
            toggleSubjectToVerifyDropdown={toggleSubjectToVerifyDropdown}
            subjectOptions={countryoptions}
            toggleAcedmicCountrydown={toggleAcedmicCountrydown}
            selectedAcademicCountry={selectedAcademicCountry}
            isAcademicCountryopen={isAcademicCountryopen}
            handleAcademicCountryClick={handleAcademicCountryClick}
            selectedSubjectToVerifys={selectedSubjectToVerifys}
            handleSubjectToVerifyClick={handleSubjectToVerifyClick}
            togglePurposeOfAttechmentDropdown={togglePurposeOfAttechmentDropdown}
            selectedPurposeOfAttechments={selectedPurposeOfAttechments}
            isPurposeOfAttechmentDropdownOpen={isPurposeOfAttechmentDropdownOpen}
            setIsPurposeOfAttechmentDropdownOpen={setIsPurposeOfAttechmentDropdownOpen}
            PurposeOfAttachment={PurposeOfAttachment}
            handlePurposeOfAttechmentClick={handlePurposeOfAttechmentClick}
            setIsSubmitting={false}
            countryoptions={[]}
          />

          <div className="w-full flex items-center justify-center mt-20">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-[#9052FC]  font-medium text-white text-2xl px-32 rounded-lg hover:bg-[#6b33cc] transition-all duration-300 py-2"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={toggleEdit}
                className="bg-[#FC7777]  font-medium text-white text-2xl px-32 rounded-lg hover:bg-[#6b33cc] transition-all duration-300 py-2"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

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

          background-color: white;
        }
      `}</style>
    </div>
  );
}

export default Profile;
