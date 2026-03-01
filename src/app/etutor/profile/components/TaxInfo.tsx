import { Check, ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { countryoptions } from "./Data";
import axios from "axios";
const TaxCountryOptions = countryoptions;
function TaxInfo() {
  const [isTaxCountryDropdownOpen, setIsTaxCountryDropdownOpen] =
    useState(false);
  const [selectedTaxCountrys, setSelectedTaxCountrys] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleTaxCountryDropdown = () => {
    setIsTaxCountryDropdownOpen(!isTaxCountryDropdownOpen);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/tax-country")
      .then((res) => {
        setSelectedTaxCountrys(res.data.taxCountry || "");
      })
      .catch(() => {
        setError("Failed to load tax country");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleTaxCountryClick = async (TaxCountry: string) => {
    setSelectedTaxCountrys(TaxCountry);
    setIsTaxCountryDropdownOpen(false);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/tax-country", {
        taxCountry: TaxCountry,
      });

    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update tax country");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-16 ">
      <div className="bg-[#EDE8FA]  pt-12 pb-16 px-12 rounded-3xl">
        <h1 className="text-xl sm:text-2xl custom-xl:text-4xl text-[#685AAD] font-bold">
          Country of tax residency <span className="text-[#FC7777]"> *</span>
        </h1>

        {/* TaxCountry select */}
        <div className="w-full max-w-[35.5rem] mt-11">
          <div className="relative  select-none mt-2 ">
            <div
              className="w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-5 rounded-lg cursor-pointer flex justify-between items-center"
              onClick={toggleTaxCountryDropdown}
            >
              <span className="my-1">
                {selectedTaxCountrys.length > 0
                  ? `${selectedTaxCountrys}`
                  : "select a Country"}
              </span>
              {isTaxCountryDropdownOpen ? (
                <ChevronUp size={22} className="text-white " />
              ) : (
                <ChevronDown size={22} className="text-white " />
              )}
            </div>

            {isTaxCountryDropdownOpen && (
              <div
                onMouseLeave={() => {
                  setIsTaxCountryDropdownOpen(false);
                }}
                className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  "
              >
                <div
                  id="style-2"
                  className="max-h-[16.4rem] overflow-y-scroll  "
                >
                  {TaxCountryOptions.map((TaxCountry) => (
                    <div
                      key={TaxCountry.value}
                      className=" py-2 cursor-pointer flex items-center"
                      onClick={() => handleTaxCountryClick(TaxCountry.value)}
                    >
                      <div className=" border-b border-white py-2 flex  gap-4  w-full px-4 max-w-[22rem] truncate">
                        <span className="ml-2 text-xl text-white ">
                          {TaxCountry.label}
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
      <div className="bg-[#EDE8FA] mt-16 rounded-3xl py-14 px-12">
        <h1 className="text-xl sm:text-2xl custom-xl:text-4xl text-[#685AAD] font-bold">
          Tax Information
        </h1>
        <div className="mt-16 pt-1">
          <h2 className="text-xl font-semibold text-[#8653FF]">
            Why do we need to collect your tax information?
          </h2>

          <div className="text-xl text-[#685AAD] mt-4">
            <p>
              As a self-employed tutor you are responsible for declaring and
              paying any applicable taxes and duties associated with the
              provision of the services, <br />
              such as income tax, VAT, and social security contributions.
            </p>
            <p className="mt-4">
              According to DAC7, an EU law to simplify tax cooperation between
              EU Member States, digital platform operators like eTutor4me are
              required to <br />
              collect and report information about individuals and business
              entities performing tutoring services via our platform to Austrian
              tax authorities. Data <br />
              will be reported annually to the Austrian tax authorities and
              exchanged automatically with competent tax authorities of other EU
              Member States. <br />
              Please be assured, that as we fulfil these legal obligations, we
              take the utmost care to protect your data in line with applicable
              laws on data protection <br />
              and privacy. For further information, we encourage you to check
              out our FAQs section.
            </p>
            <p className="mt-4">
              Please provide your tax information for EU member country you are
              tax resident,
            </p>
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

export default TaxInfo;
