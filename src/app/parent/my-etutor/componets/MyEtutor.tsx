'use client';

import RecievedMessages from '../../components/RecievedMessages';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import Chat from './Chat';

interface Tutor {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

interface ChatMessage {
  senderId: string;
  recipientId: string;
  content: string | null;
  fileUrl: string | null;
  fileType: string | null;
  fileName: string | null;
  timestamp: string;
  conversationId?: string;
}

interface ReceivedMessage {
  _id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  sender: {
    _id: string;
    name: string;
    email: string;
  };
}

interface MyEtutorProps {
  tutorimp?: any;
  showchatvalue?: boolean;
  setActiveFindEtutor?: (item: string) => void;
  setTutor?: any;
  socket?: any;
  showTerminateEngament?: any;
  etutorId?: string | null;
  chat?: boolean;
  etutorDetails?: any;
  showProfileHandler?: (etutor: any) => void;
  showChatHandler?: (etutor: any) => void;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface FileUploadResponse {
  success: boolean;
  fileUrl?: string;
  error?: string;
}

interface MessageResponse {
  conversationId: string;
  messages: ChatMessage[];
  message?: string;
}

const SOCKET_EVENTS = {
  JOIN: 'join',
  LEAVE: 'leave',
  CHAT_MESSAGE: 'chatMessage',
  NOTIFICATION: 'notification',
} as const;

const API_ENDPOINTS = {
  MESSAGE: '/api/message',
  UPLOAD_FILE: '/api/message/uploadtos3',
  RECIPIENT_MESSAGES: '/api/recipient/messages',
  CONVERSATION: '/api/message/conversation',
} as const;

const ERROR_MESSAGES = {
  FILE_SELECT_REQUIRED: 'Please select a file first',
  FILE_UPLOAD_FAILED: 'File upload failed',
  FETCH_SENDERS_FAILED: 'Failed to fetch senders',
  FETCH_MESSAGES_FAILED: 'Error fetching messages',
  SEND_MESSAGE_FAILED: 'Error sending message',
  SEND_FILE_FAILED: 'Error sending file',
} as const;

const MyEtutor: React.FC<MyEtutorProps> = ({
  tutorimp,
  showchatvalue = false,
  setActiveFindEtutor,
  setTutor,
  socket,
  showTerminateEngament,
  etutorId,
  chat = false,
  etutorDetails,
  showProfileHandler,
  showChatHandler,
}) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [showChat, setShowChat] = useState<boolean>(showchatvalue || chat);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTutor, setActiveTutor] = useState<number>(0);
  const [activeView, setActiveView] = useState<string>('chat');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [receivedMessages, setReceivedMessages] = useState<ReceivedMessage[]>([]);
  const [tutor, setTutorState] = useState<Tutor>(tutorimp || etutorDetails);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userID = useMemo(() => session?.user?.id, [session]);
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const isDuplicateMessage = useCallback(
    (newMsg: ChatMessage, existingMessages: ChatMessage[]): boolean => {
      return existingMessages.some(
        msg =>
          msg.content === newMsg.content &&
          msg.senderId === newMsg.senderId &&
          msg.timestamp === newMsg.timestamp
      );
    },
    []
  );

  const handleSocketMessage = useCallback(
    (msg: ChatMessage) => {
      setMessages(prevMessages => {
        if (isDuplicateMessage(msg, prevMessages)) {
          return prevMessages;
        }
        return [...prevMessages, msg];
      });
    },
    [isDuplicateMessage]
  );

  const handleSocketNotification = useCallback(
    (notification: { senderId: string; content: string }) => {
      if (notification.senderId !== userId) {
        toast({
          title: 'New Message',
          description: notification.content,
          variant: 'default',
        });
      }
    },
    [userId, toast]
  );

  const initializeSocket = useCallback(() => {
    if (!socket || !userId) return;

    socket.emit(SOCKET_EVENTS.JOIN, userId);
    socket.on(SOCKET_EVENTS.CHAT_MESSAGE, handleSocketMessage);
    socket.on(SOCKET_EVENTS.NOTIFICATION, handleSocketNotification);
  }, [socket, userId, handleSocketMessage, handleSocketNotification]);

  const cleanupSocket = useCallback(() => {
    if (!socket || !userId) return;

    socket.emit(SOCKET_EVENTS.LEAVE, userId);
    socket.off(SOCKET_EVENTS.CHAT_MESSAGE);
    socket.off(SOCKET_EVENTS.NOTIFICATION);
  }, [socket, userId]);

  const createChatMessage = useCallback(
    (
      content: string | null = null,
      fileUrl: string | null = null,
      fileType: string | null = null,
      fileName: string | null = null
    ): ChatMessage => ({
      senderId: userId!,
      recipientId: tutor?.user?._id || '',
      content,
      fileUrl,
      fileType,
      fileName,
      timestamp: new Date().toISOString(),
    }),
    [userId, tutor?.user?._id]
  );

  const saveMessage = useCallback(
    async (
      content: string,
      fileUrl: string | null = null,
      fileType: string | null = null,
      fileName: string | null = null
    ): Promise<void> => {
      if (!userID || !tutor?.user?._id) {
        console.error('Missing userID or tutor information');
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.MESSAGE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            senderId: userID,
            recipientId: tutor.user._id,
            content,
            fileUrl,
            fileType,
            fileName,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const savedMessage = await response.json();
        const newConversationId = savedMessage.conversationId;

        if (newConversationId && !conversationId) {
          setConversationId(newConversationId);
        }

        scrollToBottom();
      } catch (error) {
        console.error(ERROR_MESSAGES.SEND_MESSAGE_FAILED, error);
        toast({
          title: 'Error',
          description: ERROR_MESSAGES.SEND_MESSAGE_FAILED,
          variant: 'destructive',
        });
      }
    },
    [userID, tutor?.user?._id, conversationId, scrollToBottom, toast]
  );

  const sendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!newMessage.trim() || !userId) return;

      const chatMessage = createChatMessage(newMessage);

      try {
        socket.emit(SOCKET_EVENTS.CHAT_MESSAGE, chatMessage);
        setMessages(prev => [...prev, chatMessage]);
        setNewMessage('');
        await saveMessage(newMessage);
      } catch (error) {
        console.error(ERROR_MESSAGES.SEND_MESSAGE_FAILED, error);
        toast({
          title: 'Error',
          description: ERROR_MESSAGES.SEND_MESSAGE_FAILED,
          variant: 'destructive',
        });
      }
    },
    [newMessage, userId, createChatMessage, socket, saveMessage, toast]
  );

  const uploadFile = useCallback(
    async (fileToUpload: File): Promise<FileUploadResponse> => {
      if (!userID || !tutor?.user?._id) {
        throw new Error('Missing userID or tutor information');
      }

      const formData = new FormData();
      formData.append('file', fileToUpload);
      formData.append('senderId', userID);
      formData.append('recipientId', tutor.user._id);

      const response = await fetch(API_ENDPOINTS.UPLOAD_FILE, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    [userID, tutor?.user?._id]
  );

  const sendFile = useCallback(async () => {
    if (!file) {
      toast({
        title: 'Error',
        description: ERROR_MESSAGES.FILE_SELECT_REQUIRED,
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const uploadResult = await uploadFile(file);

      if (!uploadResult.success) {
        throw new Error(uploadResult.error || ERROR_MESSAGES.FILE_UPLOAD_FAILED);
      }

      const chatMessage = createChatMessage(null, uploadResult.fileUrl!, file.type, file.name);

      await saveMessage('', chatMessage.fileUrl, chatMessage.fileType, chatMessage.fileName);
      socket.emit(SOCKET_EVENTS.CHAT_MESSAGE, chatMessage);

      setMessages(prev => [...prev, chatMessage]);
      setFile(null);
      setFileName('');
      setSelectedFile(null);
    } catch (error) {
      console.error(ERROR_MESSAGES.SEND_FILE_FAILED, error);
      toast({
        title: 'Error',
        description: ERROR_MESSAGES.SEND_FILE_FAILED,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [file, uploadFile, createChatMessage, saveMessage, socket, toast]);

  const fetchSenders = useCallback(async () => {
    if (!userID) return;

    try {
      const response = await fetch(`${API_ENDPOINTS.RECIPIENT_MESSAGES}?recipientId=${userID}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const senders = await response.json();
      setReceivedMessages(senders);
    } catch (error) {
      console.error(ERROR_MESSAGES.FETCH_SENDERS_FAILED, error);
      toast({
        title: 'Error',
        description: ERROR_MESSAGES.FETCH_SENDERS_FAILED,
        variant: 'destructive',
      });
    }
  }, [userID, toast]);

  const fetchMessages = useCallback(async () => {
    if (!userID || !tutor?.user?._id) return;

    try {
      const response = await fetch(
        `${API_ENDPOINTS.CONVERSATION}?userId=${userID}&recipientId=${tutor.user._id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MessageResponse = await response.json();

      const isNoConversation =
        data.message === 'No conversation found between these users' ||
        data.message === 'No messages found for this conversation';

      if (isNoConversation) {
        setMessages([]);
      } else {
        setMessages(data.messages);

        if (data.messages.length > 0 && !conversationId) {
          setConversationId(data.messages[0].conversationId || null);
        }
      }
    } catch (error) {
      console.error(ERROR_MESSAGES.FETCH_MESSAGES_FAILED, error);
      toast({
        title: 'Error',
        description: ERROR_MESSAGES.FETCH_MESSAGES_FAILED,
        variant: 'destructive',
      });
    }
  }, [userID, tutor?.user?._id, conversationId, toast]);

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session, showChat]);

  // Update tutor when etutorDetails is provided from props
  useEffect(() => {
    if (etutorDetails) {
      setTutorState(etutorDetails);
    }
  }, [etutorDetails]);

  // Update showChat when chat prop changes
  useEffect(() => {
    if (chat && etutorId) {
      setShowChat(true);
    }
  }, [chat, etutorId]);

  useEffect(() => {
    initializeSocket();
    return cleanupSocket;
  }, [initializeSocket, cleanupSocket]);

  useEffect(() => {
    if (userId) {
      fetchSenders();
    }
  }, [userId, showChat, fetchSenders]);

  useEffect(() => {
    fetchSenders();
  }, [showChat, session, fetchSenders]);

  useEffect(() => {
    fetchMessages();
  }, [conversationId, tutor, fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, showChat, scrollToBottom]);

  const chatProps = useMemo(
    () => ({
      recievedmessages: receivedMessages,
      activeTutor,
      settutor: setTutorState,
      setTutor,
      setShowChat,
      setActiveView,
      setActiveFindEtutor,
      activeView,
      tutor,
      messages,
      messagesEndRef,
      sendMessage,
      newMessage,
      setNewMessage,
      userId,
      file,
      setselectedFile: setSelectedFile,
      setFile,
      setFileName,
      isLoading,
      sendFile,
      selectedFile,
      fileName,
    }),
    [
      receivedMessages,
      activeTutor,
      setTutor,
      setActiveFindEtutor,
      activeView,
      tutor,
      messages,
      sendMessage,
      newMessage,
      userId,
      file,
      isLoading,
      sendFile,
      selectedFile,
      fileName,
    ]
  );

  // TODO: Uncomment when ChatComp is ready
  // ChatComp component is currently commented out in the source file
  if (showChat && tutor) {
    // return <Chat {...chatProps} />;
  }

  return (
    <div className="bg-[#EDE8FA] w-full h-full rounded-[30px] px-5 custom-xl:px-9 py-5 custom-xl:py-9  mt-[53px] text-white">
      <h1 className="text-xl custom-xl:text-[39.07px] custom-xl:leading-[2.5rem] font-bold  text-[#685AAD] px-7 mb-4 sm:mb-6 custom-xl:mb-11">
        My eTutors
      </h1>

      <div className="flex flex-col gap-2 sm:gap-4 custom-lg:gap-10 ">
        {receivedMessages.length > 0 ? (
          receivedMessages.map((message, index) => (
            <RecievedMessages
              key={message._id || index}
              message={message}
              showProfileHandler={showProfileHandler}
              showChatHandler={showChatHandler}
            />
          ))
        ) : (
          <div className="text-center text-[#685AAD] text-xl py-10">
            No eTutors found. Start by finding an eTutor!
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEtutor;
