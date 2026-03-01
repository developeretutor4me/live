import React, { useState } from 'react';
import FormContainer from './FormContainer';
import { ChevronDown } from 'lucide-react';
import { countriesData, countryStateData } from '@/data/constant';

interface ParentInformationProps {
  title: string;
  onConfirm: (data: ParentFormData) => void;
}

interface ParentFormData {
  country: string;
  stateCity: string;
  streetName: string;
  zipCode: string;
}

const ParentInformation = ({ title, onConfirm }: ParentInformationProps) => {
  const [formData, setFormData] = useState<ParentFormData>({
    country: '',
    stateCity: '',
    streetName: '',
    zipCode: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isStateCityDropdownOpen, setIsStateCityDropdownOpen] = useState(false);
  const [cities, setCities] = useState<string[]>([]);

  const handleInputChange = (field: keyof ParentFormData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }

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
    const requiredFields: (keyof ParentFormData)[] = [
      'country',
      'stateCity',
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

  const getInputClassName = (field: keyof ParentFormData) => {
    return `w-full px-6 py-4 rounded-full text-lg placeholder-[#9085c4] transition-all duration-300 bg-[#DBCAFF] text-[#534988] focus:outline-none ${
      errors[field]
        ? 'border-2 border-red-500'
        : 'border-2 border-transparent focus:border-[#9184F0]'
    }`;
  };

  const getSelectClassName = (field: keyof ParentFormData) => {
    return `w-full px-6 py-4 rounded-full text-lg transition-all duration-300 bg-[#DBCAFF] text-[#534988] focus:outline-none appearance-none cursor-pointer ${
      errors[field]
        ? 'border-2 border-red-500'
        : 'border-2 border-transparent focus:border-[#9184F0]'
    }`;
  };

  const getLabelClassName = (field: keyof ParentFormData) => {
    return `block text-[#9085c4] text-[15px] lg:text-[18px] xl:text-[22px] 2xl:text-[26px] font-medium mb-2 ms-[25px] text-left ${
      errors[field] ? 'text-red-600' : ''
    }`;
  };

  return (
    <FormContainer title={title} titleAlignment="left" maxWidth="max-w-4xl">
      <div className="space-y-8">
        {/* First Row - Country, State/City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <label className={getLabelClassName('country')}>Country</label>
            <div className="relative">
              <div
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className={`${getSelectClassName('country')} flex items-center justify-between cursor-pointer`}
              >
                <span className={formData.country ? 'text-[#534988]' : 'text-[#685AAD]'}>
                  {formData.country || 'select a country'}
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
        </div>

        {/* Second Row - Street Name, Zip Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <label className={getLabelClassName('streetName')}>Street Name</label>
            <input
              type="text"
              placeholder="Bd Enassr"
              value={formData.streetName}
              onChange={e => handleInputChange('streetName', e.target.value)}
              className={getInputClassName('streetName')}
            />
          </div>
          <div>
            <label className={getLabelClassName('zipCode')}>Zip Code</label>
            <input
              type="text"
              placeholder="XXXXXXX"
              value={formData.zipCode}
              onChange={e => handleInputChange('zipCode', e.target.value)}
              className={getInputClassName('zipCode')}
            />
          </div>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center mt-12 pt-4">
          <button
            onClick={handleConfirm}
            className="bg-[#8358F7] text-white px-[100px] py-4 rounded-full text-[20px] lg:text-[24px] xl:text-[30px] 2xl:text-[36px] font-semibold hover:bg-[#6B46C1] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Confirm
          </button>
        </div>
      </div>
    </FormContainer>
  );
};

export default ParentInformation;
