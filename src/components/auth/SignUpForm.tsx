import FormContainer from '@/components/auth/FormContainer';
import { countryData, CountryData } from '@/utils/countryData';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import Google from '../../../public/assets/icons/googleicon.svg';

export interface StudentDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  country: string;
  stateCity: string;
  institution: string;
  streetName: string;
  zipCode: string;
  phoneNumber: string;
}

interface SignUpFormProps {
  handleGoogleSignIn: () => void;
  signUpFormSubmitHandler: () => void;
  personalDetailsIsConfirmed: any;
  setPersonalDetailsIsConfirmed: any;
  loading?: boolean;
  selectedCountryForPhone: CountryData;
  setselectedCountryForPhone: (code: CountryData) => void;
}



const SignUpForm = ({
  handleGoogleSignIn,
  signUpFormSubmitHandler,
  personalDetailsIsConfirmed,
  setPersonalDetailsIsConfirmed,
  loading = false,
  selectedCountryForPhone,
  setselectedCountryForPhone,
}: SignUpFormProps) => {
  const [error, seterror] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/\d/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return null;
  };

  const validateFormFields = (): string | null => {
    if (!personalDetailsIsConfirmed.firstName?.trim()) {
      return 'First Name is required';
    }
    if (!personalDetailsIsConfirmed.lastName?.trim()) {
      return 'Last Name is required';
    }
    if (!personalDetailsIsConfirmed.email?.trim()) {
      return 'Email is required';
    }

    const emailError = validateEmail(personalDetailsIsConfirmed.email?.trim());
    if (emailError) {
      return emailError;
    }

    if (!personalDetailsIsConfirmed.password?.trim()) {
      return 'Password is required';
    }

    const passwordError = validatePassword(personalDetailsIsConfirmed.password?.trim());
    if (passwordError) {
      return passwordError;
    }

    if (!personalDetailsIsConfirmed.phoneNumber?.trim()) {
      return 'Phone Number is required';
    }

    return null;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Prevent double submission if already loading
    if (loading) {
      return;
    }

    const validationError = validateFormFields();
    if (validationError) {
      seterror(validationError);
      return;
    }

    signUpFormSubmitHandler();
  };

  const onSignUpFormChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPersonalDetailsIsConfirmed({
      ...personalDetailsIsConfirmed,
      [name]: value,
    });

    if (name === 'phoneNumber') {
      // Auto-detect country code
      const matchedCountry = countryData.find((country) =>
        value.startsWith(country.dial_code)
      );

      if (matchedCountry) {
        setselectedCountryForPhone(matchedCountry);
      }
    }

    // Clear error when user starts typing
    if (error) {
      seterror('');
    }
  };

  return (
    <FormContainer title="Sign Up" maxWidth="max-w-2xl" titleAlignment="left">
      <p className="text-lightpurple mt-[-65px] text-[16px] lg:text-[20px] xl:text-[25px] 2xl:text-[30px]">
        As a Student
      </p>

      <div
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center px-6 py-3 sm:py-[12px] gap-3 text-darkBlue cursor-pointer rounded-full bg-transparent border-[#534988]/80 border-2  mt-6 text-[16px] md:text-[20px] lg:text-[26.82px] xl:text-[26.82px] 2xl:text-[26.82px]"
      >
        <Image loading="lazy" src={Google} alt="google" className="w-[28.93px] h-[28.93px]" />
        Continue with Google
      </div>

      <div className="flex items-center justify-center w-full gap-3 py-5 px-3">
        <div className="flex-1 h-px bg-[#9B85C8]"></div>
        <span className="text-darkBlue px-2">or</span>
        <div className="flex-1 h-px bg-[#9B85C8]"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-col sm:flex-row gap-5 mb:gap-3 mt-0.5">
          <div className="rounded-full bg-purpleBtn px-6 py-[17px] flex items-center w-full ">
            <input
              type="text"
              className="placeholder-[#b7a8df] w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue"
              placeholder="First Name"
              name="firstName"
              value={personalDetailsIsConfirmed.firstName || ''}
              onChange={onSignUpFormChangeHandler}
            />
          </div>
          <div className="rounded-full bg-purpleBtn px-6 py-[17px] flex items-center w-full ">
            <input
              type="text"
              className="placeholder-[#b7a8df] w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue"
              placeholder="Last Name"
              name="lastName"
              value={personalDetailsIsConfirmed.lastName || ''}
              onChange={onSignUpFormChangeHandler}
            />
          </div>
        </div>

        <div className="rounded-full bg-purpleBtn px-6 py-[17px] flex items-center w-full mt-3 sm:mt-5">
          <input
            type="email"
            className="placeholder-[#b7a8df] w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue"
            placeholder="Email"
            name="email"
            value={personalDetailsIsConfirmed.email || ''}
            onChange={onSignUpFormChangeHandler}
          />
        </div>

        <div className="rounded-full bg-purpleBtn px-6 py-[17px] flex items-center w-full mt-3 sm:mt-5">
          <input
            type={showPassword ? 'text' : 'password'}
            className="placeholder-[#b7a8df] w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue"
            placeholder="Password"
            name="password"
            value={personalDetailsIsConfirmed.password || ''}
            onChange={onSignUpFormChangeHandler}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-[#473171]" />
            ) : (
              <Eye className="w-5 h-5 text-[#473171]" />
            )}
          </button>
        </div>

        <div className=" text-darkBlue bg-[#DBCAFF] rounded-full mt-3 sm:mt-5">
          <div className="relative">
            <div className="rounded-full bg-purpleBtn px-6 py-2.5 custom-lg:py-[17px] flex items-center w-full">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center   custom-2xl:pr-3 min-w-fit"
              >
                <div className="flex items-center gap-2 custom-2xl:gap-4  ">
                  <span className="">
                    <Image
                      loading="lazy"
                      src={`https://flagcdn.com/w40/${(selectedCountryForPhone?.code || countryData[0]?.code || 'us').toLowerCase()}.png`}
                      alt=""
                      width={32}
                      height={32}
                      className="w-4 sm:w-8 h-4 sm:h-8 rounded-full"
                    />
                  </span>
                  <span className="text-[#685AAD] text-lg custom-2xl:text-xl">
                    {selectedCountryForPhone?.dial_code || countryData[0]?.dial_code}
                  </span>
                </div>

                <ChevronDown
                  className={` ${showDropdown && 'transform rotate-180'}  ml-5 w-3 custom-lg:w-5 h-3 custom-lg:h-5 text-[#685aad5e] font-bold`}
                />
              </button>
              <input
                type="tel"
                value={personalDetailsIsConfirmed.phoneNumber || ''}
                onChange={onSignUpFormChangeHandler}
                name="phoneNumber"
                className="bg-transparent ml-6 w-full outline-none mb:text-xs text-xl text-darkBlue bg-[#DBCAFF] placeholder-[#b7a8df] font-medium truncate"
                placeholder="Phone number"
              />
            </div>

            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-[#DBCAFF] rounded-3xl shadow-lg py-2  max-h-[12.5rem] px-3 overflow-y-auto scrollbar-none">
                {countryData.map((country, index) => (
                  <button
                    type="button"
                    key={`${country.code}-${country.name}-${index}`}
                    onClick={() => {
                      setselectedCountryForPhone(country);
                      setShowDropdown(false);
                    }}
                    className="flex items-center space-x-3 w-full p-3 hover:bg-purple-50 transition-colors border-b border-[#0000004b] last:border-b-0  "
                  >
                    <span className="rounded-full relative  flex items-center justify-center">
                      <Image
                        loading="lazy"
                        src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                        alt=""
                        width={32}
                        height={32}
                        className="w-6 h-6 rounded-full"
                      />
                    </span>
                    <span className="text-[#685AAD]">{country.dial_code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-3 p-3 border border-red-400 text-red-700 rounded-lg">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`bg-[#8358F7] text-white px-16 py-2 rounded-full text-[20px] lg:text-[24px] xl:text-[30px] 2xl:text-[36px] font-semibold transition-all duration-300 shadow-lg hover:shadow-xl mt-10 w-full flex items-center justify-center gap-2 ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#6B46C1]'
            }`}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
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
          )}
          {loading ? 'Creating Account...' : 'Continue'}
        </button>
      </form>

      <p className="text-darkBlue text-xs custom-xl:text-base mt-4">
        By clicking “Continue with Google / Email“ you agree to our User
      </p>
      <span className="text-[#8653FF] underline text-xs custom-xl:text-base">
        Terms of Service and Privacy Policy
      </span>
    </FormContainer>
  );
};

export default SignUpForm;
