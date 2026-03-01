import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';

interface ValidationErrors {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  topic: boolean;
  additionalInfo: boolean;
}

const ContactForm = () => {
  const { data: session } = useSession();
  const [firstName, setFirstName] = useState('');
  const [Lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [Topic, setTopic] = useState('');
  const [additionalinfo, setAdditionalinfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    firstName: false,
    lastName: false,
    email: false,
    topic: false,
    additionalInfo: false,
  });
  const { toast } = useToast();

  // Populate form fields from session data
  useEffect(() => {
    if (session?.user) {
      if (session.user.firstName) {
        setFirstName(session.user.firstName);
      }
      if (session.user.lastName) {
        setLastname(session.user.lastName);
      }
      if (session.user.email) {
        setEmail(session.user.email);
      }
    }
  }, [session]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (fieldName: keyof ValidationErrors, value: string): boolean => {
    switch (fieldName) {
      case 'firstName':
        return value.trim().length >= 2;
      case 'lastName':
        return value.trim().length >= 2;
      case 'email':
        return validateEmail(value);
      case 'topic':
        return value.trim().length >= 3;
      case 'additionalInfo':
        return value.trim().length >= 10;
      default:
        return true;
    }
  };

  const validateAllFields = (): boolean => {
    const errors: ValidationErrors = {
      firstName: !validateField('firstName', firstName),
      lastName: !validateField('lastName', Lastname),
      email: !validateField('email', email),
      topic: !validateField('topic', Topic),
      additionalInfo: !validateField('additionalInfo', additionalinfo),
    };

    setValidationErrors(errors);

    return !Object.values(errors).some(error => error);
  };

  const clearFieldError = (fieldName: keyof ValidationErrors) => {
    if (validationErrors[fieldName]) {
      setValidationErrors(prev => ({
        ...prev,
        [fieldName]: false,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAllFields()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    const response = await fetch('/api/contact-support/submit-form-to-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: Lastname,
        email: email,
        topic: Topic,
        additionalInformation: additionalinfo,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      toast({
        title: 'Success!',
        description: 'Form submitted successfully',
        variant: 'default',
      });
      setFirstName('');
      setLastname('');
      setTopic('');
      setEmail('');
      setAdditionalinfo('');
      setValidationErrors({
        firstName: false,
        lastName: false,
        email: false,
        topic: false,
        additionalInfo: false,
      });
    } else {
      toast({
        title: 'Error',
        description: `${data.message}`,
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  return (
    <div className="w-full  px-7">
      <h2 className="text-[#534988] text-[20px] sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[35px] custom-xl:text-[45px] font-bold mb-11">
        Please provide your details and describe your issue
      </h2>
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-8 sm:mb-16 grid grid-cols-1 gap-x-16 gap-y-10 max-w-[51rem]  custom-xl:grid-cols-2">
          {/* First Name in the first column */}
          <input
            type="text"
            placeholder="First Name"
            className={`px-5 sm:px-10 py-2 sm:py-3 rounded-full bg-[#DBCAFF] text-sm sm:text-lg text-[#685AAD] placeholder-[#685AAD] ${
              validationErrors.firstName ? 'border-2 border-red-500' : ''
            } ${session?.user?.firstName ? 'cursor-not-allowed opacity-75' : ''}`}
            value={firstName}
            readOnly={!!session?.user?.firstName}
            onChange={e => {
              if (!session?.user?.firstName) {
                setFirstName(e.target.value);
                clearFieldError('firstName');
              }
            }}
          />
          {/* Last Name in the second column */}
          <input
            type="text"
            placeholder="Last Name"
            className={`w-full px-5 sm:px-10 py-2 sm:py-3 rounded-full bg-[#DBCAFF] text-sm sm:text-lg text-[#685AAD] placeholder-[#685AAD] ${
              validationErrors.lastName ? 'border-2 border-red-500' : ''
            } ${session?.user?.lastName ? 'cursor-not-allowed opacity-75' : ''}`}
            value={Lastname}
            readOnly={!!session?.user?.lastName}
            onChange={e => {
              if (!session?.user?.lastName) {
                setLastname(e.target.value);
                clearFieldError('lastName');
              }
            }}
          />
          {/* Email in the first column */}
          <input
            type="email"
            placeholder="Email"
            className={`w-full px-5 sm:px-10 py-2 sm:py-3 rounded-full bg-[#DBCAFF] text-sm sm:text-lg text-[#685AAD] placeholder-[#685AAD] ${
              validationErrors.email ? 'border-2 border-red-500' : ''
            } ${session?.user?.email ? 'cursor-not-allowed opacity-75' : ''}`}
            value={email}
            readOnly={!!session?.user?.email}
            onChange={e => {
              if (!session?.user?.email) {
                setEmail(e.target.value);
                clearFieldError('email');
              }
            }}
          />
          {/* Empty space to maintain 2-column layout */}
          <div className="hidden custom-xl:block"></div>
          {/* Topic in the first column */}
          <input
            type="text"
            placeholder="Topic"
            className={`w-full px-5 sm:px-10 py-2 sm:py-3 rounded-full bg-[#DBCAFF] text-sm sm:text-lg text-[#685AAD] placeholder-[#685AAD] ${
              validationErrors.topic ? 'border-2 border-red-500' : ''
            }`}
            value={Topic}
            onChange={e => {
              setTopic(e.target.value);
              clearFieldError('topic');
            }}
          />
        </div>

        <div>
          <h3 className="text-[#534988] text-[20px] sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[35px] custom-xl:text-[45px] font-bold mb-5 sm:mb-10">
            Additional Information
          </h3>
          <textarea
            value={additionalinfo}
            onChange={e => {
              setAdditionalinfo(e.target.value);
              clearFieldError('additionalInfo');
            }}
            placeholder="Type here"
            rows={6}
            className={`w-full rounded-xl p-3 text-sm sm:p-5 font-medium border-2 text-[#BBBBBB] ${
              validationErrors.additionalInfo ? 'border-red-500' : 'border-[#BBBBBB]'
            }`}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-fit mt-7 sm:mt-14 float-right bg-[#8558F9] text-white py-2 sm:py-3 px-12 sm:px-24 text-sm custom-xl:text-2xl rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:bg-[#7047E8] hover:shadow-lg hover:shadow-[#8558F9]/30 hover:scale-105 transform transition-all duration-300 ease-in-out active:scale-95 disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
