import React, { useState } from 'react';
import Header from './Header';
import Image from 'next/image';
import UnitedStates from '../../../../../public/america.png';
import Belgium from '../../../../../public/Belgium.webp';
import Belize from '../../../../../public/Belize.jpg';
import Canada from '../../../../../public/Flag-Canada.webp';
import France from '../../../../../public/Flag-France.webp';
import Malta from '../../../../../public/Flag-Malta.webp';
import BurkinaFaso from '../../../../../public/Flag-of-Burkina-Faso.webp';
import Austria from '../../../../../public/Flag_of_Austria.png';
import Barbados from '../../../../../public/Flag_of_Barbados.svg';
import Germany from '../../../../../public/Flag_of_Germany.svg.webp';
import Jamaica from '../../../../../public/Flag_of_Jamaica.png';
import UnitedKingdom from '../../../../../public/Flag_of_the_United_Kingdom_(1-2).svg.webp';
import Haiti from '../../../../../public/Haiti.png';
import Italy from '../../../../../public/images.png';
import Ireland from '../../../../../public/Irish_Flag__86476.jpg';
import IvoryCoas from '../../../../../public/ivory-coast.webp';
import Liechtenstein from '../../../../../public/liechtenstein.webp';
import Luxembourg from '../../../../../public/Luxembourg.jpeg';
import Monaco from '../../../../../public/Monaco.png';
import SaintLucia from '../../../../../public/Saint Lucia.png';
import Switzerland from '../../../../../public/Switzerland.png';
import dropdown from '../../../../../public/assets/icons/downarrow.svg';
import uparrow from '../../../../../public/assets/icons/uparrow.svg';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactInformationProps {
  contactInformation: any;
  setContactInformation: (data: any) => void;
}

interface CountryCode {
  code: string;
  flag: string;
  name: string;
  id?: string;
}

const countryCodes: CountryCode[] = [
  { code: '+49', flag: Germany, name: 'Germany', id: 'germany' },
  { code: '+44', flag: UnitedKingdom, name: 'United Kingdom', id: 'uk' },
  { code: '+1', flag: UnitedStates, name: 'United States', id: 'us' },
  { code: '+33', flag: France, name: 'France', id: 'france' },
  { code: '+39', flag: Italy, name: 'Italy', id: 'italy' },
  { code: '+353', flag: Ireland, name: 'Ireland', id: 'ireland' },
  { code: '+1', flag: Canada, name: 'Canada', id: 'canada' },
  { code: '+356', flag: Malta, name: 'Malta', id: 'malta' },
  { code: '+501', flag: Belize, name: 'Belize', id: 'belize' },
  { code: '+32', flag: Belgium, name: 'Belgium', id: 'belgium' },
  { code: '+41', flag: Switzerland, name: 'Switzerland', id: 'switzerland' },
  { code: '+352', flag: Luxembourg, name: 'Luxembourg', id: 'luxembourg' },
  { code: '+377', flag: Monaco, name: 'Monaco', id: 'monaco' },
  { code: '+509', flag: Haiti, name: 'Haiti', id: 'haiti' },
  { code: '+43', flag: Austria, name: 'Austria', id: 'austria' },
  { code: '+423', flag: Liechtenstein, name: 'Liechtenstein', id: 'liechtenstein' },
  { code: '+1 876', flag: Jamaica, name: 'Jamaica', id: 'jamaica' },
  { code: '+1 246', flag: Barbados, name: 'Barbados', id: 'barbados' },
  { code: '+1 758', flag: SaintLucia, name: 'Saint Lucia', id: 'saintlucia' },
  { code: '+226', flag: BurkinaFaso, name: 'Burkina Faso', id: 'burkinafaso' },
  { code: '+225', flag: IvoryCoas, name: 'Ivory Coast', id: 'ivorycoast' },
];

const ContactInformation = ({
  contactInformation,
  setContactInformation,
}: ContactInformationProps) => {
  const { toast } = useToast();

  const [editActive, setEditActive] = useState(false);
  const [firstName, setFirstName] = useState(contactInformation.firstName);
  const [lastName, setLastName] = useState(contactInformation.lastName);
  const [email, setEmail] = useState(contactInformation.email);
  const [password, setPassword] = useState(contactInformation.password);
  const [zipCode, setZipCode] = useState(contactInformation.zipCode);
  const [country, setCountry] = useState(contactInformation.country);
  const [phone, setPhone] = useState(contactInformation.phone);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEditToggle = () => {
    if (editActive) {
      setFirstName(contactInformation.firstName);
      setLastName(contactInformation.lastName);
      setEmail(contactInformation.email);
      setPassword(contactInformation.password);
      setZipCode(contactInformation.zipCode);
      setCountry(contactInformation.country);
      setPhone(contactInformation.phone);
    }
    setEditActive(!editActive);
  };

  const handleSave = () => {
    // Validate required fields before saving
    const requiredFields = [];

    if (!firstName?.trim()) {
      requiredFields.push('First Name');
    }

    if (!lastName?.trim()) {
      requiredFields.push('Last Name');
    }

    if (!email?.trim()) {
      requiredFields.push('Email');
    }

    if (!password?.trim()) {
      requiredFields.push('Password');
    }

    if (!phone?.trim()) {
      requiredFields.push('Phone');
    }

    if (!country?.trim()) {
      requiredFields.push('Country');
    }

    if (!zipCode?.trim()) {
      requiredFields.push('ZIP Code');
    }

    // Check if any required fields are missing
    if (requiredFields.length > 0) {
      const missingFieldsText = requiredFields.join(', ');

      toast({
        title: 'Signup Failed',
        description: `Please fill in the following required fields: ${missingFieldsText}`,
        variant: 'destructive',
      });
      return; // Don't save if validation fails
    }

    // If validation passes, save the data
    setEditActive(false);
    setContactInformation({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      country: country,
      zipCode: zipCode,
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCountrySelect = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setIsDropdownOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-[#e6ddff] px-5 custom-xl:px-8 rounded-[30px] mt-12 custom-xl:mt-[70px]">
      <Header
        heading="Contact information"
        editActive={editActive}
        handleEditToggle={handleEditToggle}
        handleSave={handleSave}
      />
      <div className="grid grid-cols-1 custom-lg:grid-cols-2 gap-3 custom-xl:gap-[4.4rem] py-5 custom-xl:py-12 custom-xl:pl-5">
        {!editActive && (
          <>
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-semibold ${!country ? 'text-red-500' : 'text-darkBlue'}`}>
                Selected Country
              </h2>
              <p className="mt-2 sm:mt-5 font-light">{country || 'Not provided'}</p>
            </div>
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-semibold ${!zipCode ? 'text-red-500' : 'text-darkBlue'}`}>
                ZIP Code
              </h2>
              <p className="mt-2 sm:mt-5 font-light">{zipCode || 'Not provided'}</p>
            </div>
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-semibold ${!firstName ? 'text-red-500' : 'text-darkBlue'}`}>
                First Name
              </h2>
              <p className="mt-2 sm:mt-5 font-light">{firstName || 'Not provided'}</p>
            </div>
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-semibold ${!lastName ? 'text-red-500' : 'text-darkBlue'}`}>
                Last Name
              </h2>
              <p className="mt-2 sm:mt-5 font-light">{lastName || 'Not provided'}</p>
            </div>
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-semibold ${!email ? 'text-red-500' : 'text-darkBlue'}`}>
                Email
              </h2>
              <p className="mt-2 sm:mt-5 font-light">{email || 'Not provided'}</p>
            </div>
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-semibold ${!password ? 'text-red-500' : 'text-darkBlue'}`}>
                Password
              </h2>
              <p className="mt-2 sm:mt-5 font-light">{password || 'Not provided'}</p>
            </div>
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-semibold ${!phone ? 'text-red-500' : 'text-darkBlue'}`}>
                Phone
              </h2>
              <p className="mt-2 sm:mt-5 font-light">{phone || 'Not provided'}</p>
            </div>
          </>
        )}
        {editActive && (
          <>
            {/* Country Selection */}
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-normal ${!country ? 'text-red-500' : 'text-darkBlue'}`}>
                Selected Country *
              </h2>
              <div className="mt-2 sm:mt-5">
                <div className="relative custom-2xl:max-w-[36rem] flex justify-center items-center">
                  <div
                    className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-darkBlue text-2xl mb:text-sm"
                    onClick={toggleDropdown}
                  >
                    <button
                      className={`bg-purpleBtn focus:outline-none ${
                        country ? 'text-darkpurple' : 'text-[#AD9DDE]'
                      }`}
                    >
                      {country ? country : 'Select a country'}
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
                      className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-[#DBCAFF] py-4 px-10"
                    >
                      <div id="style-2" className="max-h-[20rem] overflow-y-auto">
                        {countryCodes.map(countryCode => (
                          <div
                            key={countryCode.id}
                            className="flex items-center p-2 text-darkBlue border-b px-5 py-2 text-2xl border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple max-w-[80%]"
                            onClick={() => handleCountrySelect(countryCode.name)}
                          >
                            <Image
                              src={countryCode.flag}
                              alt={countryCode.name}
                              className="w-6 h-4 mr-3"
                            />
                            <span>{countryCode.name}</span>
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
            </div>

            {/* ZIP Code */}
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-normal ${!zipCode ? 'text-red-500' : 'text-darkBlue'}`}>
                ZIP Code *
              </h2>
              <div className="mt-2 sm:mt-5">
                <input
                  type="text"
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                  className={`w-full px-4 py-3 bg-purpleBtn rounded-full text-darkBlue text-lg custom-xl:text-xl border-none outline-none ${
                    !zipCode ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="Enter ZIP Code"
                />
                {!zipCode && <p className="text-red-500 text-sm mt-1 ml-2">ZIP Code is required</p>}
              </div>
            </div>

            {/* First Name */}
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-normal ${!firstName ? 'text-red-500' : 'text-darkBlue'}`}>
                First Name *
              </h2>
              <div className="mt-2 sm:mt-5">
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className={`w-full px-4 py-3 bg-purpleBtn rounded-full text-darkBlue text-lg custom-xl:text-xl border-none outline-none ${
                    !firstName ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="Enter First Name"
                />
                {!firstName && (
                  <p className="text-red-500 text-sm mt-1 ml-2">First Name is required</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-normal ${!email ? 'text-red-500' : 'text-darkBlue'}`}>
                Email *
              </h2>
              <div className="mt-2 sm:mt-5">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 bg-purpleBtn rounded-full text-darkBlue text-lg custom-xl:text-xl border-none outline-none ${
                    !email ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="Enter Email"
                />
                {!email && <p className="text-red-500 text-sm mt-1 ml-2">Email is required</p>}
              </div>
            </div>

            {/* Last Name */}
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-normal ${!lastName ? 'text-red-500' : 'text-darkBlue'}`}>
                Last Name *
              </h2>
              <div className="mt-2 sm:mt-5">
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className={`w-full px-4 py-3 bg-purpleBtn rounded-full text-darkBlue text-lg custom-xl:text-xl border-none outline-none ${
                    !lastName ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="Enter Last Name"
                />
                {!lastName && (
                  <p className="text-red-500 text-sm mt-1 ml-2">Last Name is required</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-normal ${!password ? 'text-red-500' : 'text-darkBlue'}`}>
                Password *
              </h2>
              <div className="mt-2 sm:mt-5">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={`w-full px-4 py-3 pr-12 bg-purpleBtn rounded-full text-darkBlue text-lg custom-xl:text-xl border-none outline-none ${
                      !password ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="Enter Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-darkBlue hover:text-darkpurple transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {!password && (
                  <p className="text-red-500 text-sm mt-1 ml-2">Password is required</p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div className="text-lg custom-xl:text-[27px] text-darkBlue">
              <h2 className={`font-normal ${!phone ? 'text-red-500' : 'text-darkBlue'}`}>
                Phone *
              </h2>
              <div className="mt-2 sm:mt-5">
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className={`w-full px-4 py-3 bg-purpleBtn rounded-full text-darkBlue text-lg custom-xl:text-xl border-none outline-none ${
                    !phone ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="Enter Phone Number"
                />
                {!phone && <p className="text-red-500 text-sm mt-1 ml-2">Phone is required</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactInformation;
