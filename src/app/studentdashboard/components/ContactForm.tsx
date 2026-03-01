import { useToast } from '@/hooks/use-toast';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const SelectTopic = [
  { value: 'Memberships', label: 'Memberships' },
  { value: 'eTutors', label: 'eTutors' },
  { value: 'eTokies', label: 'eTokies' },
  { value: 'Other', label: 'Other' },
];

interface ContactFormprops {
  currentPage: any;
  name: string;
  email: string;
}
const ContactForm = ({ currentPage, name, email }: ContactFormprops) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [Topic, setTopic] = useState('');
  const [additionalinfo, setAdditionalinfo] = useState('');
  const [loading, setLoading] = useState('Submit Request');
  const [isSelectTopicOpen, setisSelectTopicOpen] = useState(false);
  const [selectedTopic, setselectedTopic] = useState('');
  const [isFormSubmitted, setisFormSubmitted] = useState(false);
  const toggleTaxCountryDropdown = () => {
    setisSelectTopicOpen(!isSelectTopicOpen);
  };

  const handleTaxCountryClick = (topic: string) => {
    setselectedTopic(topic);
    if (topic === 'Other') {
      setTopic('');
    } else {
      setTopic(topic);
    }
    setisSelectTopicOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading('Please wait...');

    // const response = await fetch('/api/contact-support/create-ticket', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     userId: session?.user?.id,
    //     topic: Topic,
    //     additionalComments: additionalinfo,
    //   }),
    // });

    const response = await fetch('/api/contact-support/submit-form-to-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: name,
        email: email,
        topic: Topic,
        additionalInformation: additionalinfo,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setLoading('Done!');
      setisFormSubmitted(true);

      toast({
        title: 'Form submitted successfully',
        description: '',
        variant: 'default',
      });

      setTopic('');

      setAdditionalinfo('');
      setLoading('Submit Request');
    } else {
      setLoading('Submit Request');

      toast({
        title: `Error: ${data.message}`,
        description: '',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      {isFormSubmitted ? (
        <div className="h-full flex items-center  justify-center">
          <div className="flex flex-col items-end w-full max-w-[1244px] custom-xl:max-h-[426px] custom-xl:h-full rounded-2xl sm:rounded-3xl custom-xl:rounded-[29.58px]    px-4 sm:px-10 custom-xl:px-16 py-4 sm:py-10 custom-xl:py-[72px] bg-[#EDE8FA]">
            {/* text----- */}
            <div className="w-full">
              <h2 className="text-[#685aad]  text-xl sm:text-2xl custom-xl:text-[56.44px] mt-3 pl-1 font-bold sm:mb-2 custom-xl:mb-9">
                Request Submitted
              </h2>

              <p className="text-xs sm:text-base custom-xl:text-3xl custom-xl:text-[32.48px]  text-[#7669b5] pl-2 mb-2 custom-xl:mb-11 pt-0.5">
                <p className="custom-xl:py-1.5">
                  Thank you for describing your issue in detail! We appreciate your input
                </p>
                <p className="custom-xl:py-1.5">and will get back to you as soon as possible.</p>
              </p>
            </div>
            {/* button-Ticket Box */}
            <div>
              <button
                onClick={e => {
                  e.preventDefault();
                  currentPage('history');
                }}
                className="mt-3.5 mr-0.5  bg-[#8558F9] text-white py-2 sm:py-3 custom-xl:py-[18px] px-7 sm:px-12 custom-xl:px-[87px]  text-sm custom-xl:text-3xl font-medium rounded-full "
              >
                Ticket Inbox
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-full max-w-[1244px] rounded-2xl sm:rounded-3xl custom-xl:rounded-[29.58px]  mx-auto  px-4 sm:px-10 custom-xl:px-16 py-4 sm:py-10 custom-xl:py-16 mt-10 custom-xl:mt-16 bg-[#EDE8FA]">
          <h2 className="text-[#685aad]  text-xl sm:text-2xl custom-xl:text-[56.44px] mt-3 pl-1 font-bold sm:mb-2 custom-xl:mb-8">
            Tell us how we can help you
          </h2>
          <p className="text-xs sm:text-base custom-xl:text-[26.76px] text-[#7669b5] pl-1 mb-2 custom-xl:mb-11">
            Please provide us with more details{' '}
          </p>

          {/* drop down------------------------------------------- */}
          <div className="">
            <span className="text-lg sm:text-xl custom-xl:text-[35.1px] text-[#7669b5] font-medium pl-1 ">
              Select a Topic
            </span>
            <div className="flex items-start justify-between flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-5">
              <div className="w-full max-w-[496.66px] ">
                <div className="relative  select-none  ">
                  <div
                    className="w-full bg-white text-[#958bc6] border-2 border-[#776bb5] font-normal  text-sm custom-lg:text-2xl pr-3 sm:pr-5 custom-xl:pr-10 pl-3 sm:pl-5 custom-xl:pl-9 py-2 custom-xl:py-[15px] rounded-lg cursor-pointer flex justify-between items-center"
                    onClick={toggleTaxCountryDropdown}
                  >
                    <span className="custom-xl:my-1">
                      {selectedTopic.length > 0 ? `${selectedTopic}` : 'select a Topic'}
                    </span>
                    {isSelectTopicOpen ? (
                      <ChevronUp className="text-[#958bc6]   " />
                    ) : (
                      <ChevronDown className="lgtext-[#958bc6]  " />
                    )}
                  </div>

                  {isSelectTopicOpen && (
                    <div
                      onMouseLeave={() => {
                        setisSelectTopicOpen(false);
                      }}
                      className="absolute top-full left-0 right-0 px-8 mt-3 bg-white text-[#685aad] border border-[#776bb5] rounded-lg overflow-hidden z-10 w-[93%] mx-auto py-3  "
                    >
                      <div id="style-2" className="max-h-[12.4rem] overflow-y-scroll  ">
                        {SelectTopic.map(TaxCountry => (
                          <div
                            key={TaxCountry.value}
                            className=" py-2 cursor-pointer flex items-center"
                            onClick={() => handleTaxCountryClick(TaxCountry.value)}
                          >
                            <div className=" border-b-2 border-[#c6c1df] py-2 flex  gap-4  w-full px-4 max-w-[19.6rem] truncate">
                              <span className="ml-2 text-xl  ">{TaxCountry.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedTopic === 'Other' && (
                <input
                  className="w-full max-w-[496.66px] bg-white text-[#958bc6] border-2 border-[#776bb5] font-normal  text-sm custom-lg:text-2xl pr-3 sm:pr-5 custom-xl:pr-10 pl-3 sm:pl-5 custom-xl:pl-9 py-2 custom-xl:py-[19px] rounded-lg cursor-pointer flex justify-between items-center"
                  type="text"
                  placeholder="enter topic"
                  autoFocus
                  value={Topic}
                  onChange={(e: any) => {
                    setTopic(e.target.value);
                  }}
                />
              )}
            </div>
            <style jsx>{`
              #style-2::-webkit-scrollbar-track {
                border-radius: 10px;
                background-color: #d2cee6;
              }

              #style-2::-webkit-scrollbar {
                width: 5px;
                background-color: transparent;
              }

              #style-2::-webkit-scrollbar-thumb {
                border-radius: 10px;

                background-color: #786bb6;
              }
            `}</style>
          </div>

          <form className="mt-5 sm:mt-7 custom-xl:mt-14 pt-0.5 " onSubmit={handleSubmit}>
            <div>
              <h3 className="text-[#7669b5] pl-1 text-lg sm:text-2xl custom-xl:text-[35.1px] font-medium mb-2 sm:mb-7">
                Additional comments
              </h3>

              <div className="flex flex-col  items-end  ">
                <textarea
                  value={additionalinfo}
                  onChange={e => {
                    setAdditionalinfo(e.target.value);
                  }}
                  placeholder="Additional comments"
                  rows={5}
                  className="w-full rounded-xl p-3 text-sm sm:text-xl custom-xl:text-2xl sm:p-5  border-2 border-[#776bb5] text-[#958bc6] placeholder:text-[#958bc6]"
                ></textarea>
                <button
                  type="submit"
                  className="w-fit mt-7 sm:mt-14  bg-[#8558F9] text-white py-2 sm:py-[18px] px-12 sm:px-[67px]  text-sm custom-xl:text-3xl font-medium rounded-full "
                >
                  {loading}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ContactForm;
