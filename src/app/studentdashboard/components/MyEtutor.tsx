"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ChatComponent from "./ChatComponent"; // Make sure to create this file
import tier from "../../../../public/tier.svg";
import messageicon from "../../../../public/messageicon.svg";
import folder from "../../../../public/foldericon.svg";
import profile from "../../../../public/profileicon.svg";
import sample from "../../../../public/assets/heroimg.png";

import level1 from "../../../../public/level-1.svg";
import level2 from "../../../../public/level-2.svg";
import level3 from "../../../../public/level-3.svg";
import level4 from "../../../../public/level-4.svg";
import level5 from "../../../../public/level-5.svg";
import level6 from "../../../../public/level-6.svg";
import level7 from "../../../../public/level-7.svg";
import level8 from "../../../../public/level-8.svg";
import level9 from "../../../../public/level-9.svg";
import level10 from "../../../../public/level-10.svg";
import formIcon from "../../../../public/EtutorFormIcon.svg";

import { useToast } from "@/hooks/use-toast"
import { Send, MessageSquare, Folder, User, PaperclipIcon } from "lucide-react";
import chaticon from "../../../../public/chaticon (2).svg";
import sendicon from "../../../../public/sendicon.svg";
import purplechaticon from "../../../../public/purplechaticon.svg";
import foldericonpurple from "../../../../public/foldericonpurple.svg";
import profileicon from "../../../../public/profile icon purple.svg";
import sampleimg from "../../../../public/assets/heroimg.png";
import plusicon from "../../../../public/plusicon.svg";
import pdficon from "../../../../public/pdf icon.svg";
import { useSession } from "next-auth/react";
import { io } from 'socket.io-client';
import EtutorPerformanceForm from "./EtutorPerformanceForm";


const SOCKET_URL = 'https://etutor4me.com:5000'; // Backend URL
const socket = io(SOCKET_URL, {
  withCredentials: true,
});



const TutorListItem = ({
  tutor,
  isActive,
  onClick,
  onChatClick,
  onFolderClick,
  onProfileClick,

}: any) => (
  <div
    className={` hidden sm:flex flex-row justify-between items-center py-2 sm:py-3 custom-xl:py-6  pl-2 sm:pl-3 custom-xl:pl-5 pr-4 custom-xl:pr-9 cursor-pointer   rounded-lg md:rounded-xl  bg-[#A296CC]  `}
  >
    <div className="flex items-center" onClick={onClick}>
      <img
        src={tutor.user.profilePicture}
        alt={tutor.contactInformation.firstName}
        className="rounded-full mr-4 w-4 sm:w-7 h-4 sm:h-7  custom-xl:h-[60px] custom-xl:w-[60px] aspect-square object-cover"
      />
      <div className="flex-grow">
        <p
          className={`font-semibold text-base custom-xl:text-2xl hidden md:block  truncate  ${isActive ? "text-white" : "text-white"
            }`}
        >
          {tutor.contactInformation.firstName}
        </p>
      </div>
    </div>

    {/* icons */}
    <div className="flex  justify-between items-end   custom-xl:mt-0 w-full max-w-[2.9rem] sm:max-w-[4rem] custom-xl:max-w-[6.8rem]  ">
      <button onClick={onChatClick} className=" rounded-full ">
        <Image loading="lazy"
          src={purplechaticon}
          alt=""
          className=" w-3 sm:w-4  h-3 sm:h-4 custom-xl:w-7 custom-xl:h-7"
        />
      </button>
      <button onClick={onFolderClick} className="  rounded-full">
        <Image loading="lazy"
          src={foldericonpurple}
          alt=""
          className=" w-3 sm:w-4  h-3 sm:h-4 custom-xl:w-7 custom-xl:h-7"
        />
      </button>
      <button onClick={onProfileClick} className=" rounded-full">
        <Image loading="lazy"
          src={profileicon}
          alt=""
          className=" w-3 sm:w-4  h-3 sm:h-4 custom-xl:w-7 custom-xl:h-7"
        />
      </button>
    </div>
  </div>
);

const ChatMessage = ({ message, isUser }: any) => {
  // Check if message exists and has content and timestamp
  if (!message || !message.content || !message.timestamp) return null;

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"
        } mb-2 custom-xl:mb-4`}
    >
      <div
        className={`max-w-[70%] rounded-lg custom-xl:rounded-2xl px-2 py-1 custom-xl:p-3 ${isUser ? "bg-[#685AAD] text-white" : "bg-white text-[#473171]"
          }`}
      >
        <p className="text-sm sm:text-base custom-xl:text-xl font-medium break-words transition-all">
          {message.content}
        </p>
        <span
          className={`text-xs custom-xl:text-base opacity-70 custom-xl:mt-1 block ${isUser ? "text-white float-right" : "text-[#9B85C8]"
            }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
const FileMessage = ({ message, isUser }: any) => {
  // Check if the file exists and has content

  if (!message) return null;
  return (
    <div
      onClick={() => {
        const link = document.createElement('a');
        link.href = message.fileUrl;
        link.target = '_blank'; // Open in a new tab
        link.download = message.fileUrl.split('/').pop(); // Download the file with its original name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // window.open(message.fileUrl, '_blank');
      }}
      className={`bg-[#8170B1] max-w-[34rem] flex items-center p-6 rounded-xl my-3 hover:cursor-pointer ${isUser ? 'ml-auto' : 'mr-auto' // Conditional alignment based on isUser
        }`}
    >
      <Image loading="lazy" src={pdficon} alt="PDF Icon" className="w-12 h-12" />
      <div className="ml-3 flex items-center justify-between w-full">
        <span className="max-w-[10rem] text-2xl overflow-hidden text-nowrap font-medium">
          {message.fileName.slice(0, 4) + '...' + message.fileName.slice(-4)}

        </span>
        <span className="text-xs text-gray-300">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}

        </span>
      </div>
    </div>
  );
};


const FileItem = ({ file, onDownload }: any) => (
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

interface MyEtutorprops {
  tutorimp: any;
  showchatvalue: boolean;
  setActiveFindEtutor: (item: string) => void;
  setTutor: any;
  showTerminateEngament: any
}

function MyEtutor({
  tutorimp,
  showchatvalue,
  setActiveFindEtutor,
  setTutor,
  showTerminateEngament
}: MyEtutorprops) {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [showChat, setShowChat] = useState(false || showchatvalue);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTutor, setActiveTutor] = useState(0);
  const [activeView, setActiveView] = useState("chat");
  const [tutors, setTutors] = useState();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [userId, setUserId] = useState(null);
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([]); // State to hold messages
  const [newMessage, setNewMessage] = useState(""); // State for the input message
  const messagesEndRef = useRef(null); // Reference to scroll to the bottom
  const [recievedmessages, setRecievedmessages] = useState([]);
  const [tutor, settutor] = useState(tutorimp);
  const [selectedFile, setselectedFile] = useState(null)
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [performanceform, setPerformanceform] = useState(false)





  useEffect(() => {
    if (socket && userId) {
      // Join the socket room based on userId (either student or teacher)
      socket.emit('join', userId);

      // Listen for incoming chat messages
      socket.on('chatMessage', (msg) => {
        setMessages((prevMessages: any) => {
          // Avoid adding duplicate messages based on content and senderId
          if (!prevMessages.some((message: any) => message.content === msg.content && message.senderId === msg.senderId)) {
            return [...prevMessages, msg];
          }
          return prevMessages;
        });
      });
    }

    return () => {
      if (socket && userId) {
        // Leave the socket room when the component unmounts
        socket.emit('leave', userId);

        // Cleanup the listener to avoid memory leaks and duplicate listeners
        socket.off('chatMessage');
      }
    };
  }, [socket, userId]);



  const sendMessage = async (e: any) => {

    e.preventDefault(); // Prevent default form submission behavior
    if (newMessage) {
      const chatMessage = {
        senderId: userId,
        recipientId: tutor.user._id, // Tutor ID
        content: newMessage,
        fileUrl: null,
        fileType: null,
        fileName: null,
        timestamp: new Date().toISOString(),


      };

      // Emit message to the server
      socket.emit('chatMessage', chatMessage);

      // Update UI optimistically
      // @ts-ignore
      setMessages((prev) => [...prev, chatMessage]);

      setNewMessage('');
      await savingmessages(null, null, null)
    }

  };

  const sendFile = async () => {
    setIsLoading(true)
    await session
    if (!file) {

      toast({
        title: "",

        description: "please select a file first",
        variant: "default",
      })
      return
    };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('senderId', session?.user.id);
    formData.append('recipientId', tutor.user._id);

    try {
      // Call API to upload the file
      const response = await fetch('/api/message/uploadtos3', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();


      if (result.success) {

      } else {
        console.error('File upload failed:', result.error);
      }


      if (result.success) {
        const chatMessage = {
          senderId: userId,
          recipientId: tutor.user._id,
          content: null,
          timestamp: new Date().toISOString(),
          fileUrl: result.fileUrl,
          // @ts-ignore
          fileType: file.type,
          // @ts-ignore
          fileName: file.name,

        };

        await savingmessages(chatMessage.fileUrl, chatMessage.fileType, chatMessage.fileName)
        // Emit the message to the server
        socket.emit('chatMessage', chatMessage);
        setFile(null)
        setFileName("")
        setselectedFile(null)
        // Optimistically update the UI
        // @ts-ignore
        setMessages((prev) => [...prev, chatMessage]);
        setIsLoading(false)
      } else {
        setIsLoading(false)
        console.error('File upload failed:', result.error);
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error sending file:', error);
    }
  };





  async function savingmessages(fileUrl: any, fileType: any, fileName: any) {

    // if (!newMessage.trim() || !fileUrl) return; // Prevent sending empty messages

    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: userID, // Replace with actual sender ID
          recipientId: tutor.user._id, // Replace with actual recipient ID (e.g., tutor ID)
          content: newMessage,
          fileUrl: fileUrl,
          fileType: fileType,
          fileName: fileName,
        }),
      });

      const savedMessage = await response.json();



      // After sending the message, set the conversationId
      const newConversationId = savedMessage.conversationId; // Get conversationId from the response

      // If there was no conversationId previously, set it now
      setConversationId(newConversationId);

      // Update message list with the new message and conversationId
      // @ts-ignore
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { ...savedMessage, conversationId: newConversationId }, // Include conversationId
      // ]);

      setNewMessage(""); // Clear the message input field
      scrollToBottom(); // Scroll to the bottom of the chat
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }




  const userID = session?.user.id;
  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session, showChat]);

  useEffect(() => {
    if (userId) {
      fetchSenders();
    }
  }, [userId, showChat]);

  async function fetchSenders() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/recipient/messages?recipientId=${userID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch senders");
      }
      const senders = await response.json();
      setRecievedmessages(senders);

    } catch (error) {
      console.error("Error fetching senders:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSenders();
  }, [showChat, session]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch(
          `/api/message/conversation?userId=${userID}&recipientId=${tutor.user._id}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        if (
          data.message === "No conversation found between these users" ||
          data.message === "No messages found for this conversation"
        ) {
          setMessages([]);
        } else {
          setMessages(data.messages); // Store messages in state
        }

        // Set the conversationId if it's not already set
        if (data.length > 0 && !conversationId) {
          setConversationId(data[0].conversationId); // Set the conversationId from the first message (or any message)
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    fetchMessages();
  }, [tutor]);


  // Scroll to the latest message
  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showChat]);

  useEffect(() => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tutors, showChat]);





  if (showChat) {
    return (
      <div className="bg-[#EDE8FA] w-full max-h-[947px] h-full rounded-3xl p-6  mt-11 text-white">
        <div className="flex h-full  gap-3 custom-xl:gap-4 overflow-hidden     ">
          {/* Sidebar */}
          <div className="hidden sm:block w-[30.2%]  bg-[#EDE8FA]  border-red-700 h-full  overflow-hidden">
            <h2 className="text-xl custom-xl:text-4xl font-bold text-[#685AAD] px-4 py-4 ml-6">
              My eTutors
            </h2>

            <div className=" hidden pt-6  overflow-y-auto scrollbar-thin sm:flex flex-col gap-3 custom-xl:gap-6  scrollbar-track-transparent scrollbar-thumb-[#685aad40]  scrollbar-thumb-rounded-3xl h-[90%]  ">
              {recievedmessages.length > 0 &&
                recievedmessages.map((message: any, index) => (
                  <TutorListItem
                    key={index}
                    // @ts-ignore
                    tutor={message?.details}
                    isActive={activeTutor === message}
                    // @ts-ignore
                    onClick={() => settutor(message?.details)}
                    onChatClick={() => { setActiveView("chat"); settutor(message?.details) }}
                    onFolderClick={() => { setActiveView("folder"); settutor(message?.details) }}
                    onProfileClick={() => {
                      setActiveFindEtutor("Find eTutor");
                      // @ts-ignore
                      setTutor(message?.details);
                    }} // Placeholder for profile functionality
                  />
                ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-grow flex flex-col rounded-3xl  bg-[#A296CC]  h-full    max-w-full">
            {/* Chat Header */}
            <div className="bg-[#A296CC] py-3 custom-xl:py-5  px-4 flex rounded-t-3xl  pl-6 custom-xl:pl-10   ">
              <Image loading="lazy"
                src={chaticon}
                alt=""
                className=" mr-3 custom-xl:mr-5 w-5 custom-xl:w-8 h-5 custom-xl:h-8 mt-1"
              />
              <h2 className="text-xl custom-xl:text-3xl font-bold text-white">
                {tutor?.contactInformation?.firstName}
              </h2>
            </div>

            {activeView === "chat" && (
              <>
                {/* Messages */}
                <div className="flex-grow p-1 custom-xl:p-3 bg-[#A296CC] border-t border-[#8b55ff51] mx-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40] scrollbar-thumb-rounded-3xl">
                  {Array.isArray(messages) && messages.length > 0
                    ? messages.map((msg, index) => (
                      <>
                        <ChatMessage
                          key={index}
                          message={msg}
                          // @ts-ignore
                          isUser={msg.senderId === userID}
                        />
                      </>
                    ))
                    : ""}

                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form
                  onSubmit={sendMessage}
                  className="py-2 sm:py-4 px-2 sm:px-10 bg-[#A296CC]  flex items-center justify-center  rounded-b-3xl"
                >
                  <div className="flex items-center bg-[#8a7db7] rounded-full  relative w-full">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="send a message"
                      className="flex-grow py-1 sm:py-2 custom-xl:py-4 pl-8 custom-xl:pl-16 pr-8 custom-xl:pr-16  bg-transparent text-white placeholder-[#b0a9d2] text-sm sm:text-base custom-xl:text-xl focus:outline-none"
                    />
                    <button type="submit" className="">
                      <Image loading="lazy"
                        src={sendicon}
                        alt="Send Icon"
                        className="h-4  custom-xl:h-6 w-4  custom-xl:w-6 absolute right-9 top-1/2 transform -translate-y-1/2"
                      />
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeView === "folder" && (
              <>
                <div className="flex-grow p-1 custom-xl:p-3 bg-[#A296CC] border-t border-[#8b55ff51]   mx-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40] scrollbar-thumb-rounded-3xl">
                  {Array.isArray(messages) &&
                    messages.length > 0 &&
                    messages.map(
                      (msg: any, index) =>
                        msg.fileUrl != null && (
                          <FileMessage
                            key={index}
                            message={msg}
                            isUser={msg.senderId === userId} // Check if the message was sent by the user
                          />
                        )
                    )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="py-2 sm:py-4 px-2 sm:px-10 bg-[#A296CC]  flex items-center justify-end  rounded-b-3xl relative">
                  {file ? (
                    <div className="flex flex-col items-end  gap-2">
                      {selectedFile && (
                        <div className="mt-2 flex items-center gap-4">
                          <p className="text-sm text-white">{fileName.slice(0, 8) + '...' + fileName.slice(-4)}</p>
                          <button
                            className="text-sm text-[#af0000] hover:text-red-700"
                            onClick={() => {
                              setselectedFile(null);
                              setFile(null);
                              setFileName("");
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      <button onClick={sendFile} className="w-full sm:w-auto py-1 px-9 text-base custom-xl:text-base rounded-sm bg-[#8358F7] hover:bg-[#4a3683] capitalize hover:bg-opacity-90 transition-colors">
                        {isLoading ? "wait..." : "send"}
                      </button>

                    </div>
                  ) : (
                    <label className="text-white py-2 px-4 rounded-full flex items-center gap-3 cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files[0]) {
                            const file: any = e.target.files[0];
                            setselectedFile(file);
                            setFile(file);
                            setFileName(file.name);
                          }
                        }}
                      />
                      <span className="text-xl text-[#DBD8EF] font-medium">Add attachment</span>
                      <Image loading="lazy" src={plusicon} alt="Add" className="w-8 h-8" />
                    </label>
                  )}

                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>

      <div className="bg-[#EDE8FA] w-full h-full rounded-3xl px-5 custom-xl:px-9 py-5 custom-xl:py-9  mt-[59px] text-white">
        <h1 className="text-xl custom-xl:text-4xl font-bold  text-[#685AAD] px-7 mb-4 sm:mb-6 custom-xl:mb-10">
          My eTutors
        </h1>

        <div className="flex flex-col gap-2 sm:gap-4 custom-lg:gap-10">
          {recievedmessages.length > 0 &&
            recievedmessages.map((message: any, index) => (
              <div
                key={index}
                className="flex  justify-between items-center  relative custom-xl:items-center  py-4 custom-xl:py-9 rounded-2xl bg-[#A296CC] pl-6 sm:px-11 pr-6  custom-xl:flex-row custom-xl:gap-0 gap-4"
              >
                <div className="absolute top-3 right-3 group hover:cursor-pointer">

                  <div className="absolute bg-[#a296cc] w-[300px] right-0 -top-[105px] px-3 py-2 rounded-xl transform scale-0 origin-bottom-right group-hover:scale-100 transition-all duration-300 ease-in-out">Please fill out this monthly form about your etutor. it helps improve your experience and ensure better performance</div>
                  <button onClick={() => { setPerformanceform(true) }}>

                    <Image src={formIcon} alt="" className="w-3 sm:w-5 custom-xl:w-[31px] hidden" />
                  </button>
                </div>
                {/* name and tier box */}
                <div className="flex  justify-start  w-fit custom-xl:w-fit  custom-xl:flex-row gap-2 custom-xl:gap-6 h-fit items-center  ">
                  <div className="w-8 sm:h-16 custom-xl:h-[132px] h-8 sm:w-16 custom-xl:w-[132px] rounded-full bg-white relative ">
                    <div className="overflow-hidden  rounded-full h-full w-full">
                      <img
                        src={message?.details?.user?.profilePicture || ""}
                        alt=""
                        className=""
                      />
                    </div>
                    <div className="tier w-5 sm:w-8 custom-xl:w-14 h-5 sm:h-8 custom-xl:h-14 absolute -bottom-1 -left-2">
                      <Image loading="lazy"
                        src={
                          message?.details?.level == "1"
                            ? level1
                            : message?.details?.level == "2"
                              ? level2
                              : message?.details?.level == "3"
                                ? level3
                                : message?.details?.level == "4"
                                  ? level4
                                  : message?.details?.level == "5"
                                    ? level5
                                    : message?.details?.level == "6"
                                      ? level6
                                      : message?.details?.level == "7"
                                        ? level7
                                        : message?.details?.level == "8"
                                          ? level8
                                          : message?.details?.level == "9"
                                            ? level9
                                            : message?.details?.level == "10"
                                              ? level10
                                              : level1
                        }
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  <div className=" h-full flex flex-col items-center justify-center gap-6 max-w-48 truncate">
                    <h1 className="font-bold text-sm sm:text-lg custom-xl:text-2xl  w-full text-center custom-xl:text-start ">
                      {message?.details?.contactInformation?.firstName}
                    </h1>

                    <div className="w-full  text-center hidden custom-xl:block custom-xl:text-start">
                      <p className="text-xl">Availability:</p>
                      <span className="text-[#473171] text-lg truncate ">
                        {/* {message?.details?.experience?.availableHours} */}
                        {Object.entries(message?.details?.experience?.generalAvailability).map(([day, times]) => (

                          <div key={day} className="flex">
                            <h3>{day} :</h3>  <p>{
                              // @ts-ignore
                              times?.join(', ')}</p>
                          </div>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
                {/* subject and info box */}
                <div className="custom-xl:max-w-52  w-full  h-fit custom-xl:flex flex-col items-center custom-xl:items-start hidden ">
                  <span className="text-md">Subjects:</span>
                  <p className="  text-[#473171] text-md text-center custom-xl:text-start">
                    {message?.details?.experience?.subjectsTutored.join(",")}
                  </p>
                </div>

                {/* study and experience box */}
                <div className=" flex-col gap-2  custom-xl:max-w-52 w-full custom-xl:items-start  hidden custom-xl:flex">
                  <div className="flex flex-col items-center custom-xl:items-start">
                    <span className="text-md text-white">Study</span>
                    <p className="text-md text-[#473171]">
                      {message?.details?.education.degree}
                    </p>
                  </div>

                  <div className="flex flex-col items-center custom-xl:items-start">
                    <span className="text-md text-white">
                      Teaching Experience
                    </span>
                    <p className="text-md text-[#473171]">
                      {message?.details?.experience?.tutoringExperience || "Not Available"}
                    </p>
                  </div>
                </div>

                {/* accept deny box */}

                <div className="flex flex-col items-end custom-xl:items-start  w-full custom-xl:w-fit custom-xl:py-2">
                  <div className=" h-full flex flex-col gap-6 w-fit custom-lg:w-fit">
                    <div className=" flex  h-fit w-full justify-between items-center custom-xl:items-start  gap-4 custom-xl:gap-14">
                      <button onClick={() => {
                        setShowChat(true);
                        settutor(message?.details);
                      }}>

                        <Image loading="lazy"
                          src={messageicon}
                          alt=""
                          className="w-3 sm:w-6 custom-xl:w-8 hover:cursor-pointer"

                        />
                      </button>
                      <button onClick={() => {
                        setShowChat(true);
                        setActiveView("folder")
                        settutor(message?.details);
                      }}>

                        <Image loading="lazy"
                          src={folder}
                          alt=""
                          className="w-3 sm:w-6 custom-xl:w-8 hover:cursor-pointer"

                        />
                      </button>

                      <button onClick={() => {
                        setActiveFindEtutor("Find eTutor");
                        showTerminateEngament(true)
                        setTutor(message?.details);
                      }}>

                        <Image loading="lazy"

                          src={profile}
                          alt=""
                          className="w-3 sm:w-6 custom-xl:w-6 hover:cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {performanceform && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-[99999999999999999999999999]  w-screen custom-xl:flex custom-xl:items-center custom-xl:justify-center backdrop-blur-sm h-full">
          <EtutorPerformanceForm close={setPerformanceform} />
        </div>
      )}
    </>
  );
}

export default MyEtutor;
