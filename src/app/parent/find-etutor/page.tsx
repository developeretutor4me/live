'use client';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ContactSupport from '../components/ContactSupport';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/utils/helpers';
import { useSocket } from '@/hooks/useSocket';
import { useToast } from '@/hooks/use-toast';
import { Home, LogOut, AlertCircle } from 'lucide-react';
import SearchAndGetEtutors from './components/SearchAndGetEtutors';
import Booking from './components/Booking';
import ErrorPageLoader from '@/components/ui/ErrorPageLoader';
import PageLoaderSpinner from '@/components/ui/PageLoaderSpinner';

interface SearchEtutorFormInterface {
  sortedBy: string;
  searchTerm: string;
  subjects: string[];
  level: string;
  gender: string;
}

const Support: React.FC = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [parentData, setParentData] = useState<any>(null);
  const [bookingRequests, setBookingRequests] = useState<any>(null);
  const [fetchedUserData, setFetchedUserData] = useState<any>(null);
  const [firstName, setFirstName] = useState<any>(null);
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const [notifications, setNotifications] = useState<any>({});
  const [notificationError, setNotificationError] = useState<any>(null);
  const [onSocketConnectError, setOnSocketConnectError] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchEtutor, setSearchEtutor] = useState<boolean>(true);
  const [searchEtutorForm, setSearchEtutorForm] = useState<SearchEtutorFormInterface>({
    sortedBy: '',
    searchTerm: '',
    subjects: [],
    level: '1',
    gender: '',
  });
  const [showFilteredEtutorList, setShowFilteredEtutorList] = useState<boolean>(false);
  const [FilteredEtutorList, setFilteredEtutorList] = useState<any>([]);
  const [selectedTutor, setSelectedTutor] = useState<any>(null);
  const [showProfileEtutor, setShowProfileEtutor] = useState<boolean>(false);

  const [isTrialSessionLeft, setIsTrialSessionLeft] = useState<boolean>(true);
  const [showBooking, setShowBooking] = useState<boolean>(false);
  const [bookingStep, setBookingStep] = useState<number>(1);

  const {
    socket,
    isConnected,
    isConnecting,
    error: socketError,
    updateNotificationStatusHandler: socketUpdateNotificationStatusHandler,
  } = useSocket({
    userId: session?.user?.id || '',
    onError: error => {
      setOnSocketConnectError(error.message || 'Socket connection failed');
    },
    onUserNotifications: data => {
      if (data.success) {
        setNotifications({
          notifications: data.notifications,
          count: data.count,
          unreadCount: data.unreadCount,
        });
      }
    },
    onUserNotificationsError: error => {
      setNotifications({
        notifications: [],
        count: 0,
        unreadCount: 0,
      });
      setNotificationError(error.message || 'Failed to load notifications');
      toast({
        title: 'Notification Error',
        description: error.message || 'Failed to load notifications',
        variant: 'destructive',
      });
    },
  });

  useEffect(() => {
    getUserData();
  }, [session?.user?.id]);

  useEffect(() => {
    if (session?.user?.role === 'teacher') {
      router.push('/etutor');
    } else if (session?.user?.role === 'student') {
      router.push('/studentdashboard');
    }
  }, [session?.user?.role, router]);

  const getUserData = async () => {
    if (!session?.user?.id) return;

    try {
      setError(null);
      setLoading(true);

      const [
        parentDataResult,
        userDataResult,
        bookingRequestsResult,
        firstNameResult,
        profilePictureResult,
      ] = await Promise.all([
        apiClient.fetchParentData(session.user.id),
        apiClient.fetchUserData(session.user.id),
        apiClient.fetchBookingRequests(),
        apiClient.fetchFirstName(),
        apiClient.fetchProfilePicture(),
      ]);

      setParentData(parentDataResult);
      setFetchedUserData(userDataResult);
      setBookingRequests(bookingRequestsResult);
      setFirstName(firstNameResult || '');
      setProfilePicture(profilePictureResult?.profilePicture || null);

      if (parentDataResult?.user?.TrialSessionLeft > 0) {
        setIsTrialSessionLeft(true);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const onNotificationClickHandler = async (notification: any) => {
    if (socketUpdateNotificationStatusHandler) {
      socketUpdateNotificationStatusHandler(notification._id);
    } else {
      try {
        const response = await fetch(
          `/api/notifications/status?notificationId=${notification._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          console.log('Notification marked as read');
          // Update local state immediately
          // setNotifications(prevNotifications => ({
          //   ...prevNotifications,
          //   notifications: prevNotifications.notifications.map((notif: any) =>
          //     notif._id === notification._id ? { ...notif, isRead: true } : notif
          //   ),
          //   unreadCount: Math.max(0, prevNotifications.unreadCount - 1),
          // }));
        } else {
          console.error('Failed to mark notification as read');
        }
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }
  };

  const handleBackNavigationHandler = () => {
    if (showBooking) {
      if (bookingStep > 1) {
        setBookingStep(bookingStep - 1);
      } else {
        setShowBooking(false);
        setShowProfileEtutor(true);
        setShowFilteredEtutorList(true);
        setSearchEtutor(true);
      }
      return;
    }

    if (showProfileEtutor) {
      setShowProfileEtutor(false);
      return;
    }

    if (showFilteredEtutorList) {
      setShowFilteredEtutorList(false);
      return;
    }

    router.push('/parent');
  };

  const bookingSectionShowHandler = () => {
    setShowBooking(true);
    setShowProfileEtutor(false);
    setShowFilteredEtutorList(false);
    setSearchEtutor(false);
  };

  if (loading) {
    return <PageLoaderSpinner />;
  }

  if (error) {
    return <ErrorPageLoader error={error} />;
  }

  return (
    <Layout
      handleBackNavigationHandler={() => handleBackNavigationHandler()}
      parentData={parentData}
      fetchedUserData={fetchedUserData}
      bookingRequests={bookingRequests}
      firstName={firstName}
      profilePicture={profilePicture}
      notifications={notifications}
      notificationError={notificationError}
      onNotificationClickHandler={onNotificationClickHandler}
    >
      {searchEtutor && !showBooking && (
        <SearchAndGetEtutors
          showFilteredEtutorList={showFilteredEtutorList}
          setShowFilteredEtutorList={setShowFilteredEtutorList}
          setSearchEtutorForm={setSearchEtutorForm}
          filteredEtutorList={FilteredEtutorList}
          setFilteredEtutorList={setFilteredEtutorList}
          selectedTutor={selectedTutor}
          setSelectedTutor={setSelectedTutor}
          showProfileEtutor={showProfileEtutor}
          setShowProfileEtutor={setShowProfileEtutor}
          bookingRequests={bookingRequests}
          session={session}
          isTrialSessionLeft={isTrialSessionLeft}
          bookingSectionShowHandler={bookingSectionShowHandler}
          handleBackNavigationHandler={handleBackNavigationHandler}
        />
      )}
      {showBooking && !searchEtutor && (
        <Booking
          selectedTutor={selectedTutor}
          isTrialSessionLeft={isTrialSessionLeft}
          bookingStep={bookingStep}
          setBookingStep={setBookingStep}
        />
      )}
    </Layout>
  );
};

export default Support;
