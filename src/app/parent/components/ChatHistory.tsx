import React, { useState, useEffect } from 'react';
import messageicon from '../../../../public/whitemessageicon.svg';
import Image from 'next/image';
import { useTickets } from '@/app/admin/hooks/useTickets';
import Chat from './ChatComp';
import { useSession } from 'next-auth/react';

interface TicketData {
  _id: string;
  topic: string;
  status: 'active' | 'awaiting' | 'resolved' | 'closed' | 'escalated';
  createdAt: string;
  updatedAt: string;
  adminAssistantName?: string;
  assignedTo?: string;
}

const ChatHistory = ({ profilePicture, name }: any) => {
  const { ticket, isLoading, error } = useTickets();
  const [chatopen, setchatopen] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options).toUpperCase().replace(/,/g, ' /');
  };

  const tickets: any = ticket?.success ? ticket.tickets : [];

  return (
    <div
      className={`overflow-hidden h-full bg-[#ede8fa] rounded-2xl sm:rounded-3xl custom-xl:rounded-[30px] ${
        chatopen ? 'px-2 sm:px-4 py-2 sm:py-4 custom-xl:px-4 custom-xl:py-[25px]' : ''
      } relative`}
    >
      {chatopen ? (
        <Chat activeTicket={ticketData} tickects={tickets} name={name} img={profilePicture} />
      ) : (
        <div className="w-full h-full">
          <h2 className="text-[#534988] text-[25px] sm:text-[25px] md:text-[30px] lg:text-[35px] xl:text-[45px] custom-xl:text-[60.34px] font-bold mb-4 ms-5">
            Chat History
          </h2>
          <div className="bg-[#A296CC] rounded-3xl px-4 sm:px-8 py-4 sm:py-8 flex-1 w-full flex gap-5 flex-col overflow-hidden">
            <div className="flex justify-between w-[85%] font-medium text-[#FFFFFF] text-[16px] md:text-[22px] pl-11 ">
              <span>Topic</span>
              <span className="pl-8">Date</span>
              <span>Assigned assistant</span>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40] scrollbar-thumb-rounded-3xl">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-white text-lg">Loading your support tickets...</div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-white text-lg">Error: {error.message}</div>
                </div>
              ) : tickets.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-white text-lg">No support tickets found</div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {tickets.map((ticketItem: TicketData, index: number) => (
                    <div
                      key={ticketItem._id}
                      className="bg-[#685AAD] rounded-2xl px-4 sm:px-8 py-2 sm:py-4 grid grid-cols-3 items-center cursor-pointer hover:bg-[#5d4b9a] transition-colors"
                      onClick={() => {
                        setchatopen(true);
                        setTicketData(ticketItem);
                      }}
                    >
                      <div className="">
                        <p className="text-[#FFFFFF] text-[16px] md:text-[24px] font-medium">
                          {ticketItem.topic.length > 30
                            ? `${ticketItem.topic.substring(0, 30)}...`
                            : ticketItem.topic}
                        </p>
                      </div>

                      <div className="border-x border-white flex items-center justify-center">
                        <p className="text-[#FFFFFF] text-[16px] md:text-[24px] font-medium">
                          {formatDate(ticketItem.createdAt)}
                        </p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex flex-col items-start pl-4 justify-center">
                          <p className="text-[#FFFFFF] text-[16px] md:text-[24px] font-medium h-fit m-0 p-0">
                            {ticketItem?.assignedTo || 'Unassigned'}
                          </p>
                          <p className="text-white text-xs h-fit m-0 p-0">Assistant</p>
                        </div>

                        <Image
                          loading="lazy"
                          src={messageicon}
                          alt=""
                          className="w-3 h-3 sm:w-6 sm:h-6"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
