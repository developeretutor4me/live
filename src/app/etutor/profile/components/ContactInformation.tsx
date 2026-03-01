import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

import { ContactInformationProps } from "./Data";

const ContactInformation: React.FC<ContactInformationProps> = ({
  phone,
  activeTab,
  email,
  streetName,
  setStreetName,
  shippingAddress,
  setShippingAddress,
  city,
  setCity,
  postcode,
  setPostcode,
  selectedCountry,
  isCountryOpen,
  toggleCountryDropdown,
  countryoptions,
  handleCountryClick,
  selectedTimezone,
  isTimezoneOpen,
  toggleTimezoneDropdown,
  timezoneoptions,
  handletimezoneClick,
  isEditing,
}) => {
  return (
    activeTab === "CONTACTINFORMATION" && (
      <div className=" mt-8 sm:px-4">
        <h1 className="text-4xl font-bold text-[#685AAD]">
          Contact information
        </h1>
        <div className="mt-14 flex flex-wrap justify-between gap-8">
          <div className="sm:max-w-[30.9rem] w-full">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
              Phone number <span className="text-[#FC7777]">*</span>
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
              value={phone}
            />
          </div>
          <div className="sm:max-w-[30.9rem] w-full">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
              Email adress <span className="text-[#FC7777]">*</span>
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
              value={email}
              disabled
            />
          </div>
          <div className="sm:max-w-[30.9rem] w-full">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
              Street name <span className="text-[#FC7777]">*</span>
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
              value={streetName}
              onChange={(e) => {
                setStreetName(e.target.value);
              }}
              disabled={!isEditing}
            />
          </div>
          <div className="sm:max-w-[30.9rem] w-full">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
              Shipping address <span className="text-[#FC7777]">*</span>
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
              value={shippingAddress}
              onChange={(e) => {
                setShippingAddress(e.target.value);
              }}
              disabled={!isEditing}
            />
          </div>
          <div className="sm:max-w-[30.9rem] w-full">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
              City/State <span className="text-[#FC7777]">*</span>
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              disabled={!isEditing}
            />
          </div>
          <div className="sm:max-w-[30.9rem] w-full">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
              Post code <span className="text-[#FC7777]">*</span>
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
              value={postcode}
              onChange={(e) => {
                setPostcode(e.target.value);
              }}
              disabled={!isEditing}
            />
          </div>

          <div className="w-full sm:max-w-[30.9rem] mt-4">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] ">
              Country <span className="text-[#FC7777]">*</span>
            </label>
            <div className="relative  select-none mt-2">
              <div
                className={`w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-4 rounded-lg cursor-pointer flex justify-between items-center`}
                onClick={toggleCountryDropdown}
              >
                <span>{selectedCountry || "select Country"}</span>

                {isCountryOpen ? (
                  <ChevronUp size={22} className="text-white" />
                ) : (
                  <ChevronDown size={22} className="text-white" />
                )}
              </div>
              {isCountryOpen && (
                <div className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3 ">
                  <div
                    id="style-2"
                    className="max-h-[16.4rem] overflow-y-scroll  "
                  >
                    {countryoptions.map((country) => (
                      <div
                        key={country.value}
                        className="py-2 cursor-pointer flex items-center"
                        onClick={() => handleCountryClick(country.value)}
                      >
                        <div className=" border-b border-white py-2 flex  gap-4  w-full px-4 sm:max-w-[22rem] truncate">
                          <span className="ml-2 text-xl text-white ">
                            {country.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full sm:max-w-[30.9rem] mt-4">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] ">
              Timezone <span className="text-[#FC7777]">*</span>
            </label>
            <div className="relative  select-none mt-2">
              <div
                className={`w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-4 rounded-lg cursor-pointer flex justify-between items-center`}
                onClick={toggleTimezoneDropdown}
              >
                <span>{selectedTimezone || "select Country"}</span>

                {isTimezoneOpen ? (
                  <ChevronUp size={22} className="text-white" />
                ) : (
                  <ChevronDown size={22} className="text-white" />
                )}
              </div>
              {isTimezoneOpen && (
                <div className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  ">
                  <div
                    id="style-2"
                    className="max-h-[16.4rem] overflow-y-scroll  "
                  >
                    {timezoneoptions.map((time) => (
                      <div
                        key={time.value}
                        className=" py-2 cursor-pointer flex items-center"
                        onClick={() => handletimezoneClick(time.value)}
                      >
                        <div className=" border-b border-white py-2 flex  gap-4  w-full px-4 sm:max-w-[22rem] truncate">
                          <span className="ml-2 text-xl text-white ">
                            {time.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
    )
  );
};

export default ContactInformation;
