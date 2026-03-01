import React, { useState } from 'react';
import FormContainer from '@/components/auth/FormContainer';
import { ChevronDown } from 'lucide-react';
import { countriesData, countryStateData } from '@/data/constant';

interface PersonalDetailsFormProps {
  onConfirm: (data: StudentFormData) => void;
  title: string;
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  age: string;
  country: string;
  stateCity: string;
  institution: string;
  streetName: string;
  zipCode: string;
}

const PersonalDetailsForm = ({ onConfirm, title }: PersonalDetailsFormProps) => {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    age: '',
    country: '',
    stateCity: '',
    institution: '',
    streetName: '',
    zipCode: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isStateCityDropdownOpen, setIsStateCityDropdownOpen] = useState(false);
  const [cities, setCities] = useState<string[]>([]);

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }

    // Clear state/city when country changes
    if (field === 'country' && formData.stateCity) {
      setFormData({ ...updatedData, stateCity: '' });
    }
  };

  const handleCountrySelect = (country: string) => {
    handleInputChange('country', country);
    setIsCountryDropdownOpen(false);

    if (formData.stateCity) {
      setFormData(prev => ({ ...prev, stateCity: '' }));
    }

    setCities(countryStateData[country] || []);
  };

  const handleStateCitySelect = (stateCity: string) => {
    handleInputChange('stateCity', stateCity);
    setIsStateCityDropdownOpen(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    const requiredFields: (keyof StudentFormData)[] = [
      'firstName',
      'lastName',
      'age',
      'country',
      'stateCity',
      'institution',
      'streetName',
      'zipCode',
    ];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      onConfirm(formData);
    }
  };

  const getInputClassName = (field: keyof StudentFormData) => {
    return `w-full px-6 py-4 rounded-full text-lg placeholder-[#9085c4] transition-all duration-300 bg-[#DBCAFF] text-[#534988] focus:outline-none ${
      errors[field]
        ? 'border-2 border-red-500'
        : 'border-2 border-transparent focus:border-[#9184F0]'
    }`;
  };

  const getSelectClassName = (field: keyof StudentFormData) => {
    return `w-full px-6 py-4 rounded-full text-lg transition-all duration-300 bg-[#DBCAFF] text-[#534988] focus:outline-none appearance-none cursor-pointer ${
      errors[field]
        ? 'border-2 border-red-500'
        : 'border-2 border-transparent focus:border-[#9184F0]'
    }`;
  };

  const getLabelClassName = (field: keyof StudentFormData) => {
    return `block text-[#9085c4] text-[15px] lg:text-[18px] xl:text-[22px] 2xl:text-[26px] font-medium mb-2 ms-[15px] text-left ${
      errors[field] ? 'text-red-600' : ''
    }`;
  };

  return (
    <FormContainer title={title} maxWidth="max-w-7xl" titleAlignment="left">
      <div className="space-y-8">
        {/* First Row - First Name, Last Name, Age */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div>
            <label className={getLabelClassName('firstName')}>First Name</label>
            <input
              type="text"
              placeholder="enter first name"
              value={formData.firstName}
              onChange={e => handleInputChange('firstName', e.target.value)}
              className={getInputClassName('firstName')}
            />
          </div>
          <div>
            <label className={getLabelClassName('lastName')}>Last Name</label>
            <input
              type="text"
              placeholder="enter last name"
              value={formData.lastName}
              onChange={e => handleInputChange('lastName', e.target.value)}
              className={getInputClassName('lastName')}
            />
          </div>
          <div>
            <label className={getLabelClassName('age')}>Age</label>
            <input
              type="number"
              placeholder="enter age"
              value={formData.age}
              onChange={e => handleInputChange('age', e.target.value)}
              className={getInputClassName('age')}
            />
          </div>
        </div>

        {/* Second Row - Country, State/City, Institution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div>
            <label className={getLabelClassName('country')}>Country</label>
            <div className="relative">
              <div
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className={`${getSelectClassName('country')} flex items-center justify-between cursor-pointer`}
              >
                <span className={formData.country ? 'text-[#534988]' : 'text-[#685AAD]'}>
                  {formData.country || 'Select a Country'}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#534988] transition-transform duration-200 ${
                    isCountryDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
              {isCountryDropdownOpen && (
                <div
                  onMouseLeave={() => setIsCountryDropdownOpen(false)}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 py-4"
                >
                  <div className="max-h-64 overflow-y-auto">
                    {countriesData.map((country, index) => (
                      <div
                        key={index}
                        className="cursor-pointer flex items-center"
                        onClick={() => handleCountrySelect(country)}
                      >
                        <div className="border-b border-[#a394d682] py-3 flex items-center w-full px-4 hover:bg-[#a394d682] transition-colors duration-200">
                          <span className="text-lg text-[#6C5BAA]">{country}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className={getLabelClassName('stateCity')}>State / City</label>
            <div className="relative">
              <div
                onClick={() =>
                  formData.country && setIsStateCityDropdownOpen(!isStateCityDropdownOpen)
                }
                className={`${getSelectClassName('stateCity')} flex items-center justify-between ${
                  !formData.country ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <span className={formData.stateCity ? 'text-[#534988]' : 'text-[#685AAD]'}>
                  {formData.stateCity || 'select a state / city'}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    !formData.country ? 'text-gray-400' : 'text-[#534988]'
                  } ${isStateCityDropdownOpen ? 'rotate-180' : ''}`}
                />
              </div>
              {isStateCityDropdownOpen && formData.country && (
                <div
                  onMouseLeave={() => setIsStateCityDropdownOpen(false)}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 py-4"
                >
                  <div className="max-h-64 overflow-y-auto">
                    {cities.map((city, index) => (
                      <div
                        key={index}
                        className="cursor-pointer flex items-center"
                        onClick={() => handleStateCitySelect(city)}
                      >
                        <div className="border-b border-[#a394d682] py-3 flex items-center w-full px-4 hover:bg-[#a394d682] transition-colors duration-200">
                          <span className="text-lg text-[#6C5BAA]">{city}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className={getLabelClassName('institution')}>Institution</label>
            <input
              type="text"
              placeholder="enter institution name"
              value={formData.institution}
              onChange={e => handleInputChange('institution', e.target.value)}
              className={getInputClassName('institution')}
            />
          </div>
        </div>

        {/* Third Row - Street Name, Zip Code */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div>
            <label className={getLabelClassName('streetName')}>Street Name</label>
            <input
              type="text"
              placeholder="enter street name"
              value={formData.streetName}
              onChange={e => handleInputChange('streetName', e.target.value)}
              className={getInputClassName('streetName')}
            />
          </div>
          <div>
            <label className={getLabelClassName('zipCode')}>Zip Code</label>
            <input
              type="text"
              placeholder="enter zip code"
              value={formData.zipCode}
              onChange={e => handleInputChange('zipCode', e.target.value)}
              className={getInputClassName('zipCode')}
            />
          </div>
          <div>{/* Empty space for potential third field */}</div>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-end mt-12 pt-4">
          <button
            onClick={handleConfirm}
            className="bg-[#9184F0] text-white px-[100px] py-2 rounded-full text-[20px] lg:text-[24px] xl:text-[30px] 2xl:text-[36px] font-medium hover:bg-[#7A6BD9] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Confirm
          </button>
        </div>
      </div>
    </FormContainer>
  );
};

export default PersonalDetailsForm;
