import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import searchicon from '../../../../public/whiteSearchIcon.svg';
import { useTickets } from '@/app/admin/hooks/useTickets';
import verticalline from '../../../../public/vertical Line1.svg';
import Chat from './ChatComp';
const options = [
  { value: 'dateAsc', label: 'Date (Oldest First)' },
  { value: 'dateDesc', label: 'Date (Newest First)' },
  { value: 'statusOpen', label: 'Status (Open Tickets)' },
  { value: 'statusInProgress', label: 'Status (In Progress Tickets)' },
];

interface chathistoryprops {
  profilePicture: any;
  name: any;
}
function Chathistory({ profilePicture, name }: chathistoryprops) {
  const { ticket, isLoading, error, mutate } = useTickets();
  const [chatopen, setchatopen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [hover, setHover] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [TicketData, setTicketData] = useState<any>(null);
  const [sortConfig, setSortConfig] = useState({
    key: '',
    direction: 'ascending',
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 1920);
    };

    // Initial check
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const tickets: any = ticket?.success ? ticket.tickets : [];

  const filteredTickets = tickets.filter((ticket: any) => {
    const topic = ticket.topic?.toLowerCase() || '';
    const additionalComments = ticket.additionalComments?.toLowerCase() || '';
    const status = ticket.status?.toLowerCase() || '';
    const id = ticket._id?.toLowerCase() || '';
    const userId = typeof ticket.userId === 'string' ? ticket.userId.toLowerCase() : '';
    const search = searchTerm.toLowerCase();

    return (
      topic.includes(search) ||
      additionalComments.includes(search) ||
      status.includes(search) ||
      id.includes(search) ||
      userId.includes(search)
    );
  });

  // Sort tickets based on sortConfig
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (!sortConfig.key) return 0; // No sorting if key is not set

    if (sortConfig.key.includes('date')) {
      const dateA: any = new Date(a.createdAt || '');
      const dateB: any = new Date(b.createdAt || '');
      return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
    }

    if (sortConfig.key.includes('status')) {
      const statusA = a.status?.toLowerCase() || '';
      const statusB = b.status?.toLowerCase() || '';
      return sortConfig.direction === 'ascending'
        ? statusA.localeCompare(statusB)
        : statusB.localeCompare(statusA);
    }

    return 0;
  });

  // Handle sort selection
  const handleSortChange = (key: any) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key, direction });
  };

  return (
    <div
      className={` overflow-auto scrollbar-none h-screen  mt-10  bg-[#ede8fa] rounded-2xl sm:rounded-3xl custom-xl:rounded-[30px]    ${
        chatopen
          ? 'px-2 sm:px-4   py-2 sm:py-4 custom-xl:px-4 custom-xl:py-[25px]'
          : 'px-4 sm:px-10   py-4 sm:py-10 custom-xl:py-[38px] custom-xl:px-10'
      }  relative`}
    >
      {chatopen ? (
        <Chat ticket={TicketData} name={name} img={profilePicture} />
      ) : (
        <div className="h-full">
          <div className="flex justify-between  items-start custom-xl:items-center  flex-wrap  gap-y-4 ">
            <div className="flex gap-4 items-start custom-xl:items-center ">
              <h1 className="text-xl sm:text-3xl custom-xl:text-[60.34px] text-[#685aad] font-bold custom-xl:pl-8 custom-xl:pt-1 leading-normal">
                Ticket Inbox
              </h1>
            </div>

            <div className="flex  justify-end   gap-2 custom-xl:gap-7  w-fit   flex-col custom-xl:flex-row  ">
              {/* ---------search bar top------- */}
              <div className="relative w-fit  h-fit truncate ">
                <input
                  type="text"
                  placeholder="Search by name, ID, date or status"
                  className=" bg-[#a296cc] text-[#e3dff0] truncate placeholder-[#e3dff0] text-sm custom-xl:text-xl px-5  custom-lg:px-10  py-2 custom-lg:py-4 rounded-md border border-transparent w-full  custom-xl:w-[26.3rem] focus:outline-none focus:ring-0"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <Image
                  loading="lazy"
                  src={searchicon}
                  className="absolute right-2 sm:right-4 custom-xl:right-8 top-1/2 transform -translate-y-1/2 text-[#e3dff0]  w-4 sm:w-5 h-4 sm:h-5 "
                  alt="x"
                />
              </div>

              <div className="relative   h-fit   w-full custom-xl:w-fit ">
                <div
                  className={`bg-[#a296cc] text-[#e3dff0]   pl-5 custom-lg:pl-10 pr-4 custom-lg:pr-8 py-2 custom-lg:py-4 text-sm custom-xl:text-xl transition-all duration-500 rounded-md cursor-pointer select-none   flex items-center justify-between  custom-xl:w-[26.3rem] custom-xl:w-[24.7rem] ${
                    isOpen ? 'border  border-[#a394d6]' : 'border border-transparent'
                  } `}
                  onClick={toggleDropdown}
                >
                  <span className="text-sm custom-xl:text-xl pl-0 ">
                    {options.find(option => option.value === sortConfig.key)?.label || 'Sort by'}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="text-[#d1cbe6]" />
                  ) : (
                    <ChevronDown className="text-[#d1cbe6]" />
                  )}
                </div>

                {isOpen && (
                  <div
                    onMouseLeave={() => {
                      setIsOpen(false);
                    }}
                    className="py-5 max-w-[97%] mx-auto w-full transition-all duration-500  absolute top-full left-0   bg-[#a296cc] border  border-[#a394d6] px-5 text-[#d1cbe6] text-xs sm:text-sm mt-2.5  ml-1.5 rounded-md shadow-lg z-10  h-fit"
                  >
                    <ul id="style-2" className=" overflow-y-auto max-h-[13rem] scrollstyle   ">
                      {options.map(option => (
                        <li
                          onClick={() => handleSortChange(option.value)}
                          key={option.value}
                          className={` first:pb-3 first:pt-0 py-3 cursor-pointer last:border-b-0 border-b border-[#e3dff0]  text-[#e3dff0] text-lg max-w-[14.9rem]   ${
                            selectedOption === option.value ? '' : ''
                          }`}
                        >
                          <span className="pl-1 ">{option.label}</span>
                        </li>
                      ))}
                    </ul>
                    <div></div>
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
                )}
              </div>
            </div>
          </div>

          <section className="h-[80%] rounded-2xl sm:rounded-3xl custom-xl:rounded-[30px] bg-[#a296cc] mt-3 custom-xl:mt-9  leading-none  overflow-hidden  px-2 sm:px-4 custom-xl:px-8 py-3 sm:py-4 custom-xl:py-8">
            {isVisible && (
              <div className="hidden custom-xl:block">
                <ul className=" flex  gap-8  w-full  font-medium text-white text-[22px] pt-1 ">
                  <li className="w-full max-w-[1%]  "></li>
                  <li className="w-full max-w-[20.4rem]  border-r">Topic</li>
                  <li className="w-full max-w-[17.1rem] border-r pl-3">Date</li>
                  <li className="w-full max-w-[14.7rem] border-r pl-3 ">Assigned assistant </li>
                  <li className="w-full max-w-[13.3rem] pl-3.5 hidden custom-xl:block">Status</li>
                </ul>
              </div>
            )}

            <div
              id="style-3"
              className=" items flex flex-col gap-2 sm:gap-3 custom-xl:gap-5 custom-xl:mt-7 overflow-y-scroll h-[95%] pr-2 custom-xl:pr-10    "
            >
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-white text-lg">Loading your support tickets...</div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-white text-lg">Error: {error.message}</div>
                </div>
              ) : sortedTickets.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-white text-lg">No support tickets found</div>
                </div>
              ) : (
                sortedTickets.map((ticket: any, index: any) => (
                  <div
                    key={ticket._id}
                    className={`bg-[#685aad]  w-full rounded-md sm:rounded-xl  custom-lg:rounded-3xl transition-all transform duration-500  ${
                      hover === ticket._id
                        ? 'h-fit  hover:cursor-pointer'
                        : 'h-[60px] sm:h-[97px] overflow-hidden'
                    } `}
                  >
                    <div className="h-[60px] sm:h-[97px] w-full rounded-md sm:rounded-xl  custom-lg:rounded-3xl flex items-center justify-between custom-xl:justify-normal  gap-2 custom-xl:gap-8 px-4 custom-lg:px-[43px] ">
                      {/* topic */}
                      <div
                        onClick={() => {
                          setchatopen(true);
                          setTicketData(ticket);
                        }}
                        className="w-full hover:cursor-pointer custom-xl:max-w-[20.47rem]  flex justify-between items-center  sm:border-r custom-xl:border-r-0 truncate"
                      >
                        <h1 className="text-white  text-sm sm:text-base md:text-xl custom-lg:text-2xl custom-xl:text-[24.94px] font-medium">
                          {ticket.topic}
                        </h1>
                        <Image src={verticalline} alt="" className="hidden custom-xl:block" />
                      </div>
                      {/* date */}
                      <div className="w-full max-w-[17.1rem] sm:flex justify-between items-center pl-3  truncate hidden custom-xl:border-r custom-xl:border-r-0 ">
                        <h1 className="text-white  text-sm sm:text-base md:text-xl custom-lg:text-2xl custom-xl:text-[24px] font-medium truncate">
                          {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                            weekday: 'short',
                          }) +
                            ' / ' +
                            new Date(ticket.createdAt).toLocaleDateString('en-GB', {
                              day: '2-digit',
                            }) +
                            ' - ' +
                            new Date(ticket.createdAt)
                              .toLocaleDateString('en-GB', { month: 'short' })
                              .toLowerCase() +
                            ' - ' +
                            new Date(ticket.createdAt).getFullYear()}
                        </h1>
                        <Image src={verticalline} alt="" className="hidden custom-xl:block" />
                      </div>

                      {/* assigned assistant */}
                      <div className="w-full custom-xl:max-w-[14.8rem] custom-xl:flex justify-between items-center  custom-xl:pl-3   truncate hidden ">
                        <div>
                          <h1 className=" text-white  text-sm sm:text-base md:text-xl custom-lg:text-2xl custom-xl:text-[24px] font-bold">
                            Lawrence
                          </h1>
                          <span className="text-[15px] text-[#a198cc]">Assistant</span>
                        </div>
                        <Image src={verticalline} alt="" />
                      </div>

                      <div className="w-full custom-xl:max-w-[13.3rem]  pl-3.5  truncate hidden custom-xl:flex gap-4 items-center">
                        <div
                          className={`${
                            ticket.status === 'active'
                              ? 'bg-[#00dae5]'
                              : ticket.status === 'awaiting'
                                ? 'bg-[#fc7777]'
                                : ticket.status === 'resolved'
                                  ? 'bg-[#8653FF]'
                                  : ticket.status === 'closed'
                                    ? 'bg-[#5553C4]'
                                    : ticket.status === 'escalated'
                                      ? 'bg-[#8653FF]'
                                      : 'bg-white'
                          } h-[32px] w-[32px] rounded-lg`}
                        >
                          &nbsp;
                        </div>
                        <h1 className="text-white  text-sm sm:text-base md:text-xl custom-lg:text-2xl custom-xl:text-[25.95px] font-medium capitalize">
                          {ticket.status}
                        </h1>
                      </div>

                      <div className="block custom-xl:hidden text-white">
                        <button
                          onClick={() => {
                            setHover(prevHover => (prevHover === ticket._id ? null : ticket._id));
                          }}
                        >
                          {hover === ticket._id ? <ChevronUp /> : <ChevronDown />}
                        </button>
                      </div>
                    </div>

                    <div className="w-[73%] mt-2.5 mx-auto   border-t border-white "></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 md:gap-y-4 md:grid-cols-3  w-[85%] mx-auto my-3 custom-xl:hidden">
                      <div className="">
                        <span className="font-medium text-white text-xs sm:text-sm custom-xl:text-base ">
                          Topic: <br />
                        </span>
                        <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                          {ticket.topic}
                        </h1>
                      </div>

                      <div className="">
                        <span className="font-medium text-white text-xs sm:text-sm custom-xl:text-base ">
                          Status: <br />
                        </span>
                        <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                          {ticket.status}
                        </h1>
                      </div>
                      <div className="">
                        <span className="font-medium text-white text-xs sm:text-sm custom-xl:text-base ">
                          Created At: <br />
                        </span>
                        <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                          {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                            weekday: 'short',
                          }) +
                            ' / ' +
                            new Date(ticket.createdAt).toLocaleDateString('en-GB', {
                              day: '2-digit',
                            }) +
                            ' - ' +
                            new Date(ticket.createdAt)
                              .toLocaleDateString('en-GB', { month: 'short' })
                              .toLowerCase() +
                            ' - ' +
                            new Date(ticket.createdAt).getFullYear()}
                        </h1>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <style jsx>{`
                #style-3::-webkit-scrollbar-track {
                  border-radius: 10px;
                  background-color: #d2cceb;
                }

                #style-3::-webkit-scrollbar {
                  width: 8px;
                  background-color: transparent;
                }

                #style-3::-webkit-scrollbar-thumb {
                  border-radius: 10px;
                  background-color: #685aad;
                }
                @media screen and (max-width: 640px) {
                  #style-3::-webkit-scrollbar {
                    width: 3px;
                    background-color: transparent;
                  }
                }
              `}</style>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Chathistory;
