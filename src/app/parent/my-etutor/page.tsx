'use client';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiClient } from '@/utils/helpers';
import { useSocket } from '@/hooks/useSocket';
import { useToast } from '@/hooks/use-toast';
import MyEtutor from './componets/MyEtutor';
import ErrorPageLoader from '@/components/ui/ErrorPageLoader';
import PageLoaderSpinner from '@/components/ui/PageLoaderSpinner';

const Membership: React.FC = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  // Get URL parameters
  const etutorIdParam = searchParams.get('etutor_id');
  const chatParam = searchParams.get('chat');
  const profileParam = searchParams.get('profile');

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

  // State for URL parameters
  const [etutorId, setEtutorId] = useState<string | null>(null);
  const [chat, setChat] = useState<boolean>(false);
  const [etutorDetails, setEtutorDetails] = useState<any>(null);
  const [showchatvalue, setShowchatvalue] = useState<boolean>(false);
  const [showprofilevalue, setShowprofilevalue] = useState<boolean>(false);

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

  // Handle URL parameters
  useEffect(() => {
    // Set etutor_id from URL parameter or null
    setEtutorId(etutorIdParam || null);

    // Set chat from URL parameter (true if 'true', false otherwise)
    const chatValue = chatParam === 'true';
    setChat(chatValue);
    setShowchatvalue(chatValue);

    // Set profile from URL parameter (true if 'true', false otherwise)
    const profileValue = profileParam === 'true';
    setShowprofilevalue(profileValue);
  }, [etutorIdParam, chatParam, profileParam]);

  // Fetch etutor details if etutorId is available
  useEffect(() => {
    fetchEtutorDetails();
  }, [etutorId]);

  const fetchEtutorDetails = async () => {
    if (etutorId) {
      try {
        const response = await fetch(`/api/Teacher-Apis/teacher/${etutorId}`);
        if (response.ok) {
          const data = await response.json();
          setEtutorDetails(data);
        } else {
          console.error('Failed to fetch etutor details');
          setEtutorDetails(null);
        }
      } catch (error) {
        console.error('Error fetching etutor details:', error);
        setEtutorDetails(null);
      }
    } else {
      setEtutorDetails(null);
    }
  };

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
    router.push('/parent');
  };

  const showProfileHandler = (etutor: any) => {
    console.log('etutor : ', etutor);
  };

  const showChatHandler = (etutor: any) => {
    console.log('etutor : ', etutor);
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
      <MyEtutor
        etutorId={etutorId}
        chat={chat}
        etutorDetails={etutorDetails}
        socket={socket}
        showchatvalue={showchatvalue}
        tutorimp={etutorDetails}
        showProfileHandler={showProfileHandler}
        showChatHandler={showChatHandler}
      />
    </Layout>
  );
};

export default Membership;
