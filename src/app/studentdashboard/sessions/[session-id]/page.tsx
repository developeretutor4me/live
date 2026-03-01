'use client';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { apiClient } from '@/utils/helpers';
import { useSocket } from '@/hooks/useSocket';
import { useToast } from '@/hooks/use-toast';
import ErrorPageLoader from '@/components/ui/ErrorPageLoader';
import PageLoaderSpinner from '@/components/ui/PageLoaderSpinner';
import BookingStepOne from '../../find-etutor/components/BookingStepOne';
import EditBookingForm from '../../find-etutor/components/EditBookingForm';
import EditBookingFormSubmit from '../../find-etutor/components/EditBookingFormSubmit';

const Support: React.FC = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  // Get session ID from URL parameter
  const sessionId = params?.['session-id'] as string;

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

  const [booking, setBooking] = useState<any>(null);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [selectedTutor, setSelectedTutor] = useState<any>(null);
  const [tutorError, setTutorError] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [selectedSubjects, setSelectedSubjects] = useState<any>([]);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [bookingInfo, setBookingInfo] = useState({
    id: '',
    subjects: [],
    date: '',
    time: '',
    timeZone: '',
    duration: '',
    studentNote: '',
    cost: 200,
  });
  const [loadingEditBookingRequest, setLoadingEditBookingRequest] = useState(false);

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
    } else if (session?.user?.role === 'parent') {
      router.push('/parent');
    }
  }, [session?.user?.role, router]);

  useEffect(() => {
    if (sessionId && session?.user?.id) {
      fetchBookingData(sessionId);
    }
  }, [sessionId, session?.user?.id]);

  useEffect(() => {
    if (booking) {
      setSelectedSubjects(booking?.subjects || []);
      setSelectedLevel(booking?.level || null);
      setBookingInfo({
        id: booking?._id,
        subjects: booking?.subjects || [],
        date: booking?.date || '',
        time: booking?.time || '',
        timeZone: booking?.timeZone || '',
        duration: booking?.duration || '',
        studentNote: booking?.StudentNote || '',
        cost: booking?.cost || 200,
      });
    }
  }, [booking]);

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

  const fetchBookingData = async (bookingId: string) => {
    try {
      setBookingLoading(true);

      const response = await fetch(`/api/booking/get-by-id?id=${bookingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setBooking(data.booking);
        console.log(data.booking);
        await fetchTutorData(data.booking.teacher);
      } else {
        setBookingError(data.error || 'Failed to fetch booking');
        toast({
          title: 'Error',
          description: data.error || 'Failed to load booking data',
          variant: 'destructive',
        });
      }
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'Failed to fetch booking data');
      toast({
        title: 'Error',
        description: 'Failed to load booking data',
        variant: 'destructive',
      });
    } finally {
      setBookingLoading(false);
    }
  };

  const fetchTutorData = async (tutorId: string) => {
    try {
      setTutorError(null);
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
      }
    } catch (error) {
      setTutorError(error instanceof Error ? error.message : 'Failed to fetch tutor data');
      toast({
        title: 'Error',
        description: 'Failed to load tutor profile',
        variant: 'destructive',
      });
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
    // router.push('/studentdashboard');
  };

  const nextBookingStepHandler = (editBookingInfo: any) => {
    setBookingInfo({
      ...bookingInfo,
      subjects: editBookingInfo.subjects,
      date: editBookingInfo.date,
      time: editBookingInfo.time,
      timeZone: editBookingInfo.timeZone,
      duration: editBookingInfo.duration,
      studentNote: editBookingInfo.studentNote,
      cost: editBookingInfo.cost,
    });
    setBookingStep(3);
  };

  const editBookingHandler = async () => {
    try {
      setLoadingEditBookingRequest(true);

      const response = await fetch('/api/booking/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: bookingInfo.id,
          date: bookingInfo.date,
          time: bookingInfo.time,
          timeZone: bookingInfo.timeZone,
          duration: bookingInfo.duration,
          StudentNote: bookingInfo.studentNote,
          subjects: bookingInfo.subjects,
          level: selectedLevel,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update booking');
      }

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Your booking has been updated successfully',
          variant: 'default',
        });

        router.push('/studentdashboard/sessions');
      } else {
        throw new Error(result.message || 'Update failed');
      }
    } catch (error: any) {
      console.error('Error updating booking:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update booking. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoadingEditBookingRequest(false);
    }
  };

  if (loading || bookingLoading) {
    return <PageLoaderSpinner />;
  }

  if (error || bookingError || tutorError) {
    return <ErrorPageLoader error={error || bookingError || tutorError} />;
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
      {bookingStep === 1 && (
        <BookingStepOne
          bookingStep={bookingStep}
          setBookingStep={setBookingStep}
          selectedTutor={selectedTutor}
          selectedSubjects={selectedSubjects}
          setSelectedSubjects={setSelectedSubjects}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />
      )}
      {bookingStep === 2 && (
        <EditBookingForm
          bookingStep={bookingStep}
          selectedSubjects={selectedSubjects}
          bookingData={bookingInfo}
          nextBookingStepHandler={nextBookingStepHandler}
        />
      )}
      {bookingStep === 3 && (
        <EditBookingFormSubmit
          bookingStep={bookingStep}
          bookingData={bookingInfo}
          tutorContactInfo={selectedTutor.contactInformation}
          subjects={selectedSubjects}
          level={selectedLevel}
          editBookingHandler={editBookingHandler}
          loadingEditBookingRequest={loadingEditBookingRequest}
        />
      )}
    </Layout>
  );
};

export default Support;
