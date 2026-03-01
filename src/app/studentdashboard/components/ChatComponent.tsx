

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Send, MessageSquare, Folder, User, PaperclipIcon } from 'lucide-react';
import chaticon from '../../../../public/chaticon (2).svg'
import sendicon from '../../../../public/sendicon.svg'
import purplechaticon from '../../../../public/purplechaticon.svg'
import foldericonpurple from '../../../../public/foldericonpurple.svg'
import profileicon from '../../../../public/profile icon purple.svg'
import sampleimg from '../../../../public/assets/heroimg.png'
import plusicon from '../../../../public/plusicon.svg'
import pdficon from '../../../../public/pdf icon.svg'

const TutorListItem = ({ tutor, isActive, onClick, onChatClick, onFolderClick, onProfileClick }:any) => (
  <div 
    className={`flex flex-col custom-2xl:flex-row justify-between items-center py-6 px-4 cursor-pointer mr-[3%] rounded-xl my-4 bg-[#A296CC]  border-red-700`}
  >

    <div className="flex items-center" onClick={onClick}>
      <Image  loading="lazy"  src={tutor.image} alt={tutor.name} width={44} height={44} className="rounded-full mr-3 border" />
      <div className="flex-grow">
        <p className={`font-semibold text-lg ${isActive ? 'text-white' : 'text-white'}`}>{tutor.name}</p>
      </div>
    </div>

    {/* icons */}
    <div className="flex  justify-between items-end  mt-2 custom-2xl:mt-0 w-full max-w-[7rem]  ">
      <button onClick={onChatClick} className=" rounded-full ">
        <Image  loading="lazy"  src={purplechaticon} alt="" className='w-4 h-4 sm:w-6 sm:h-6' />
      </button>
      <button onClick={onFolderClick} className="  rounded-full">
        <Image  loading="lazy"  src={foldericonpurple} alt="" className='w-4 h-4 sm:w-6 sm:h-6' />
      </button>
      <button onClick={onProfileClick} className=" rounded-full">
        <Image  loading="lazy"  src={profileicon} alt="" className='w-4 h-4 sm:w-6 sm:h-6' />
      </button>
    </div>
  </div>
);

const ChatMessage = ({ message, isUser }:any) => (
  <div className={`flex  ${isUser ? 'justify-end' : 'justify-start'} mb-4 `}>
    <div className={` max-w-[70%] rounded-2xl p-3 ${isUser ? 'bg-[#685AAD] text-white' : 'bg-white text-[#473171]'}`}>
      <p className='text-sm sm:text-md custom-xl:text-xl font-medium break-words'>helo helo helo  {message.text}</p>
      <span className={`text-xs sm:text-sm custom-xl:text-md opacity-70 mt-1 block   ${isUser?"text-white float-right":"text-[#9B85C8]"}`}>{message.time}</span>
    </div>
  </div>
);

const FileItem = ({ file, onDownload }:any) => (
  <div className="flex items-center justify-between bg-[#8a7db7] rounded-xl p-3 mb-2">
    <div className="flex items-center">
      <PaperclipIcon size={20} color="white" className="mr-2" />
      <span className="text-white">{file.name}</span>
    </div>
    <button onClick={() => onDownload(file)} className="text-white underline">
      Download
    </button>
  </div>
);

const ChatComponent = () => {
  const [activeTutor, setActiveTutor] = useState(0);
  const [activeView, setActiveView] = useState('chat');
  const [tutors, setTutors]:any = useState([
    { id: 0, name: "Mr. ", chaticon, image: "/assets/heroimg.png", messages: [], files: [] },
    { id: 1, name: "Ms. Johnson", image: sampleimg, messages: [], files: [] },
    { id: 2, name: "Dr. Smith", image: "/assets/heroimg.png", messages: [], files: [] },
    // ... other tutors
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tutors]);


  

  const handleSendMessage = (e:any) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const updatedTutors = [...tutors];
      updatedTutors[activeTutor].messages.push({ 
        id: updatedTutors[activeTutor].messages.length + 1, 
        text: newMessage, 
        isUser: true, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setTutors(updatedTutors);
      setNewMessage("");
      
      // Simulate tutor response
      setTimeout(() => {
        const tutorResponse = generateTutorResponse(newMessage);
        const updatedTutorsWithResponse = [...updatedTutors];
        updatedTutorsWithResponse[activeTutor].messages.push({ 
          id: updatedTutorsWithResponse[activeTutor].messages.length + 1, 
          text: tutorResponse, 
          isUser: false, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        setTutors(updatedTutorsWithResponse);
      }, 1000);
    }
  };

  const handleFileUpload = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const currentDate = new Date();
      const fileDate = currentDate.toLocaleDateString();
      const fileTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newFile = {
        id: tutors[activeTutor].files.length + 1,
        name: file.name,
        date: fileDate,
        time: fileTime,
        isReceived: false
      };
      
      const updatedTutors = [...tutors];
      updatedTutors[activeTutor].files.push(newFile);
      
      // Simulate receiving the same file
      setTimeout(() => {
        const receivedFile = {
          ...newFile,
          id: updatedTutors[activeTutor].files.length + 1,
          isReceived: true
        };
        updatedTutors[activeTutor].files.push(receivedFile);
        setTutors(updatedTutors);
      }, 1000); // Simulate a 1-second delay
  
      setTutors(updatedTutors);
    }
  };

  const handleFileDownload = (file:any) => {
    // Implement file download logic here

  };

  const generateTutorResponse = (userMessage:any) => {
    const responses = [
      "That's an interesting point. Let's discuss it further.",
      "I understand your concern. Here's what we can do...",
      "Great question! The answer is...",
      "Let me clarify that for you.",
      "I'd be happy to help you with that.",
      "Can you provide more details about your question?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex h-full  overflow-hidden   border-red-600   ">
      {/* Sidebar */}
      <div className="w-1/3 bg-[#EDE8FA]  border-red-700 h-full  overflow-hidden">
        <h2 className="text-3xl font-bold text-[#685AAD] p-4 ml-6">My eTutors</h2>

        <div className=' overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40]  scrollbar-thumb-rounded-3xl h-[90%]  border-red-400'>
        {tutors.map((tutor:any) => (
          <TutorListItem 
            key={tutor.id}
            tutor={tutor}
            isActive={activeTutor === tutor.id}
            onClick={() => setActiveTutor(tutor.id)}
            onChatClick={() => setActiveView('chat')}
            onFolderClick={() => setActiveView('folder')}
            onProfileClick={() => {}} // Placeholder for profile functionality
          />
        ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow flex flex-col rounded-3xl  bg-[#A296CC]  h-full  border-red-800 max-w-[70%] w-full">
        {/* Chat Header */}
        <div className="bg-[#A296CC] py-4 px-4 flex items-center rounded-t-3xl  pl-8 ">
          <Image  loading="lazy"  src={chaticon} alt={tutors[activeTutor].name}  className=" mr-4 w-7 h-7" />
          <h2 className="text-2xl font-bold text-white">{tutors[activeTutor].name}</h2>
        </div>
       
        {activeView === 'chat' && (
          <>
            {/* Messages */}
            <div className="flex-grow  p-4 bg-[#A296CC] border-t border-[#8b55ff51] mx-4   overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40]  scrollbar-thumb-rounded-3xl ">
              {tutors[activeTutor].messages.map((msg:any) => (
                <ChatMessage key={msg.id} message={msg} isUser={msg.isUser} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="py-2 sm:py-4 px-2 sm:px-7  bg-[#A296CC] border-red-700   rounded-b-3xl ">
              <div className="flex items-center bg-[#8a7db7] rounded-full   border-red-500 pr-7 pl-2 sm:pl-10 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="send a message"
                  className="flex-grow py-2 px-2 bg-transparent text-white placeholder-[#b0a9d2] text-xl focus:outline-none"
                />
                <button type="submit" className="">
                  <Image  loading="lazy"  src={sendicon} alt="" className='h-5 w-5 absolute right-6  top-1/2  transform  -translate-y-1/2 ' />
                </button>
              </div>
            </form>
          </>
        )}

      

{activeView === 'folder' && (
  <>
  <div className=" relative flex-grow p-4 bg-[#A296CC] border-t border-[#8b55ff51] mx-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40] scrollbar-thumb-rounded-3xl">
    {tutors[activeTutor].files.map((file: any) => (
      <div
      key={file.id}
      onClick={() => handleFileDownload(file)}
      className={`bg-[#8170B1] max-w-[34rem] flex items-center p-6  rounded-xl my-3 ${
        file.isReceived ? 'mr-auto' : 'ml-auto'
        }`}
        >
        <Image  loading="lazy"  src={pdficon} alt="PDF Icon" className='w-12 h-12' />
        <div className='ml-3 flex  items-center justify-between  w-full'>
          <span className='max-w-[10rem] text-2xl overflow-hidden text-nowrap font-medium'>
            {file.name}
          </span>
          <span className='text-xs text-gray-300'>
            {file.date} {file.time}
          </span>
        </div>
      </div>
    ))}




    <div className=' absolute bottom-5 right-0  w-full flex justify-end'>

    <button
    // @ts-ignore
      onClick={() => fileInputRef.current.click()}
      className="mt-4 text-white py-2 px-4 rounded-full flex items-center gap-3"
      >
      <span className='text-xl text-[#DBD8EF] font-medium'>Add attachment</span>
      <Image  loading="lazy"  src={plusicon} alt="" className='w-8 h-8' />
    </button>
    <input
      ref={fileInputRef}
      type="file"
      onChange={handleFileUpload}
      style={{ display: 'none' }}
      />

      </div>


  </div>
      </>
)}


      </div>
    </div>
  );
};

export default ChatComponent;