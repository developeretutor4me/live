import React, { useState } from "react";
import bellicon from "../../../../public/bellnotification.svg";
import dots from "../../../../public/3dotsNotification.svg";
import selectiondots from "../../../../public/selectiondots.svg";
import Cross from "../../../../public/crossicon.svg";
import deleteicon from "../../../../public//deleteiconnoti.svg";
import markasread from "../../../../public/markasread.svg";
import nonotification from '../../../../public/nonotification.svg'
import Image from "next/image";
import { Dot, Ellipsis, Ticket, TicketCheck } from "lucide-react";
interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

const NotificationPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "SUPPORT RESPONSE:",
      message:
        '"OUR SUPPORT TEAM HAS RESPONDED TO YOUR INQUIRY. HEAD TO YOUR INBOX TO VIEW THE RESPONSE."',
      date: "YESTERDAY",
      isRead: false,
    },
    {
      id: "2",
      title: "SUPPORT RESPONSE:",
      message:
        '"OUR SUPPORT TEAM HAS RESPONDED TO YOUR INQUIRY. HEAD TO YOUR INBOX TO VIEW THE RESPONSE."',
      date: "YESTERDAY",
      isRead: false,
    },
    {
      id: "3",
      title: "SUPPORT RESPONSE:",
      message:
        '"OUR SUPPORT TEAM HAS RESPONDED TO YOUR INQUIRY. HEAD TO YOUR INBOX TO VIEW THE RESPONSE."',
      date: "SATURDAY",
      isRead: false,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const [selectMode, setSelectMode] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // Toggle select mode
  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedNotifications([]);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedNotifications.length === notifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(
        notifications.map((notification) => notification.id)
      );
    }
  };

  // Handle individual selection
  const toggleSelectNotification = (id: string) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(
        selectedNotifications.filter((item) => item !== id)
      );
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  // Delete selected notifications
  const deleteSelectedNotifications = () => {
    setNotifications(
      notifications.filter(
        (notification) => !selectedNotifications.includes(notification.id)
      )
    );
    setSelectedNotifications([]);
  };

  // Mark as read
  const markAsRead = () => {
    setNotifications(
      notifications.map((notification) => {
        if (selectedNotifications.includes(notification.id)) {
          return { ...notification, isRead: true };
        }
        return notification;
      })
    );
    setSelectedNotifications([]);
  };

  // Group notifications by date
  const groupedNotifications = notifications.reduce((acc, notification) => {
    if (!acc[notification.date]) {
      acc[notification.date] = [];
    }
    acc[notification.date].push(notification);
    return acc;
  }, {} as Record<string, NotificationItem[]>);

  return (
    <div className="bg-[#887cc4] rounded-[15px] sm:w-[596px] sm:h-[624px] max-w-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-[26px]">
        <h1 className="text-white text-base sm:text-3xl font-bold ml-2.5">NOTIFICATIONS</h1>
        <div className="flex items-center space-x-4 justify-center">
          {selectMode ? (
            <>
              <button
                className="text-white hover:opacity-75"
                onClick={markAsRead}
              >
                <Image src={markasread} alt="" />
              </button>
              <button
                className="text-white hover:opacity-75"
                onClick={deleteSelectedNotifications}
              >
                <Image src={deleteicon} alt="" />
              </button>

              <button
                className="text-white hover:opacity-75"
                onClick={toggleSelectMode}
              >
                <Image src={Cross} alt="" />
              </button>
              <div className="mx-2"></div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  className="text-white hover:opacity-75 flex items-start justify-center"
                  onClick={toggleDropdown}
                >
                  {/* <Image src={dots} alt="Menu" width={24} height={24} className="relative z-20" /> */}
                  <Ellipsis
                    className={`${
                      isOpen ? "text-[#887cc4]" : "text-white"
                    }   relative z-20 `}
                  />
                </button>

                {isOpen && (
                  <div className="absolute top-0 -right-1 z-10 bg-purple-100 rounded-md shadow-lg overflow-hidden bg-white">
                    <div className="py-1 w-24">
                      <button className="w-full text-left px-4 py-2 text-sm text-indigo-700 hover:bg-purple-200">
                        All
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-indigo-700 hover:bg-purple-200">
                        Read
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-indigo-700 hover:bg-purple-200">
                        Unread
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-indigo-700 hover:bg-purple-200">
                        Date
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectMode(true)}
                className=" h-[18px] w-[18px] border-2 rounded-sm"
              >
                &nbsp;
              </button>
            </div>
          )}

          {selectMode && (
            <button
              className="text-white hover:opacity-75"
              onClick={handleSelectAll}
            >
              <Image src={selectiondots} alt="" />
            </button>
          )}
          <div className="relative">
            <div className=" bg-[#DBD8EF] w-[17px] h-[17px] absolute -bottom-2 -right-2  rounded-full flex items-center justify-center text-xs text-[#685AAD]">
              7
            </div>
            <Image src={bellicon} alt="" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 scrollbar-none">
        {Object.entries(groupedNotifications).map(([date, items]) => (
          <div key={date} className="my-3">
            <h2 className="text-white text-sm sm:text-xl mb-1 ml-3">{date}</h2>

            {items.map((notification) => (
              <div
                key={notification.id}
                className="bg-[rgb(123,111,187)] hover:bg-[rgb(123,111,187,0.4)] duration-300 transition-all shadow-[0px_0px_6px_rgba(255,255,255,0.5)] hover:shadow-[0px_0px_6px_rgba(255,255,255,0.7)] rounded-xl mb-4 px-4 py-5 flex justify-between items-start"
              >
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm sm:text-xl">
                    {notification.title}
                  </h3>
                  <p className="text-white text-xs sm:text-sm mt-1">
                    {notification.message}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {selectMode ? (
                    <div
                      className={`w-5 h-5 border-2 border-[rgb(255,255,255,0.6)] hover:border-[rgb(255,255,255,1)] transition-all duration-300 rounded flex items-center justify-center cursor-pointer ${selectedNotifications.includes(notification.id) && "bg-white"}`}
                      onClick={() => toggleSelectNotification(notification.id)}
                    >
                      {selectedNotifications.includes(notification.id) && (
                        <TicketCheck className="text-transparent"/>
                      )}
                    </div>
                  ) : (
                    <button className="text-white hover:opacity-75">
                      <Image src={markasread} alt="" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <Image src={nonotification} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

// Example usage
const NotificationPage: React.FC = () => {
  return (
    <div className=" ">
      <NotificationPanel />
    </div>
  );
};

export default NotificationPage;
