// 'use client';
// import Image from 'next/image';
// import chaticon from '../../../../public/chaticon (2).svg';
// import sendicon from '../../../../public/sendicon.svg';
// import plusicon from '../../../../public/plusicon.svg';
// import { TutorListItem } from './TutorListItem';
// import { ChatMessage } from './ChatMessage';
// import { FileMessage } from './FileMessage';

// function ChatComp({
//   recievedmessages,
//   activeTutor,
//   settutor,
//   setTutor,
//   setShowChat,
//   setActiveView,
//   setActiveFindEtutor,
//   activeView,
//   tutor,
//   messages,
//   messagesEndRef,
//   sendMessage,
//   newMessage,
//   setNewMessage,
//   userId,
//   file,
//   setselectedFile,
//   setFile,
//   setFileName,
//   isLoading,
//   sendFile,
//   selectedFile,
//   fileName,
// }: any) {
//   return (
//     <div className="bg-[#EDE8FA] w-full max-h-[947px] h-full rounded-3xl p-6  mt-11 text-white">
//       <div className="flex h-full  gap-3 custom-2xl:gap-4 overflow-hidden     ">
//         {/* Sidebar */}
//         <div className="hidden sm:block min-w-[30.2%]  bg-[#EDE8FA]  border-red-700 h-full  overflow-hidden">
//           <h2 className="text-xl custom-2xl:text-4xl font-bold text-[#685AAD] px-4 py-4 ml-6">
//             My eTutors
//           </h2>

//           <div className="hidden pt-6  overflow-y-auto scrollbar-thin sm:flex flex-col gap-3 custom-2xl:gap-6  scrollbar-track-transparent scrollbar-thumb-[#685aad40]  scrollbar-thumb-rounded-3xl h-[90%]  ">
//             {recievedmessages.length > 0 &&
//               recievedmessages.map((message: any, index: any) => (
//                 <TutorListItem
//                   key={index}
//                   // @ts-ignore
//                   tutor={message?.details}
//                   isActive={activeTutor === message}
//                   // @ts-ignore
//                   onClick={() => {
//                     settutor(message?.details);
//                     setShowChat(true);
//                   }}
//                   onChatClick={() => {
//                     setActiveView('chat');
//                     settutor(message?.details);
//                   }}
//                   onFolderClick={() => {
//                     setActiveView('folder');
//                     settutor(message?.details);
//                   }}
//                   onProfileClick={() => {
//                     setActiveFindEtutor('Find eTutor');
//                     // @ts-ignore
//                     setTutor(message?.details);
//                   }} // Placeholder for profile functionality
//                 />
//               ))}
//           </div>
//         </div>

//         {/* Chat Area */}
//         <div className="flex-grow flex flex-col rounded-3xl  bg-[#A296CC]  h-full    max-w-full  relative">
//           {/* Chat Header */}
//           <div className="bg-[#A296CC] py-3 custom-2xl:py-5  px-4 flex rounded-t-3xl  pl-6 custom-2xl:pl-10   ">
//             <Image
//               loading="lazy"
//               src={chaticon}
//               alt=""
//               className=" mr-3 custom-2xl:mr-5 w-5 custom-2xl:w-8 h-5 custom-2xl:h-8 mt-1"
//             />
//             <h2 className="text-xl custom-2xl:text-3xl font-bold text-white">
//               {tutor?.contactInformation?.firstName}
//             </h2>
//           </div>

//           {activeView === 'chat' && (
//             <>
//               {/* Messages */}
//               <div className="flex-grow p-1 custom-2xl:p-3 bg-[#A296CC] border-t border-[#8b55ff51]   mx-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40] scrollbar-thumb-rounded-3xl">
//                 {Array.isArray(messages) && messages.length > 0
//                   ? messages.map((msg, index) => (
//                       <>
//                         <ChatMessage
//                           key={index}
//                           message={msg}
//                           // @ts-ignore
//                           isUser={msg.senderId === userId}
//                         />
//                       </>
//                     ))
//                   : ''}

//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Message Input */}
//               <form
//                 onSubmit={sendMessage}
//                 className="py-2 sm:py-4 px-2 sm:px-10 bg-[#A296CC]  flex items-center justify-center  rounded-b-3xl"
//               >
//                 <div className="flex items-center bg-[#8a7db7] rounded-full  relative w-full">
//                   <input
//                     type="text"
//                     value={newMessage}
//                     onChange={e => setNewMessage(e.target.value)}
//                     placeholder="send a message"
//                     className="flex-grow py-1 sm:py-2 custom-2xl:py-4 pl-8 custom-2xl:pl-16 pr-8 custom-2xl:pr-16  bg-transparent text-white placeholder-[#b0a9d2] text-sm sm:text-base custom-2xl:text-xl focus:outline-none"
//                   />
//                   <button type="submit" className="">
//                     <Image
//                       loading="lazy"
//                       src={sendicon}
//                       alt="Send Icon"
//                       className="h-4  custom-2xl:h-6 w-4  custom-2xl:w-6 absolute right-9 top-1/2 transform -translate-y-1/2"
//                     />
//                   </button>
//                 </div>
//               </form>
//             </>
//           )}

//           {activeView === 'folder' && (
//             <>
//               <div className="flex-grow p-1 custom-2xl:p-3 bg-[#A296CC] border-t border-[#8b55ff51]   mx-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40] scrollbar-thumb-rounded-3xl">
//                 {Array.isArray(messages) &&
//                   messages.length > 0 &&
//                   messages.map(
//                     (msg: any, index) =>
//                       msg.fileUrl != null && (
//                         <FileMessage
//                           key={index}
//                           message={msg}
//                           isUser={msg.senderId === userId} // Check if the message was sent by the user
//                         />
//                       )
//                   )}

//                 <div ref={messagesEndRef} />
//               </div>

//               <div className="py-2 sm:py-4 px-2 sm:px-10 bg-[#A296CC]  flex items-center justify-end  rounded-b-3xl relative">
//                 {file ? (
//                   <div className="flex flex-col items-end  gap-2">
//                     {selectedFile && (
//                       <div className="mt-2 flex items-center gap-4">
//                         <p className="text-sm text-white">
//                           {fileName.slice(0, 8) + '...' + fileName.slice(-4)}
//                         </p>
//                         <button
//                           className="text-sm text-[#af0000] hover:text-red-700"
//                           onClick={() => {
//                             setselectedFile(null);
//                             setFile(null);
//                             setFileName('');
//                           }}
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     )}
//                     <button
//                       onClick={sendFile}
//                       className="w-full sm:w-auto py-1 px-9 text-base custom-2xl:text-base rounded-sm bg-[#8358F7] hover:bg-[#4a3683] capitalize hover:bg-opacity-90 transition-colors"
//                     >
//                       {isLoading ? 'wait...' : 'send'}
//                     </button>
//                   </div>
//                 ) : (
//                   <label className="text-white py-2 px-4 rounded-full flex items-center gap-3 cursor-pointer">
//                     <input
//                       type="file"
//                       className="hidden"
//                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                         if (e.target.files && e.target.files[0]) {
//                           const file: any = e.target.files[0];
//                           setselectedFile(file);
//                           setFile(file);
//                           setFileName(file.name);
//                         }
//                       }}
//                     />
//                     <span className="text-xl text-[#DBD8EF] font-medium">Add attachment</span>
//                     <Image loading="lazy" src={plusicon} alt="Add" className="w-8 h-8" />
//                   </label>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatComp;

'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import chaticon from '../../../../public/chaticon (2).svg';
import sendicon from '../../../../public/sendicon.svg';
import purplechaticon from '../../../../public/purplechaticon.svg';
import foldericonpurple from '../../../../public/foldericonpurple.svg';
import profileicon from '../../../../public/profile icon purple.svg';
import { io, Socket } from 'socket.io-client';

import { useSession } from 'next-auth/react';

const TicketThreadsList = ({
  name,
  tagline,
  Img,
  assignedTo,
  ticketThreadsClickHandler,
}: {
  name: any;
  tagline: string;
  Img: any;
  assignedTo: any;
  ticketThreadsClickHandler: any;
}) => (
  <div
    className={` hidden sm:flex flex-row justify-between items-center py-2 sm:py-2 custom-xl:py-3 custom-2xl:py-4  pl-2 sm:pl-3 custom-2xl:pl-5 pr-4 custom-2xl:pr-9 cursor-pointer   rounded-lg md:rounded-xl  bg-[#A296CC]  `}
    onClick={ticketThreadsClickHandler}
  >
    <div className="flex items-center">
      {Img ? (
        <Image
          src={Img}
          alt={`${''}'s profile picture`}
          width={60}
          height={60}
          className="rounded-full mr-4 w-4 sm:w-7 h-4 sm:h-7  custom-2xl:h-[60px] custom-2xl:w-[60px] "
        />
      ) : (
        <div className="rounded-full mr-4 w-4 sm:w-7 h-4 sm:h-7  custom-2xl:h-[60px] custom-2xl:w-[60px] bg-[#685AAD] flex items-center justify-center">
          <span className="text-white font-semibold text-xs sm:text-sm custom-2xl:text-2xl">
            {assignedTo ? assignedTo.slice(0, 2).toUpperCase() : 'N/A'}
          </span>
        </div>
      )}
      <div className="flex-grow ">
        <p className={`font-semibold text-base custom-2xl:text-2xl   truncate  `}>{name || ''}</p>
        <p className="hidden md:block text-sm custom-xl:text-base custom-2xl:text-[19px]">
          {tagline}
        </p>
      </div>
    </div>
  </div>
);

const ChatMessage = ({ message, isUser }: any) => {
  if (!message || !message.message || !message.createdAt) return null;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2 custom-2xl:mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg custom-2xl:rounded-2xl px-2 py-1 custom-2xl:p-3 ${isUser ? 'bg-[#685AAD] text-white' : 'bg-white text-[#473171]'
          }`}
      >
        {!isUser && (
          <p className="text-sm sm:text-base custom-2xl:text-xl font-bold transition-all text-[#685aad]">
            Lawrance <span className="text-xs text-[#b3acd6]">/ Assistant</span>
          </p>
        )}
        <p className="text-sm sm:text-base custom-2xl:text-2xl  break-words transition-all">
          {message.message}
        </p>
        <span
          className={`text-xs custom-2xl:text-base opacity-70 custom-2xl:mt-1 block ${isUser ? 'text-white float-right' : 'text-[#9B85C8]'
            }`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
};

interface chatprops {
  activeTicket: any;
  tickects: any;
  name: any;
  img: any;
}
function Chat({ activeTicket, tickects, name, img }: chatprops) {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const [error, setError] = useState<any>(null);
  const [ticket, setTicket] = useState<any>(activeTicket);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!session?.user?.id) return;

    const newSocket = io('https://etutor4me.com:5000', {
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('join', session.user.id);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('connect_error', () => {
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [session?.user?.id]);

  // Join ticket room when ticket changes
  useEffect(() => {
    if (socket && ticket._id) {
      socket.emit('joinTicketRoom', ticket._id);

      return () => {
        socket.emit('leaveTicketRoom', ticket._id);
      };
    }
  }, [socket, ticket._id]);

  // Listen for real-time ticket messages
  useEffect(() => {
    if (!socket) return;

    const handleTicketMessage = (messageData: any) => {
      if (messageData.ticketId === ticket._id) {
        setMessages(prevMessages => [...prevMessages, messageData.message]);
        scrollToBottom();
      }
    };

    socket.on('ticketMessage', handleTicketMessage);

    return () => {
      socket.off('ticketMessage', handleTicketMessage);
    };
  }, [socket, ticket._id]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/contact-support/messages/${ticket._id}`);
        const data = await response.json();

        if (data.success) {
          setMessages(data.messages);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    if (ticket._id) {
      fetchMessages();
    }
  }, [ticket._id]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !socket) return;

    console.log('session?.user?.id : ', session?.user?.id);

    const messageData = {
      ticketId: ticket._id,
      senderId: session?.user?.id,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      // Send via Socket.IO for real-time delivery and database saving
      socket.emit('ticketMessage', messageData);

      // Clear the input immediately for better UX
      setNewMessage('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    }
  };

  // Scroll to the latest message
  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [newMessage]);

  // Update ticket when activeTicket prop changes
  useEffect(() => {
    setTicket(activeTicket);
    setMessages([]);
    setError(null);
    setLoading(true);
  }, [activeTicket]);

  const ticketThreadsClickHandler = (ticket: any) => {
    console.log(ticket);
  };

  return (
    <div className="h-full ">
      <div className="flex h-full  gap-3 custom-2xl:gap-6 overflow-hidden ">
        {/* Sidebar */}
        <div className="hidden sm:block w-[24.4%]  bg-[#EDE8FA]  border-red-700 h-full  overflow-hidden px-1  ">
          <div className="border-b-2 border-[#c7bfe3] custom-2xl:mt-4 pt-3 custom-2xl:pb-8 w-fit">
            <h2 className="text-2xl custom-xl:text-4xl custom-2xl:text-[48px] 2xl:text-[54px] font-bold text-[#685AAD] px-2 ">
              In this chat
            </h2>
          </div>
          <div className=" hidden pt-7  overflow-y-auto scrollbar-thin sm:flex flex-col gap-3 custom-2xl:gap-6  scrollbar-track-transparent scrollbar-thumb-[#685aad40]  scrollbar-thumb-rounded-3xl h-[90%]  ">
            {tickects.map((ticket: any) => (
              <TicketThreadsList
                key={ticket._id}
                name={ticket.topic}
                tagline="Assistant"
                assignedTo={ticket?.assignedTo}
                Img={ticket?.img}
                ticketThreadsClickHandler={() => ticketThreadsClickHandler(ticket)}
              />
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow w-[75.5%] flex flex-col rounded-xl sm:rounded-2xl custom-xl:rounded-3xl  bg-[#A296CC]  h-full    max-w-full">
          {/* Chat Header */}
          <div className="bg-transparent py-3 custom-2xl:py-5  px-4 flex rounded-t-3xl  pl-6 custom-2xl:pl-10   ">
            <h2 className="text-xl custom-2xl:text-3xl font-bold text-white">Support Chat</h2>
          </div>

          {/* Messages */}
          <div className="flex-grow p-1 custom-2xl:p-3 bg-[#A296CC] mx-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40] scrollbar-thumb-rounded-3xl">
            {loading ? (
              <div className="text-center text-white py-8">
                <div className="animate-pulse">Loading messages...</div>
              </div>
            ) : error ? (
              <div className="text-center text-red-300 py-8">
                <div className="bg-red-500 bg-opacity-20 rounded p-4 mx-4">Error: {error}</div>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-white py-8">
                <div className="opacity-70">No messages yet. Start the conversation!</div>
              </div>
            ) : (
              messages.map((msg: any, index) => (
                <ChatMessage
                  key={msg._id || index}
                  message={msg}
                  isUser={msg?.senderId === session?.user?.id}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}

          {ticket.status === 'active' ? (
            <form
              onSubmit={sendMessage}
              className="py-2 sm:py-4 px-2 sm:px-10 bg-[#A296CC] flex items-center justify-center rounded-b-3xl"
            >
              <div className="flex items-center bg-[#8a7db7] rounded-full relative w-full">
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="send a message"
                  className="flex-grow py-1 sm:py-2 custom-2xl:py-4 pl-8 custom-2xl:pl-16 pr-8 custom-2xl:pr-16 bg-transparent text-white placeholder-[#b0a9d2] text-sm sm:text-base custom-2xl:text-xl focus:outline-none"
                />
                <button type="submit" className="">
                  <Image
                    loading="lazy"
                    src={sendicon}
                    alt="Send Icon"
                    className="h-4 custom-2xl:h-6 w-4 custom-2xl:w-6 absolute right-9 top-1/2 transform -translate-y-1/2"
                  />
                </button>
              </div>
            </form>
          ) : (
            <div className="px-2 py-9">
              <p className="bg-[#b4a5d7] max-w-[95%] mx-auto text-xs sm:text-lg custom-lg:text-2xl font-medium text-center py-4 sm:py-7 2xl:py-11 px-4 sm:px-10 xl:px-20 2xl:px-40 rounded-2xl xl:rounded-3xl leading-tight">
                This Ticket has been {ticket.status} on{' '}
                {new Date(ticket.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                , by Lawrence. If you need further assistance, feel free to start a new chat or
                reach out to support. Ticket ID:{' '}
                <span className="uppercase"> {ticket._id.slice(-4)}</span>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
