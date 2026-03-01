"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ChatComponent from "./ChatComponent"; // Make sure to create this file
import tier from "../../../../public/tier.svg";
import messageicon from "../../../../public/chatChaticonLightPurple.svg";
import folder from "../../../../public/chatfoldericonLightpurple.svg";
import profile from "../../../../public/etutorprofile.svg";
import sample from "../../../../public/assets/heroimg.png";

import {
  Send,
  MessageSquare,
  Folder,
  User,
  PaperclipIcon,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import chaticon from "../../../../public/chaticon (2).svg";
import sendicon from "../../../../public/sendicon.svg";
import purplechaticon from "../../../../public/messagelight.svg";
import foldericonpurple from "../../../../public/folderlight.svg";
import profileicon from "../../../../public/profilelight.svg";
import sampleimg from "../../../../public/assets/heroimg.png";
import plusicon from "../../../../public/plusicon.svg";
import pdficon from "../../../../public/pdf icon.svg";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { io } from "socket.io-client";
import { useToast } from "@/hooks/use-toast";
import { getRelativeTime } from "./getRelativeTime";

const SOCKET_URL = "https://etutor4me.com:5000"; // Backend URL
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
    className={`hidden sm:flex flex-row justify-between items-center py-2 sm:py-3 custom-xl:py-6  pl-2 sm:pl-3  custom-xl:pl-5 pr-4 custom-xl:pr-8 cursor-pointer   rounded-lg md:rounded-2xl  bg-[#B4A5D7] max-h-[100.2px]  `}
  >
    <div className="flex items-center" onClick={onClick}>
      <img
        src={tutor.user.profilePicture}
        alt={tutor.firstName}
        className="rounded-full mr-2 hidden custom-xl:block custom-xl:mr-4 w-4 sm:w-7 h-4 sm:h-7  custom-xl:h-[60px] custom-xl:w-[60px]"
      />
      <div className="flex-grow">
        <p
          className={`font-semibold text-base  custom-xl:text-[21.38px] custom-xl:leading-[2rem]   truncate  max-w-[7.5rem]  ${isActive ? "text-white" : "text-white"
            }`}
        >
          {tutor.firstName?.slice(0, 7)}
        </p>
      </div>
    </div>

    {/* icons */}
    <div className="flex  justify-between items-end   custom-xl:mt-0 w-full max-w-[2.9rem] sm:max-w-[4rem] custom-xl:max-w-[6.33rem]   ">
      <button onClick={onChatClick} className=" rounded-full ">
        <Image
          loading="lazy"
          src={purplechaticon}
          alt=""
          className="w-3 sm:w-4  h-3 sm:h-4 custom-xl:w-[26px] custom-xl:h-[26px]"
        />
      </button>
      <button onClick={onFolderClick} className="  rounded-full">
        <Image
          loading="lazy"
          src={foldericonpurple}
          alt=""
          className=" w-3 sm:w-4  h-3 sm:h-4 custom-xl:w-[26px] custom-xl:h-[26px]"
        />
      </button>
      <button onClick={onProfileClick} className=" rounded-full">
        <Image
          loading="lazy"
          src={profileicon}
          alt=""
          className="w-3 sm:w-4  h-3 sm:h-4 custom-xl:w-[26px] custom-xl:h-[26px]"
        />
      </button>
    </div>
  </div>
);

const ChatMessage = ({ message, isUser }: any) => {
  // Check if message exists and has content and timestamp
  if (!message || !message.content) return null;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={` w-full rounded-lg custom-xl:rounded-2xl p-2 custom-xl:p-[18px] ${isUser ? "bg-[#8170B1] text-white max-w-[70%] custom-xl:max-w-[586.11px]" : "bg-white text-[#473171] max-w-[70%] custom-xl:max-w-[512.24px]"
          }`}
      >
        <p className="text-sm sm:text-md custom-xl:text-[25.27px] custom-xl:leading-[1.75rem] font-medium break-words  custom-xl:mb-3">
          {message.content}
        </p>
        <span
          className={`text-xs sm:text-sm custom-xl:text-[20.41px] custom-xl:leading-[1.5rem] opacity-70 custom-xl:mt-1 block ${isUser ? "text-white float-right" : "text-[#9B85C8]"
            }`}
        >
          {message.timestamp
            ? getRelativeTime(message.timestamp)
            : "Timestamp not available"}
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
        const link = document.createElement("a");
        link.href = message.fileUrl;
        link.target = "_blank"; // Open in a new tab
        link.download = message.fileUrl.split("/").pop(); // Download the file with its original name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // window.open(message.fileUrl, '_blank');
      }}
      className={`bg-[#8170B1] max-w-[34rem] flex items-center p-6 rounded-xl my-3 hover:cursor-pointer ${isUser ? "ml-auto" : "mr-auto" // Conditional alignment based on isUser
        }`}
    >
      <Image
        loading="lazy"
        src={pdficon}
        alt="PDF Icon"
        className="w-12 h-12"
      />
      <div className="ml-3 flex items-center justify-between w-full">
        <span className="max-w-[10rem] text-2xl overflow-hidden text-nowrap font-medium">
          {message.fileName.slice(0, 4) + "..." + message.fileName.slice(-4)}
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
  tutor: any;
  showchatvalue: boolean;
}

function MyEtutor({ tutor, showchatvalue }: MyEtutorprops) {
  const { data: session } = useSession();
  const [showChat, setShowChat] = useState(false || showchatvalue);

  const [activeTutor, setActiveTutor] = useState(0);
  const [activeView, setActiveView] = useState("chat");
  const [tutors, setTutors] = useState();
  const [conversationId, setConversationId] = useState<string | null>(null);

  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([]); // State to hold messages
  const [newMessage, setNewMessage] = useState(""); // State for the input message
  const messagesEndRef = useRef(null); // Reference to scroll to the bottom
  const [recievedmessages, setRecievedmessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //@ts-ignore
  const [showmessages, setshowmessages] = useState([] || tutor);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFile, setselectedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();
  useEffect(() => {
    if (socket && userId) {
      // Join the socket room based on userId (either student or teacher)
      socket.emit("join", userId);

      // Listen for incoming chat messages
      socket.on("chatMessage", (msg) => {
        setMessages((prevMessages: any) => {
          // Avoid adding duplicate messages based on content and senderId
          if (
            !prevMessages.some(
              (message: any) =>
                message.content === msg.content &&
                message.senderId === msg.senderId
            )
          ) {
            return [...prevMessages, msg];
          }
          return prevMessages;
        });
      });
    }

    return () => {
      if (socket && userId) {
        // Leave the socket room when the component unmounts
        socket.emit("leave", userId);

        // Cleanup the listener to avoid memory leaks and duplicate listeners
        socket.off("chatMessage");
      }
    };
  }, [socket, userId]); // Run this effect when `socket` or `userId` changes

  const sendMessage = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (newMessage.trim()) {
      const chatMessage = {
        senderId: userId,
        // @ts-ignore
        recipientId: showmessages?.user._id, // Tutor ID
        content: newMessage,
        fileUrl: null,
        fileType: null,
        fileName: null,
        timestamp: new Date().toISOString(),
      };

      // Emit message to the server
      socket.emit("chatMessage", chatMessage);

      // Update UI optimistically
      // @ts-ignore
      setMessages((prev) => [...prev, chatMessage]);

      setNewMessage(""); // Clear input field
      await savingmessages(null, null, null);
    }
  };

  async function savingmessages(fileUrl: any, fileType: any, fileName: any) {
    // if (!newMessage.trim() || !fileUrl) return; // Prevent sending empty messages

    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: userId,
          //@ts-ignore
          recipientId: showmessages.user._id,
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

      setNewMessage(""); // Clear the message input field
      scrollToBottom(); // Scroll to the bottom of the chat
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  const sendFile = async () => {
    setIsLoading(true);
    await session;
    if (!file) {
      toast({
        title: "",

        description: "please select a file first",
        variant: "default",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("senderId", session?.user.id);
    // @ts-ignore
    formData.append("recipientId", showmessages?.user?._id);

    try {
      // Call API to upload the file
      const response = await fetch("/api/message/uploadtos3", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
      } else {
        console.error("File upload failed:", result.error);
      }

      if (result.success) {
        const chatMessage = {
          senderId: userId,
          //@ts-ignore
          recipientId: showmessages.user._id,
          content: null,
          timestamp: new Date().toISOString(),
          fileUrl: result.fileUrl,
          // @ts-ignore
          fileType: file.type,
          // @ts-ignore
          fileName: file.name,
        };

        await savingmessages(
          chatMessage.fileUrl,
          chatMessage.fileType,
          chatMessage.fileName
        );
        // Emit the message to the server
        socket.emit("chatMessage", chatMessage);
        setFile(null);
        setFileName("");
        setselectedFile(null);
        // Optimistically update the UI
        // @ts-ignore
        setMessages((prev) => [...prev, chatMessage]);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error("File upload failed:", result.error);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending file:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (userId) {
      fetchSenders();
    }
  }, [userId]);

  async function fetchSenders() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/recipient/messages?recipientId=${userId}`
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
  }, []);

  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();

    // Handle the specific response cases
    if (
      data.message === "No conversation found between these users" ||
      data.message === "No messages found for this conversation"
    ) {
      return { messages: [], data: [] };
    }

    return data;
  };

  // Use SWR hook
  const { data: messageData } = useSWR(
    session
      ? //@ts-ignore
      `/api/message/conversation?userId=${userId}&recipientId=${showmessages.user?._id}`
      : null,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      onSuccess: (data) => {
        setMessages(data.messages || []); // Set messages or empty array if no messages

        // Set the conversationId if it's not already set
        if (data.length > 0 && !conversationId) {
          setConversationId(data[0].conversationId);
        }
      },
      onError: (error) => {
        console.error("Error fetching messages:", error);
        setMessages([]); // Set empty array on error
      },
    }
  );

  // Function to handle sending a new message

  // Scroll to the latest message
  const scrollToBottom = () => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tutors]);

  if (showChat) {
    return (
      <div className="bg-[#EDE8FA] w-full h-full max-h-[947px] rounded-3xl py-4 sm:py-8 pl-4 sm:pl-2 pr-4 custom-xl:px-8   mt-12 text-white">
        <div className="flex h-full  gap-3 custom-xl:gap-10 overflow-hidden     ">
          {/* Sidebar */}
          <div className="hidden sm:block w-[29.1%]  bg-[#EDE8FA]   h-full  overflow-hidden">
            <h2 className="text-xl custom-xl:text-[39.07px] custom-xl:leading-[2.25rem] font-bold text-[#685AAD] px-4 py-1 ml-4">
              My Students
            </h2>

            <div className=" hidden pt-6 custom-xl:pt-[53px] px-2 overflow-y-auto scrollbar-thin sm:flex flex-col gap-3 custom-xl:gap-4  scrollbar-track-transparent scrollbar-thumb-[#685aad40]  scrollbar-thumb-rounded-3xl h-[90%]  ">
              {recievedmessages.length > 0 &&
                recievedmessages.map((message: any, index) => (
                  <TutorListItem
                    key={index}
                    tutor={message.details}
                    isActive={activeTutor === message}
                    onClick={() => setshowmessages(message.details)}
                    onChatClick={() => {
                      setActiveView("chat");
                      setshowmessages(message.details);
                    }}
                    onFolderClick={() => {
                      setActiveView("folder");
                      setshowmessages(message.details);
                    }}
                    onProfileClick={() => { }} // Placeholder for profile functionality
                  />
                ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-grow flex flex-col rounded-3xl  bg-[#B4A5D7]  h-full    max-w-full">
            {/* Chat Header */}
            <div className="bg-[#B4A5D7] py-3 custom-xl:py-5  px-4 flex rounded-t-3xl  pl-6 custom-xl:pl-10   ">
              <Image
                loading="lazy"
                src={chaticon}
                //@ts-ignore
                alt={showmessages?.firstName}
                className=" mr-3 custom-xl:mr-5 w-5 custom-xl:w-8 h-5 custom-xl:h-8 mt-1"
              />
              <h2 className="text-xl custom-xl:text-3xl font-bold text-white">
                {
                  //@ts-ignore
                  showmessages?.firstName
                }
              </h2>
            </div>

            {activeView === "chat" && (
              <>
                {/* Messages */}
                <div className="flex-grow p-1 custom-xl:px-3 custom-xl:py-6 bg-[#B4A5D7] border-t border-[#8b55ff51] mx-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40] scrollbar-thumb-rounded-3xl">
                  {Array.isArray(messages) && messages.length > 0
                    ? messages.map((msg, index) => (
                      <>
                        <ChatMessage
                          key={index}
                          message={msg}
                          // @ts-ignore
                          isUser={msg.senderId === userId}
                        />
                      </>
                    ))
                    : ""}

                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form
                  onSubmit={sendMessage}
                  className="py-2 sm:py-7  px-2 sm:px-10 bg-[#B4A5D7]  flex items-center justify-center  rounded-b-3xl"
                >
                  <div className="flex items-center bg-[#9787be] rounded-full  relative w-full ">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="send a message"
                      className="flex-grow py-1 sm:py-2 custom-xl:py-4 pl-8 custom-xl:pl-16 pr-8 custom-xl:pr-16  bg-transparent text-white placeholder-[#b0a9d2] text-sm sm:text-base custom-xl:text-[25.27px] custom-xl:leading-[1.75rem] focus:outline-none"
                    />
                    <button type="submit" className="">
                      <Image
                        loading="lazy"
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
                <div className="flex-grow p-1 custom-xl:p-3 bg-[#B4A5D7] border-t border-[#8b55ff51]   mx-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40] scrollbar-thumb-rounded-3xl">
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

                <div className="py-2 sm:py-4 px-2 sm:px-10 bg-[#B4A5D7]  flex items-center justify-end  rounded-b-3xl relative">
                  {file ? (
                    <div className="flex flex-col items-end  gap-2">
                      {selectedFile && (
                        <div className="mt-2 flex items-center gap-4">
                          <p className="text-sm text-white">
                            {fileName.slice(0, 8) + "..." + fileName.slice(-4)}
                          </p>
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
                      <button
                        onClick={sendFile}
                        className="w-full sm:w-auto py-1 px-9 text-base custom-xl:text-base rounded-sm bg-[#8358F7] hover:bg-[#4a3683] capitalize hover:bg-opacity-90 transition-colors"
                      >
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
                      <span className="text-2xl text-[#DBD8EF] font-medium">
                        Add attachment
                      </span>
                      <Image
                        loading="lazy"
                        src={plusicon}
                        alt="Add"
                        className="w-[34px] h-[34px]"
                      />
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
    <div className="bg-[#EDE8FA] w-full h-[90%] rounded-3xl px-5 custom-xl:px-10 py-5 custom-xl:py-11  mt-[52px] text-white">
      <h1 className="text-xl custom-xl:text-[43.41px] leading-none font-bold  text-[#685AAD] px-7 mb-4 sm:mb-6 custom-xl:mb-14">
        My Students
      </h1>

      <div className="flex flex-col gap-2 sm:gap-4 custom-lg:gap-4">
        {recievedmessages.length > 0 &&
          recievedmessages.map((message, index) => (
            <div
              key={index}
              className="bg-[#B4A5D7] rounded-2xl custom-lg:rounded-[28px]   px-2 sm:px-8 custom-xl:px-[50px] pt-2 sm:py-4  pb-2  custom-xl:py-[32px] transition-all duration-300 "
            >
              <div className="flex justify-between items-center gap-4 sm:gap-6  w-full pr-8 sm:pr-12">
                <div className="  flex flex-row sm:justify-start items-center w-full gap-3 sm:gap-6 custom-xl:gap-[45px] ">
                  {/* Profile Image */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 sm:min-w-16 sm:min-h-16 custom-xl:min-w-[136.58px] custom-xl:min-h-[136.58px] rounded-full relative overflow-hidden flex-shrink-0">
                    <img
                      src={
                        //@ts-ignore
                        message?.details?.user?.profilePicture ||
                        "/api/placeholder/64/64"
                      }
                      alt="Profile"
                      className="w-full h-full"
                    />
                  </div>

                  {/* Name and Courses */}
                  <div className="flex flex-col custom-xl:gap-3  justify-center  text-left   max-w-[10rem] custom-xl:max-w-[15rem] w-full">
                    <h2 className="font-bold text-base sm:text-lg custom-xl:text-[37.6px] custom-xl:leading-none ">
                      {
                        //@ts-ignore
                        message?.details?.firstName || ""
                      }
                    </h2>

                    <p className=" hidden sm:block mb-1 text-base sm:text-lg custom-xl:text-[23.87px] leading-[1.75rem] font-medium">
                      #2002627
                    </p>
                    <p className="hidden sm:block text-white text-base sm:text-lg custom-xl:text-[23.87px] leading-[1.75rem] font-medium">
                      00 yo
                    </p>
                  </div>

                  {/* Subjects */}
                  <div className="hidden sm:flex flex-col items-start justify-center custom-xl:gap-4 w-full max-w-[8rem] custom-xl:max-w-[13.2rem] ">
                    <div className="flex flex-col custom-xl:gap-y-1 items-start sm:text-left ">
                      <span className="text-white text-base sm:text-lg custom-xl:text-[24.89px] custom-xl:leading-[1.75rem]  font-medium">
                        Grade:
                      </span>
                      <p className=" text-[#473171] text-base custom-xl:text-[22.53px] sm:leading-[1.75rem]">
                        10th grade
                      </p>
                    </div>
                    <div className="flex flex-col custom-xl:gap-y-1 items-start sm:text-left ">
                      <h3 className="text-white text-base sm:text-lg custom-xl:text-[24.89px] custom-xl:leading-[1.75rem]  font-medium">
                        Sessions&nbsp;booked:
                      </h3>
                      <p className=" text-[#473171] text-base custom-xl:text-[22.53px] sm:leading-[1.75rem]">
                        3 sessions
                      </p>
                    </div>
                  </div>

                  <div className="text-center sm:text-left  hidden custom-xl:block">
                    <div className="mb-4">
                      <h3 className="text-white text-base sm:text-lg custom-xl:text-[28.53px] custom-xl:leading-none font-medium custom-xl:mb-2">
                        Subjects:
                      </h3>
                      <ul className="text-[#473171] text-base custom-xl:text-[21.31px] sm:leading-[1.75rem]  custom-xl:space-y-0.5">
                        <li className="font-medium">Mathematics</li>
                        <li>English</li>
                        <li>Chemistry</li>
                      </ul>
                    </div>
                  </div>


                </div>

                <div className="flex gap-3 sm:gap-6 custom-xl:gap-14">
                  <Image
                    loading="lazy"
                    src={messageicon}
                    alt=""
                    className="w-5 sm:w-6 custom-xl:w-[38.92px] hover:cursor-pointer"
                    onClick={() => {
                      setShowChat(true);
                      //@ts-ignore
                      setshowmessages(message.details);
                    }}
                  />
                  <Image
                    loading="lazy"
                    src={folder}
                    alt=""
                    className="w-5 sm:w-6 custom-xl:w-[38.81px] hover:cursor-pointer"
                    onClick={() => {
                      setShowChat(true);
                      setActiveView("folder");
                      //@ts-ignore
                      setshowmessages(message.details);
                    }}
                  />
                  <Image
                    loading="lazy"
                    src={profile}
                    alt=""
                    className="w-5 sm:w-6 custom-xl:w-[38.81px] hover:cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyEtutor;
