'use client';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { apiClient } from '@/utils/helpers';
import { useSocket } from '@/hooks/useSocket';
import { useToast } from '@/hooks/use-toast';
import { Home, LogOut, AlertCircle } from 'lucide-react';
import SearchAndGetEtutors from '../components/SearchAndGetEtutors';
import Booking from '../components/Booking';
import ErrorPageLoader from '@/components/ui/ErrorPageLoader';
import PageLoaderSpinner from '@/components/ui/PageLoaderSpinner';
import EtutorProfileView from '../components/EtutorProfileView';

interface SearchEtutorFormInterface {
  sortedBy: string;
  searchTerm: string;
  subjects: string[];
  level: string;
  gender: string;
}

const Page: React.FC = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  // Get tutor ID from URL parameter
  const etutorId = params?.['etutor-id'] as string;

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

  const [isTrialSessionLeft, setIsTrialSessionLeft] = useState<boolean>(true);
  const [selectedTutor, setSelectedTutor] = useState<any>(null);
  const [showEtutorProfile, setShowEtutorProfile] = useState<boolean>(true);
  const [tutorLoading, setTutorLoading] = useState<boolean>(false);
  const [tutorError, setTutorError] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState<Boolean>(false);
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

  // Fetch tutor data when etutorId is available
  useEffect(() => {
    if (etutorId && session?.user?.id) {
      fetchTutorData(etutorId);
    }
  }, [etutorId, session?.user?.id]);

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

      if (userDataResult?.TrialSessionLeft > 0) {
        setIsTrialSessionLeft(true);
      } else {
        setIsTrialSessionLeft(false);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const fetchTutorData = async (tutorId: string) => {
    try {
      setTutorError(null);
      setTutorLoading(true);

      const response = await fetch('/api/Teacher-Apis/Fetch-Teacher-usingID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacherId: tutorId }),
      });

      const data = await response.json();

      if (response.ok && data.teacher) {
        setSelectedTutor(data.teacher);
      } else {
        setTutorError(data.error || 'Tutor not found');
        toast({
          title: 'Error',
          description: data.error || 'Tutor does not exist',
          variant: 'destructive',
        });
        // Redirect back to find-etutor page
        router.push('/parent/find-etutor');
      }
    } catch (error) {
      setTutorError(error instanceof Error ? error.message : 'Failed to fetch tutor data');
      toast({
        title: 'Error',
        description: 'Failed to load tutor profile',
        variant: 'destructive',
      });
      // Redirect back to find-etutor page
      router.push('/parent/find-etutor');
    } finally {
      setTutorLoading(false);
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
    // if (showBooking) {
    //   if (bookingStep > 1) {
    //     setBookingStep(bookingStep - 1);
    //   } else {
    //     setShowBooking(false);
    //     setShowProfileEtutor(true);
    //     setShowFilteredEtutorList(true);
    //     setSearchEtutor(true);
    //   }
    //   return;
    // }
    // if (showProfileEtutor) {
    //   setShowProfileEtutor(false);
    //   return;
    // }
    // if (showFilteredEtutorList) {
    //   setShowFilteredEtutorList(false);
    //   return;
    // }
    // router.push('/parent');
  };

  const bookingSectionShowHandler = () => {
    setShowBooking(true);
    setShowEtutorProfile(false);
  };

  if (loading || tutorLoading) {
    return <PageLoaderSpinner />;
  }

  if (error || tutorError) {
    return <ErrorPageLoader error={error || tutorError} />;
  }

  console.log('selectedTutor : ', selectedTutor);

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
      {showEtutorProfile && (
        <EtutorProfileView
          tutor={selectedTutor}
          bookingRequests={[]}
          session={session}
          isTrialSessionLeft={isTrialSessionLeft}
          bookingSectionShowHandler={bookingSectionShowHandler}
        />
      )}
      {showBooking && !showEtutorProfile && (
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

export default Page;
