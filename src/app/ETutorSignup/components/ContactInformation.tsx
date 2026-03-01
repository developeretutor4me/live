import React, { useState } from 'react';
import FormHeading from './FormHeading';
import InputHeading from './InputHeading';
import { countryData, CountryData } from '@/utils/countryData';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import dropdown from '../../../../public/assets/icons/downarrow.svg';
import uparrow from '../../../../public/assets/icons/uparrow.svg';

interface ContactInformationProps {
  setContactInformation: (data: any) => void;
  setCurrentStep: (step: number) => void;
  currentStep: number;
}

const ContactInformation = ({
  setContactInformation,
  setCurrentStep,
  currentStep,
}: ContactInformationProps) => {
  const [country, setCountry] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [Zip, setZip] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const [selectedCountryForPhone, setSelectedCountryForPhone] = useState(countryData[0]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCountrySelect = (selectedCountry: any) => {
    setCountry(selectedCountry);
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    setContactInformation({
      country,
      firstName: firstname,
      lastName: lastname,
      email,
      password,
      zipCode: Zip,
      phone: `(${selectedCountryForPhone.dial_code}) ${phoneNumber}`,
    });
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="bg-[#EDE8FA] px-4 py-6 sm:px-8 sm:py-8 md:px-12  md:py-10 custom-lg:px-16 custom-lg:py-12 custom-xl:px-[69px] custom-xl:py-12 rounded-[30px]">
      <FormHeading
        className=""
        heading="Contact Information"
        paragraph="Thank you for your interest in becoming an etutor! Complete this application and take the next step  toward empowering learners."
      />
      <form className="pt-4 flex flex-col gap-3 custom-xl:gap-10" action="">
        <div>
          <InputHeading text="Select a Country" />
          <div className="relative max-w-[32rem] custom-2xl:max-w-[34rem] flex justify-center items-center">
            <div
              className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-darkBlue text-2xl mb:text-sm"
              onClick={toggleDropdown}
            >
              <button
                className={`bg-purpleBtn focus:outline-none  ${
                  country ? 'text-darkpurple' : 'text-[#AD9DDE]'
                }`}
              >
                {country ? country : 'Select a country'} {/* Show selected country */}
              </button>
              {isDropdownOpen ? (
                <Image loading="lazy" src={uparrow} alt="dropdown" />
              ) : (
                <Image loading="lazy" src={dropdown} alt="uparrow" />
              )}
            </div>

            {isDropdownOpen && (
              <div
                onMouseLeave={() => {
                  setIsDropdownOpen(false);
                }}
                className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-[#DBCAFF] py-4 px-10 "
              >
                <div id="style-2" className=" max-h-[20rem] overflow-y-auto">
                  {countryData.map(subject => (
                    <div
                      key={subject.name}
                      className="flex items-center p-2 text-darkBlue border-b px-5 py-2 text-2xl border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple max-w-[80%] "
                      onClick={() => handleCountrySelect(subject.name)} // Handle country selection
                    >
                      <span>{subject.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

              background-color: #8f81c7;
            }
          `}</style>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 custom-xl:gap-6">
          <div className="">
            <InputHeading text="First Name" />
            <div className="rounded-full bg-purpleBtn px-10 py-4 ">
              <input
                type="text"
                className="placeholder-darkpurple text-2xl text-[#685AAD]  placeholder:text-[#AD9DDE] w-full bg-transparent outline-none mb:text-xs"
                placeholder="First Name"
                value={firstname}
                onChange={e => {
                  setFirstname(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="">
            <InputHeading text="Last Name" />
            <div className="rounded-full bg-purpleBtn px-10 py-4 ">
              <input
                type="text"
                className="placeholder-darkpurple  text-2xl text-[#685AAD] placeholder:text-[#AD9DDE]  w-full bg-transparent outline-none mb:text-xs"
                placeholder="Last Name"
                value={lastname}
                onChange={e => {
                  setLastname(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="">
            <InputHeading text="Email" />
            <div className="rounded-full bg-purpleBtn px-10 py-4 ">
              <input
                type="email"
                required
                className="placeholder-darkpurple text-2xl text-[#685AAD]  placeholder:text-[#AD9DDE] w-full bg-transparent outline-none mb:text-xs"
                placeholder="Email"
                value={email}
                onChange={e => {
                  setemail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="">
            <InputHeading text="Password" />
            <div className="rounded-full bg-purpleBtn px-10 py-4 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="placeholder-darkpurple text-2xl text-[#685AAD] placeholder:text-[#AD9DDE] w-full bg-transparent outline-none mb:text-xs pr-12"
                placeholder="*********"
                value={password}
                onChange={e => {
                  setpassword(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#685AAD] hover:text-[#AD9DDE] transition-colors"
              >
                {showPassword ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.45703 12C3.73128 7.94291 7.52159 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C20.2672 16.0571 16.4769 19 11.9992 19C7.52159 19 3.73128 16.0571 2.45703 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.9992 15C13.6561 15 14.9992 13.6569 14.9992 12C14.9992 10.3431 13.6561 9 11.9992 9C10.3424 9 8.99923 10.3431 8.99923 12C8.99923 13.6569 10.3424 15 11.9992 15Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 custom-xl:gap-6">
          <div className="">
            <InputHeading text="Phone Number" />
            <div className="text-darkBlue bg-[#DBCAFF] rounded-full">
              <div className="relative">
                <div className="rounded-full bg-purpleBtn px-6 py-2.5 custom-lg:py-4 flex items-center w-full">
                  <button
                    type="button"
                    onClick={() => setShowPhoneDropdown(!showPhoneDropdown)}
                    className="flex items-center custom-2xl:pr-3 min-w-fit"
                  >
                    <div className="flex items-center gap-2 custom-2xl:gap-4">
                      <span className="">
                        <Image
                          loading="lazy"
                          src={`https://flagcdn.com/w40/${selectedCountryForPhone.code.toLowerCase()}.png`}
                          alt=""
                          width={32}
                          height={32}
                          className="w-4 sm:w-8 h-4 sm:h-8 rounded-full"
                        />
                      </span>
                      <span className="text-[#685AAD] text-lg custom-2xl:text-xl">
                        {selectedCountryForPhone.dial_code}
                      </span>
                    </div>
                    <ChevronDown
                      className={`${showPhoneDropdown && 'transform rotate-180'} ml-5 w-3 custom-lg:w-5 h-3 custom-lg:h-5 text-[#685aad5e] font-bold`}
                    />
                  </button>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={e => {
                      setPhoneNumber(e.target.value);
                      const matchedCountry = countryData.find(country =>
                        e.target.value.startsWith(country.dial_code)
                      );
                      if (matchedCountry) {
                        setSelectedCountryForPhone(matchedCountry);
                      }
                    }}
                    name="phoneNumber"
                    className="bg-transparent ml-6 w-full outline-none mb:text-xs text-xl text-darkBlue bg-[#DBCAFF] placeholder-darkBlue font-medium truncate"
                    placeholder="Phone number"
                  />
                </div>

                {showPhoneDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-44 bg-[#DBCAFF] rounded-3xl shadow-lg py-2 max-h-[12.5rem] px-3 overflow-y-auto scrollbar-none z-50">
                    {countryData.map((country, index) => (
                      <button
                        type="button"
                        key={`country-${country.code}-${index}`}
                        onClick={() => {
                          setSelectedCountryForPhone(country);
                          setShowPhoneDropdown(false);
                        }}
                        className="flex items-center space-x-3 w-full p-3 hover:bg-purple-50 transition-colors border-b border-[#0000004b] last:border-b-0"
                      >
                        <span className="rounded-full relative flex items-center justify-center">
                          <Image
                            loading="lazy"
                            src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                            width={32}
                            height={32}
                            alt=""
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
          </div>

          <div className="">
            <InputHeading text="Zip Code" />
            <div className="rounded-full bg-purpleBtn px-10 py-4 ">
              <input
                type="text"
                className="placeholder-darkpurple text-2xl text-[#685AAD]  placeholder:text-[#AD9DDE] w-full bg-transparent outline-none mb:text-xs"
                placeholder="Zip Code"
                value={Zip}
                onChange={e => {
                  setZip(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            disabled={
              !country || !firstname || !lastname || !email || !password || !Zip || !phoneNumber
            }
            className={`
              w-full md:w-1/2 py-4 px-8 rounded-full text-[22px] xl:text-[27px] 2xl:text-[30px] font-semibold text-white transition-all duration-300
              ${
                country && firstname && lastname && email && password && Zip && phoneNumber
                  ? 'bg-[#9184F0] hover:bg-[#7A6BD9] cursor-pointer shadow-lg hover:shadow-xl'
                  : 'bg-gray-400 cursor-not-allowed opacity-50'
              }
            `}
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactInformation;
